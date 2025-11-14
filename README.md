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

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/yourusername/ai-interview-coach.git
cd ai-interview-coach

2. Install Dependencies
npm install

3. Create .env File

Create a .env file in the project root and add:

VITE_GEMINI_API_KEY=your_api_key_here


⚠️ Note: You can obtain your Gemini API key from
https://aistudio.google.com/app/apikey

4. Run the App Locally
npm run dev


Then open http://localhost:5173
 in your browser.

🧪 Usage Guide
🏁 Start an Interview

Select your branch (e.g., Software, Mechanical, Electrical).

Choose difficulty and number of questions.

Click “Start Interview” to generate questions.

🗣️ Answer via Speech or Text

Click the 🎙 microphone icon to speak your answer.

The app transcribes your speech using the Web Speech API.

Your response is analyzed by Gemini for feedback.

📄 Upload Resume

Upload a .pdf resume file.

The AI evaluates structure, skills, and suggests improvements.

📈 Evaluation Criteria

The system’s performance is evaluated qualitatively on:

Relevance: Are generated questions appropriate for the branch and level?

Coherence: Are responses grammatically and logically sound?

Actionability: Is the feedback clear and useful?

📷 Screenshots

(Add screenshots once you deploy the project)

Interview Screen	Resume Analysis	Feedback Example

	
	
📚 References

Google Gemini API Documentation

Tailwind CSS Documentation

React Official Docs

Web Speech API (MDN)

PDF.js Documentation

