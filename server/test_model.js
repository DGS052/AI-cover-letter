const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // Just try to generate something simple to see if it works or catch error
        // Actually SDK doesn't have listModels directly exposed easily in all versions without using ModelManager?
        // Let's use the error message suggestion if possible, but the SDK structure is usually:
        // const model = genAI.getGenerativeModel(...)

        // There isn't a direct listModels on the client instance in some versions.
        // But I can try 'gemini-pro' which is standard.

        console.log("Trying gemini-pro...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await modelPro.generateContent("Hello");
        console.log("gemini-pro works: ", result.response.text());
    } catch (error) {
        console.error("Error:", error.message);
    }
}

listModels();
