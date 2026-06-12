import { Dream, Goal, Habit, Course, FinancialGoal, Achievement, Notification } from "@/types";

export const mockDreams: Dream[] = [
  { id: "d1", title: "Launch My Tech Startup", category: "Career & Business", priority: "high", progress: 68, targetDate: "2025-12-31", status: "active", description: "Build and launch a SaaS product serving 10k users" },
  { id: "d2", title: "Financial Freedom by 35", category: "Financial Freedom", priority: "high", progress: 42, targetDate: "2028-06-01", status: "active", description: "Achieve $2M net worth and passive income of $10k/month" },
  { id: "d3", title: "Run a Sub-4 Hour Marathon", category: "Health & Fitness", priority: "medium", progress: 75, targetDate: "2025-04-15", status: "active", description: "Complete the Boston Marathon in under 4 hours" },
  { id: "d4", title: "Write a Bestselling Book", category: "Creativity", priority: "medium", progress: 30, targetDate: "2025-09-01", status: "active", description: "Write, publish, and market my personal development book" },
  { id: "d5", title: "Travel to 30 Countries", category: "Travel & Adventure", priority: "low", progress: 57, targetDate: "2030-01-01", status: "active", description: "Experience diverse cultures across 6 continents" },
  { id: "d6", title: "Master Machine Learning", category: "Education", priority: "high", progress: 55, targetDate: "2025-06-30", status: "active", description: "Complete ML specialization and build 5 real projects" },
  { id: "d7", title: "Build Dream Home", category: "Lifestyle", priority: "medium", progress: 20, targetDate: "2027-12-31", status: "paused", description: "Design and build a sustainable smart home" },
  { id: "d8", title: "Start a Family Foundation", category: "Relationships", priority: "low", progress: 10, targetDate: "2026-01-01", status: "active", description: "Establish a charitable foundation supporting education" },
];

export const mockGoals: Goal[] = [
  { id: "g1", title: "Complete MVP Development", category: "Career", milestone: "Technical Build", progress: 80, deadline: "2025-03-31", status: "on-track", dreamId: "d1", priority: "high" },
  { id: "g2", title: "Raise $100k Seed Funding", category: "Financial", milestone: "Funding Round", progress: 35, deadline: "2025-06-30", status: "at-risk", dreamId: "d1", priority: "high" },
  { id: "g3", title: "Save $50,000 Emergency Fund", category: "Financial", milestone: "Q2 2025", progress: 72, deadline: "2025-06-01", status: "on-track", dreamId: "d2", priority: "high" },
  { id: "g4", title: "Run 50 Miles/Month", category: "Health", milestone: "Monthly Target", progress: 88, deadline: "2025-02-28", status: "on-track", dreamId: "d3", priority: "medium" },
  { id: "g5", title: "Write 1000 Words Daily", category: "Creativity", milestone: "Daily Habit", progress: 45, deadline: "2025-09-01", status: "at-risk", dreamId: "d4", priority: "medium" },
  { id: "g6", title: "Invest $2,000/Month in Index Funds", category: "Financial", milestone: "Monthly Investment", progress: 95, deadline: "2025-12-31", status: "on-track", dreamId: "d2", priority: "high" },
  { id: "g7", title: "Complete Deep Learning Course", category: "Learning", milestone: "Course Completion", progress: 60, deadline: "2025-04-30", status: "on-track", dreamId: "d6", priority: "high" },
  { id: "g8", title: "Network with 50 Investors", category: "Career", milestone: "Network Building", progress: 28, deadline: "2025-05-31", status: "at-risk", dreamId: "d1", priority: "medium" },
  { id: "g9", title: "Visit 3 New Countries This Year", category: "Personal", milestone: "Annual Travel", progress: 67, deadline: "2025-12-31", status: "on-track", dreamId: "d5", priority: "low" },
  { id: "g10", title: "Meditate 20 Minutes Daily", category: "Wellness", milestone: "Daily Practice", progress: 91, deadline: "2025-12-31", status: "on-track", priority: "medium" },
];

export const mockHabits: Habit[] = [
  { id: "h1", title: "Morning Meditation", frequency: "daily", streak: 42, completionRate: 94, status: "active", category: "Wellness", icon: "🧘" },
  { id: "h2", title: "Read 30 Minutes", frequency: "daily", streak: 28, completionRate: 88, status: "active", category: "Learning", icon: "📚" },
  { id: "h3", title: "Exercise / Run", frequency: "daily", streak: 19, completionRate: 78, status: "active", category: "Fitness", icon: "🏃" },
  { id: "h4", title: "Write in Journal", frequency: "daily", streak: 35, completionRate: 85, status: "active", category: "Personal", icon: "✍️" },
  { id: "h5", title: "Cold Shower", frequency: "daily", streak: 14, completionRate: 72, status: "active", category: "Wellness", icon: "🚿" },
  { id: "h6", title: "No Social Media Before 10am", frequency: "daily", streak: 7, completionRate: 65, status: "active", category: "Productivity", icon: "📵" },
  { id: "h7", title: "Review Weekly Goals", frequency: "weekly", streak: 12, completionRate: 92, status: "active", category: "Productivity", icon: "🎯" },
  { id: "h8", title: "Drink 8 Glasses Water", frequency: "daily", streak: 21, completionRate: 80, status: "active", category: "Health", icon: "💧" },
  { id: "h9", title: "Gratitude Practice", frequency: "daily", streak: 56, completionRate: 97, status: "active", category: "Mindset", icon: "🙏" },
  { id: "h10", title: "Network / Reach Out", frequency: "weekly", streak: 8, completionRate: 75, status: "active", category: "Career", icon: "🤝" },
];

export const mockCourses: Course[] = [
  { id: "c1", title: "Deep Learning Specialization", category: "Technology", progress: 60, totalLessons: 80, completedLessons: 48, instructor: "Dr. Andrew Liu", duration: "40 hrs", status: "in-progress", thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300&h=200&fit=crop" },
  { id: "c2", title: "Financial Independence Masterclass", category: "Finance", progress: 85, totalLessons: 40, completedLessons: 34, instructor: "Sarah Ramsey", duration: "20 hrs", status: "in-progress", thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop" },
  { id: "c3", title: "Leadership & Influence", category: "Leadership", progress: 100, totalLessons: 30, completedLessons: 30, instructor: "John Maxwell Jr.", duration: "15 hrs", status: "completed", thumbnail: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=300&h=200&fit=crop" },
  { id: "c4", title: "Mindset Reset: Eliminate Limiting Beliefs", category: "Mindset", progress: 25, totalLessons: 20, completedLessons: 5, instructor: "Dr. Carol Hayes", duration: "10 hrs", status: "in-progress", thumbnail: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=300&h=200&fit=crop" },
  { id: "c5", title: "Startup Fundraising Bootcamp", category: "Entrepreneurship", progress: 40, totalLessons: 50, completedLessons: 20, instructor: "Kevin Park", duration: "25 hrs", status: "in-progress", thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&h=200&fit=crop" },
  { id: "c6", title: "Advanced Productivity Systems", category: "Productivity", progress: 0, totalLessons: 25, completedLessons: 0, instructor: "Ali Abdaal", duration: "12 hrs", status: "not-started", thumbnail: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=300&h=200&fit=crop" },
];

export const mockFinancialGoals: FinancialGoal[] = [
  { id: "f1", title: "Emergency Fund (6 months)", type: "savings", targetAmount: 50000, currentAmount: 36000, deadline: "2025-06-01", status: "on-track" },
  { id: "f2", title: "Index Fund Portfolio", type: "investment", targetAmount: 100000, currentAmount: 67500, deadline: "2026-12-31", status: "on-track" },
  { id: "f3", title: "Pay Off Student Loans", type: "debt", targetAmount: 35000, currentAmount: 24500, deadline: "2025-12-31", status: "on-track" },
  { id: "f4", title: "Down Payment for Home", type: "savings", targetAmount: 150000, currentAmount: 42000, deadline: "2027-06-01", status: "at-risk" },
  { id: "f5", title: "Annual Vacation Budget", type: "budget", targetAmount: 10000, currentAmount: 7800, deadline: "2025-12-31", status: "on-track" },
  { id: "f6", title: "Startup Investment Round", type: "investment", targetAmount: 25000, currentAmount: 8000, deadline: "2025-09-30", status: "at-risk" },
];

export const mockAchievements: Achievement[] = [
  { id: "a1", title: "Dream Architect", description: "Created your first 5 dreams", icon: "🏆", earnedAt: "2024-02-01", category: "Dreams", points: 100 },
  { id: "a2", title: "Habit Hero", description: "Maintained a 30-day streak", icon: "🔥", earnedAt: "2024-02-15", category: "Habits", points: 200 },
  { id: "a3", title: "Goal Crusher", description: "Completed 10 goals", icon: "🎯", earnedAt: "2024-03-01", category: "Goals", points: 300 },
  { id: "a4", title: "Knowledge Seeker", description: "Completed first course", icon: "📚", earnedAt: "2024-01-20", category: "Learning", points: 150 },
  { id: "a5", title: "Wellness Warrior", description: "30 consecutive wellness check-ins", icon: "💪", earnedAt: "2024-03-10", category: "Wellness", points: 250 },
  { id: "a6", title: "Financial Pioneer", description: "Set up all financial goals", icon: "💰", earnedAt: "2024-02-28", category: "Finance", points: 180 },
  { id: "a7", title: "Community Builder", description: "Joined 3 accountability groups", icon: "🤝", earnedAt: "2024-03-05", category: "Community", points: 120 },
  { id: "a8", title: "Vision Visionary", description: "Created your first vision board", icon: "🌟", earnedAt: "2024-01-25", category: "Vision", points: 90 },
  { id: "a9", title: "50-Day Streak Legend", description: "Maintained habits for 50 days straight", icon: "⚡", earnedAt: "2024-03-15", category: "Habits", points: 500 },
];

export const mockNotifications: Notification[] = [
  { id: "n1", title: "Goal Milestone Reached!", message: "You've completed 80% of 'Complete MVP Development'. Keep going!", type: "goal", read: false, createdAt: "2025-01-15T08:30:00Z" },
  { id: "n2", title: "Daily Habit Reminder", message: "Don't forget your morning meditation. Your 42-day streak is at stake!", type: "habit", read: false, createdAt: "2025-01-15T07:00:00Z" },
  { id: "n3", title: "AI Coach Insight", message: "Based on your patterns, you're most productive between 8-11am. Schedule deep work now!", type: "ai", read: false, createdAt: "2025-01-15T09:00:00Z" },
  { id: "n4", title: "New Achievement Unlocked!", message: "🔥 Habit Hero - You've maintained a 42-day streak! Incredible dedication.", type: "achievement", read: false, createdAt: "2025-01-14T20:00:00Z" },
  { id: "n5", title: "Community Update", message: "Your accountability group 'Startup Founders' has a new challenge posted!", type: "community", read: false, createdAt: "2025-01-14T15:30:00Z" },
  { id: "n6", title: "Financial Goal Update", message: "You're 72% toward your Emergency Fund goal. On track for June completion!", type: "goal", read: true, createdAt: "2025-01-14T10:00:00Z" },
  { id: "n7", title: "Weekly Report Ready", message: "Your weekly success report is ready. You achieved 87% of your weekly targets!", type: "ai", read: true, createdAt: "2025-01-13T18:00:00Z" },
];

export const progressChartData = [
  { month: "Aug", goals: 45, habits: 62, wellness: 55 },
  { month: "Sep", goals: 52, habits: 68, wellness: 60 },
  { month: "Oct", goals: 58, habits: 72, wellness: 65 },
  { month: "Nov", goals: 63, habits: 75, wellness: 70 },
  { month: "Dec", goals: 70, habits: 80, wellness: 74 },
  { month: "Jan", goals: 78, habits: 85, wellness: 79 },
];

export const habitStreakData = [
  { day: "Mon", completed: 8 },
  { day: "Tue", completed: 9 },
  { day: "Wed", completed: 7 },
  { day: "Thu", completed: 10 },
  { day: "Fri", completed: 9 },
  { day: "Sat", completed: 6 },
  { day: "Sun", completed: 8 },
];

export const financialChartData = [
  { month: "Aug", savings: 32000, investments: 45000, debt: 35000 },
  { month: "Sep", savings: 33500, investments: 50000, debt: 33000 },
  { month: "Oct", savings: 34000, investments: 55000, debt: 31000 },
  { month: "Nov", savings: 35000, investments: 59000, debt: 28500 },
  { month: "Dec", savings: 35500, investments: 63000, debt: 26000 },
  { month: "Jan", savings: 36000, investments: 67500, debt: 24500 },
];

export const communityGroups = [
  { id: "cg1", name: "Startup Founders Network", members: 234, category: "Business", activity: "Very Active", joined: true },
  { id: "cg2", name: "Marathon Runners Club", members: 156, category: "Fitness", activity: "Active", joined: true },
  { id: "cg3", name: "Financial Independence Journey", members: 892, category: "Finance", activity: "Very Active", joined: true },
  { id: "cg4", name: "Morning Ritual Masters", members: 445, category: "Habits", activity: "Moderate", joined: false },
  { id: "cg5", name: "Book Writers Circle", members: 178, category: "Creativity", activity: "Active", joined: false },
  { id: "cg6", name: "Tech Career Growth", members: 567, category: "Career", activity: "Very Active", joined: false },
];

export const challenges = [
  { id: "ch1", title: "30-Day Meditation Challenge", category: "Wellness", participants: 1234, daysLeft: 18, progress: 40, joined: true, prize: "Wellness Badge + 500 pts" },
  { id: "ch2", title: "Financial Audit Week", category: "Finance", participants: 567, daysLeft: 5, progress: 72, joined: true, prize: "Finance Master Badge" },
  { id: "ch3", title: "No Excuses February", category: "Productivity", participants: 2890, daysLeft: 28, progress: 10, joined: false, prize: "Productivity Legend Badge" },
  { id: "ch4", title: "Read 4 Books in 30 Days", category: "Learning", participants: 445, daysLeft: 22, progress: 27, joined: false, prize: "Knowledge Badge + 300 pts" },
  { id: "ch5", title: "Marathon Training 12-Week Plan", category: "Fitness", participants: 234, daysLeft: 67, progress: 15, joined: true, prize: "Athlete Badge + 1000 pts" },
];
