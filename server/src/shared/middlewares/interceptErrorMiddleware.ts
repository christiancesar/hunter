import { ZodError } from "zod";
import { AppError } from "../errors/AppError";
import { NextFunction, Request, Response } from "express";

export function interceptErrorMiddleware(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response<any, Record<string, any>> {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      code: err.code,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return response.status(400).json({
      status: "error",
      message: "Validation error.",
      issues: err.format(),
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}
