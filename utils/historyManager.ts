import { InterviewSessionRecord } from '../types';

const HISTORY_KEY = 'aiInterviewCoachHistory';

export const getHistory = (): InterviewSessionRecord[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    if (!historyJson) {
      return [];
    }
    const history = JSON.parse(historyJson) as InterviewSessionRecord[];
    // Sort by date, newest first
    return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Failed to parse interview history:", error);
    return [];
  }
};

export const saveSessionToHistory = (session: InterviewSessionRecord): void => {
  try {
    const history = getHistory();
    const updatedHistory = [session, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error("Failed to save interview session:", error);
  }
};
