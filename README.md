# ResumeMadeEasy

A full-stack web application to create, edit, and share professional resumes with AI-powered content enhancement.

## Features

- 🔐 JWT-based authentication — register and login securely
- 📄 Create multiple resumes with custom titles
- 🤖 AI-powered professional summary and job description enhancement (Gemini via OpenAI-compatible API)
- 📤 Import existing resume from PDF — AI extracts and fills all fields automatically
- 🎨 5 resume templates — Classic, Modern, Minimal, Minimal Image, Academic
- 🎨 Custom accent color picker
- 🖼️ Profile photo upload with optional AI background removal (ImageKit)
- 🔗 Public share link — make your resume publicly accessible via a URL
- 📥 Download resume as PDF

## Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS v4
- Redux Toolkit
- React Router v7
- Axios

**Backend**
- Node.js + Express v5
- MongoDB + Mongoose
- JWT Authentication
- Multer + ImageKit (file uploads)
- OpenAI-compatible interface (Gemini)

## Project Structure
```
resumemadeeasy/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── app/         # Redux store + slices
│       └── configs/     # Axios instance
└── server/          # Express backend
    ├── controllers/
    ├── routes/
    ├── models/
    ├── middlewares/
    └── configs/
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB URI
- ImageKit account
- Gemini API key

### Setup
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Variables

Create `server/.env` based on `server/.env.example`:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
OPENAI_API_KEY=your_gemini_api_key
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=gemini-2.0-flash
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key