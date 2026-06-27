require("dotenv").config();

const express   = require("express");
const mongoose  = require("mongoose");
const bodyParser = require("body-parser");
const cors      = require("cors");
const bcrypt    = require("bcrypt");
const jwt       = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto    = require("crypto");

const { UserModel }      = require("./model/UserModel");
const { HoldingsModel }  = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel }    = require("./model/OrdersModel");

const PORT       = process.env.PORT || 8080;
const MONGO_URL  = process.env.MONGO_URL || process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || "ZERODHA_SECRET_KEY";

if (!MONGO_URL) {
  console.error("ERROR: MongoDB URL not defined.");
  process.exit(1);
}

// Gmail SMTP — works on Render free tier, sends to ANY email address
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,   // your Gmail address
    pass: process.env.GMAIL_PASS,   // Gmail App Password (16 chars, no spaces)
  },
});

function generateOtp() {
  return crypto.randomInt(0, 1000000).toString().padStart(6, "0");
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGO_URL).then(() => {
  console.log("DB connected!");

  app.get("/", (req, res) => res.send("Zerodha API Backend is running!"));

  app.get("/allHoldings", async (req, res) => {
    res.json(await HoldingsModel.find({}));
  });

  app.get("/allPositions", async (req, res) => {
    res.json(await PositionsModel.find({}));
  });

  app.post("/newOrder", async (req, res) => {
    const order = new OrdersModel({
      name: req.body.name, qty: req.body.qty,
      price: req.body.price, mode: req.body.mode,
    });
    await order.save();
    res.send("Order saved");
  });

  app.post("/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (await UserModel.findOne({ email }))
        return res.status(400).json({ message: "Email already exists" });
      const hashed = await bcrypt.hash(password, 10);
      await new UserModel({ name, email, password: hashed }).save();
      res.status(201).json({ message: "Signup successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid Email" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: "Wrong Password" });

      const otp = generateOtp();
      user.otp = otp;
      user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      try {
        await transporter.sendMail({
          from: `"Zerodha Clone" <${process.env.GMAIL_USER}>`,
          to: user.email,
          subject: "Your Zerodha login verification code",
          text: `Your verification code is ${otp}. It expires in 10 minutes.`,
        });
        console.log("OTP sent to", user.email);
      } catch (mailErr) {
        console.error("Mail error:", mailErr.message);
        return res.status(500).json({ message: "Could not send verification email. Please try again." });
      }

      res.json({ message: "OTP sent to your email", email: user.email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });

  app.post("/verify-otp", async (req, res) => {
    try {
      const { email, otp } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user || !user.otp || !user.otpExpiresAt)
        return res.status(400).json({ message: "No pending verification for this email" });
      if (user.otpExpiresAt < new Date()) {
        user.otp = null; user.otpExpiresAt = null;
        await user.save();
        return res.status(400).json({ message: "OTP expired. Please log in again." });
      }
      if (user.otp !== otp)
        return res.status(400).json({ message: "Incorrect OTP" });

      user.otp = null; user.otpExpiresAt = null;
      await user.save();
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
      res.json({ message: "Login Successful", token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("MongoDB Connection Error:", err));
