export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "free" | "pro" | "enterprise";
  joinedAt: string;
  successScore: number;
  streakDays: number;
}

export interface Dream {
  id: string;
  title: string;
  category: string;
  priority: "high" | "medium" | "low";
  progress: number;
  targetDate: string;
  status: "active" | "completed" | "paused" | "archived";
  description?: string;
  visionBoardId?: string;
}

export interface Goal {
  id: string;
  title: string;
  category: string;
  milestone: string;
  progress: number;
  deadline: string;
  status: "on-track" | "at-risk" | "completed" | "overdue";
  dreamId?: string;
  priority: "high" | "medium" | "low";
}

export interface Habit {
  id: string;
  title: string;
  frequency: "daily" | "weekly" | "monthly";
  streak: number;
  completionRate: number;
  status: "active" | "paused";
  category: string;
  icon: string;
}

export interface Routine {
  id: string;
  type: "morning" | "work" | "fitness" | "night" | "weekly";
  title: string;
  tasks: RoutineTask[];
  completionRate: number;
}

export interface RoutineTask {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  time?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  instructor: string;
  duration: string;
  status: "in-progress" | "completed" | "not-started";
  thumbnail: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  type: "savings" | "investment" | "debt" | "budget";
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  status: "on-track" | "at-risk" | "completed";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: string;
  points: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "goal" | "habit" | "ai" | "community" | "achievement";
  read: boolean;
  createdAt: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: number;
  children?: SidebarItem[];
}
