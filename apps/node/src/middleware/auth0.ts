import { auth } from "express-oauth2-jwt-bearer";
import dotenv from 'dotenv'

dotenv.config();

const audience: string | undefined = process.env.AUDIENCE;
const issuerBaseUrl: string | undefined= process.env.ISSUERBASEURL;
const tokenSigningAlg: string | undefined = process.env.TOKENSIGNINGALG;

export const jwtCheck = auth({
  audience: audience,
  issuerBaseURL: issuerBaseUrl,
  tokenSigningAlg: tokenSigningAlg
});
