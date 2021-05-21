import { Request, Response, NextFunction } from "express";

export function logout(req: Request, res: Response, next: NextFunction) {
  delete req.session?.user;
  delete req.session?.active_model;
  res.redirect("/login");
}
