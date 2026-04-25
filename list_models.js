import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const envContent = fs.readFileSync("C:/Users/Lenovo/OneDrive/Desktop/Coding/bharat-connect-verse-main/bharat-connect-verse-main/.env", "utf8");
const envVars = {};
for (const line of envContent.split("\n")) {
  const [key, ...values] = line.split("=");
  if (key && values.length > 0) {
    envVars[key.trim()] = values.join("=").trim().replace(/"/g, '');
  }
}

const apiKey = envVars["VITE_GEMINI_API_KEY"];

async function run() {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
  const data = await response.json();
  console.log("Available models:");
  data.models.forEach(m => {
    if (m.supportedGenerationMethods.includes("generateContent")) {
      console.log(m.name);
    }
  });
}

run();
