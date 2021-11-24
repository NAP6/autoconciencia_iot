import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import {
  ImplementationResourceQ,
  FormulaQ,
  FunctionQ,
  WebServiceQ,
  ParameterQ,
} from "../../models/selfAwarnessModels";

export function deployment_resources_page(req: Request, res: Response) {
  res.render("deployment_resources", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

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
        data.descripcion.replace(/'/g, "\\'"),
        data.EspecificoTipo.datoSalida,
        data.EspecificoTipo.formula.replace(/'/g, "\\'")
      );
      var rows = await db.qwerty(formula.toSqlInsert([], []));
      id = rows[0][0].id;
    } else if (data.tipoRecurso == "1") {
      var funcion = new FunctionQ(
        -1,
        data.nombre,
        data.descripcion.replace(/'/g, "\\'"),
        data.EspecificoTipo.datoSalida,
        "", //data.path,
        data.EspecificoTipo.instrucciones.replace(/'/g, "\\'")
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
        data.descripcion.replace(/'/g, "\\'"),
        data.EspecificoTipo.datoSalida,
        data.EspecificoTipo.endPoint,
        data.EspecificoTipo.instrucciones.replace(/'/g, "\\'"),
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
    var rowsP = await db.qwerty(
      parameter.toSqlSelect(["/@/RI_ID/@/"], [impRes.id.toString()])
    );
    var arr_Parameters = parameter.toObjectArray(rowsP);

    if (rows[0][0].tipo_recurso == 0) {
      var formula: FormulaQ = new FormulaQ(-1, "", "", "", "");
      formula = formula.toObjectArray(rows)[0];
      formula.containsParameter = arr_Parameters;
      res.json(formula);
    } else if (rows[0][0].tipo_recurso == 1) {
      var functio: FunctionQ = new FunctionQ(-1, "", "", "", "", "");
      functio = functio.toObjectArray(rows)[0];
      functio.containsParameter = arr_Parameters;
      res.json(functio);
    } else {
      var webService = new WebServiceQ(-1, "", "", "", "", "", "");
      webService = webService.toObjectArray(rows)[0];
      webService.containsParameter = arr_Parameters;
      res.json(webService);
    }
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function ask_input_arguments(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var sql = `
	Select 
	  me.met_id as id, me.met_nombre as nombre
	  from
	  metrica me, metodoaprendizajerazonamiento mea, procesoautoconsciencia pro
	  where
	  me.met_id=mea.met_id AND pro.pa_id=${req.body.procesoId} AND me.met_tipo=${req.body.metricaId} AND pro.pa_id=mea.pa_id`;
    console.log(sql);
    var rows = await db.qwerty(sql);
    console.log(sql);
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function add_mapeo_parametros(req: Request, res: Response) {
  if (req.session?.user) {
    var data = req.body;
    var stryaux = "";
    data.forEach((element) => {
      stryaux += `(
	      		'${element.par_ordinal}', 
	      		'${element.mea_id}',
	      		'${element.mp_tipo_entrada}',
	      		${element.met_id == undefined ? "NULL" : element.met_id},
	      		${element.vs_id == undefined ? "NULL" : element.vs_id},
	      		${element.md_id == undefined ? "NULL" : element.md_id},
		  	${element.data_id == undefined ? "NULL" : element.data_id}),`;
    });
    var sql =
      `INSERT INTO 
    		mapeoparametros (par_ordinal, mea_id, mp_tipo_entrada,met_id,vs_id,md_id,data_id) 
		VALUES ` + stryaux.substring(0, stryaux.length - 1);

    var db = new database2();
    db.qwerty(sql);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
