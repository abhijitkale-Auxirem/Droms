export const APP_NAME = "Droms";
export const APP_TAGLINE = "Transform Dreams Into Reality";
export const DEMO_EMAIL = "demo@droms.ai";
export const DEMO_PASSWORD = "Demo@123";

export const SIDEBAR_ITEMS = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
  { id: "dreams", label: "Dreams", path: "/dashboard/dreams", icon: "Sparkles" },
  { id: "goals", label: "Goals", path: "/dashboard/goals", icon: "Target" },
  { id: "vision-boards", label: "Vision Boards", path: "/dashboard/vision-boards", icon: "Layout" },
  { id: "habits", label: "Habits", path: "/dashboard/habits", icon: "CheckSquare" },
  { id: "routines", label: "Routines", path: "/dashboard/routines", icon: "Clock" },
  { id: "ai-coach", label: "AI Coach", path: "/dashboard/ai-coach", icon: "Brain", badge: 3 },
  { id: "academy", label: "Learning Academy", path: "/dashboard/academy", icon: "GraduationCap" },
  { id: "finance", label: "Financial Goals", path: "/dashboard/finance", icon: "TrendingUp" },
  { id: "career", label: "Career Growth", path: "/dashboard/career", icon: "Briefcase" },
  { id: "wellness", label: "Wellness", path: "/dashboard/wellness", icon: "Heart" },
  { id: "community", label: "Community", path: "/dashboard/community", icon: "Users" },
  { id: "challenges", label: "Challenges", path: "/dashboard/challenges", icon: "Trophy" },
  { id: "analytics", label: "Analytics", path: "/dashboard/analytics", icon: "BarChart2" },
  { id: "reports", label: "Reports", path: "/dashboard/reports", icon: "FileText" },
  { id: "achievements", label: "Achievements", path: "/dashboard/achievements", icon: "Award" },
  { id: "notifications", label: "Notifications", path: "/dashboard/notifications", icon: "Bell", badge: 5 },
  { id: "settings", label: "Settings", path: "/dashboard/settings", icon: "Settings" },
];

export const DREAM_CATEGORIES = [
  "Personal Growth", "Career & Business", "Financial Freedom",
  "Health & Fitness", "Relationships", "Travel & Adventure",
  "Education", "Spirituality", "Creativity", "Lifestyle"
];

export const GOAL_CATEGORIES = [
  "Short-term", "Long-term", "Financial", "Career",
  "Health", "Learning", "Relationship", "Personal"
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: 0,
    period: "forever",
    description: "Begin your dream journey",
    features: [
      "5 Active Dreams",
      "10 Goals",
      "Basic Habit Tracker",
      "1 Vision Board",
      "Community Access",
      "Basic Analytics",
    ],
    cta: "Start Free",
    highlighted: false,
    color: "slate",
  },
  {
    name: "Pro",
    price: 19,
    period: "month",
    description: "Unlock your full potential",
    features: [
      "Unlimited Dreams & Goals",
      "AI Life Coach (50 sessions/mo)",
      "Advanced Habit Analytics",
      "5 Vision Boards",
      "Financial Planning Tools",
      "Career Roadmap Builder",
      "Priority Support",
      "All Integrations",
    ],
    cta: "Start 14-day Trial",
    highlighted: true,
    color: "purple",
  },
  {
    name: "Enterprise",
    price: 49,
    period: "month",
    description: "For serious achievers",
    features: [
      "Everything in Pro",
      "Unlimited AI Coach Sessions",
      "White-label Vision Boards",
      "Team Accountability Groups",
      "Custom Reporting",
      "Dedicated Success Manager",
      "API Access",
      "SSO & Advanced Security",
    ],
    cta: "Contact Sales",
    highlighted: false,
    color: "gold",
  },
];

export const SUCCESS_STATS = [
  { value: "2.4M+", label: "Dreams Created", icon: "Sparkles" },
  { value: "89%", label: "Goal Achievement Rate", icon: "Target" },
  { value: "156K+", label: "Active Users", icon: "Users" },
  { value: "4.9/5", label: "User Rating", icon: "Star" },
];

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    quote: "Droms transformed how I approach my goals. In 6 months, I got promoted and launched my side business. The AI coach is genuinely insightful.",
    rating: 5,
    achievement: "Got promoted + launched startup",
  },
  {
    name: "Marcus Johnson",
    role: "Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    quote: "I've tried every productivity app out there. Droms is the only one that connects my dreams to actual daily actions. Revenue up 3x in one year.",
    rating: 5,
    achievement: "3x revenue growth in 12 months",
  },
  {
    name: "Priya Sharma",
    role: "Medical Professional",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face",
    quote: "The wellness tracking combined with goal planning helped me lose 30lbs, run my first marathon, and finally write that book I always talked about.",
    rating: 5,
    achievement: "Marathon + 30lbs lost + book written",
  },
  {
    name: "David Kim",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    quote: "The learning academy and career growth tools helped me transition from junior dev to CTO in 18 months. The roadmap feature is exceptional.",
    rating: 5,
    achievement: "Junior Dev → CTO in 18 months",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What makes Droms different from other goal apps?",
    answer: "Droms is the only platform that connects your deepest dreams to daily actions through AI coaching, combining goal planning, habit tracking, wellness, financial planning, and career growth in one unified system.",
  },
  {
    question: "How does the AI Coach work?",
    answer: "Our AI coach analyzes your goals, progress patterns, and personal data to provide personalized recommendations, motivation strategies, and actionable advice tailored to your unique journey.",
  },
  {
    question: "Can I use Droms for team goals?",
    answer: "Yes! Our Enterprise plan includes accountability groups, shared vision boards, and team challenge features. Perfect for companies investing in employee personal development.",
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We use enterprise-grade encryption, never sell your data, and you own everything you create. Your dreams are private and fully under your control.",
  },
  {
    question: "What's included in the free plan?",
    answer: "The free Starter plan gives you 5 dreams, 10 goals, basic habit tracking, 1 vision board, and community access — everything you need to start your transformation journey.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, cancel anytime with no questions asked. You keep access until the end of your billing period, and all your data is available for export.",
  },
];
