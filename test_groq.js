import fs from "fs";

const envContent = fs.readFileSync("C:/Users/Lenovo/OneDrive/Desktop/Coding/bharat-connect-verse-main/bharat-connect-verse-main/.env", "utf8");
const envVars = {};
for (const line of envContent.split("\n")) {
  const [key, ...values] = line.split("=");
  if (key && values.length > 0) {
    envVars[key.trim()] = values.join("=").trim().replace(/"/g, '');
  }
}

const apiKey = envVars["VITE_GROQ_API_KEY"];

async function run() {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "Hello" }],
      temperature: 0.7,
    })
  });
  
  if (!response.ok) {
      console.log(response.status);
      console.log(await response.text());
  } else {
      console.log(await response.json());
  }
}

run();
