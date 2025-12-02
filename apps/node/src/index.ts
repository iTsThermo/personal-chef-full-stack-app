import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRouter from "./ingredients";
import aiRouter from "./recipes";
import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { limiter } from "./middleware/ratelimiter";
import { jwtCheck } from "./middleware/auth0";
import { errorHandler } from "./middleware/errorhandler";

dotenv.config();

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

// Express Essentials
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom Middleware
app.use(limiter)
app.use(jwtCheck)


app.use("/ingredients", apiRouter)
app.use("/recipe", aiRouter)

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
