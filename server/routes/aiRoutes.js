import express from "express";
import protect from "../middlewares/authMiddleware.js";
// addtion of new controller for getting ATS score
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume, getATSScore } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary)
aiRouter.post('/ats-score', protect, getATSScore)
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription)
aiRouter.post('/upload-resume', protect, uploadResume)

export default aiRouter