import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log("Request Middleware", req.method);
  console.log("Request URL", req.url);

  next();
  return;
}
