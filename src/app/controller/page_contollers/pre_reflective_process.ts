import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { PreReflectiveProcessQ } from "../../models/selfAwarness/qwertyModels/PreReflectiveProcessQ";

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

    var modeloID = req.session!.active_model.modelID;
    var pre_process: PreReflectiveProcessQ = new PreReflectiveProcessQ(
      -1,
      "",
      "",
      -1
    );
    var rows = await db.qwerty(
      pre_process.toSqlSelect(["/@/MODEL/@/"], [modeloID])
    );
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

    var modeloID = req.session!.active_model.modelID;
    var process: PreReflectiveProcessQ = new PreReflectiveProcessQ(
      -1,
      newProcess.nombre,
      newProcess.descripcion,
      tipo_proceso
    );
    if (newProcess.inicioP) {
      process.executionPeriodStart = newProcess.inicioP;
    }
    if (newProcess.finP) {
      process.executionPeriodEnd = newProcess.finP;
    }
    process.active = newProcess.active;
    var rows = await db.qwerty(
      process.toSqlInsert(
        ["/@/ASPECTID/@/", "/@/SUBJECT/@/", "/@/MODEL/@/"],
        [newProcess.aspId, newProcess.sujId, modeloID]
      )
    );
    res.json(rows);
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
}*/
export async function del_pre_reflective_process(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newProcess = req.body;
    var process_pre: PreReflectiveProcessQ = new PreReflectiveProcessQ(
      newProcess.id,
      "",
      "",
      -1
    );
    await db.qwerty(process_pre.toSqlDelete([]));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
