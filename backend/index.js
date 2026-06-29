require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || "Zerodha Clone";

if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) {
  console.error("=================================================================");
  console.error("ERROR: BREVO_API_KEY or BREVO_SENDER_EMAIL is not defined!");
  console.error("OTP emails will fail until both are set in your Environment");
  console.error("Variables (e.g. on the Render dashboard).");
  console.error("=================================================================");
}

function generateOtp() {
  return crypto.randomInt(0, 1000000).toString().padStart(6, "0");
}

// Sends via Brevo's HTTPS REST API (NOT SMTP) — this matters because
// Render's free tier blocks outbound SMTP ports (25/465/587), which is
// why a nodemailer/SMTP-based approach (Gmail, Brevo SMTP relay, etc.)
// silently times out from Render even though it works locally.
async function sendOtpEmail(toEmail, otp) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: BREVO_SENDER_EMAIL, name: BREVO_SENDER_NAME },
      to: [{ email: toEmail }],
      subject: "Your Zerodha login verification code",
      textContent: `Your verification code is ${otp}. It expires in 10 minutes. If you didn't try to log in, you can ignore this email.`,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Brevo send failed (${response.status}): ${errBody}`);
  }

  return response.json();
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
        await sendOtpEmail(user.email, otp);
      } catch (mailErr) {
        console.error("Failed to send OTP email:", mailErr);
        return res.status(500).json({
          message: "Could not send verification email. Please try again.",
        });
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
