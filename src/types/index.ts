export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  subject: string;
  duration: number; // in minutes
  type: 'reading' | 'practice' | 'quiz' | 'flashcards';
  createdAt: Date;
}

export interface Flashcard {
  id: string;
  userId: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  tags: string[];
  lastReviewed?: Date;
  nextReview?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quiz {
  id: string;
  userId: string;
  title: string;
  questions: Question[];
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number; // in minutes
  answers: UserAnswer[];
  completedAt: Date;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export interface StudyPlan {
  id: string;
  userId: string;
  title: string;
  description?: string;
  subject: string;
  startDate: Date;
  endDate: Date;
  tasks: StudyTask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyTask {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  estimatedTime: number; // in minutes
  type: 'reading' | 'practice' | 'quiz' | 'review';
}

export interface UploadedFile {
  id: string;
  userId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  downloadURL: string;
  subject?: string;
  tags: string[];
  extractedText?: string;
  uploadedAt: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
  attachments?: string[]; // file IDs
}

export interface StudyStats {
  totalStudyTime: number; // in minutes
  streakDays: number;
  lastStudyDate?: Date;
  subjectStats: Record<string, number>; // subject -> minutes studied
  weeklyGoal: number; // in minutes
  completedQuizzes: number;
  averageQuizScore: number;
}
