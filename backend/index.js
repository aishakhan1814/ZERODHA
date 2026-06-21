require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const { UserModel } = require("./model/UserModel");

const PORT = process.env.PORT || 8080;
const url = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "ZERODHA_SECRET_KEY";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateOtp() {
  // 6-digit numeric OTP, e.g. "042913"
  return crypto.randomInt(0, 1000000).toString().padStart(6, "0");
}


const {HoldingsModel}=require("./model/HoldingsModel");
const {PositionsModel} = require("./model/PositionsModel");
const {OrdersModel}=require("./model/OrdersModel")
const app = express();


app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("DB connected!");


app.get('/allHoldings',async(req,res)=>{
  let allHoldings=await HoldingsModel.find({});
  res.json(allHoldings);
})

app.get('/allPositions',async(req,res)=>{
  let allPositions=await PositionsModel.find({});
  res.json(allPositions);
})

app.post('/newOrder',async(req,res)=>{
  let newOrder=new OrdersModel({
    name:req.body.name,
    qty:req.body.qty,
    price:req.body.price,
    mode:req.body.mode,

  });
  newOrder.save();
  res.send("Order saved");
})
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    // Password is correct. Don't issue the token yet — generate an OTP,
    // email it, and require /verify-otp before granting access.
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your Zerodha login verification code",
        text: `Your verification code is ${otp}. It expires in 10 minutes. If you didn't try to log in, you can ignore this email.`,
      });
    } catch (mailErr) {
      console.error("Failed to send OTP email:", mailErr);
      return res.status(500).json({
        message: "Could not send verification email. Please try again.",
      });
    }

    res.json({
      message: "OTP sent to your email",
      email: user.email,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user || !user.otp || !user.otpExpiresAt) {
      return res.status(400).json({
        message: "No pending verification for this email",
      });
    }

    if (user.otpExpiresAt < new Date()) {
      user.otp = null;
      user.otpExpiresAt = null;
      await user.save();
      return res.status(400).json({
        message: "OTP expired. Please log in again.",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Incorrect OTP",
      });
    }

    // OTP correct — clear it so it can't be reused, then issue the real token.
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });