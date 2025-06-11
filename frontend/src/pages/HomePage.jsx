import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";


import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  RefreshCcwIcon,
} from "lucide-react";

import { capitialize } from "../lib/utils";
import FriendCard,{ getLanguageFlag } from "../components/FriendCard";


import NoFriendsFound from "../components/NoFriendsFound";
import { motion } from "framer-motion";

const LANGUAGE_FACTS = [
  "There are over 7,000 languages spoken in the world today.",
  "The most widely spoken language is English, followed closely by Mandarin Chinese.",
  "Basque is a language isolate – it has no known relatives.",
  "The language with the most words is English, with over a million.",
  "Learning a second language can improve memory and cognitive skills.",
  "Arabic is written from right to left.",
  "The longest word in any language is in Sanskrit and has 195 characters.",
  "Mandarin Chinese is a tonal language—tone affects meaning.",
  "Inuit languages have over 50 words for snow.",
  "The Bible is the most translated book in the world.",
  "Esperanto was created in the 1880s to be a universal language.",
  "Wales has its own language: Welsh, which is a Celtic language.",
  "The Cherokee language has its own writing system invented by Sequoyah.",
  "Some languages like Hawaiian only have a small number of letters.",
  "Language influences how we perceive time and space.",
  "Many African languages use clicks as regular consonants.",
  "Japanese uses three writing systems: Hiragana, Katakana, and Kanji.",
  "The word 'alphabet' comes from the first two Greek letters: alpha and beta.",
  "Sign languages are full languages with their own grammar—not just gestures.",
  "Icelandic has changed very little since the Viking age.",
  "Tonal languages like Vietnamese use pitch to change word meaning.",
  "The Rosetta Stone helped decode Egyptian hieroglyphs.",
  "Languages borrow from each other—English has many French and Latin roots.",
  "Children are natural language learners during early development stages.",
  "Some endangered languages have fewer than 10 speakers left."
];


const getRandomFact = () => {
  const index = Math.floor(Math.random() * LANGUAGE_FACTS.length);
  return LANGUAGE_FACTS[index];
};

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [randomFact, setRandomFact] = useState(getRandomFact());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });
  
  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    if (outgoingFriendReqs) {
      console.log("Outgoing friend requests data:", outgoingFriendReqs);
      const outgoingIds = new Set();
      const requestsArray = outgoingFriendReqs.outgoingRequests || [];
      requestsArray.forEach((req) => {
        console.log("Recipient ID in outgoing request:", req.recipient._id);
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);
  
  

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-purple-50 min-h-screen">
      <div className="container mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-purple-700">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm text-purple-600 border-purple-300">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </motion.div>
        )}

        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-purple-700">Meet New Learners</h2>
              <p className="text-sm text-purple-600 opacity-80">Discover perfect language exchange partners based on your profile</p>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <motion.div layout className="card bg-purple-50 border border-purple-300 p-6 text-center rounded-xl shadow-sm">

              <h3 className="text-lg font-semibold text-purple-800 mb-2">No recommendations available</h3>
              <p className="text-sm text-purple-700">Check back later for new language partners!</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <motion.div layout key={user._id} className="card bg-white border border-purple-200 shadow-sm hover:shadow-md transition-all">
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full">
                          <img src={user.profilePic} alt={user.fullName} className="rounded-full" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-purple-800">{user.fullName}</h3>
                          {user.location && (
                            <div className="flex items-center text-xs text-purple-600 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">

                    
  <span className="badge bg-purple-200 text-purple-700 border border-purple-300">
    {getLanguageFlag(user.fluentIn)} Fluent In: {capitialize(user.fluentIn)}
  </span>
  <span className="badge bg-purple-100 text-purple-700 border border-purple-300">
    {getLanguageFlag(user.currLearning)} Currently Learning: {capitialize(user.currLearning)}
  </span>
</div>





                      {user.bio && <p className="text-sm text-purple-600">{user.bio}</p>}
                      <button
  disabled={hasRequestBeenSent || isPending}
  className={`
    btn w-full mt-2 bg-purple-600 text-white
    disabled:bg-purple-600 disabled:text-white disabled:opacity-70 disabled:cursor-not-allowed
  `}
  onClick={() => sendRequestMutation(user._id)}
>
  {hasRequestBeenSent ? (
    <>
      <CheckCircleIcon className="size-4 mr-2 text-white" />
      Request Sent
    </>
  ) : (
    <>
      <UserPlusIcon className="size-4 mr-2" />
      Send Friend Request
    </>
  )}
</button>




                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          <motion.div layout className="mt-10 p-6 bg-gradient-to-br from-purple-100 to-purple-200 border border-purple-300 rounded-xl shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-1">Did you know?</h3>
                <p className="text-base text-purple-800 leading-relaxed max-w-lg">{randomFact}</p>
              </div>
              <button
               className="btn btn-sm ml-4 text-white bg-purple-600 border-purple-600 hover:bg-purple-700"

                onClick={() => setRandomFact(getRandomFact())}
              >
                <RefreshCcwIcon className="size-4 mr-1" /> Refresh
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;