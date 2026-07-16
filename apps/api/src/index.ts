import "dotenv/config";
import express from "express";
import cors from "cors";
import { pool } from "@habit-tracker/database";
import { authRouter } from "./routes/authRouter";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    return res.status(200).json({ status: "ok", db: "ok" });
  } catch (error) {
    return res.status(500).json({ status: "error", db: "unreachable" });
  }
});

app.use("/api/auth", authRouter);

async function main() {
  try {
    await pool.query("SELECT 1");
    console.log("Database connection established");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
}

main();

export default app;
