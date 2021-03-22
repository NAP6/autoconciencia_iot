import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import {
  ImplementationResourceQ,
  FormulaQ,
} from "../../models/selfAwarnessModels";

export async function deployment_resources(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var impRes = new ImplementationResourceQ(-1, "", "", "");
    var rows = await db.qwerty(impRes.toSqlSelect([], []));
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function add_deployment_resources(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var data = req.body;
    var impRes = new ImplementationResourceQ(
      -1,
      data.nombre,
      data.descripcion.replace("'", "\\'"),
      data.tipoRecurso
    );
    /*if (json.tipoRecurso == "0") {
      var formula = new FormulaQ(id, name, descripcion, returnType, expression);
      await db.qwerty(formula.toSqlInsert([], []));
    } else if (json.tipoRecurso == "1") {
    } else if (json.tipoRecurso == "2") {
    }
    //res.json(json); */
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

////////////////////////////////////////////
/*
  public add_deployment_resources(json: resource, func: Function) {
    var sql = `INSERT INTO recursoimplementacion (ri_nombre, ri_descripcion, ri_tipo_dato_salida, ri_tipo_recurso) VALUES ('${json.nombre}', '${json.descripcion.replace("'", "\\'")}', '${json.EspecificoTipo.datoSalida}', '${json.tipoRecurso}');`;
    this.connector.query(sql, (err, result) => {
      if (err) throw err;
      console.log(json);
      if (json.tipoRecurso == "0") {
        sql = `INSERT INTO formula (for_expresion,ri_id) VALUES ('${json.EspecificoTipo.formula}','${result.insertId}');`;
        this.connector.query(sql, (err, result) => {
          if (err) throw err;
        });
      } else if (json.tipoRecurso == "1") {
        sql = `INSERT INTO funcion (fun_instrucciones,fun_pre_existente, ri_id) VALUES ('${json.EspecificoTipo.instrucciones}','${json.EspecificoTipo.preExistent ? 1 : 0}', '${result.insertId}');`;
        this.connector.query(sql, (err, result) => {
          if (err) throw err;
        });
      } else if (json.tipoRecurso == "2") {
        sql = `INSERT INTO servicio (ser_punto_final, ser_instrucciones,ser_pre_existente, ser_tipo_formato_dato_salida, ri_id) VALUES ('${json.EspecificoTipo.endPoint}', '${json.EspecificoTipo.instrucciones}','${json.EspecificoTipo.preExistent ? 1 : 0}', '${json.EspecificoTipo.formatoSalida}', '${result.insertId}')`;

        this.connector.query(sql, (err, result) => {
          if (err) throw err;
        });
      }
      json.arregloParametros.forEach((parametro) => {
        sql = `INSERT INTO parametro (par_ordinal, par_nombre, par_opcional, par_activo, par_tipo_dato, ri_id) VALUES ('${parametro!.ordinal
          }', '${parametro!.nombre}', '${parametro!.opcional == "true" ? 1 : 0
          }', '${parametro!.activo == "true" ? 1 : 0}', '${parametro!.tipo}', '${result.insertId
          }');`;

        this.connector.query(sql, (err, result) => {
          if (err) throw err;
        });
      });
    });

    func({ mensaje: "todo bien" });
  }
  */
