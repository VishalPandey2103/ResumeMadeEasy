import rateLimit from 'express-rate-limit';

// API rate limiter
export const generalLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,  // 5 minute window
    max: 20,                   // 20 requests per window per IP
    message: { message: 'Too many requests, please try again after 5 minutes.' },
    standardHeaders: true,      // sends RateLimit-* headers to client
    legacyHeaders: false,
});

// Strict limiter for AI routes — these cost money per call
export const aiLimiter = rateLimit({
    windowMs: 60 * 1000,        // 1 minute window
    max: 10,                    // 10 AI requests per minute per user
    keyGenerator: (req) => req.userId || req.ip,  // per user, not per IP
    message: { message: 'Too many AI requests. Please wait a minute before trying again.' },
    standardHeaders: true,
    legacyHeaders: false,
});