import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log(loginData);
  };

  return (
    <div className="bg-[#925FF0] min-h-screen flex items-center justify-center font-inter">
      <motion.div
        className="bg-white rounded-[20px] shadow-lg w-[469px] px-10 pt-8 pb-4 flex flex-col justify-start"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center mb-5">
          <div className="flex items-center space-x-1">
            <img src="/logo.png" alt="logo" className="w-[54px] h-[37px]" />
            <h1 className="text-[32px] font-bold text-[#925FF0]">Join Minglee</h1>
          </div>
          <p className="text-[13px] text-gray-500 text-center mt-1">Connect through languages</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="use@example.com"
              className="w-[371.33px] h-[48px] px-4 rounded-[8px] bg-[#f3f4f6] text-sm text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0]"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="password123"
              className="w-[371.33px] h-[48px] px-4 rounded-[8px] bg-[#f3f4f6] text-sm text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0]"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <div className="text-right mt-[4px]">
              <a href="#" className="text-[12px] text-[#925FF0] hover:underline">Forgot password?</a>
            </div>
          </div>
        </form>

        <motion.button
          type="submit"
          className="w-[371.33px] bg-[#925FF0] hover:bg-[#7a46e0] text-white font-semibold h-[48px] rounded-[8px] shadow-md text-sm mt-4"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign In
        </motion.button>

        <motion.div
          className="text-center text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-700">
            Don't have an account? <a href="#" className="text-[#925FF0] hover:underline">Sign up</a>
          </p>
          <p className="text-[12px] text-gray-400 mt-2">For demo: use@example.com / password123</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
