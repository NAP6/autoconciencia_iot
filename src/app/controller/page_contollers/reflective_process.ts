import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { DataFlow } from "../../models/selfAwarness/DataFlow";
import { DirectMetric } from "../../models/selfAwarness/DirectMetric";
import { Indicator } from "../../models/selfAwarness/Indicator";
import { Property } from "../../models/selfAwarness/Property";
import { ReflectiveProcessQ } from "../../models/selfAwarness/qwertyModels/ReflectiveProcessQ";
import {
  AnalysisModelQ,
  CollectionMethodQ,
} from "../../models/selfAwarnessModels";

export function reflective_process(req: Request, res: Response) {
  res.render("procesos_reflexivos", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export async function get_reflective_process(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var modeloID = req.session!.active_model.modelID;
    var process_reflec: ReflectiveProcessQ = new ReflectiveProcessQ(
      -1,
      "",
      "",
      -1
    );
    var rows = await db.qwerty(
      process_reflec.toSqlSelect(["/@/MODEL/@/"], [modeloID])
    );
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_reflective_process(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newProcess = req.body;
    var tipo_proceso = 18;

    var modeloID = req.session!.active_model.modelID;
    var process: ReflectiveProcessQ = new ReflectiveProcessQ(
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
    process.active = true;
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
export async function del_reflective_process(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newProcess = req.body;
    var process_pre: ReflectiveProcessQ = new ReflectiveProcessQ(
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

export async function add_metodo_modelo(req: Request, res: Response) {
  if (req.session?.user) {
    var data = req.body;
    console.log(data);
    var db = new database2();
    var modeloID = req.session!.active_model.modelID;
    var coll = new CollectionMethodQ(-1, "");
    coll.produces = new DirectMetric(data.m_recoleccion.met_id, "", "", "", "");
    coll.isSupported = new DataFlow(
      data.m_recoleccion.flu_id,
      "",
      "",
      data.m_recoleccion.mr_tipo,
      ""
    );
    coll.collectsProperty = [new Property(data.m_recoleccion.pro_id, "")];
    var row1 = await db.qwerty(
      coll.toSqlInsert(
        ["/@/PROCES/@/", "/@/MODEL/@/", "/@/OBJECT/@/"],
        [data.proceso_id, modeloID, data.m_recoleccion.obj_id]
      )
    );
	  console.log(data.m_modelo.ma_tipo);
    var anali = new AnalysisModelQ(-1,data.m_modelo.ma_tipo);
    anali.produces = new Indicator(data.m_modelo.met_id, "", "", "", "");
    var row2 = await db.qwerty(
      anali.toSqlInsert(
        ["/@/PROCES/@/", "/@/CRITERIA/@/"],
        [data.proceso_id, data.m_modelo.criterio_id]
      )
    );
    res.json([row1.insertId, row2.insertId]);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
