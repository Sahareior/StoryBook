import { UserPlus } from "lucide-react";
import React, { useState } from "react";
import TeachersTable from "./TeachersTable";
import StudentsTable from "./StudentsTable";
import AddUserModal from "./AddUserModal";

export const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [open, setOpen] = useState(false);

  return (
    <div className="w-fullflex flex-col justify-center px-6 py-7 gap-10">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-stone-900 text-xl font-semibold headerFont">
            User Management
          </h1>
          <p className="text-stone-900 text-base font-normal mt-1 normalFont">
            View and manage all students & Teacher
          </p>
        </div>
        <div
          onClick={() => setOpen(true)}
          className="w-56 h-11 relative bg-yellow-400 text-[#1F3A2B] rounded-lg flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition-all cursor-pointer"
        >
          <UserPlus size={16} strokeWidth={1.5} />
          <button className="text-center justify-start text-[10px] font-normal headerFont">
            Add User
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => {
            setActiveTab("student");
            setSearchQuery("");
            setSelectedGrade("all");
          }}
          className={`w-72 h-11 relative bg-zinc-800/5 rounded-[10px] outline outline-[1.20px] outline-offset-[-1.20px] flex items-center justify-center transition-colors ${
            activeTab === "student" ? "outline-zinc-800" : "outline-gray-200"
          }`}
        >
          <span className="text-neutral-950 text-xs font-normal headerFont">
            Student
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("teacher");
            setSearchQuery("");
            setSelectedGrade("all");
          }}
          className={`w-72 h-11 relative bg-zinc-800/5 rounded-[10px] outline outline-[1.20px] outline-offset-[-1.20px] flex items-center justify-center transition-colors ${
            activeTab === "teacher" ? "outline-zinc-800" : "outline-gray-200"
          }`}
        >
          <span className="text-neutral-950 text-xs font-normal headerFont">
            Teacher
          </span>
        </button>
      </div>
      <div className="w-full flex items-center gap-4 mb-6 normalFont">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            activeTab === "student"
              ? "Search Students..."
              : "Search Teachers..."
          }
          className="w-3/4 h-11 pl-4 pr-3 py-1 bg-zinc-100 rounded-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-black/0 text-gray-700 text-sm font-normal focus:outline-blue-300"
        />
        {/* Grade Filter */}
        <select
          className="w-1/4 h-11 px-3 bg-zinc-100 rounded-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-black/0 text-neutral-950 text-sm font-normal leading-5 focus:outline-blue-300"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          <option value="all">All Grades</option>
          {activeTab === "student" ? (
            <>
              <option value="3">Grade 3</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
            </>
          ) : (
            <>
              <option value="3">Grade 3</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
            </>
          )}
        </select>
      </div>
      {/* Students Table */}
      {activeTab === "student" && (
        <StudentsTable
          searchQuery={searchQuery}
          selectedGrade={selectedGrade}
        />
      )}
      {/* Teachers Table */}
      {activeTab === "teacher" && (
        <TeachersTable
          searchQuery={searchQuery}
          selectedGrade={selectedGrade}
        />
      )}

      <AddUserModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
