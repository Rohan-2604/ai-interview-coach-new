export enum AppState {
  SELECTING_BRANCH,
  SELECTING_DIFFICULTY,
  GENERATING_QUESTIONS,
  INTERVIEWING,
  ANALYZING_ANSWER,
  SHOWING_FEEDBACK,
  SESSION_COMPLETE,
  VIEWING_HISTORY,
  ANALYZING_RESUME,
  ERROR,
}

export interface FeedbackPoint {
  point: string;
  example: string;
  concept: string;
}

export interface Feedback {
  strengths: FeedbackPoint[];
  improvements: FeedbackPoint[];
  tip?: string;
}

export interface InterviewRound {
  question: string;
  answer: string;
  feedback: Feedback;
}

export interface InterviewSessionRecord {
  id: string;
  branch: string;
  difficulty: string;
  date: string;
  rounds: InterviewRound[];
}

export interface ProgressSummary {
  commonStrengths: string[];
  commonWeaknesses: string[];
  suggestions: string[];
}

export interface ResumeFeedback {
    strengths: string[];
    improvements: string[];
    formattingTips: string[];
}