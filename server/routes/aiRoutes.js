import express from "express";
import protect from "../middlewares/authMiddleware.js";
// addtion of new controller for getting ATS score
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume, getATSScore } from '../controllers/aiController.js';
import { aiLimiter } from "../middlewares/rateLimiter.js";

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, aiLimiter,enhanceProfessionalSummary)
aiRouter.post('/ats-score', protect, aiLimiter,getATSScore)
aiRouter.post('/enhance-job-desc', protect, aiLimiter, enhanceJobDescription)
aiRouter.post('/upload-resume', protect, aiLimiter, uploadResume)

export default aiRouter