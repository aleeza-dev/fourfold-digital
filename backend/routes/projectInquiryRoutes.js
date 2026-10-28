
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post("/", async (req, res) => {
  try {
    const { name, email, company, service, budget, details } =
      req.body || {};

    if (
      !name?.trim() ||
      !email?.trim() ||
      !service?.trim() ||
      !details?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      (company && company.length > 140) ||
      service.length > 100 ||
      (budget && budget.length > 100) ||
      details.length > 3000 ||
      details.trim().length < 10
    ) {
      return res.status(400).json({
        success: false,
        message: "Please check the length of your details.",
      });
    }

    if (!isValidEmail(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Project inquiry email credentials are missing.");

      return res.status(503).json({
        success: false,
        message: "Email service is temporarily unavailable.",
      });
    }

    await transporter.sendMail({
      from: `"Fourfold Digital" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
      replyTo: email.trim(),
      subject: `New Project Inquiry — ${name.trim()}`,
      text: [
        "A new project inquiry was submitted.",
        "",
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Company: ${company?.trim() || "Not provided"}`,
        `Service: ${service.trim()}`,
        `Budget: ${budget?.trim() || "Not provided"}`,
        "",
        "Project Details:",
        details.trim(),
      ].join("\n"),
    });

    console.log("Project inquiry email sent successfully.");

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error("Project inquiry failed:", error.message);

    return res.status(503).json({
      success: false,
      message:
        "We couldn't confirm your inquiry. Your details are still available in the form. Please try again shortly.",
    });
  }
});

module.exports = router;
