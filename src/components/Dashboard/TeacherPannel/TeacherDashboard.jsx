import React from "react";
import { Users, BookOpen, Search, Activity } from "lucide-react";
import StatsCard from "./TeacherDash/StatsCard";
import RecentActivity from "./TeacherDash/RecentActivity";
import { useGetTeacherDashboardQuery } from "../../../redux/api/authApi";

export default function TeacherDashboard() {
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useGetTeacherDashboardQuery();

  if (isLoading) {
    return <div className="p-6 text-center">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading dashboard
      </div>
    );
  }

  // Map API stats to StatsCard format
  const statsData = [
    {
      title: "Total Students",
      value: dashboardData?.total_students || 0,
      subtitle: "Number of students assigned",
      icon: Users,
      id: 1,
    },
    {
      title: "Total Stories",
      value: dashboardData?.total_stories || 0,
      subtitle: "Stories created/read",
      icon: BookOpen,
      id: 2,
    },
    {
      title: "Vocabulary Search",
      value: dashboardData?.total_vocabulary_search || 0,
      subtitle: "Total words looked up",
      icon: Search,
      id: 3,
    },
    {
      title: "Avg Vocab Per Student",
      value: dashboardData?.average_vocabulary_searched?.toFixed(2) || 0,
      subtitle: "Average search count",
      icon: Activity,
      id: 4,
    },
  ];

  const activityData = dashboardData?.recent_student_activity || [];

  return (
    <div className="px-6 headerFont">
      <h1 className="text-lg font-semibold text-[#1F1F1F]">
        Teacher Dashboard
      </h1>
      <p className="mt-1 text-base text-[#4A5565] normalFont">
        Welcome back! Here's what's happening with your students.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((item, idx) => (
          <StatsCard key={idx} {...item} />
        ))}
      </div>

      {/* Recent Activity */}
      <RecentActivity activity={activityData} />
    </div>
  );
}
