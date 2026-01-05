import { generateEmailTemplate } from "../services/aiService.js";

export const createEmail = async (req, res) => {
  const { purpose, recipient_name, tone } = req.body;

  if (!purpose || !recipient_name || !tone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const startTime = Date.now();
    const email = await generateEmailTemplate(purpose, recipient_name, tone);
    const endTime = Date.now();

    res.json({
      email,
      responseTimeMs: endTime - startTime
    });
  } catch (error) {
  console.error("🔥 Gemini Error:", error.message || error);
  res.status(500).json({
    error: "Failed to generate email",
    details: error.message || "Unknown error"
  });
}
};
