
const express = require("express");
const Application = require("../models/Application");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const router = express.Router();

const isValidOptionalUrl = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Submit internship application
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      education,
      internship,
      linkedin,
      portfolio,
      motivation,
      cvUrl,
      cvPublicId,
      unpaidInternshipConsent,
    } = req.body;

    // Check required fields
    if (
      !fullName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !education?.trim() ||
      !internship?.trim() ||
      !motivation?.trim() ||
      !cvUrl?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Validate optional links
    if (
      !isValidOptionalUrl(linkedin) ||
      !isValidOptionalUrl(portfolio)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid LinkedIn and portfolio URLs.",
      });
    }

    // Validate CV URL
    try {
      const parsedCvUrl = new URL(cvUrl);

      if (parsedCvUrl.protocol !== "https:") {
        throw new Error("Invalid CV URL");
      }
    } catch {
      return res.status(400).json({
        success: false,
        message: "Please upload a CV using the approved upload system.",
      });
    }

    if (unpaidInternshipConsent !== true) {
      return res.status(400).json({
        success: false,
        message: "Please acknowledge the internship terms.",
      });
    }


        // Generate a temporary CV access token.
    // Store only its hash in MongoDB.
    const cvAccessToken = crypto.randomBytes(32).toString("hex");

    const cvAccessTokenHash = crypto
      .createHash("sha256")
      .update(cvAccessToken)
      .digest("hex");

    // Link expires 15 minutes after generation.
    const cvAccessExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Save application in MongoDB
    const application = await Application.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      education: education.trim(),
      internship: internship.trim(),
      linkedin: linkedin?.trim() || "",
      portfolio: portfolio?.trim() || "",
      motivation: motivation.trim(),
      cvUrl: cvUrl.trim(),
      cvPublicId: cvPublicId || "",
      cvAccessTokenHash,
      cvAccessExpiresAt,
      unpaidInternshipConsent: true,
    });

    // Send notification email
    try {
      await transporter.sendMail({
        from: `"Fourfold Digital" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `New Internship Application - ${application.fullName}`,
        text: `
A new internship application has been submitted.

Name: ${application.fullName}
Email: ${application.email}
Phone: ${application.phone}
Education: ${application.education}
Internship Role: ${application.internship}

LinkedIn: ${application.linkedin || "Not provided"}
Portfolio: ${application.portfolio || "Not provided"}

Motivation:
${application.motivation}

CV access token: ${cvAccessToken}
Expires at: ${cvAccessExpiresAt.toISOString()}

Application ID: ${application._id}
        `,
      });

      console.log("Application notification email sent.");
    } catch (emailError) {
      console.error("Application email notification failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Your application has been submitted successfully!",
      applicationId: application._id,
    });
  } catch (error) {
    console.error("Application submission error:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Please check your application details.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to submit your application right now.",
    });
  }
});

module.exports = router;
