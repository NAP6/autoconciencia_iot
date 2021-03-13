import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { UserQ } from "../../models/selfAwarnessModels";

export function singup(req: Request, res: Response) {
  if (req.session?.user) {
    res.redirect("/home");
  } else {
    res.render("singup", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      session: req.session,
    });
  }
}

export async function singup_save(req: Request, res: Response) {
  if (req.session?.user) {
    res.redirect("/home");
  } else {
    if (req.body.inputPassword == req.body.inputPassword2) {
      var usert = new UserQ(
        -1,
        req.body.inputName,
        req.body.inputDescription,
        req.body.inputEmailAddress,
        req.body.inputPassword
      );
      var db = new database2();
      await db.qwerty(usert.toSqlInsert([], []));
      req.flash("succes", "Usuario creado correctamente");
      res.redirect("/singup");
    } else {
      req.flash("error", "La claves ingresadas no conciden");
      res.redirect("/singup");
    }
  }
}
