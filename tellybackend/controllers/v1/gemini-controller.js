import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';



const { ObjectId } = mongoose.Types;

const geminiController = {};

geminiController.sendImageAndGetMathExpression = async (req, res) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const base64Image = req.file.buffer.toString('base64');

    const prompt = "Solve the following math expression and only provide the math expression and answer in single line: ";
    const image = {
      inlineData: {
        data: base64Image,
        mimeType: "image/png",
      },
    };
    
    const result = await model.generateContent([prompt, image]);
    console.log(result.response.text());

    return res.status(200).json({
        message: "Math expression and answer generated successfully",
        data: result.response.text(),
    });
}


// ? Export the articlesController
export { geminiController };