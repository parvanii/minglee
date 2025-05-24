import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SetupPage from "./pages/SetupPage.jsx";
import {Toaster, toast } from "react-hot-toast";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from "./lib/axios.js";
import { Navigate } from "react-router";

const App=()=> {

  const {data:authData,isLoading,error}=useQuery({
     queryKey:["authUser"], 
     
     queryFn:async()=>{
     const res= await axiosInstance.get("/api/me")
     return res.data;
  },
  retry:false,
}); 

const authUser=authData?.user

  return <div className="h-screen text-5xl" data-theme= "valentine">

  <Routes>
    <Route path="/" element={authUser?<HomePage/>:<Navigate to= "/login" />}/>
    <Route path="/signup" element={!authUser ?<SignUpPage/>:<Navigate to= "/"/>}/>
    <Route path="/login" element={!authUser ?<LoginPage />:<Navigate to= "/"/>}/>
    <Route path="/notifications" element={authUser ?<NotificationsPage />:<Navigate to= "/login"/>}/>
    <Route path="/call" element={authUser ?<CallPage/>:<Navigate to= "/login"/>}/>
    <Route path="/chat" element={authUser ?<ChatPage />:<Navigate to= "/login"/>}/>
    <Route path="/setup" element={authUser ?<SetupPage />:<Navigate to= "/login"/>}/>
  </Routes>
  
    </div>;
  
};

export default App;