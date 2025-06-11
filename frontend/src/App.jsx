import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SetupPage from "./pages/SetupPage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import PageLoader from "./components/PageLoader.jsx";
import Layout from "./components/Layout.jsx";
import { Toaster } from "react-hot-toast";
import useAuthUser from "./hooks/useAuthUser.js";



const App = () => {
  const { isLoading, authUser} = useAuthUser();

  const isAuth = Boolean(authUser);
  const isOnboarded = authUser?.isSetupComplete;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen">
 
        <Routes>
          {/* Auth routes */}
          <Route
            path="/login"
            element={
              !isAuth ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/setup"} />
            }
          />
          <Route
            path="/signup"
            element={
              !isAuth ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/setup"} />
            }
          />
          <Route
            path="/setup"
            element={isAuth ? <SetupPage /> : <Navigate to="/login" />}
          />
  
          {/* Protected routes */}
          {isAuth && isOnboarded && (
            <Route element={<Layout showSidebar={true} />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/friends" element={<FriendsPage />} />
            </Route>
          )}
  
          {/* Chat route */}
          <Route
            path="/chat/:id"
            element={
              !isAuth ? (
                <Navigate to="/login" />
              ) : !isOnboarded ? (
                <Navigate to="/setup" />
              ) : (
                <Layout showSidebar={false}>
                  <ChatPage />
                </Layout>
              )
            }
          />
  
          {/* Call route */}
          <Route
            path="/call/:id"
            element={
              isAuth && isOnboarded ? (
                <CallPage />
              ) : (
                <Navigate to={!isAuth ? "/login" : "/setup"} />
              )
            }
          />
  
          {/* Fallback */}
          <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} />} />
        </Routes>
  
        <Toaster />
     
    </div>
  );
  
};

export default App;
