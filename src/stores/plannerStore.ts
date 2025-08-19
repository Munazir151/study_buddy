import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StudyTask {
  id: string;
  title: string;
  description: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDuration: number; // in minutes
  actualDuration?: number;
  dueDate: Date;
  scheduledDate?: Date;
  scheduledTime?: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  tags: string[];
  type: 'study' | 'assignment' | 'exam' | 'review' | 'project';
}

export interface StudySession {
  id: string;
  taskId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  notes: string;
  productivity: number; // 1-5 scale
}

export interface StudyGoal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentHours: number;
  deadline: Date;
  subjects: string[];
  completed: boolean;
  unit: 'hours' | 'tasks' | 'chapters' | 'exams';
  category: 'study' | 'exam' | 'skill' | 'project';
}

interface PlannerState {
  tasks: StudyTask[];
  sessions: StudySession[];
  goals: StudyGoal[];
  subjects: string[];
  selectedDate: Date;
  currentSession: StudySession | null;
  
  // Task operations
  createTask: (task: Omit<StudyTask, 'id' | 'completed' | 'completedAt' | 'createdAt'>) => string;
  updateTask: (id: string, updates: Partial<StudyTask>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  
  // Session operations
  startSession: (taskId: string) => void;
  endSession: (notes?: string, productivity?: number) => void;
  
  // Goal operations
  createGoal: (goal: Omit<StudyGoal, 'id' | 'completed' | 'currentHours'>) => void;
  getGoalProgress: (goalId: string) => { currentValue: number; targetValue: number };
  updateGoal: (id: string, updates: Partial<StudyGoal>) => void;
  deleteGoal: (id: string) => void;
  
  // Subject operations
  addSubject: (subject: string) => void;
  removeSubject: (subject: string) => void;
  
  // Scheduling
  scheduleTask: (taskId: string, date: Date, time: string) => void;
  generateSchedule: (date: Date) => StudyTask[];
  
  // Analytics
  getTasksForDate: (date: Date) => StudyTask[];
  getCompletedTasksForWeek: (startDate: Date) => StudyTask[];
  getStudyHoursForWeek: (startDate: Date) => number;
  getProductivityStats: () => {
    averageProductivity: number;
    totalHours: number;
    completionRate: number;
  };
  getWeeklyActivity: () => { day: string; hours: number; tasks: number }[];
  getSubjectStats: () => { subject: string; hours: number; tasks: number }[];
  
  // Utilities
  setSelectedDate: (date: Date) => void;
}

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set, get) => ({
      tasks: [],
      sessions: [],
      goals: [],
      subjects: ['Mathematics', 'Science', 'History', 'Literature', 'Languages'],
      selectedDate: new Date(),
      currentSession: null,

      // Task operations
      createTask: (taskData) => {
        const id = generateId();
        const newTask: StudyTask = {
          ...taskData,
          id,
          completed: false,
          createdAt: new Date()
        };
        
        set(state => ({
          tasks: [...state.tasks, newTask]
        }));
        
        return id;
      },

      updateTask: (id: string, updates) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
          )
        }));
      },

      deleteTask: (id: string) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id),
          sessions: state.sessions.filter(session => session.taskId !== id)
        }));
      },

      completeTask: (id: string) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id 
              ? { ...task, completed: true, completedAt: new Date() }
              : task
          )
        }));
      },

      toggleTask: (id: string) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id 
              ? { 
                  ...task, 
                  completed: !task.completed,
                  completedAt: !task.completed ? new Date() : undefined
                }
              : task
          )
        }));
      },

      // Session operations
      startSession: (taskId: string) => {
        const sessionId = generateId();
        const session: StudySession = {
          id: sessionId,
          taskId,
          startTime: new Date(),
          duration: 0,
          notes: '',
          productivity: 3
        };
        
        set({ currentSession: session });
      },

      endSession: (notes = '', productivity = 3) => {
        const state = get();
        if (!state.currentSession) return;

        const endTime = new Date();
        const duration = Math.round((endTime.getTime() - state.currentSession.startTime.getTime()) / (1000 * 60));
        
        const completedSession = {
          ...state.currentSession,
          endTime,
          duration,
          notes,
          productivity
        };

        // Update task actual duration
        const task = state.tasks.find(t => t.id === state.currentSession!.taskId);
        if (task) {
          const newActualDuration = (task.actualDuration || 0) + duration;
          get().updateTask(task.id, { actualDuration: newActualDuration });
        }

        set(state => ({
          sessions: [...state.sessions, completedSession],
          currentSession: null
        }));
      },

      // Goal operations
      createGoal: (goalData) => {
        const id = generateId();
        const newGoal: StudyGoal = {
          ...goalData,
          id,
          currentHours: 0,
          completed: false
        };
        
        set(state => ({
          goals: [...state.goals, newGoal]
        }));
        
        return id;
      },

      getGoalProgress: (goalId: string) => {
        const state = get();
        const goal = state.goals.find(g => g.id === goalId);
        if (!goal) return { currentValue: 0, targetValue: 0 };
        
        return {
          currentValue: goal.currentHours,
          targetValue: goal.targetValue
        };
      },

      updateGoal: (id: string, updates) => {
        set(state => ({
          goals: state.goals.map(goal =>
            goal.id === id ? { ...goal, ...updates } : goal
          )
        }));
      },

      deleteGoal: (id: string) => {
        set(state => ({
          goals: state.goals.filter(goal => goal.id !== id)
        }));
      },

      // Subject operations
      addSubject: (subject: string) => {
        set(state => ({
          subjects: [...new Set([...state.subjects, subject])]
        }));
      },

      removeSubject: (subject: string) => {
        set(state => ({
          subjects: state.subjects.filter(s => s !== subject)
        }));
      },

      // Scheduling
      scheduleTask: (taskId: string, date: Date, time: string) => {
        get().updateTask(taskId, {
          scheduledDate: date,
          scheduledTime: time
        });
      },

      generateSchedule: (date: Date) => {
        const state = get();
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        // Get tasks due on or before this date that aren't completed
        const availableTasks = state.tasks.filter(task => 
          !task.completed && 
          new Date(task.dueDate) >= dayStart &&
          !task.scheduledDate
        );

        // Sort by priority and due date
        const sortedTasks = availableTasks.sort((a, b) => {
          const priorityWeight = { high: 3, medium: 2, low: 1 };
          const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
          if (priorityDiff !== 0) return priorityDiff;
          
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });

        return sortedTasks.slice(0, 8); // Limit to 8 tasks per day
      },

      // Analytics
      getTasksForDate: (date: Date) => {
        const state = get();
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        return state.tasks.filter(task => {
          const scheduledDate = task.scheduledDate ? new Date(task.scheduledDate) : null;
          const dueDate = new Date(task.dueDate);
          
          return (scheduledDate && scheduledDate >= dayStart && scheduledDate <= dayEnd) ||
                 (dueDate >= dayStart && dueDate <= dayEnd);
        });
      },

      getCompletedTasksForWeek: (startDate: Date) => {
        const state = get();
        const weekStart = new Date(startDate);
        const weekEnd = new Date(startDate);
        weekEnd.setDate(weekEnd.getDate() + 7);

        return state.tasks.filter(task => 
          task.completed && 
          task.completedAt &&
          new Date(task.completedAt) >= weekStart && 
          new Date(task.completedAt) < weekEnd
        );
      },

      getStudyHoursForWeek: (startDate: Date) => {
        const state = get();
        const weekStart = new Date(startDate);
        const weekEnd = new Date(startDate);
        weekEnd.setDate(weekEnd.getDate() + 7);

        const weekSessions = state.sessions.filter(session =>
          session.startTime >= weekStart && session.startTime < weekEnd
        );

        return weekSessions.reduce((total, session) => total + session.duration, 0) / 60; // Convert to hours
      },

      getProductivityStats: () => {
        const state = get();
        const completedTasks = state.tasks.filter(task => task.completed);
        const totalTasks = state.tasks.length;
        
        const totalMinutes = state.sessions.reduce((sum, session) => sum + session.duration, 0);
        const totalHours = totalMinutes / 60;
        
        const averageProductivity = state.sessions.length > 0
          ? state.sessions.reduce((sum, session) => sum + session.productivity, 0) / state.sessions.length
          : 0;
        
        const completionRate = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;

        return {
          averageProductivity,
          totalHours,
          completionRate
        };
      },

      getWeeklyActivity: () => {
        const state = get();
        const today = new Date();
        const weekDays = [];
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          
          const dayTasks = state.tasks.filter(task => {
            const taskDate = task.completedAt || task.scheduledDate;
            return taskDate && new Date(taskDate).toDateString() === date.toDateString();
          });
          
          const dayHours = state.sessions
            .filter(session => new Date(session.startTime).toDateString() === date.toDateString())
            .reduce((sum, session) => sum + session.duration, 0) / 60;
          
          weekDays.push({
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            hours: dayHours,
            tasks: dayTasks.length
          });
        }
        
        return weekDays;
      },

      getSubjectStats: () => {
        const state = get();
        const subjectMap = new Map<string, { hours: number; tasks: number }>();
        
        state.tasks.forEach(task => {
          const existing = subjectMap.get(task.subject) || { hours: 0, tasks: 0 };
          const taskHours = (task.actualDuration || 0) / 60;
          subjectMap.set(task.subject, {
            hours: existing.hours + taskHours,
            tasks: existing.tasks + 1
          });
        });
        
        return Array.from(subjectMap.entries())
          .map(([subject, stats]) => ({ subject, ...stats }))
          .sort((a, b) => b.hours - a.hours);
      },

      // Utilities
      setSelectedDate: (date: Date) => {
        set({ selectedDate: date });
      }
    }),
    {
      name: 'planner-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        sessions: state.sessions,
        goals: state.goals,
        subjects: state.subjects
      })
    }
  )
);
