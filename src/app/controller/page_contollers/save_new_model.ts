import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { SelfAwarnessQ } from "../../models/selfAwarnessModels";
import * as fs from "fs";
import { parseString } from "xml2js";
import { JSON2Architecture } from "../../models/JSON2Architecture";

export async function save_new_model(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session!.user) {
    var nombre = req.body.nombre_modelo;
    var descripcion = req.body.descripcion_ecenario;
    var autor = req.body.autor_modelo;
    var user_id = req.session?.user._id;
    var db2 = new database2();
    var json: Object = [];
    try {
      const xml = fs.readFileSync(req.file.path);
      parseString(xml, function (err: Error, result: Object) {
        if (err) throw err;
        json = result;
      });
      fs.unlink(req.file.path, (err) => {
        if (err) throw err;
      });
    } catch (error) {
      console.log("No se ha ingresado ningun valor");
    }
    var arquitectura = new JSON2Architecture(json);
    var modelo = new SelfAwarnessQ(
      -1,
      nombre,
      descripcion,
      autor,
      JSON.stringify(json, null, "  ")
    );
    var rows = await db2.qwerty(
      modelo.toSqlInsert(["/@/USER/@/"], [user_id.toString()])
    );
    db2.architecture(arquitectura, rows.insertId.toString());
    req.session!.active_model = {
      nombre: modelo.name,
      descripcion: modelo.description,
      modelID: rows.insertId.toString(),
    };
    next();
  } else {
    res.redirect("/login");
  }
}
