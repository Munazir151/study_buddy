import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  deckId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed: Date | null;
  nextReview: Date;
  reviewCount: number;
  correctCount: number;
  createdAt: Date;
  tags: string[];
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
  lastStudied: Date | null;
  totalCards: number;
  masteredCards: number;
  category: string;
}

export interface StudySession {
  id: string;
  deckId: string;
  startTime: Date;
  endTime: Date | null;
  cardsStudied: number;
  correctAnswers: number;
  averageTime: number;
}

interface FlashcardsState {
  decks: Deck[];
  flashcards: Flashcard[];
  studySessions: StudySession[];
  currentSession: StudySession | null;
  selectedDeckId: string | null;
  
  // Deck operations
  createDeck: (name: string, description: string, category: string, color?: string) => string;
  updateDeck: (id: string, updates: Partial<Omit<Deck, 'id' | 'createdAt'>>) => void;
  deleteDeck: (id: string) => void;
  selectDeck: (id: string | null) => void;
  
  // Flashcard operations
  createFlashcard: (deckId: string, front: string, back: string, tags?: string[]) => string;
  updateFlashcard: (id: string, updates: Partial<Omit<Flashcard, 'id' | 'createdAt'>>) => void;
  deleteFlashcard: (id: string) => void;
  
  // Study operations
  startStudySession: (deckId: string) => void;
  endStudySession: () => void;
  reviewCard: (cardId: string, correct: boolean, timeSpent: number) => void;
  
  // Adaptive learning
  getCardsForReview: (deckId: string, limit?: number) => Flashcard[];
  calculateNextReview: (card: Flashcard, correct: boolean) => Date;
  
  // Auto-generation
  generateFlashcardsFromText: (deckId: string, text: string) => Flashcard[];
  
  // Analytics
  getDeckStats: (deckId: string) => {
    totalCards: number;
    masteredCards: number;
    dueCards: number;
    averageAccuracy: number;
    studyStreak: number;
  };
}

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Spaced repetition algorithm (simplified SM-2)
const calculateInterval = (card: Flashcard, correct: boolean): number => {
  if (card.reviewCount === 0) {
    return correct ? 1 : 0;
  }
  
  if (card.reviewCount === 1) {
    return correct ? 6 : 0;
  }
  
  const accuracy = card.correctCount / card.reviewCount;
  let interval = 6;
  
  if (correct) {
    interval = Math.round(interval * (2.5 - (1 - accuracy)));
  } else {
    interval = 1;
  }
  
  return Math.max(1, interval);
};

export const useFlashcardsStore = create<FlashcardsState>()(
  persist(
    (set, get) => ({
      decks: [
        {
          id: 'sample-deck',
          name: 'Sample Deck',
          description: 'A sample deck to get you started',
          color: '#3B82F6',
          createdAt: new Date(),
          lastStudied: null,
          totalCards: 0,
          masteredCards: 0,
          category: 'General'
        }
      ],
      flashcards: [],
      studySessions: [],
      currentSession: null,
      selectedDeckId: null,

      // Deck operations
      createDeck: (name: string, description: string, category: string, color = '#6B7280') => {
        const id = generateId();
        const newDeck: Deck = {
          id,
          name,
          description,
          category,
          color,
          createdAt: new Date(),
          lastStudied: null,
          totalCards: 0,
          masteredCards: 0
        };
        
        set(state => ({
          decks: [...state.decks, newDeck],
          selectedDeckId: id
        }));
        
        return id;
      },

      updateDeck: (id: string, updates) => {
        set(state => ({
          decks: state.decks.map(deck =>
            deck.id === id ? { ...deck, ...updates } : deck
          )
        }));
      },

      deleteDeck: (id: string) => {
        set(state => ({
          decks: state.decks.filter(deck => deck.id !== id),
          flashcards: state.flashcards.filter(card => card.deckId !== id),
          selectedDeckId: state.selectedDeckId === id ? null : state.selectedDeckId
        }));
      },

      selectDeck: (id: string | null) => {
        set({ selectedDeckId: id });
      },

      // Flashcard operations
      createFlashcard: (deckId: string, front: string, back: string, tags = []) => {
        const id = generateId();
        const newCard: Flashcard = {
          id,
          front,
          back,
          deckId,
          difficulty: 'medium',
          lastReviewed: null,
          nextReview: new Date(),
          reviewCount: 0,
          correctCount: 0,
          createdAt: new Date(),
          tags
        };
        
        set(state => ({
          flashcards: [...state.flashcards, newCard],
          decks: state.decks.map(deck =>
            deck.id === deckId
              ? { ...deck, totalCards: deck.totalCards + 1 }
              : deck
          )
        }));
        
        return id;
      },

      updateFlashcard: (id: string, updates) => {
        set(state => ({
          flashcards: state.flashcards.map(card =>
            card.id === id ? { ...card, ...updates } : card
          )
        }));
      },

      deleteFlashcard: (id: string) => {
        const card = get().flashcards.find(c => c.id === id);
        if (!card) return;

        set(state => ({
          flashcards: state.flashcards.filter(c => c.id !== id),
          decks: state.decks.map(deck =>
            deck.id === card.deckId
              ? { ...deck, totalCards: Math.max(0, deck.totalCards - 1) }
              : deck
          )
        }));
      },

      // Study operations
      startStudySession: (deckId: string) => {
        const sessionId = generateId();
        const session: StudySession = {
          id: sessionId,
          deckId,
          startTime: new Date(),
          endTime: null,
          cardsStudied: 0,
          correctAnswers: 0,
          averageTime: 0
        };
        
        set({ currentSession: session });
      },

      endStudySession: () => {
        const state = get();
        if (!state.currentSession) return;

        const endedSession = {
          ...state.currentSession,
          endTime: new Date()
        };

        set(state => ({
          studySessions: [...state.studySessions, endedSession],
          currentSession: null,
          decks: state.decks.map(deck =>
            deck.id === endedSession.deckId
              ? { ...deck, lastStudied: new Date() }
              : deck
          )
        }));
      },

      reviewCard: (cardId: string, correct: boolean, timeSpent: number) => {
        const state = get();
        const card = state.flashcards.find(c => c.id === cardId);
        if (!card) return;

        const interval = calculateInterval(card, correct);
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + interval);

        const updatedCard = {
          ...card,
          lastReviewed: new Date(),
          nextReview,
          reviewCount: card.reviewCount + 1,
          correctCount: card.correctCount + (correct ? 1 : 0)
        };

        // Update current session
        const updatedSession = state.currentSession ? {
          ...state.currentSession,
          cardsStudied: state.currentSession.cardsStudied + 1,
          correctAnswers: state.currentSession.correctAnswers + (correct ? 1 : 0),
          averageTime: (state.currentSession.averageTime * state.currentSession.cardsStudied + timeSpent) / (state.currentSession.cardsStudied + 1)
        } : null;

        set(state => ({
          flashcards: state.flashcards.map(c => c.id === cardId ? updatedCard : c),
          currentSession: updatedSession
        }));
      },

      // Adaptive learning
      getCardsForReview: (deckId: string, limit = 20) => {
        const state = get();
        const now = new Date();
        
        return state.flashcards
          .filter(card => card.deckId === deckId && card.nextReview <= now)
          .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())
          .slice(0, limit);
      },

      calculateNextReview: (card: Flashcard, correct: boolean) => {
        const interval = calculateInterval(card, correct);
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + interval);
        return nextReview;
      },

      // Auto-generation (simplified)
      generateFlashcardsFromText: (deckId: string, text: string) => {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
        const cards: Flashcard[] = [];
        
        sentences.slice(0, 10).forEach((sentence, index) => {
          const words = sentence.trim().split(' ');
          if (words.length > 5) {
            const keyWord = words[Math.floor(words.length / 2)];
            const front = `What is the key concept in: "${sentence.trim()}"?`;
            const back = `The key concept is: ${keyWord}`;
            
            const id = generateId() + index;
            cards.push({
              id,
              front,
              back,
              deckId,
              difficulty: 'medium',
              lastReviewed: null,
              nextReview: new Date(),
              reviewCount: 0,
              correctCount: 0,
              createdAt: new Date(),
              tags: ['auto-generated']
            });
          }
        });
        
        set(state => ({
          flashcards: [...state.flashcards, ...cards],
          decks: state.decks.map(deck =>
            deck.id === deckId
              ? { ...deck, totalCards: deck.totalCards + cards.length }
              : deck
          )
        }));
        
        return cards;
      },

      // Analytics
      getDeckStats: (deckId: string) => {
        const state = get();
        const deckCards = state.flashcards.filter(card => card.deckId === deckId);
        const now = new Date();
        
        const totalCards = deckCards.length;
        const masteredCards = deckCards.filter(card => 
          card.reviewCount >= 3 && (card.correctCount / card.reviewCount) >= 0.8
        ).length;
        const dueCards = deckCards.filter(card => card.nextReview <= now).length;
        
        const totalReviews = deckCards.reduce((sum, card) => sum + card.reviewCount, 0);
        const totalCorrect = deckCards.reduce((sum, card) => sum + card.correctCount, 0);
        const averageAccuracy = totalReviews > 0 ? (totalCorrect / totalReviews) * 100 : 0;
        
        const recentSessions = state.studySessions
          .filter(session => session.deckId === deckId)
          .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
          .slice(0, 7);
        
        const studyStreak = recentSessions.length;
        
        return {
          totalCards,
          masteredCards,
          dueCards,
          averageAccuracy,
          studyStreak
        };
      }
    }),
    {
      name: 'flashcards-storage',
      partialize: (state) => ({
        decks: state.decks,
        flashcards: state.flashcards,
        studySessions: state.studySessions
      })
    }
  )
);
