import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first
import cors from 'cors';

import express from "express";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
