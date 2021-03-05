import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { UserQ } from "../../models/selfAwarnessModels";

export async function start_session(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session!.user) {
    next();
  }
  var db = new database2();
  var email_user = req.body.email;
  var password_user = req.body.password;

  var user: UserQ | UserQ[] = new UserQ(-1, "", "", "", "");
  var rows = await db.qwerty(
    user.toSqlSelect(
      ["/@/MAIL/@/", "/@/PASSWRD/@/"],
      [email_user, password_user]
    )
  );
  user = user.toObjectArray(rows);
  if (user.length == 1) {
    req.session!.user = user[0];
    console.log(req.session!.user);
    req.flash("error", "");
    req.flash("succes", "Bienvenido de vuelta");
    next();
  } else {
    req.flash("error", "El usuario no es valido");
    req.flash("succes", "");
    res.redirect("/login");
  }
}

export function select_model(req: Request, res: Response) {
  res.render("select_model", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
    page: "select_model",
  });
}
