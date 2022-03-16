import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, "c3bd66a5fd6dcdd64dc5c7c8f5d9c861");
    console.log(decoded);
  } catch {
    throw new Error("Invalid token!");
  }
}
