export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  createdAt: Date;
  lastReviewed?: Date;
  nextReview?: Date;
  interval: number; // in days
  easeFactor: number; // difficulty multiplier
  repetitions: number;
  isLearned: boolean;
}

export interface StudySession {
  id: string;
  flashcardId: string;
  userId: string;
  quality: number; // 0-5 scale for spaced repetition
  timeSpent: number; // in seconds
  timestamp: Date;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  subject: string;
  flashcards: Flashcard[];
  totalCards: number;
  newCards: number;
  dueCards: number;
  createdAt: Date;
  lastStudied?: Date;
}

export interface SpacedRepetitionResult {
  nextReview: Date;
  newInterval: number;
  newEaseFactor: number;
  newRepetitions: number;
}

export interface StudyProgress {
  totalCards: number;
  learnedCards: number;
  learningCards: number;
  newCards: number;
  dailyStreak: number;
  totalStudyTime: number;
  averageScore: number;
}