import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { DataFlow } from "../../models/selfAwarness/DataFlow";
import { DirectMetric } from "../../models/selfAwarness/DirectMetric";
import { Indicator } from "../../models/selfAwarness/Indicator";
import { IndirectMetric } from "../../models/selfAwarness/IndirectMetric";
import { Property } from "../../models/selfAwarness/Property";
import { ReflectiveProcessQ } from "../../models/selfAwarness/qwertyModels/ReflectiveProcessQ";
import {
  AnalysisModelQ,
  CalculationMethodQ,
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

export async function add_metodo_modelo2(req: Request, res: Response) {
  if (req.session?.user) {
    var data = req.body;
    console.log(data);
    var db = new database2();
    var modeloID = req.session!.active_model.modelID;
    var calc = new CalculationMethodQ(-1, "");
    calc.produces = new IndirectMetric(data.m_calculo.met_id, "", "", "");
    calc.implementationResourceType = data.m_calculo.ma_tipo;
    calc.calculationPeriodStart = data.m_calculo.inicio;
    calc.calculationPeriodEnd = data.m_calculo.fin;
    var row1 = await db.qwerty(
      calc.toSqlInsert(["/@/PROCES/@/"], [data.proceso_id])
    );
    var anali = new AnalysisModelQ(-1, data.modelo.ma_tipo);
    anali.produces = new Indicator(data.modelo.met_id, "", "", "", "");
    var row2 = await db.qwerty(
      anali.toSqlInsert(
        ["/@/PROCES/@/", "/@/CRITERIA/@/"],
        [data.proceso_id, data.modelo.criterio_id]
      )
    );
    res.json([row1[0][0].id, row2[0][0].id]);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function get_reflective_process_mod(
  req: Request,
  res: Response
) {
  if (req.session?.user) {
    var db = new database2();
    var id = req.body.proceso_reflexivo_seleccionado;
	var rows= await db.qwerty(`SELECT 
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
    res.render("modificar_reflexivos", {
      error: req.flash("error"),
      succes: req.flash("succes"),
	    modificar:rows,
      session: req.session,
    });
	  console.log(rows[0]);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

