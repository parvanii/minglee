import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SetupPage from "./pages/SetupPage.jsx";
import {Toaster, toast } from "react-hot-toast";
const App=()=> {
  return <div className="h-screen text-5xl" data-theme= "valentine">
    <button onClick={()=>toast.success("hello world")}> create toast notification</button>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/signup" element={<SignUpPage/>}/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/notifications" element={<NotificationsPage />}/>
    <Route path="/call" element={<CallPage/>}/>
    <Route path="/chat" element={<ChatPage />}/>
    <Route path="/setup" element={<SetupPage />}/>
  </Routes>
  <Toaster/>
    </div>;
  
};

export default App;