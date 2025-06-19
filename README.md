
## 🌍 Minglee — Connect Through Languages

**Minglee** is a language exchange platform designed to help users connect with language learners and native speakers worldwide. Whether you're fluent in Spanish and want to learn Japanese, or you're just beginning your French journey, Minglee enables real-time communication, friendship-building, and language practice — all in one place.

### 🧠 What Makes Minglee Special?

* 🔤 **Personalized Language Profiles**
  During onboarding, users set:

  * **"Fluent In"**: One language they can confidently speak.
  * **"Currently Learning"**: One language they're actively trying to improve.
    This ensures relevant and targeted friend suggestions.

* 📄 **Smooth Onboarding**
  After signup and login, users complete a guided profile setup including language preferences and a custom avatar (with image upload or random generation).

* 💬 **Real-Time Messaging & Video Chat**
  Powered by **Stream**, users can:

  * Chat in real time
  * Hop on 1:1 **video calls**
  * Build friendships while practicing conversation

* 👥 **Friend System**
  Send, receive, and accept friend requests to build your network of language partners.

* 🔐 **JWT Authentication**
  Secured login and protected routes using **JSON Web Tokens** to keep user data safe.

* 🚦 **Protected Routes**
  Access to certain pages and features is restricted unless authenticated.

---

## 🔧 Tech Stack

| Category         | Technology Used                                                |
| ---------------- | -------------------------------------------------------------- |
| Frontend         | React, Tailwind CSS, **DaisyUI**, **TanStack Query**, Toastify |
| Backend          | Node.js, Express, MongoDB                                      |
| Real-Time Engine | **Stream** (Chat & Video Call APIs)                            |
| Auth             | JWT                                                            |
| Testing          | Postman                                                        |
| Deployment       | Render                                                         |

---

## ⚙️ Additional Features

* ✅ **CORS Configuration**
  Seamless cross-origin communication between frontend and backend.

* 🌟 **Toast Notifications**
  Real-time feedback on user actions using toast alerts (e.g., request sent, errors, etc.).

* ⚡ **API Caching & Fetching**
  Built with **TanStack Query** for optimized API data fetching, caching, and updating.

---

## 📁 Project Structure

```
minglee/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── constants/
│   └── main.jsx
```

---

## 🔐 .env Setup

### 📦 Backend (`/backend`)

```
PORT=5001
MONGO_URI=your_mongo_uri
STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```

### 🌐 Frontend (`/frontend`)

```
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## 🧪 Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Live Demo

🔗 **Deployed Site**: [https://minglee.onrender.com](https://minglee.onrender.com)



