import { json } from "body-parser";
import { Console } from "console";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { PreReflectiveProcessQ } from "../../models/selfAwarness/qwertyModels/PreReflectiveProcessQ";
import { ScaleQ } from "../../models/selfAwarness/qwertyModels/ScaleQ";

export function pre_reflective_process(req: Request, res: Response) {
  res.render("proceso_pre_reflexivo", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export async function get_pre_reflective_process(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var pre_process: PreReflectiveProcessQ = new PreReflectiveProcessQ(
      -1,
      "",
      "",
      -1,
      new Date(),
      new Date()
    );
    var rows = await db.qwerty(pre_process.toSqlSelect([], []));
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_pre_reflective_process(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newProcess = req.body;
    var tipo_proceso = 17;
    var process: PreReflectiveProcessQ = new PreReflectiveProcessQ(
      -1,
      newProcess.nombre,
      newProcess.descripcion,
      tipo_proceso,
      newProcess.inicioP,
      newProcess.finP
    );
    process.active = newProcess.active;
    await db.qwerty(
      process.toSqlInsert(
        ["/@/ASPECTID/@/", "/@/SUBJECT/@/"],
        [newProcess.aspId, newProcess.sujId]
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
/*export async function upd_pre_reflexivos(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newScale = req.body;
    var scale: ScaleQ = new ScaleQ(
      newScale.id,
      newScale.name,
      newScale.valid_values,
      newScale.type
    );
    scale.active = newScale.active == 1;
    await db.qwerty(scale.toSqlUpdate([], []));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_scales(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newScale = req.body;
    var scale: ScaleQ = new ScaleQ(newScale.id, "", "", "");
    await db.qwerty(scale.toSqlDelete([]));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}*/
