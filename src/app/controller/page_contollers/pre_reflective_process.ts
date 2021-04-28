import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { PreReflectiveProcessQ } from "../../models/selfAwarness/qwertyModels/PreReflectiveProcessQ";
import { Indicator } from "../../models/selfAwarness/Indicator";
import { Property } from "../../models/selfAwarness/Property";
import {
  AnalysisModelQ,
  CollectionMethodQ,
} from "../../models/selfAwarnessModels";
import { DataFlow } from "../../models/selfAwarness/DataFlow";
import { DirectMetric } from "../../models/selfAwarness/DirectMetric";
export function pre_reflective_process(req: Request, res: Response) {
  res.render("proceso_pre_reflexivo", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
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
    var anali = new AnalysisModelQ(-1, data.m_modelo.ma_tipo);
    anali.produces = new Indicator(data.m_modelo.met_id, "", "", "", "");
    var row2 = await db.qwerty(
      anali.toSqlInsert(
        ["/@/PROCES/@/", "/@/CRITERIA/@/"],
        [data.proceso_id, data.m_modelo.criterio_id]
      )
    );
    var resp = [row1[0][0].id, row2[0][0].id];
    console.log(resp);
    res.json(resp);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function get_pre_reflective_process(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();

    var modeloID = req.session!.active_model.modelID;
    var pre_process: PreReflectiveProcessQ;
    pre_process = new PreReflectiveProcessQ(-1, "", "", -1);
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
export async function get_pre_reflective_process_mod(
  req: Request,
  res: Response
) {
  if (req.session?.user) {
    var db = new database2();
    var id = req.body.proceso_seleccionado;
    res.render("modificar_pre_reflexivos", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      session: req.session,
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function get_last_insert_process(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var rows = await db.qwerty(
      `SELECT MAX(pa_id) as id FROM procesoautoconsciencia`
    );
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
