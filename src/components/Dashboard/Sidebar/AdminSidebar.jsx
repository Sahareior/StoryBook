import { FaSignOutAlt } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { LuUserRoundPlus } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/authSlice";
import { BookOpen, MessageSquare } from "lucide-react";

const AdminSidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isActiveDashboard = location.pathname.startsWith("/dashboard/admin");
  const isActiveUsers = location.pathname.startsWith("/dashboard/user");
  const isActiveAdmin = location.pathname.startsWith("/dashboard/storyLibrary");
  const isActiveSubs = location.pathname.startsWith("/dashboard/ai-bot");
  const isActiveSettings = location.pathname.startsWith("/dashboard/settings");

  const handleLogOut = () => {
    console.log(
      "%c --- SIDEBAR: LOGOUT BUTTON CLICKED --- ",
      "background: blue; color: white;",
    );
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="green border-r-2 border-r-[#E8E8E8] h-screen flex flex-col justify-between inter">
      {/* Scrollable Content Area */}
      <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar">
        <Link to="/">
          <div
            className={`flex items-center gap-2 pt-6 pb-4 cursor-pointer ${
              collapsed ? "px-0" : "px-6"
            }`}
          >
            {/* Logo */}
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-yellow-400 rounded-[10px] inline-flex justify-center items-center">
                  <BookOpen color="#1F3A2B" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col justify-center normalFont">
                  <h1 className="justify-start text-white text-2xl font-normal">
                    LiteracyHub
                  </h1>
                  <p className="justify-start text-gray-400 text-xs font-normal">
                    Admin Portal
                  </p>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Menu Items */}
        <nav className="flex flex-col text-[#364636] space-y-2 mt-4 px-2">
          {/* Admin Dashboard */}
          <NavLink to="/dashboard/admin" className="w-full">
            <div
              className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                isActiveDashboard
                  ? "bg-[yellow] text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <AiOutlineHome className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-xs headerFont">Dashboard</span>
              )}
            </div>
          </NavLink>

          {/* User Management */}
          <NavLink to="/dashboard/user-management" className="w-full">
            <div
              className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                isActiveUsers
                  ? "bg-[yellow] text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <FaUsers className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-xs headerFont">User Management</span>
              )}
            </div>
          </NavLink>

          {/* Story Library */}
          <NavLink to="/dashboard/storyLibrary" className="w-full">
            <div
              className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                isActiveAdmin
                  ? "bg-[yellow] text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <BookOpen className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-xs headerFont">Story Library</span>
              )}
            </div>
          </NavLink>

          {/* AI Chatbot */}
          <NavLink to="/dashboard/ai-bot" className="w-full">
            <div
              className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                isActiveSubs
                  ? "bg-[yellow] text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <MessageSquare className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-xs headerFont">AI Control</span>
              )}
            </div>
          </NavLink>

          {/* Settings */}
          <NavLink to="/dashboard/settings" className="w-full">
            <div
              className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                isActiveSettings
                  ? "bg-[yellow] text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <FiSettings className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-xs headerFont">Settings</span>
              )}
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Logout Button (Fixed at bottom) */}
      <button
        onClick={handleLogOut}
        type="button"
        className="flex items-center w-full p-4 mb-6 space-x-3 text-red-500 hover:bg-red-500/10 transition-all cursor-pointer normalFont border-t border-white/10"
        style={{ paddingLeft: collapsed ? "28px" : "32px" }}
      >
        <FaSignOutAlt className="flex-shrink-0" />
        {!collapsed && <span className="font-medium">Log Out</span>}
      </button>
    </div>
  );
};

export default AdminSidebar;
