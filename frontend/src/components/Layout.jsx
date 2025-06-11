import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ showSidebar, children }) => {
  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
       
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
