
const express = require("express");
const nodemailer = require("nodemailer");
const ProjectInquiry = require("../models/ProjectInquiry");

const router = express.Router();

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post("/", async (req, res) => {
  try {
    const { name, email, company, service, budget, details } =
      req.body || {};

    // Validate required fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof service !== "string" ||
      typeof details !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !service.trim() ||
      !details.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      (company && (typeof company !== "string" || company.length > 140)) ||
      service.length > 100 ||
      (budget && (typeof budget !== "string" || budget.length > 100)) ||
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

    // Save inquiry to MongoDB first
    const inquiry = await ProjectInquiry.create({
      name: name.trim(),
      email: email.trim(),
      company: typeof company === "string" ? company.trim() : "",
      service: service.trim(),
      budget: typeof budget === "string" ? budget.trim() : "",
      details: details.trim(),
    });

    console.log("Project inquiry saved successfully:", inquiry._id.toString());

    // Confirm successful database save to the frontend
    res.status(201).json({
      success: true,
      message: "Your project inquiry has been saved successfully.",
      inquiryId: inquiry._id,
    });

    // Send email notification separately; email failure won't undo the save
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Inquiry saved, but email credentials are missing.");
      return;
    }

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

    try {
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
          "",
          `Inquiry ID: ${inquiry._id}`,
        ].join("\n"),
      });

      console.log("Project inquiry notification email sent successfully.");
    } catch (emailError) {
      console.error(
        "Inquiry was saved, but email notification failed:",
        emailError.message
      );
    }
  } catch (error) {
    console.error("Project inquiry failed:", error.message);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "We couldn't save your inquiry. Please try again.",
      });
    }
  }
});

module.exports = router;
