import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { SelfAwarnessQ } from "../../models/selfAwarnessModels";
import * as fs from "fs";
import { parseString } from "xml2js";
import { JSON2Architecture } from "../../models/JSON2Architecture";
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

  var user: UserQ | UserQ[] = new UserQ(-1, "","", "");
  var rows = await db.qwerty(
    user.toSqlSelect(
      ["/@/MAIL/@/", "/@/PASSWRD/@/"],
      [email_user, password_user]
    )
  );
  user = user.toObjectArray(rows);
  if (user.length == 1) {
    req.session!.user = user[0];
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
    page: "save_new_model",
  });
}

export async function save_new_model(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session!.user) {
    var nombre = req.body.nombre_modelo;
    var descripcion = req.body.descripcion_ecenario;
    var autor = req.body.autor_modelo;
    var user_id = req.session?.user._id;
    var db2 = new database2();
    var json: Object = [];
    try {
      const xml = fs.readFileSync(req.file.path);
      parseString(xml, function (err: Error, result: Object) {
        if (err) throw err;
        json = result;
      });
      fs.unlink(req.file.path, (err) => {
        if (err) throw err;
      });
    } catch (error) {
      console.log("No se ha ingresado ningun valor");
    }
    var arquitectura = new JSON2Architecture(json);
    var modelo = new SelfAwarnessQ(
      -1,
      nombre,
      descripcion,
      autor,
      JSON.stringify(json, null, "  ")
    );
    var rows = await db2.qwerty(
      modelo.toSqlInsert(["/@/USER/@/"], [user_id.toString()])
    );
    db2.architecture(arquitectura, rows.insertId.toString());
    req.session!.active_model = {
      nombre: modelo.name,
      descripcion: modelo.description,
      modelID: rows.insertId.toString(),
    };
    next();
  } else {
    res.redirect("/login");
  }
}
