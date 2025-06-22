export interface User {
  id: string;
  email: string;
  name: string;
  role: 'teacher' | 'student';
  avatar?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdBy: string;
  createdAt: Date;
  timeLimit?: number;
  isEnabled?: boolean;
}

export interface TestResult {
  id: string;
  testId: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  answers: number[];
  completedAt: Date;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  members: string[];
  createdAt: Date;
  isEnabled?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'teacher' | 'student') => Promise<void>;
  register: (email: string, password: string, name: string, role: 'teacher' | 'student') => Promise<void>;
  logout: () => void;
  loading: boolean;
}
