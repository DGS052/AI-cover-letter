require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { PDFParse } = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/generate', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file || !req.body.jobDesc) return res.status(400).json({ error: "Missing resume or job description" });

        const parser = new PDFParse({ data: req.file.buffer });
        const pdfData = await parser.getText();
        await parser.destroy(); // Free memory

        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `Write a professional cover letter for a candidate with this Resume Content: \n"${pdfData.text}"\n\n Applying for this Job Description: \n"${req.body.jobDesc}"\n\n Keep it concise and professional.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        res.json({ letter: response.text() });
    } catch (error) {
        console.error("FULL ERROR:", JSON.stringify(error, null, 2));
        console.error("Error Message:", error.message);
        res.status(500).json({ error: error.message || JSON.stringify(error) || "Generation failed" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));