
// This example assumes you have an endpoint URL for the Gemini API and an API key.

import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function convertBlobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result.split(",")[1]) // Extract only the base64 part
		reader.onerror = reject
		reader.readAsDataURL(blob)
	})
}

// Function to send image to Gemini API and retrieve math expression result
async function sendImageAndGetMathExpression(base64Image) {
    const prompt = "Solve the following math expression and only provide the math expression and answer in single line: ";
    const image = {
      inlineData: {
        data: base64Image,
        mimeType: "image/png",
      },
    };
    
    const result = await model.generateContent([prompt, image]);
    console.log(result.response.text());

    return result.response.text();
}


async function sendImageAndGetExplanation(base64Image) {
    const prompt = "Explain the following if and only if it is a math expression: ";
    const image = {
      inlineData: {
        data: base64Image,
        mimeType: "image/png",
      },
    };
    
    const result = await model.generateContent([prompt, image]);
    console.log(result.response.text());

    return result.response.text();
}



export { sendImageAndGetMathExpression, convertBlobToBase64, sendImageAndGetExplanation};