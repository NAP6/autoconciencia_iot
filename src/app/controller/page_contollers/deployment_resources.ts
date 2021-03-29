import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import {
  ImplementationResourceQ,
  FormulaQ,
  FunctionQ,
  WebServiceQ,
  ParameterQ,
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
    var id: number = 0;
    if (data.tipoRecurso == "0") {
      var formula = new FormulaQ(
        -1,
        data.nombre,
        data.descripcion.replace("'", "\\'"),
        data.EspecificoTipo.datoSalida,
        data.EspecificoTipo.formula
      );
      var rows = await db.qwerty(formula.toSqlInsert([], []));
      id = rows[0][0].id;
    } else if (data.tipoRecurso == "1") {
      var funcion = new FunctionQ(
        -1,
        data.nombre,
        data.descripcion.replace("'", "\\'"),
        data.EspecificoTipo.datoSalida,
        "", //data.path,
        data.EspecificoTipo.instrucciones
      );
      var rows = await db.qwerty(
        funcion.toSqlInsert(
          ["/@/P_EXIST/@/"],
          [data.EspecificoTipo.preExistent ? "1" : "0"]
        )
      );
      id = rows[0][0].id;
    } else if (data.tipoRecurso == "2") {
      var service = new WebServiceQ(
        -1,
        data.nombre,
        data.descripcion.replace("'", "\\'"),
        data.EspecificoTipo.datoSalida,
        data.EspecificoTipo.endPoint,
        data.EspecificoTipo.instrucciones,
        data.EspecificoTipo.formatoSalida
      );
      var rows = await db.qwerty(
        service.toSqlInsert(
          ["/@/P_EXIST/@/"],
          [data.EspecificoTipo.preExistent ? "1" : "0"]
        )
      );
      id = rows[0][0].id;
    }
    for (var i = 0; i < data.arregloParametros.length; i++) {
      var param = data.arregloParametros[i];
      var parameter = new ParameterQ(
        param.ordinal,
        param.nombre,
        param.tipo,
        param.opcional == "true" ? true : false
      );
      var active: string = param.activo == "true" ? "1" : "0";
      await db.qwerty(
        parameter.toSqlInsert(
          ["/@/ACTIVE/@/", "/@/ID/@/"],
          [active, id.toString()]
        )
      );
    }
    res.json({ mensaje: "Elemento guardado exitosamente" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function del_deployment_resources(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var impRes = new ImplementationResourceQ(req.body.id, "", "", "");
    await db.qwerty(impRes.toSqlDelete([], []));
    res.json({ mensaje: "exito al eleminar" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function ask_deployment_resources_select(
  req: Request,
  res: Response
) {
  if (req.session?.user) {
    var db = new database2();
    var impRes = new ImplementationResourceQ(-1, "", "", "");
    var rows = await db.qwerty(
      impRes.toSqlSelect(["/@/TYPE/@/"], [req.body.tipo])
    );
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function ask_deployment_resources(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var impRes = new ImplementationResourceQ(req.body.id, "", "", "");
    var parameter = new ParameterQ(-1, "", -1, false);
    var rows = await db.qwerty(impRes.toSqlSelect(["/@/ALL/@/"], []));
    var rowsP = await db.qwerty(parameter.toSqlSelect([], []));



    if (rows[0].tipo_recurso == 0) {
      var formula: FormulaQ = new FormulaQ(-1, "", "", "", "").toObjectArray(
        rows
      )[0];

      formula.containsParameter;
      res.json();
    } else if (rows[0].tipo_recurso == 1) {
      var functio: FunctionQ = new FunctionQ(
        -1,
        "",
        "",
        "",
        "",
        ""
      ).toObjectArray(rows)[0];
      res.json();
    } else {
      var webService = new WebServiceQ(
        -1,
        "",
        "",
        "",
        "",
        "",
        ""
      ).toObjectArray(rows)[0];
      res.json();
    }
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/*
public ask_deployment_resources(id: string, func: Function) {
    var sql = `SELECT ri.ri_nombre as nombre, ri.ri_descripcion as descripcion, ri.ri_tipo_dato_salida as tipo , ri.ri_activo as activo, ri.ri_tipo_recurso as recurso,en.enu_nombre_valor as nombre_salida FROM recursoimplementacion ri ,enumeracion en WHERE ri_id = '${id}'  AND ri.ri_tipo_dato_salida=en.enu_id`;
    var respuesta: resource = { nombre: "", descripcion: "", tipoRecurso: "", EspecificoTipo: { datoSalida: "" }, arregloParametros: [] };

    this.connector.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result[0]);
      respuesta.nombre = result[0]['nombre'];
      respuesta.descripcion = result[0]['descripcion'];
      respuesta.EspecificoTipo.datoSalida = result[0]['tipo'].toString();
      respuesta.EspecificoTipo.nombre_datoSalida = result[0]['nombre_salida'];
      respuesta.tipoRecurso = result[0]['recurso'].toString();
      var db = new mysql_connector();
      db.ask_parametros(respuesta, id, func);

    });
  }

public ask_parametros(json: resource, id: string, func: Function,) {
    var sql = `SELECT pa.par_ordinal as ordinal,pa.par_nombre as nombre, pa.par_opcional as opcional, pa.par_activo as activo,pa.par_tipo_dato as tipo,enu.enu_nombre_valor as nombre_salida FROM parametro pa, enumeracion enu  WHERE ri_id = '${id}' AND pa.par_tipo_dato=enu.enu_id`;
    this.connector.query(sql, function (err, result) {
      if (err) throw err;
      result.forEach(element => {
        var par: parametros = { ordinal: element['ordinal'].toString(), nombre: element['nombre'], opcional: element['opcional'].toString(), activo: element['activo'].toString(), tipo: element['tipo'].toString(), tipoNombre: element['nombre_salida'] };
        json.arregloParametros.push(par);
      });
      var db = new mysql_connector();
      db.ask_tipo_recurso(json, id, func);

    });
  }

public ask_tipo_recurso(json: resource, id: string, func: Function,) {
    if (json.tipoRecurso == "0") {
      var sql = `SELECT for_expresion as expresion FROM formula  WHERE ri_id = '${id}'`;

      this.connector.query(sql, function (err, result) {
        if (err) throw err;
        json.EspecificoTipo.formula = result[0]['expresion'];
        func(json);
      });
    } else if (json.tipoRecurso == "1") {
      var sql = `SELECT fun_instrucciones as instrucciones FROM funcion WHERE ri_id = '${id}'`;

      this.connector.query(sql, function (err, result) {
        if (err) throw err;
        json.EspecificoTipo.instrucciones = result[0]['instrucciones'];
        func(json);
      });

    } else if (json.tipoRecurso == "2") {
      var sql = `SELECT ser_punto_final as punto,ser_instrucciones as instrucciones, ser_tipo_formato_dato_salida as formato FROM servicio  WHERE ri_id = '${id}'`;
      this.connector.query(sql, function (err, result) {
        if (err) throw err;
        json.EspecificoTipo.endPoint = result[0].punto;
        json.EspecificoTipo.instrucciones = result[0]['instrucciones'];
        json.EspecificoTipo.formatoSalida = result[0]['formato'].toString();
        func(json);
      });
    }
  }
*/
