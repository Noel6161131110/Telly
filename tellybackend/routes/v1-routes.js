import { geminiRouter } from "./v1/gemini-routes.js";
import express from "express";

const v1Router = express.Router();

v1Router.use("/gemini", geminiRouter);

export { v1Router };