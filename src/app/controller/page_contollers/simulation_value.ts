import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { SimulationValueQ } from "../../models/selfAwarness/qwertyModels/SimulationValueQ";
import { SimulationValue } from "../../models/selfAwarness/SimulationValue";

export async function get_simulation_value(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var mea_id = req.body.mea_id;
    var variable = req.body.variable;
    var value: SimulationValueQ = new SimulationValueQ(-1);
    value.isUsed = req.body.escenario;
    var rows = await db.qwerty(
      value.toSqlSelect(["/@/METHOD/@/", "/@/VARIABLE/@/"], [mea_id, variable])
    );
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_simulation_value(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newValue = req.body;
    var value: SimulationValueQ = new SimulationValueQ(-1);
    value.isUsed = newValue.escenario;
	  value.value=newValue.valor
    await db.qwerty(value.toSqlInsert(["/@/VARIABLE/@/"], [newValue.variable]));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function upd_simulation_value(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newValue = req.body;
    var value: SimulationValueQ = new SimulationValueQ(newValue.valor);
    value.isUsed = newValue.escenario;
    await db.qwerty(value.toSqlUpdate(["/@/VARIABLE/@/"], [newValue.variable]));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_simulation_value(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newValue = req.body;
    var value: SimulationValueQ = new SimulationValueQ(newValue.valor);
    value.isUsed = newValue.escenario;
    await db.qwerty(value.toSqlDelete(["/@/VARIABLE/@/"], [newValue.variable]));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
