import rateLimit from 'express-rate-limit'
// Set up rate limiter: maximum of 100 requests per 3 minutes per IP
export const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 3 minutes)
  message: "Too many requests from this IP, please try again after 3 minutes",
});