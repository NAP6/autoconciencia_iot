import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { MeasurementUnitQ } from "../../models/selfAwarness/qwertyModels/MeasurementUnitQ";

export function measurement_units(req: Request, res: Response) {
  res.render("measurement_units", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export async function get_measurement_units(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var measurement:MeasurementUnitQ=new MeasurementUnitQ(-1,"","","");
    var rows= await db.qwerty(measurement.toSqlSelect([],[]));
    res.json(rows);
    
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_measurement_units(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newMeasurement = req.body;
    var measurement: MeasurementUnitQ = new MeasurementUnitQ(
      -1,
      newMeasurement.name,
      newMeasurement.description,
      newMeasurement.acronym,
    );
    measurement.active = newMeasurement.active;
    await db.qwerty(
        measurement.toSqlInsert(
        [],
        []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function upd_measurement_units(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newMeasurement = req.body;
    var measurement: MeasurementUnitQ = new MeasurementUnitQ(
        newMeasurement.id,
        newMeasurement.name,
        newMeasurement.description,
        newMeasurement.acronym,
    );
    measurement.active = newMeasurement.active;
    await db.qwerty(
        measurement.toSqlUpdate(
        [],
        []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_measurement_units(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newMeasurement = req.body;
    var measurement: MeasurementUnitQ = new MeasurementUnitQ(
        newMeasurement.id,
      "",
      "",
      "",
    );
    await db.qwerty(
      measurement.toSqlDelete(
       []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
