import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon } from "lucide-react";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-purple-50 border-b border-purple-200 sticky top-0 z-30 h-20 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* Optional logo in chat page */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700 tracking-wider">
                  Minglee
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-5 ml-auto">
            {/* Notifications */}
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-purple-600 opacity-80" />
              </button>
            </Link>

            {/* Avatar links to /setup */}
            <Link to="/setup" className="block">
              <div className="avatar cursor-pointer">
                <div className="w-10 rounded-full ring ring-purple-500 ring-offset-2 ring-offset-purple-50">
                  <img
                    src={authUser?.profilePic || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>

            {/* Logout button */}
            <button className="btn btn-ghost btn-circle" onClick={() => logoutMutation()}>
              <LogOutIcon className="h-6 w-6 text-purple-600 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
