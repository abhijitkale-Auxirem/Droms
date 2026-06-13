import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import AuthLayout from "@/layouts/AuthLayout";
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ProtectedRoute from "@/routes/ProtectedRoute";

// Public Pages
import HomePage from "@/pages/public/home";
import AboutPage from "@/pages/public/about";
import FeaturesPage from "@/pages/public/features";
import PricingPage from "@/pages/public/pricing";
import ContactPage from "@/pages/public/contact";
import CommunityPublicPage from "@/pages/public/community";
import SuccessStoriesPage from "@/pages/public/success-stories";
import AICoachPublicPage from "@/pages/public/ai-coach";
import GoalPlanningPage from "@/pages/public/goal-planning";
import VisionBoardPublicPage from "@/pages/public/vision-board";
import HabitTrackingPage from "@/pages/public/habit-tracking";
import CareerGrowthPage from "@/pages/public/career-growth";
import FinancialPlanningPage from "@/pages/public/financial-planning";
import WellnessPublicPage from "@/pages/public/wellness";
import AcademyPublicPage from "@/pages/public/academy";
import FAQPage from "@/pages/public/faq";
import BlogPage from "@/pages/public/blog";
import PrivacyPage from "@/pages/public/privacy";
import TermsPage from "@/pages/public/terms";
import DocsPage from "@/pages/public/docs";

// Auth Pages
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import ResetPasswordPage from "@/pages/auth/reset-password";
import OTPLoginPage from "@/pages/auth/otp-login";
import VerifyAccountPage from "@/pages/auth/verify-account";

// Dashboard Pages
import DashboardPage from "@/pages/user/dashboard";
import DreamsPage from "@/pages/user/dreams";
import GoalsPage from "@/pages/user/goals";
import MilestonesPage from "@/pages/user/milestones";
import HabitsPage from "@/pages/user/habits";
import RoutinesPage from "@/pages/user/routines";
import VisionBoardsPage from "@/pages/user/vision-boards";
import AICoachPage from "@/pages/user/ai-coach";
import AcademyPage from "@/pages/user/academy";
import CoursesPage from "@/pages/user/courses";
import FinancePage from "@/pages/user/finance";
import BudgetsPage from "@/pages/user/budgets";
import InvestmentsPage from "@/pages/user/investments";
import CareerPage from "@/pages/user/career";
import SkillsPage from "@/pages/user/skills";
import WellnessPage from "@/pages/user/wellness";
import FitnessPage from "@/pages/user/fitness";
import MeditationPage from "@/pages/user/meditation";
import SleepPage from "@/pages/user/sleep";
import CommunityPage from "@/pages/user/community";
import AccountabilityGroupsPage from "@/pages/user/accountability-groups";
import ChallengesPage from "@/pages/user/challenges";
import AnalyticsPage from "@/pages/user/analytics";
import ReportsPage from "@/pages/user/reports";
import AchievementsPage from "@/pages/user/achievements";
import NotificationsPage from "@/pages/user/notifications";
import MessagesPage from "@/pages/user/messages";
import ProfilePage from "@/pages/user/profile";
import SubscriptionPage from "@/pages/user/subscription";
import SettingsPage from "@/pages/user/settings";

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import AdminUsersPage from "@/pages/admin/users";
import AdminRevenuePage from "@/pages/admin/revenue";
import {
  AdminDreamsPage, AdminGoalsPage, AdminCommunitiesPage, AdminChallengesPage,
  AdminCoursesPage, AdminMentorsPage, AdminContentPage, AdminTestimonialsPage,
  AdminSubscriptionsPage, AdminPaymentsPage, AdminAnalyticsPage, AdminReportsPage,
  AdminNotificationsPage, AdminSupportPage, AdminRolesPage, AdminPermissionsPage,
  AdminSettingsPage
} from "@/pages/admin";

import NotFound from "@/pages/NotFound";

function AdminRoute({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default function App() {
  const initialize = useAuthStore(state => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/community" element={<CommunityPublicPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/ai-coach" element={<AICoachPublicPage />} />
        <Route path="/goal-planning" element={<GoalPlanningPage />} />
        <Route path="/vision-board" element={<VisionBoardPublicPage />} />
        <Route path="/habit-tracking" element={<HabitTrackingPage />} />
        <Route path="/career-growth" element={<CareerGrowthPage />} />
        <Route path="/financial-planning" element={<FinancialPlanningPage />} />
        <Route path="/wellness" element={<WellnessPublicPage />} />
        <Route path="/academy" element={<AcademyPublicPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/solutions" element={<FeaturesPage />} />
        <Route path="/help" element={<ContactPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/cookies" element={<PrivacyPage />} />
        <Route path="/security" element={<AboutPage />} />
        <Route path="/careers" element={<AboutPage />} />
        <Route path="/press" element={<AboutPage />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/otp-login" element={<OTPLoginPage />} />
        <Route path="/verify-account" element={<VerifyAccountPage />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/dreams" element={<DreamsPage />} />
        <Route path="/dashboard/goals" element={<GoalsPage />} />
        <Route path="/dashboard/milestones" element={<MilestonesPage />} />
        <Route path="/dashboard/habits" element={<HabitsPage />} />
        <Route path="/dashboard/routines" element={<RoutinesPage />} />
        <Route path="/dashboard/vision-boards" element={<VisionBoardsPage />} />
        <Route path="/dashboard/ai-coach" element={<AICoachPage />} />
        <Route path="/dashboard/academy" element={<AcademyPage />} />
        <Route path="/dashboard/courses" element={<CoursesPage />} />
        <Route path="/dashboard/finance" element={<FinancePage />} />
        <Route path="/dashboard/budgets" element={<BudgetsPage />} />
        <Route path="/dashboard/investments" element={<InvestmentsPage />} />
        <Route path="/dashboard/career" element={<CareerPage />} />
        <Route path="/dashboard/skills" element={<SkillsPage />} />
        <Route path="/dashboard/wellness" element={<WellnessPage />} />
        <Route path="/dashboard/fitness" element={<FitnessPage />} />
        <Route path="/dashboard/meditation" element={<MeditationPage />} />
        <Route path="/dashboard/sleep" element={<SleepPage />} />
        <Route path="/dashboard/community" element={<CommunityPage />} />
        <Route path="/dashboard/accountability-groups" element={<AccountabilityGroupsPage />} />
        <Route path="/dashboard/challenges" element={<ChallengesPage />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/reports" element={<ReportsPage />} />
        <Route path="/dashboard/achievements" element={<AchievementsPage />} />
        <Route path="/dashboard/notifications" element={<NotificationsPage />} />
        <Route path="/dashboard/messages" element={<MessagesPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/subscription" element={<SubscriptionPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsersPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/dreams" element={<AdminRoute><AdminLayout><AdminDreamsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/goals" element={<AdminRoute><AdminLayout><AdminGoalsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/communities" element={<AdminRoute><AdminLayout><AdminCommunitiesPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/challenges" element={<AdminRoute><AdminLayout><AdminChallengesPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/courses" element={<AdminRoute><AdminLayout><AdminCoursesPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/mentors" element={<AdminRoute><AdminLayout><AdminMentorsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/content" element={<AdminRoute><AdminLayout><AdminContentPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/testimonials" element={<AdminRoute><AdminLayout><AdminTestimonialsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/subscriptions" element={<AdminRoute><AdminLayout><AdminSubscriptionsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/payments" element={<AdminRoute><AdminLayout><AdminPaymentsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/revenue" element={<AdminRoute><AdminLayout><AdminRevenuePage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/analytics" element={<AdminRoute><AdminLayout><AdminAnalyticsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/reports" element={<AdminRoute><AdminLayout><AdminReportsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/notifications" element={<AdminRoute><AdminLayout><AdminNotificationsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/support" element={<AdminRoute><AdminLayout><AdminSupportPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/roles" element={<AdminRoute><AdminLayout><AdminRolesPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/permissions" element={<AdminRoute><AdminLayout><AdminPermissionsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><AdminLayout><AdminSettingsPage /></AdminLayout></AdminRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
