import { axiosInstance } from "./axios";
import { StreamChat } from "stream-chat";
const apiKey = import.meta.env.VITE_STREAM_API_KEY;
const client = StreamChat.getInstance(apiKey);

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout= async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};


export const completeSetup=async(userData)=>{
const response= await axiosInstance.post("/auth/setup",userData);
return response.data;
}

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get('/users/outgoingfriendRequests');
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friendRequest/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friendRequests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friendRequest/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
export async function getOnlineFriends(friendIds) {
  if (!friendIds || friendIds.length === 0) return [];

  const { users } = await client.queryUsers({
    id: { $in: friendIds },
    online: true,
  });

  return users;
}