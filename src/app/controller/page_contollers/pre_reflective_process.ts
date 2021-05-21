import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { PreReflectiveProcessQ } from "../../models/selfAwarness/qwertyModels/PreReflectiveProcessQ";
import { Indicator } from "../../models/selfAwarness/Indicator";
import { Property } from "../../models/selfAwarness/Property";
import {
  AnalysisModelQ,
  CollectionMethodQ,
  SelfAwarnessQ,
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
export async function mod_pre_reflective_process(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newProcess = req.body;
    var process: PreReflectiveProcessQ = new PreReflectiveProcessQ(
      newProcess.id,
      newProcess.name,
      newProcess.description,
      newProcess.type
    );
    if (newProcess.inicioP) {
      process.executionPeriodStart = newProcess.inicioP;
    }
    if (newProcess.finP) {
      process.executionPeriodEnd = newProcess.finP;
    }
    await db.qwerty(process.toSqlUpdate([], []));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
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
    var rows = await db.qwerty(`SELECT 
		  pa.pa_id as id,
		  pa.pa_nombre as nombre, 
		  pa.pa_descripcion as descripcion, 
		  DATE_FORMAT(pa.pa_inicio_periodo_ejecucion,"%Y-%m-%d") as inicio, 
		  DATE_FORMAT(pa.pa_fin_periodo_ejecucion,"%Y-%m-%d") as fin,
		  pa.aa_id as aspecto,
		  pa.suj_id as sujeto,
		  suj.suj_nombre as sujeto_nombre
		  FROM
		  sujeto suj,
		  procesoautoconsciencia pa
		  WHERE pa_id=${id} AND pa.suj_id=suj.suj_id`);
    res.render("modificar_pre_reflexivos", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      modificar: rows,
      session: req.session,
    });
    console.log(rows[0]);
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
export async function get_metodos_recoleccion_analisis(
  req: Request,
  res: Response
) {
  if (req.session?.user) {
    var db = new database2();
    var id = req.body.id;
    var rows = await db.qwerty(`SELECT 
		  mea_id as metodo_id,
		  met_id as metrica_id,
		  mea_tipo as tipo
		  FROM
		   metodoaprendizajerazonamiento
		  WHERE pa_id=${id}`);
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function get_recoleccion_datos(
  req: Request,
  res: Response
) {
  if (req.session?.user) {
    var db = new database2();
    var id = req.body.mea_id;
    var rows = await db.qwerty(`SELECT 
		  mr_tipo_comunicacion as comunicacion,
		  pro_id as propiedad,
		  flu_id as flujo
		  FROM
		   metodorecoleccion
		  WHERE mea_id=${id}`);
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function get_model_analisis(
  req: Request,
  res: Response
) {
  if (req.session?.user) {
    var db = new database2();
    var id = req.body.mea_id;
    var rows = await db.qwerty(`SELECT 
		  ma_tipo_recurso as recurso,
		  cd_id as criterio
		  FROM
		   modeloanalisis
		  WHERE mea_id=${id}`);
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
