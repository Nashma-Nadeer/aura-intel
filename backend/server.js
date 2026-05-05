const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// In-memory store for document context
let documentContext = "";

app.get('/', (req, res) => {
    res.send('Aura Intel API is active! 🧠');
});

// File Upload & Parsing Endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const filePath = req.file.path;
        const fileBuffer = fs.readFileSync(filePath);
        
        let extractedText = "";

        if (req.file.mimetype === 'application/pdf') {
            const data = await pdf(fileBuffer);
            extractedText = data.text;
        } else {
            extractedText = fileBuffer.toString();
        }

        documentContext = extractedText;
        
        // Clean up temp file
        fs.unlinkSync(filePath);

        console.log(`[INTEL] File processed. Length: ${extractedText.length} characters.`);
        res.json({ message: 'File uploaded and parsed successfully!', length: extractedText.length });
    } catch (error) {
        console.error('Processing error:', error);
        res.status(500).json({ error: 'Failed to process file' });
    }
});

// Chat Endpoint
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!documentContext) {
        return res.status(400).json({ error: 'Please upload a document first!' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `
            You are "Aura Intel", an AI project brain. 
            Below is the context from a document provided by the user. 
            Use this context to answer the user's question accurately. 
            If the answer is not in the document, say you don't know based on the provided text, but try to be helpful.

            --- DOCUMENT CONTEXT ---
            ${documentContext.substring(0, 30000)} 
            --- END OF CONTEXT ---

            User Question: ${message}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error('Gemini error:', error);
        res.status(500).json({ error: 'AI failed to respond' });
    }
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Aura Intel Server running on http://localhost:${PORT}`);
});
