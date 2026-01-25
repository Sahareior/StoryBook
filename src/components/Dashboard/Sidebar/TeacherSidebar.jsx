import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/authSlice";

const TeacherSidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isActiveDashboard = location.pathname === "/dashboard/teacher";
  const isActiveSettings = location.pathname === "/dashboard/teacher-settings";
  const isActiveStudent = location.pathname.startsWith("/dashboard/students");

  const handleLogout = () => {
    console.log("Teacher logout triggered");
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="green border-r-2 border-r-[#E8E8E8] min-h-screen flex flex-col justify-between inter">
      {/* Logo */}
      <div className="flex flex-col py-4">
        <div
          className={`flex items-center gap-2  pt-2 pb-4 cursor-pointer ${
            collapsed ? "px-0" : "px-6 "
          }`}
        >
          {/* <img src={logo} alt="Logo" className="h-[63px] w-[63px] mb-2" /> */}
          <Link to="/">
            {!collapsed && (
              <div>
                <h1 className="text-sm font-medium text-color whitespace-nowrap headerFont">
                  Teacher Panel
                </h1>
                <p className="text-[14px] text-[#FFFFFFB3] normalFont">
                  Literacy Platform
                </p>
              </div>
            )}
          </Link>
        </div>

        {/* Menu Items */}
        <nav
          className={`flex flex-col  text-color ${
            !collapsed ? "border-t-2  border-[#384f37b3]" : "mt-0"
          }`}
        >
          {/* Lesson Plan */}
          <NavLink
            to="/dashboard/teacher"
            className="flex items-center justify-between "
          >
            <div className="flex items-center justify-between p-2 font-medium pt-7">
              <div
                className={`flex items-center space-x-2 justify-start gap-2  p-5 text-center ${
                  collapsed ? "w-[63px] h-[40px]" : "w-[250px] h-[50px] "
                }  ${isActiveDashboard ? "yellow text-green rounded-xl" : ""}`}
              >
                <MdOutlineDashboard className="w-[24px] h-[24px] " />
                {!collapsed && (
                  <h1 className="text-base font-medium headerFont">
                    Dashboard
                  </h1>
                )}
              </div>
            </div>
          </NavLink>

          {/* All Lesson Plan */}
          <NavLink
            to="/dashboard/students"
            className="flex items-center justify-between "
          >
            <div className="flex items-center justify-between p-2 font-medium">
              <div
                className={`flex items-center space-x-2 justify-start gap-2  p-5 text-center ${
                  collapsed ? "w-[63px] h-[40px]" : "w-[250px] h-[50px] "
                } ${isActiveStudent ? "yellow text-green rounded-xl" : ""}`}
              >
                <LuUsers className="w-[24px] h-[24px]" />
                {!collapsed && (
                  <h1 className="text-base font-medium headerFont">Student</h1>
                )}
              </div>
            </div>
          </NavLink>

          {/* Student Profile */}
          <NavLink
            to="/dashboard/teacher-settings"
            className="flex items-center justify-between w-[280px]"
          >
            <div className="flex items-center justify-between w-[280px] font-medium p-2 pt-2">
              <div
                className={`flex items-center space-x-2 justify-start gap-2  p-5 text-center ${
                  collapsed ? "w-[63px] h-[40px]" : "w-[250px] h-[50px] "
                } ${isActiveSettings ? "yellow text-green rounded-xl" : ""}`}
              >
                <IoSettingsOutline className="w-[24px] h-[24px]" />
                {!collapsed && (
                  <h1 className="text-base font-medium headerFont">Settings</h1>
                )}
              </div>
            </div>
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="flex items-center p-2 pb-10 pl-10 space-x-3 text-red-600 rounded-lg cursor-pointer normalFont"
      >
        <FaSignOutAlt />
        {!collapsed && <span>Log Out</span>}
      </div>
    </div>
  );
};

export default TeacherSidebar;
