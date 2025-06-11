import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useSignUp from '../hooks/useSignUp';

const SignUpPage = () => {
  const [signUpData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const navigate = useNavigate();
  const { signupMutation, isPending, error } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setPasswordError("You must agree to the terms and privacy policy");
      return;
    }

    setPasswordError("");
    signupMutation(signUpData, {
      onSuccess: () => {
        toast.success("Account created successfully!", {
          style: {
            background: '#dcfce7',
            color: '#166534',
            fontSize: '13px',
            padding: '8px 12px',
            border: '1px solid #bbf7d0',
          },
          icon: '✅',
        });
        navigate('/');
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Signup failed.", {
          style: {
            background: '#fef2f2',
            color: '#7f1d1d',
            fontSize: '13px',
            padding: '8px 12px',
            border: '1px solid #fca5a5',
          },
          icon: '❌',
        });
      }
    });
    
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
          <p className="text-[13px] text-gray-500 text-center mt-4">
            Create your account to start connecting
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 mt-2">
          <InputField
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={signUpData.fullName}
            onChange={(val) => setSignupData({ ...signUpData, fullName: val })}
          />

          <InputField
            label="Email"
            type="email"
            placeholder="email@example.com"
            value={signUpData.email}
            onChange={(val) => setSignupData({ ...signUpData, email: val })}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            value={signUpData.password}
            onChange={(val) => setSignupData({ ...signUpData, password: val })}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={signUpData.confirmPassword}
            onChange={(val) => setSignupData({ ...signUpData, confirmPassword: val })}
          />

       
<div className="flex items-center gap-3 mt-5">
  <input
    type="checkbox"
    className="w-4 h-4"
    checked={agreedToTerms}
    onChange={(e) => setAgreedToTerms(e.target.checked)}
    required
  />
  <p className="text-xs text-gray-600">
    I agree to the <span className="text-[#925FF0] underline">terms of service</span> and <span className="text-[#925FF0] underline">privacy policy</span>.
  </p>
</div>



          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <div className="pt-4">
            <motion.button
              type="submit"
              className="w-full bg-[#925FF0] hover:bg-[#7a46e0] text-white font-semibold h-[48px] rounded-[8px] shadow-md text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </motion.button>
            {error && (
              <p className="text-red-500 text-sm mt-2">
                {error?.response?.data?.message || "Signup failed. Please try again."}
              </p>
            )}
          </div>
        </form>

        <motion.div
          className="text-center text-sm mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
         <p className="text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-[#925FF0] hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const InputField = ({ label, type, placeholder, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-[48px] px-4 rounded-[8px] bg-[#f3f4f6] text-sm text-gray-700 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  </div>
);

export default SignUpPage;
