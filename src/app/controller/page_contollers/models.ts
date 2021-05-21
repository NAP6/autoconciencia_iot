import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { SelfAwarnessQ } from "../../models/selfAwarnessModels";

export function models(req: Request, res: Response) {
  res.render("models", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
    page: "models",
  });
}

export async function update_model(req: Request, res: Response) {
  var db = new database2();
  var model = new SelfAwarnessQ(
    req.body.id_modelo_update,
    req.body.nombre_modelo_update,
    req.body.descripcion_ecenario_update,
    "",
    ""
  );
  model.active = req.body.activoModelo != undefined;
  db.qwerty(model.toSqlUpdate([], []));
  res.render("models", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
    page: "models",
  });
}
