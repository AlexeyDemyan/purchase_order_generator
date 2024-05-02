import { Request, Response } from "express";

export interface Route {
  path: string;
  method: string;
  handler: (req: Request, res: Response) => void;
}
