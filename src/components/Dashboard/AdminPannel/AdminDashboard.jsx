import React from "react";
import { Users, BookOpen, Search } from "lucide-react";
import StatsCard from "../TeacherPannel/TeacherDash/StatsCard";
import { useGetSiteOverviewQuery } from "../../../redux/api/authApi";
import RecentActivity from "./RecentActivity";

export default function AdminDashboard() {
  // Fetch site overview from API
  const { data, isLoading, error } = useGetSiteOverviewQuery();

  // Map API response into stats and activity shapes used by the UI
  const statsData = [
    {
      title: "Total Students",
      value: data?.total_students ?? "-",
      subtitle: `${data?.total_students ?? "-"} registered`,
      icon: Users,
    },
    {
      title: "Total Story",
      value: data?.total_stories ?? "-",
      subtitle: `Stories across platform`,
      icon: BookOpen,
    },
    {
      title: "Top Searched",
      value: data?.top_searched_words?.[0]?.count ?? "-",
      subtitle: data?.top_searched_words?.[0]?.word ?? "-",
      icon: BookOpen,
    },
    {
      title: "Second Searched",
      value: data?.top_searched_words?.[1]?.count ?? "-",
      subtitle: data?.top_searched_words?.[1]?.word ?? "-",
      icon: Search,
    },
  ];

  const activityData = data?.recent_students_activity || [];

  // ---------------- Render ----------------
  return (
    <div className="px-6 headerFont">
      <h1 className="text-2xl font-semibold text-[#1F1F1F]">Admin Dashboard</h1>
      <p className="mt-1 text-base text-[#4A5565] normalFont">
        Welcome back! Here's what's happening with your students.
      </p>

      {isLoading ? (
        <p className="mt-6">Loading overview...</p>
      ) : error ? (
        <p className="mt-6 text-red-500">Failed to load overview.</p>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((item, idx) => (
              <StatsCard key={idx} id={idx} {...item} />
            ))}
          </div>

          {/* Recent Activity */}
          <RecentActivity activity={activityData} />
        </>
      )}
    </div>
  );
}
