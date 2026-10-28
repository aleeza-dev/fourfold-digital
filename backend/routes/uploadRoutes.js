
const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Keep uploaded files in memory temporarily.
// Never save applicants' CVs to a public folder.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum 5 MB
  },
  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const extension = require("path")
      .extname(file.originalname)
      .toLowerCase();

    if (
      !allowedTypes.includes(file.mimetype) ||
      !allowedExtensions.includes(extension)
    ) {
      return callback(
        new Error("Only PDF, DOC, and DOCX CV files are allowed.")
      );
    }

    callback(null, true);
  },
});

router.post("/cv", (req, res) => {
  upload.single("cv")(req, res, async (error) => {
    if (error) {
      const isFileSizeError = error.code === "LIMIT_FILE_SIZE";

      return res.status(400).json({
        success: false,
        message: isFileSizeError
          ? "CV file must be 5 MB or smaller."
          : error.message || "CV upload failed.",
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please select a CV file.",
        });
      }

      if (
        !process.env.CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
      ) {
        return res.status(500).json({
          success: false,
          message: "CV upload service is not configured.",
        });
      }

      const extension = require("path")
        .extname(req.file.originalname)
        .toLowerCase();

      const publicId = `cv-${crypto.randomUUID()}${extension}`;

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "raw",
            type: "authenticated",
            folder: "fourfold-digital/cvs",
            public_id: publicId,
            overwrite: false,
          },
          (uploadError, uploadResult) => {
            if (uploadError) {
              return reject(uploadError);
            }

            resolve(uploadResult);
          }
        );

        stream.end(req.file.buffer);
      });

        return res.status(201).json({
        success: true,
        message: "CV uploaded successfully.",
        cvUrl: result.secure_url,
        cvPublicId: result.public_id,
      });


    } catch (uploadError) {
      console.error("Cloudinary CV upload failed:", uploadError.message);

      return res.status(500).json({
        success: false,
        message: "Unable to upload your CV. Please try again.",
      });
    }
  });
});

module.exports = router;
