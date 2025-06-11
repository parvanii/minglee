import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRandom } from "react-icons/fa";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeSetup } from "../lib/api";
import { LANGUAGES } from "../constants/index.js";
import { useNavigate } from "react-router-dom"; // ✅ Added

const ProfileSetup = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // ✅ Added
  const isOnboarding = !authUser?.isSetupComplete; // ✅ Added

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    nativeLanguage: authUser?.fluentIn || "",
    learningLanguage: authUser?.currLearning || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: setupMutation, isPending } = useMutation({
    mutationFn: completeSetup,
    onSuccess: () => {
      toast.success("Profile setup complete!", {
        style: {
          background: '#dcfce7',
          color: '#166534',
          fontSize: '13px',
          padding: '8px 12px',
          border: '1px solid #bbf7d0',
        },
        icon: '✅'
      });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error('Missing fields!', {
        style: {
          background: '#fef2f2',
          color: '#7f1d1d',
          border: '1px solid #fca5a5',
          fontSize: '13px',
          padding: '8px 12px'
        },
        icon: '❌',
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { learningLanguage, nativeLanguage } = formState;

    if (!learningLanguage || !nativeLanguage) {
      toast.error("Please select both fluent and learning languages.");
      return;
    }

    if (learningLanguage === nativeLanguage) {
      toast.error("Fluent and learning languages cannot be the same.");
      return;
    }

    const payload = {
      fullName: formState.fullName,
      bio: formState.bio,
      location: formState.location,
      profilePic: formState.profilePic,
      currLearning: learningLanguage,
      fluentIn: nativeLanguage,
    };

    setupMutation(payload);
  };

  const generateRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const avatarUrl = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: avatarUrl });
    toast.success("Random avatar generated!", {
      style: {
        background: '#dcfce7',
        color: '#166534',
        fontSize: '13px',
        padding: '8px 12px',
        border: '1px solid #bbf7d0',
      },
      icon: '✅'
    });
  };

  return (
    <div className="bg-[#925FF0] min-h-screen flex items-center justify-center px-4 font-inter">
      <motion.div
        className="bg-white rounded-[20px] shadow-lg w-full max-w-[600px] px-8 pt-6 pb-4 flex flex-col justify-start"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center text-[#925FF0] mb-4">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            {formState.profilePic ? (
              <img
                src={formState.profilePic}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-2" />
            )}

            <button
              type="button"
              onClick={generateRandomAvatar}
              className="w-[70%] mt-4 flex items-center justify-center gap-2 text-white bg-[#925FF0] hover:bg-[#7c49d2] px-4 py-2 rounded text-sm"
            >
              <FaRandom /> Generate Avatar
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formState.fullName}
              onChange={(e) =>
                setFormState({ ...formState, fullName: e.target.value })
              }
              className="w-full h-[40px] px-3 rounded-[8px] bg-[#f3f4f6] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0] text-sm"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formState.bio}
              onChange={(e) =>
                setFormState({ ...formState, bio: e.target.value })
              }
              className="w-full px-3 py-2 rounded-[8px] bg-[#f3f4f6] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0] text-sm"
              rows="2"
              placeholder="Tell others about yourself"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={(e) =>
                setFormState({ ...formState, location: e.target.value })
              }
              placeholder="City, Country"
              className="w-full h-[40px] px-3 rounded-[8px] bg-[#f3f4f6] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0] text-sm placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fluent In</label>
            <select
              value={formState.nativeLanguage}
              onChange={(e) =>
                setFormState({ ...formState, nativeLanguage: e.target.value })
              }
              className="w-full h-[40px] px-3 rounded-[8px] bg-[#f3f4f6] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0] text-sm text-gray-700"
            >
              <option value="" disabled className="text-gray-400">
                Select native language
              </option>
              {LANGUAGES.map((lang) => (
                <option key={`native-${lang}`} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Currently Learning</label>
            <select
              value={formState.learningLanguage}
              onChange={(e) =>
                setFormState({ ...formState, learningLanguage: e.target.value })
              }
              className="w-full h-[40px] px-3 rounded-[8px] bg-[#f3f4f6] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#925FF0] text-sm text-gray-700"
            >
              <option value="" disabled className="text-gray-400">
                Select language you're learning
              </option>
              {LANGUAGES.map((lang) => (
                <option key={`learning-${lang}`} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full bg-[#925FF0] hover:bg-[#7c49d2] text-white font-semibold h-[44px] rounded-[8px] shadow-md text-sm flex items-center justify-center disabled:opacity-60"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </motion.button>
        </form>

        {/* ✅ Back to Home Button */}
        {!isOnboarding && (
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-sm text-[#925FF0] underline hover:text-[#7c49d2] transition duration-200 self-center"
          >
            ← Back to Home
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileSetup;
