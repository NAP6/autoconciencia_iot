import { Request, Response, NextFunction } from "express";

export function loggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.session!.user) {
    if (req.session!.active_model) {
      next();
    } else {
      res.redirect("/start_session");
    }
  } else {
    res.redirect("/login");
  }
}
