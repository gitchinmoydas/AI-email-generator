import express from "express";
import { createEmail } from "../controllers/emailController.js";

const router = express.Router();
router.post("/generate-email", createEmail);

export default router;
