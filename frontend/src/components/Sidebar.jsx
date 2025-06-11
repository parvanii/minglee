import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <motion.aside
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  className="w-64 bg-purple-50 hidden lg:flex flex-col h-screen sticky top-0 font-inter"
>
<div className="p-5 border-b border-purple-200">



        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Minglee Logo" className="w-14 h-10" />
          <span className="text-3xl font-bold text-purple-600 tracking-wide">
            Minglee
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarLink
          to="/"
          icon={<HomeIcon className="size-5" />}
          label="Home"
          isActive={currentPath === "/"}
        />
        <SidebarLink
          to="/friends"
          icon={<UsersIcon className="size-5" />}
          label="Friends"
          isActive={currentPath === "/friends"}
        />
        <SidebarLink
          to="/notifications"
          icon={<BellIcon className="size-5" />}
          label="Notifications"
          isActive={currentPath === "/notifications"}
        />
      </nav>

      <div className="p-4 border-t border-purple-200 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-purple-500 ring-offset-2 ring-offset-purple-50">
              <img src={authUser?.profilePic || "/default-avatar.png"} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-purple-800">{authUser?.fullName}</p>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="size-2 rounded-full bg-green-500 inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

const SidebarLink = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? "bg-purple-200 text-purple-700"
        : "text-purple-800 hover:bg-purple-100 hover:text-purple-600"
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Sidebar;
