const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const serverless = require("serverless-http");
dotenv.config({ path: "./config.env" });

// AWS SDK configuration
const AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/employees", require("./routes/employee"));  // Make sure to load employee routes

// Export the app as a Lambda handler
module.exports.handler = serverless(app);
