# 🤖 AI Interview Coach  
*A Generative AI-based Framework for Personalized Technical Interview Preparation*  

## 📘 Overview
AI Interview Coach is a **Generative AI-powered web application** that provides **personalized technical interview preparation**.  
It simulates realistic interview sessions using **Google Gemini 2.5 Pro**, generates domain-specific questions, evaluates spoken or typed answers, and analyzes uploaded resumes with expert-level feedback.  

This project was developed as part of an **Artificial Intelligence coursework project** to demonstrate the practical integration of **LLMs (Large Language Models)** with interactive web applications.

---

## 🚀 Features
✅ **AI-Generated Interview Questions** — Domain-specific, difficulty-adjustable questions.  
✅ **Answer Evaluation** — Gemini acts as a technical coach, giving strengths, weaknesses, and suggestions.  
✅ **Resume Analysis** — Upload a resume PDF and get recruiter-style feedback.  
✅ **Speech-to-Text Support** — Speak your answers using the browser microphone.  
✅ **Fully Client-Side App** — No backend server required; uses Gemini API securely via browser.  
✅ **Dynamic Prompt Engineering** — Prompts adapt to branch, level, and user performance.  
✅ **Structured JSON Outputs** — Ensures clean, parseable responses for display.  

---


### 🧱 Components
| Component | Description |
|------------|--------------|
| **React Frontend** | Handles user interface, input, and output rendering. |
| **Prompt Engine** | Constructs structured prompts dynamically based on user selection. |
| **Gemini Service** | Communicates with Google Gemini API using `@google/genai`. |
| **Feedback Engine** | Parses AI responses (strengths, weaknesses, suggestions). |
| **Resume Parser** | Uses `pdf.js` to extract text from uploaded resumes. |
| **Speech Module** | Uses Web Speech API for real-time speech-to-text. |

---

## 🧠 How It Works

1. **User Input:**  
   The user selects their engineering branch, difficulty, and interview length.  

2. **Prompt Engineering:**  
   Inputs are formatted into structured prompts, e.g.  
   ```text
   Act as an expert interviewer in Software Engineering.
   Generate 5 hard-level questions for a final-year student.
   Return the result in JSON format.
Gemini API Call:
The prompt is sent to Gemini using the official SDK:

import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
const result = await model.generateContent(prompt);


Response Parsing:
The structured JSON response is parsed and displayed in the React interface.

Answer Evaluation & Resume Analysis:
Similar prompt logic evaluates answers and resumes, returning expert-level feedback.

Speech Input:
Implemented using the Web Speech API:

const recognition = new window.SpeechRecognition();
recognition.onresult = (e) => setAnswer(e.results[0][0].transcript);
recognition.start();

