import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "YOUR_API_KEY", // Replace with your actual API key
});

let chat;
let model;

const messagesDiv = document.getElementById("messages");
const inputBox = document.getElementById("inputBox");

async function initializeChat() {
  model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

  chat = await model.startChat({
    generationConfig: {},
    systemInstruction:
      "You are a DSA Instructor. Only respond to questions related to Data Structure and Algorithms. If asked something else, politely ask them to stick to DSA topics.",
  });
}

await initializeChat();

export async function sendMessage() {
  const userInput = inputBox.value.trim();
  if (!userInput) return;

  // Show user message
  const userMsg = document.createElement("div");
  userMsg.textContent = "👤: " + userInput;
  messagesDiv.appendChild(userMsg);

  inputBox.value = "";

  const result = await chat.sendMessage(userInput);
  const response = await result.response;
  const text = response.text();

  // Show AI response
  const aiMsg = document.createElement("div");
  aiMsg.textContent = "🤖: " + text;
  messagesDiv.appendChild(aiMsg);

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
