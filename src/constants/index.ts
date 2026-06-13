export const APP_NAME = "Droms";
export const APP_TAGLINE = "Transform Dreams Into Reality";
export const DEMO_EMAIL = "demo@droms.ai";
export const DEMO_PASSWORD = "Demo@123";
export const ADMIN_EMAIL = "admin@droms.ai";
export const ADMIN_PASSWORD = "Admin@123";
export const STUDENT_EMAIL = "student@droms.ai";
export const PROFESSIONAL_EMAIL = "professional@droms.ai";
export const ENTREPRENEUR_EMAIL = "entrepreneur@droms.ai";
export const COACH_EMAIL = "coach@droms.ai";
export const LEADER_EMAIL = "leader@droms.ai";

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

export const SOCIAL_LINKS = {
  twitter: "https://x.com/auxirem",
  instagram: "https://instagram.com/auxirem",
  linkedin: "https://linkedin.com/company/auxirem",
  youtube: "https://youtube.com/c/auxirem",
  github: "https://github.com/auxirem"
};

export interface FeatureDetail {
  id: string;
  title: string;
  desc: string;
  iconName: string;
  color: string;
  benefits: string[];
  imageUrl: string;
  ctaText: string;
}

export const FEATURE_DETAILS: FeatureDetail[] = [
  {
    id: "ai-coach",
    title: "AI Life Coach",
    desc: "Personalized guidance powered by advanced AI. Get goal recommendations, motivation, and actionable advice tailored to your unique journey.",
    iconName: "Brain",
    color: "from-purple-500 to-indigo-600",
    benefits: [
      "24/7 personalized coaching and support tailored to your lifestyle",
      "Dynamic obstacle and blocker analysis to overcome procrastination",
      "Context-aware recommendations based on habit streaks and metrics",
      "Weekly performance reports, summaries, and personalized growth insights"
    ],
    imageUrl: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=600&h=400&fit=crop",
    ctaText: "Meet Your AI Coach"
  },
  {
    id: "goal-planning",
    title: "Smart Goal Planning",
    desc: "Break down your biggest dreams into achievable milestones with AI-assisted planning, dependency mapping, and progress visualization.",
    iconName: "Target",
    color: "from-blue-500 to-cyan-600",
    benefits: [
      "AI-driven milestone breakdown engine that schedules tasks automatically",
      "Interactive timeline and critical path dependency mapping",
      "Progress estimation algorithms with custom deadline forecasting",
      "Seamless calendar integration and auto-scheduling with Google and Apple"
    ],
    imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&h=400&fit=crop",
    ctaText: "Start Smart Planning"
  },
  {
    id: "habit-architecture",
    title: "Habit Architecture",
    desc: "Build powerful daily habits with streak tracking, behavioral analytics, and intelligent reminders that adapt to your patterns.",
    iconName: "CheckSquare",
    color: "from-green-500 to-teal-600",
    benefits: [
      "Smart adaptive reminders and geofenced trigger nudges",
      "Detailed frequency charts, completion heatmaps, and streak tracking",
      "Habit-to-goal correlation insights showing how actions drive success",
      "Preloaded routine blueprints for morning, afternoon, and sleep health"
    ],
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    ctaText: "Build Habits Now"
  },
  {
    id: "vision-board",
    title: "Vision Board Studio",
    desc: "Create stunning digital vision boards with drag-and-drop builder, image uploads, affirmations, and goal visualization tools.",
    iconName: "Layout",
    color: "from-pink-500 to-rose-600",
    benefits: [
      "Intuitive drag-and-drop builder with infinite layout canvas",
      "High-resolution integrated Unsplash image search and uploads",
      "Positive mental trigger card presets, custom labels, and stickers",
      "Direct connection of visual boards to active goals and sub-milestones"
    ],
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    ctaText: "Create Vision Board"
  },
  {
    id: "financial-planning",
    title: "Financial Planning",
    desc: "Track savings goals, investments, budgets, and wealth growth with beautiful analytics and AI-powered financial insights.",
    iconName: "TrendingUp",
    color: "from-amber-500 to-orange-600",
    benefits: [
      "Automated savings and investment plan projection calculators",
      "Beautiful visualizations for budget splits, net worth, and expense tracking",
      "Milestone notifications for emergency funds and debt paydowns",
      "AI-driven savings suggestions based on weekly transaction trends"
    ],
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
    ctaText: "Start Wealth Planning"
  },
  {
    id: "wellness-center",
    title: "Wellness Center",
    desc: "Manage fitness goals, nutrition, meditation, and sleep tracking in one integrated wellness ecosystem.",
    iconName: "Heart",
    color: "from-red-500 to-pink-600",
    benefits: [
      "Unified wellness scoring based on exercise, meals, and sleep quality",
      "Nutrition macro tracking with food journal scan functionalities",
      "Guided audio meditations for focus, anxiety, and morning energy",
      "Sleep duration and recovery metrics synced from wearables"
    ],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    ctaText: "Optimize Wellness"
  },
  {
    id: "academy",
    title: "Learning Academy",
    desc: "Curated courses and learning paths for leadership, productivity, finance, mindset, and personal development.",
    iconName: "GraduationCap",
    color: "from-violet-500 to-purple-600",
    benefits: [
      "Video lectures and summaries led by industry experts and PhD coaches",
      "Interactive worksheets, downloadable templates, and check-in logs",
      "Verified digital certificates on successful path completions",
      "Peer discussions and study group accountability features"
    ],
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    ctaText: "Access Academy Courses"
  },
  {
    id: "community",
    title: "Community & Accountability",
    desc: "Join accountability groups, find mentors, share achievements, and grow alongside thousands of ambitious achievers.",
    iconName: "Users",
    color: "from-sky-500 to-blue-600",
    benefits: [
      "Goal-based peer accountability groups with daily check-ins",
      "Find and match with experienced mentors in your career field",
      "Collaborative challenges, team goals, and leaderboard runs",
      "Secure feed to share milestone moments and positive affirmations"
    ],
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    ctaText: "Join Accountability Groups"
  },
  {
    id: "challenges",
    title: "Challenges & Gamification",
    desc: "Personal and group challenges, achievement badges, leaderboards, and rewards to keep you motivated and engaged.",
    iconName: "Trophy",
    color: "from-yellow-500 to-amber-600",
    benefits: [
      "Daily check-in challenges and productivity streak builders",
      "Platform-wide wellness, savings, and reading speed runs",
      "Earn collectible, provable badge NFTs and profile rewards",
      "Redeem points shop discounts on productivity items and apps"
    ],
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop",
    ctaText: "Explore Active Challenges"
  }
];

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  img: string;
  content: string;
  relatedIds: string[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "habit-formation",
    title: "The Science Behind Habit Formation: What Neuroscience Teaches Us",
    category: "Habits",
    author: "Dr. Lisa Chen",
    date: "Jan 12, 2025",
    readTime: "8 min",
    img: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=500&fit=crop",
    content: `Habits represent the neurological scaffolding of our lives. Research shows that over 40% of our daily actions are not active decisions, but automatic habits. Understanding the neural mechanics of how these patterns are formed is the first step toward masterfully designing a high-performance routine.

### The Cue-Routine-Reward Loop
At the center of any habit is a simple three-step neurological loop.
1. **The Cue**: A trigger that tells your brain to go into automatic mode. Cues can be location-based, time-based, emotional states, or actions immediately preceding.
2. **The Routine**: The physical, mental, or emotional behavior itself.
3. **The Reward**: A positive physical or mental reinforcement that helps your brain figure out if this loop is worth remembering for the future.

### Neuroplasticity and the Basal Ganglia
As a behavior is repeated, the cognitive effort shifts from the prefrontal cortex (which manages active, conscious decisions) to the basal ganglia (an ancient structure responsible for automatic patterns). This transition creates a hard-wired neural pathway. 

To break an old habit, you must identify the exact cue and reward, and swap in a new routine that satisfies the craving. Consistent reinforcement builds new synapses, eventually overriding the old path.`,
    relatedIds: ["morning-routines", "accountability-systems"]
  },
  {
    id: "smart-goals",
    title: "How to Set Goals That Actually Motivate You (And Why SMART Isn't Enough)",
    category: "Goals",
    author: "Marcus Lee",
    date: "Jan 10, 2025",
    readTime: "6 min",
    img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop",
    content: `For decades, the SMART goal framework (Specific, Measurable, Achievable, Relevant, Time-bound) has been the gold standard. However, neuroscientific studies reveal a major flaw: SMART goals often lack the emotional resonance required to stimulate dopamine release, the chemical engine of motivation.

### The Dopaminergic Drive
Dopamine is not just a reward molecule; it is a chemical of anticipation. When we focus on a goal that is deeply tied to our sense of purpose or core identity, our brain releases dopamine in anticipation of achieving it. This chemical surge provides the cellular energy needed to start work and maintain focus.

### Moving Beyond SMART: The HEART Method
To build goals that generate continuous, self-sustaining motivation, we recommend transitioning to the HEART framework:
* **H - Holistic**: Aligned across your career, health, finances, and relationships.
* **E - Emotional**: Connect the goal to a vivid visual representation of how your life will change.
* **A - Actionable**: Broken down into microscopic, non-threatening daily tasks.
* **R - Resonant**: True to your authentic aspirations, not societal expectations.
* **T - Trackable**: Measured in real-time, yielding small wins that fuel further effort.`,
    relatedIds: ["habit-formation", "vision-boards"]
  },
  {
    id: "morning-routines",
    title: "The Morning Routine of World-Class Achievers",
    category: "Productivity",
    author: "Sarah Kim",
    date: "Jan 8, 2025",
    readTime: "10 min",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    content: `How you start your morning sets the tone for your entire day. World-class achievers across sports, technology, and arts rarely leave their mornings to chance. Instead, they leverage structured, high-leverage routines to optimize physical state and focus before checking emails or social feeds.

### The 20-20-20 Formula
A popular and highly effective structure divides the first hour of your day into three blocks:
1. **Move (20 Mins)**: Intense exercise triggers sweat, clearing cortisol (the stress hormone) and elevating brain-derived neurotrophic factor (BDNF), which repairs brain cells and accelerates learning.
2. **Reflect (20 Mins)**: Journaling, meditating, or planning. This fosters gratitude, reduces anxiety, and aligns your daily agenda with long-term goals.
3. **Grow (20 Mins)**: Reading, studying a new language, or listening to educational content. Consuming high-quality ideas stimulates creative problem-solving.

### Safeguarding Your Attention
The most critical morning rule is simple: **Do not touch your phone for the first 30-60 minutes**. Entering the digital slipstream immediately puts your brain in a reactive mode, letting others' demands dictate your cognitive priority.`,
    relatedIds: ["habit-formation", "smart-goals"]
  },
  {
    id: "financial-freedom",
    title: "Financial Freedom at 35: A Complete Roadmap",
    category: "Finance",
    author: "David Park",
    date: "Jan 5, 2025",
    readTime: "12 min",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop",
    content: `The Financial Independence, Retire Early (FIRE) movement has evolved from a niche subculture to a widely recognized wealth-building strategy. Retiring early doesn't mean doing nothing; it means having complete autonomy over your time.

### The Rule of 25 and the 4% Safe Withdrawal Rule
To determine your financial target, calculate your annual expenses and multiply by 25. For example, if you spend $50,000 a year, your financial independence number is $1.25 million. Once accumulated, investing this capital in diversified index funds allows you to safely withdraw 4% annually to cover living expenses indefinitely without depleting the principal.

### The 3 Levers of Financial Independence
1. **Aggressive Savings Rate**: High-earners aiming for early independence typically save 50% to 70% of their net income.
2. **Expanding Income**: Building side ventures, consulting, or investing in real estate to speed up capital accumulation.
3. **Diversified Low-Cost Investing**: Utilizing tax-advantaged accounts and index funds to secure compound growth.`,
    relatedIds: ["smart-goals", "morning-routines"]
  },
  {
    id: "vision-boards",
    title: "Why Vision Boards Actually Work (The Psychology)",
    category: "Mindset",
    author: "Dr. Priya Sharma",
    date: "Jan 3, 2025",
    readTime: "7 min",
    img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=500&fit=crop",
    content: `Vision boards are often dismissed as mystical daydreaming. However, cognitive psychology and brain imaging reveal that visual mapping has a profound physiological effect on performance and goal execution.

### The Reticular Activating System (RAS)
The RAS is a network of neurons in the brain stem that acts as a filter for the millions of sensory inputs hitting your brain every second. By feeding your brain vivid images of your goals, you program the RAS to highlight relevant opportunities, resources, and connections that you might have otherwise ignored.

### Enhancing Performance Through Mental Rehearsal
Brain scans show that visual mental rehearsal activates the same motor cortex areas as the physical execution of the action. When you visualize yourself succeeding daily, the brain builds neural paths that make the physical action easier, less intimidating, and more precise. To maximize effectiveness, ensure your vision board contains images of both the final reward and the *actions* required to get there.`,
    relatedIds: ["smart-goals", "habit-formation"]
  },
  {
    id: "accountability-systems",
    title: "Building an Accountability System That Works",
    category: "Community",
    author: "James Liu",
    date: "Dec 28, 2024",
    readTime: "9 min",
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop",
    content: `According to the American Society of Training and Development, having a committed accountability partner increases your likelihood of goal completion to a staggering 95%. Without external validation or stakes, our brains naturally prioritize short-term comfort over long-term growth.

### Constructing Your System
A bulletproof accountability system consists of three core components:
1. **The Partner**: Someone who shares similar ambitions but isn't afraid to call out excuses.
2. **The Cadence**: A structured, non-negotiable review schedule (e.g. Sunday 15-minute sync).
3. **The Stakes**: Financial or social consequences for failing to meet commits (e.g., donating to a charity you dislike if you skip a milestone).

By implementing these structural parameters, you outsource your motivation, making consistency automatic even on days when willpower is low.`,
    relatedIds: ["smart-goals", "habit-formation"]
  }
];

