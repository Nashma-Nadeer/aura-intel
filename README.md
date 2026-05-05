# 🧠 Aura Intel: AI-Powered Project Brain

**Aura Intel** is a sophisticated AI-driven assistant that gives your project files a "voice." It allows you to upload documents (PDFs, code files, or text) and interact with them through a real-time, intelligent chat interface powered by **Google Gemini 1.5 Flash**.

![Aura Intel Preview](https://raw.githubusercontent.com/Nashma-Nadeer/aura-intel/main/preview.png)

## 🚀 Key Features

### 📄 Contextual Document Intelligence
Upload any PDF or text-based file, and Aura Intel will parse its content instantly. It builds a contextual "brain" for that session, allowing you to ask specific questions about the data.

### 💬 Intelligent AI Chat
- **Deep Understanding**: Powered by Gemini 1.5 Flash for high-speed, accurate responses.
*   **Summarization**: Get instant summaries of long documents.
*   **Code Explanation**: Upload a script and have the AI explain it line-by-line.
*   **Insight Extraction**: Identify key dates, names, or metrics from raw text.

### 🎨 Minimalist "Intel" Design
- **Sophisticated Aesthetics**: A deep indigo and cyan design system with glowing ambient backgrounds.
- **Glassmorphism**: A floating, blurred interface that feels modern and lightweight.
- **Fluid Animations**: Smooth chat transitions and message entries using **Framer Motion**.

### 🛠️ Developer-First Tech
- **Real-time Parsing**: On-the-fly PDF text extraction.
- **Secure Handling**: Files are processed in memory and never stored permanently.
- **Markdown Support**: Rich AI responses with bold text, lists, and formatted code blocks.

## 🛠️ Tech Stack

- **Frontend**: Vite, React, Framer Motion, React-Markdown.
- **Backend**: Node.js, Express, Multer, PDF-Parse.
- **AI**: Google Generative AI (Gemini 1.5 Flash).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A **Google Gemini API Key** (Get one for free at [aistudio.google.com](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nashma-Nadeer/aura-intel.git
   cd aura-intel
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file and add your GEMINI_API_KEY
   node server.js
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

Built with intelligence by [Nashma Nadeer](https://github.com/Nashma-Nadeer)
