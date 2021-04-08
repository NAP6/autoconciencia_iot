import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { ReflectiveProcessQ } from "../../models/selfAwarness/qwertyModels/ReflectiveProcessQ";
import { CollectionMethodQ } from "../../models/selfAwarnessModels";

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
    var coll = new CollectionMethodQ(data.id, data.ColectionScope);
    await db.qwerty(coll.toSqlInsert([], []));
    var coll = new CollectionMethodQ(data.id, data.ColectionScope);
    await db.qwerty(coll.toSqlInsert([], []));
    res.json({});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
/*
public add_metodo_modelo(
    data: metodo_modelo_proceso,
    func: Function
  ): void {
    var idSup1;
    var idSup2;
    var sql = `INSERT INTO metodoaprendizajerazonamiento (pa_id,mea_tipo,met_id) VALUES ('${data.proceso_id}','${21}','${data.m_recoleccion.met_id}')`;
    console.log(sql);
    this.connector.query(sql, function (error, results) {
      if (error) throw error;
      var db = new mysql_connector();
      idSup1 = results.insertId;
      sql = `INSERT INTO metodoaprendizajerazonamiento (pa_id,mea_tipo,met_id) VALUES ('${data.proceso_id}','${22}','${data.m_modelo.met_id}')`;
      console.log(sql);
      db.connector.query(sql, function (error, results) {
        if (error) throw error;
        idSup2 = results.insertId;
        func([idSup1, idSup2])
        console.log(data.m_recoleccion);
        var sql4 = `INSERT INTO modeloanalisis (ma_tipo_recurso,cd_id,mea_id) VALUES ('${data.m_modelo.ma_tipo}','${data.m_modelo.criterio_id}','${idSup2}')`
        console.log(sql4);
        var db = new mysql_connector();
        db.connector.query(sql4, function (error, results) {
          if (error) throw error;
        });
      });

      console.log(data.m_recoleccion);
      var sql2 = `INSERT INTO metodorecoleccion (mr_tipo_comunicacion,pro_id,mr_alcance_recoleccion,mea_id) VALUES ('${data.m_recoleccion.mr_tipo}',${data.m_recoleccion.pro_id == undefined ? "NULL" : "'" + data.m_recoleccion.pro_id + "'"},'${data.m_recoleccion.pro_alcance}','${idSup1}')`;
      console.log(sql2);

      db.connector.query(sql2, function (error, results) {
        if (error) throw error;
      });
    })
  }
  */
