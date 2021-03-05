import { Request, Response, NextFunction } from "express";

export function login(req: Request, res: Response) {
  if (req.session?.user) {
    res.redirect("/home");
    req.flash("error");
    req.flash("succes");
  } else {
    res.render("login", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      session: req.session,
    });
  }
}
