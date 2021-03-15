import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { SelfAwarnessQ } from "../../models/selfAwarnessModels";

export async function active_model(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var db = new database2();
  var model: SelfAwarnessQ | SelfAwarnessQ[] = new SelfAwarnessQ(
    -1,
    "",
    "",
    "",
    ""
  );
  var rows = await db.qwerty(
    model.toSqlSelect(["/@/MODEL/@/"], [req.body.select_model])
  );
  model = model.toObjectArray(rows);
  if (model.length > 0) {
    model = model[0];
    req.session!.active_model = {
      nombre: model.name,
      descripcion: model.description,
      modelID: model.id,
    };
  }
  next();
}

export function home(req: Request, res: Response) {
  res.render("principal", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
