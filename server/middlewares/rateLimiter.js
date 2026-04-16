import rateLimit from 'express-rate-limit';

// API rate limiter
export const generalLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,  // 5 minute window
    max: 30,                   // 30 requests per window per IP
    message: { message: 'Too many requests, please try again after 5 minutes.' },
    standardHeaders: true,  
    legacyHeaders: false,
});