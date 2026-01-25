import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "../pages/Auth/Signup";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/Forgot";
import Otp from "../pages/Auth/Otp";


import DashboardHome from "../components/Dashboard/StudentDashboard/DashboardHome";
import LibraryLists from "../components/Dashboard/StudentDashboard/_component/Library/LibraryLists";
import ViewBook from "../components/Dashboard/StudentDashboard/_component/Library/ViewBook";
import Achievement from "../components/Dashboard/StudentDashboard/_component/Achivement/Achivement";
import Profile from "../pages/Profile/Profile";
import StoryCreatorStudio from "../pages/Creator/StoryCreatorStudio";
import { MyStories } from "../pages/MyStories/MyStories";
import Root from "../components/Dashboard/Root";
import TeacherSidebar from "../components/Dashboard/Sidebar/TeacherSidebar";
import TeacherDashboard from "../components/Dashboard/TeacherPannel/TeacherDashboard";
import DashboardContent from "../utils/DashboardContent";
import AdminDashboard from "../components/Dashboard/AdminPannel/AdminDashboard";
import StudentManagement from "../components/Dashboard/TeacherPannel/Students/StudentManagement";
import Students from "../components/Dashboard/TeacherPannel/Students/Students";
import StudentDetail from "../components/Dashboard/TeacherPannel/Students/StudentDetail";
import { StoryLibrary } from "../components/Dashboard/AdminPannel/StoryLibrary/StoryLibrary";
import AdminStoryCreatorStudio from "../components/Dashboard/AdminPannel/StoryLibrary/StoryCreatorStudio";
import Congratulations from "../pages/Auth/Congratulation";
import UserDetailsPage from "../components/Dashboard/AdminPannel/User/UserDetails";
import Chatbots from "../components/Dashboard/AdminPannel/chatbots/Chatbots";
import Settings from "../components/Dashboard/AdminPannel/settings/Settings";
import { UserManagement } from "../components/Dashboard/AdminPannel/User/User-Management";
import TermsAndConditions from "../pages/Terms&Policy/Terms";
import PrivacyPolicy from "../pages/Terms&Policy/Privacy";
import TeacherSettings from "../components/Dashboard/TeacherPannel/settings/Settings";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <h2 className="mt-10 text-center text-red-500">Route not found</h2>
    ),
    children: [
      { index: true, element: <App /> },
      // auth routes
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot", element: <ForgotPassword /> },
  { path: "/otp", element: <Otp /> },
  { path: "/congratulations", element: <Congratulations /> },
  { path: "/terms", element: <TermsAndConditions /> },
  { path: "/privacy", element: <PrivacyPolicy /> },


  {
    path: "/student-dashboard", element: <DashboardHome />
  },
  {
    path: "/library", element: <LibraryLists />
  },
  {
    path: "/:read-book", element: <ViewBook />
  },
  {
path: "/achivement", element: <Achievement />
  },
  {
    path:'/profile', element: <Profile />
  },

  { path: "/story-creator", element: <StoryCreatorStudio /> },
  { path: "/myStories", element: <MyStories /> },
  // Dashbaord
  {
    path: "/dashboard",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <DashboardContent></DashboardContent>,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: 'user-management',
        element: <UserManagement />
      },
      {
        path:'ai-bot',
        element: <Chatbots />
      },
      {
        path:'settings',
        element: <Settings />
      },
      {
        path: "storyLibrary",
        element: <StoryLibrary />,
      },
      {
        path: "admin-story-create",
        element: <AdminStoryCreatorStudio/>,
      },
      {
        path: "user",
        element: <UserManagement/>,
      },
      {
        path: "user-details/:id",
        element: <UserDetailsPage />,
      },

      // Teacher Dashboard
      {
        path: "teacher",
        element: <TeacherDashboard />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "students/details/:id",
        element: <StudentDetail></StudentDetail>,
      },
      {
        path: "teacher-settings",
        element: <TeacherSettings />,
      },
    ],
  },

]);

export default router;
