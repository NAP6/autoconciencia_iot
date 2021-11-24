import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";

import {
  IoTSystemQ,
  PhysicalEntityQ,
  CloudNodeQ,
  FogNodeQ,
  IoTGatewayQ,
  SensorQ,
  TagQ,
  ActuatorQ,
  NetworkQ,
  EntityQ,
  ServiceQ,
} from "../../models/selfAwarnessModels";

export function entity(req: Request, res: Response) {
  res.render("entity", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export async function entitys(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var db = new database2();
    var seleccion = req.body.valorS;
    var system = req.body.systemID;
    var rows: any;
    var flag = false;

    if (seleccion == "Entidades Fisicas") {
      var sql = new PhysicalEntityQ(-1, "", "").toSqlSelect(
        ["/@/MODEL/@/", "/@/SYSTEM/@/"],
        [id, system]
      );
      console.log(sql);
      rows = await db.qwerty(sql);
    } else if (seleccion == "Nodos Cloud") {
      rows = await db.qwerty(
        new CloudNodeQ(-1, "", "").toSqlSelect(
          ["/@/MODEL/@/", "/@/SYSTEM/@/"],
          [id, system]
        )
      );
      flag = true;
    } else if (seleccion == "Nodos Fog") {
      rows = await db.qwerty(
        new FogNodeQ(-1, "", "").toSqlSelect(
          ["/@/MODEL/@/", "/@/SYSTEM/@/"],
          [id, system]
        )
      );
      flag = true;
    } else if (seleccion == "Gateway IoT") {
      rows = await db.qwerty(
        new IoTGatewayQ(-1, "", "").toSqlSelect(
          ["/@/MODEL/@/", "/@/SYSTEM/@/"],
          [id, system]
        )
      );
      flag = true;
    } else if (seleccion == "Sensores") {
      rows = await db.qwerty(
        new SensorQ(-1, "", "").toSqlSelect(
          ["/@/MODEL/@/", "/@/SYSTEM/@/"],
          [id, system]
        )
      );
      flag = true;
    } else if (seleccion == "Tags") {
      rows = await db.qwerty(
        new TagQ(-1, "", "").toSqlSelect(
          ["/@/MODEL/@/", "/@/SYSTEM/@/"],
          [id, system]
        )
      );
      flag = true;
    } else if (seleccion == "Actuadores") {
      rows = await db.qwerty(
        new ActuatorQ(-1, "", "").toSqlSelect(
          ["/@/MODEL/@/", "/@/SYSTEM/@/"],
          [id, system]
        )
      );
      flag = true;
    } else if (seleccion == "Red") {
      rows = await db.qwerty(
        new NetworkQ(-1, "", "").toSqlSelect(
          ["/@/MODEL/@/", "/@/SYSTEM/@/"],
          [id, system]
        )
      );
    }
    if (flag) {
      var aux = rows;
      var obj = new EntityQ(-1, "", "");
      for (var i = 0; i < aux.length; i++) {
        var rows2 = await db.qwerty(
          obj.toSqlSelect(
            ["/@/MODEL/@/", "/@/SYSTEM/@/", "/@/TYPE/@/", "/@/OBJECT/@/"],
            [
              id,
              system,
              "'DataBase','Middleware','NetworkInterface','Broker','Application','API'",
              aux[i].id,
            ]
          )
        );
        rows = rows.concat(rows2);
      }
    }
    var fathers_services = rows.map((ent) => {
      return ent.id;
    });
    if (fathers_services.length > 0) {
      var service = new ServiceQ(-1, "", "");
      var rows_service = await db.qwerty(
        service.toSqlSelect(
          ["/@/MODEL/@/", "/@/SYSTEM/@/", "/@/FATHERS/@/"],
          [id, system, fathers_services.join(",")]
        )
      );
    }
    if (rows_service && rows_service.length > 0) {
      rows = rows.concat(rows_service);
    }

    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function update_entitys(req: Request, res: Response) {
  if (req.session?.user) {
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
  }
}
export async function get_objects_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var idA = req.body.aspecto;
    var categoriT = req.body.categoria;
    var idS = req.body.sujeto;
    var modelID = req.session!.active_model.modelID;
    var newCat: string = "";
    if (categoriT == "Entidades Físicas") {
      newCat = "PhysicalEntity";
    } else if (categoriT == "Nodos Cloud") {
      newCat = "CloudNode";
    } else if (categoriT == "Nodos Fog") {
      newCat = "FogNode";
    } else if (categoriT == "Gateway IoT") {
      newCat = "IoTGateway";
    } else if (categoriT == "Sensores") {
      newCat = "Sensor";
    } else if (categoriT == "Tags") {
      newCat = "Tag";
    } else if (categoriT == "Actuadores") {
      newCat = "Actuator";
    } else if (categoriT == "Red") {
      newCat = "Network";
    }
    var rows = await db.qwerty(`SELECT 
    obj.obj_id as id,
    obj.obj_nombre as nombre,
    obj.obj_tipo as tipo
	 FROM
    objeto obj, 
    aspectoautoconsciencia_objeto asp_obj,
    aspectoautoconsciencia asp,
    sujeto suj,
    sujeto_objeto as suj_obj
	WHERE
    asp_obj.ma_id=${modelID} AND
    asp.ma_id=${modelID} AND
    obj.ma_id=${modelID} AND
    suj.ma_id= ${modelID} AND
    suj_obj.ma_id=${modelID} AND
    suj.suj_id=${idS} AND
    suj_obj.suj_id=suj.suj_id AND
    suj_obj.obj_id=obj.obj_id AND
    asp.aa_id=${idA} AND
    asp_obj.aa_id=asp.aa_id AND															
    asp_obj.obj_id=obj.obj_id`);
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
