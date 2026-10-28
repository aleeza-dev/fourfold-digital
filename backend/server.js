
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const applicationRoutes = require("./routes/applicationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const projectInquiryRoutes = require("./routes/projectInquiryRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
 "https://fourfold-digital.vercel.app" 
];

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON request bodies
app.use(express.json({ limit: "1mb" }));

// API health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Fourfold Digital API is running!",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is healthy.",
  });
});

// Internship application API
app.use("/api/applications", applicationRoutes);

// CV upload API
app.use("/api/uploads", uploadRoutes);

// Project inquiry API
app.use("/api/project-inquiries", projectInquiryRoutes);

// Handle unexpected errors
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  if (err.message === "Origin not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "This origin is not allowed to access the API.",
    });
  }

  res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Fourfold Digital server running on port ${PORT}`);
      console.log("Application API: /api/applications");
      console.log("CV upload API: /api/uploads");
      console.log("Project inquiry API: /api/project-inquiries");
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
