import { GoogleGenAI, Type } from "@google/genai";
import { Feedback, InterviewSessionRecord, ProgressSummary, ResumeFeedback } from '../types';

const getApiKey = (): string => {
    const apiKey = sessionStorage.getItem('gemini-api-key');
    if (!apiKey) {
        throw new Error("API key not found in session storage. Please set it on the main page.");
    }
    return apiKey;
}

const getAiClient = (): GoogleGenAI => {
    const apiKey = getApiKey();
    return new GoogleGenAI({ apiKey });
}

export const generateQuestions = async (branch: string, difficulty: string, numQuestions: number): Promise<string[]> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `Generate ${numQuestions} ${difficulty}-level technical interview questions for a final year ${branch} student. The questions should cover a range of core concepts and common sub-topics. Crucially, ensure high variety in the questions. Vary the question types (e.g., conceptual, problem-solving, design, situational). Avoid common, easily searchable questions. Focus on testing deep understanding and practical application. Do not repeat questions if asked for the same topic again.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: "An interview question"
              }
            }
          }
        },
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);
    return parsed.questions || [];

  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to communicate with the AI model. Your API key might be invalid or there could be a network issue.");
  }
};

export const getFeedback = async (branch: string, question: string, answer: string): Promise<Feedback> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `As an expert interview coach for ${branch}, analyze the following answer.
      Question: "${question}"
      Answer: "${answer}"
      
      For each strength and improvement, provide a main point, a specific example or quote from the user's answer that illustrates it, and a relevant technical concept or keyword. Also provide a single, actionable expert tip related to the question's topic.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strengths: {
              type: Type.ARRAY,
              description: "What the candidate did well.",
              items: { 
                type: Type.OBJECT,
                properties: {
                  point: { type: Type.STRING, description: "The core strength." },
                  example: { type: Type.STRING, description: "A specific quote or example from the answer." },
                  concept: { type: Type.STRING, description: "A related technical concept or keyword." },
                },
                required: ["point", "example", "concept"],
              }
            },
            improvements: {
              type: Type.ARRAY,
              description: "Areas for improvement.",
              items: { 
                type: Type.OBJECT,
                properties: {
                  point: { type: Type.STRING, description: "The core area for improvement." },
                  example: { type: Type.STRING, description: "A specific quote or example from the answer where the improvement is needed." },
                  concept: { type: Type.STRING, description: "A related technical concept or keyword." },
                },
                required: ["point", "example", "concept"],
              }
            },
            tip: {
              type: Type.STRING,
              description: "A single, actionable expert tip related to the question's topic."
            }
          },
          required: ["strengths", "improvements", "tip"]
        }
      }
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);
    return {
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
      tip: parsed.tip || '',
    };
  } catch (error) {
    console.error("Error getting feedback:", error);
    throw new Error("Failed to communicate with the AI model for feedback. Your API key might be invalid or there could be a network issue.");
  }
};

export const generateProgressSummary = async (history: InterviewSessionRecord[]): Promise<ProgressSummary> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `As an expert career coach, analyze the following interview session history. Identify recurring strengths and weaknesses across all sessions. Provide a concise summary and actionable suggestions for improvement.
            History:
            ${JSON.stringify(history, null, 2)}
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        commonStrengths: {
                            type: Type.ARRAY,
                            description: "Recurring strengths observed across multiple sessions.",
                            items: { type: Type.STRING }
                        },
                        commonWeaknesses: {
                            type: Type.ARRAY,
                            description: "Recurring areas for improvement observed across multiple sessions.",
                            items: { type: Type.STRING }
                        },
                        suggestions: {
                            type: Type.ARRAY,
                            description: "Actionable suggestions for the user to improve their interview skills.",
                            items: { type: Type.STRING }
                        }
                    },
                    required: ["commonStrengths", "commonWeaknesses", "suggestions"]
                }
            }
        });

        const jsonString = response.text.trim();
        const parsed = JSON.parse(jsonString);
        return {
            commonStrengths: parsed.commonStrengths || [],
            commonWeaknesses: parsed.commonWeaknesses || [],
            suggestions: parsed.suggestions || [],
        };
    } catch (error) {
        console.error("Error generating progress summary:", error);
        throw new Error("Failed to communicate with the AI model for a progress summary. Your API key might be invalid or there could be a network issue.");
    }
};

export const analyzeResume = async (resumeText: string, branch: string): Promise<ResumeFeedback> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `As a senior technical recruiter and hiring manager for ${branch}, analyze the following resume text. Provide a detailed, constructive review. Focus on technical skills, project descriptions, and overall presentation. Give feedback on strengths, areas for improvement, and specific formatting tips.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        strengths: {
                            type: Type.ARRAY,
                            description: "Positive aspects of the resume, such as strong project descriptions or well-articulated skills.",
                            items: { type: Type.STRING }
                        },
                        improvements: {
                            type: Type.ARRAY,
                            description: "Specific areas where the resume could be improved, like quantifying achievements or clarifying technical contributions.",
                            items: { type: Type.STRING }
                        },
                        formattingTips: {
                            type: Type.ARRAY,
                            description: "Actionable tips on formatting, layout, and readability to enhance the resume's visual appeal and effectiveness.",
                            items: { type: Type.STRING }
                        }
                    },
                    required: ["strengths", "improvements", "formattingTips"]
                }
            }
        });

        const jsonString = response.text.trim();
        const parsed = JSON.parse(jsonString);
        return {
            strengths: parsed.strengths || [],
            improvements: parsed.improvements || [],
            formattingTips: parsed.formattingTips || [],
        };
    } catch (error) {
        console.error("Error analyzing resume:", error);
        throw new Error("Failed to communicate with the AI model for resume analysis. Your API key might be invalid or there could be a network issue.");
    }
};
