import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const SignUpPage = () => {
  const [signUpData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log(signUpData);
  };

  return (
    <div className="bg-[#925FF0] min-h-screen flex items-center justify-center font-inter">
      <motion.div 
        className="bg-white rounded-[20px] shadow-lg w-[469px] h-auto px-10 pt-8 pb-6 flex flex-col justify-start"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-1">
            <img src="/logo.png" alt="logo" className="w-[54px] h-[37px]" />
            <h1 className="text-[32px] font-bold text-[#925FF0]">Join Minglee</h1>
          </div>
          <p className="text-[13px] text-gray-500 text-center mt-4">Create your account to start connecting</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 mt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-[371.33px] h-[48px] px-4 rounded-[8px] bg-[#f3f4f6] text-sm text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0]"
              value={signUpData.fullName}
              onChange={(e) => setSignupData({ ...signUpData, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-[371.33px] h-[48px] px-4 rounded-[8px] bg-[#f3f4f6] text-sm text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0]"
              value={signUpData.email}
              onChange={(e) => setSignupData({ ...signUpData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-[371.33px] h-[48px] px-4 rounded-[8px] bg-[#f3f4f6] text-sm text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0]"
              value={signUpData.password}
              onChange={(e) => setSignupData({ ...signUpData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-[371.33px] h-[48px] px-4 rounded-[8px] bg-[#f3f4f6] text-sm text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0]"
              value={signUpData.confirmPassword}
              onChange={(e) => setSignupData({ ...signUpData, confirmPassword: e.target.value })}
            />
          </div>

          <div className="pt-4">
            <motion.button 
              type="submit" 
              className="w-[371.33px] bg-[#925FF0] hover:bg-[#7a46e0] text-white font-semibold h-[48px] rounded-[8px] shadow-md text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.button>
          </div>
        </form>

        <motion.div 
          className="text-center text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-700">
            Already have an account? <a href="#" className="text-[#925FF0] hover:underline">Sign in</a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
