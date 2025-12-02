import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { UnauthorizedError } from "express-oauth2-jwt-bearer";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import RateLimitError from 'express-rate-limit';

// Custom error for a 404 Not Found
class NotFoundError extends Error {
  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
) => {
  console.error(`Error: ${err.name} - ${err.message} at ${req.originalUrl}`);

  // Handle Zod validation errors (422 Unprocessable Entity)
  if (err instanceof ZodError) {
    return res.status(422).json({
      error: "Validation Failed",
      message: "The request body or query parameters are invalid.",
      details: err.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  // Handle Auth0 unauthorized errors (401 Unauthorized)
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "You must be authenticated to access this resource.",
    });
  }

  // Handle Rate Limit errors (429 Too Many Requests)
  if (err instanceof RateLimitError) {
    return res.status(429).json({
      error: "Too Many Requests",
      message: "You have exceeded the API rate limit. Please try again later.",
    });
  }

  // Handle resource not found errors (404 Not Found)
  if (err instanceof NotFoundError) {
    return res.status(404).json({
      error: "Not Found",
      message: err.message,
    });
  }

  // Handle specific database errors (e.g., Prisma unique constraint violation)
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        error: "Conflict",
        message: "A resource with this value already exists.",
        details: err.meta?.target,
      });
    }
  }

  // Fallback for all other unhandled errors (500 Internal Server Error)
  return res.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred.",
  });
};

// Example 404 middleware to place before the final error handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`The requested URL ${req.originalUrl} was not found.`));
};