import express from 'express';
import 'dotenv/config';
import multer from 'multer';
import { geminiController } from '../../controllers/v1/gemini-controller.js';

// * Multer configuration
const upload = multer();

// * Create a router for articles APIs
const geminiRouter = express.Router();

// * Defining the routes for articles


// * Middleware to check the authentication
// geminiRouter.use(authMiddleware);

// * Routes for Admin Dashboard (protected routes)
geminiRouter.post('', upload.single('expImg'), geminiController.sendImageAndGetMathExpression);

// * Export the router
export { geminiRouter };