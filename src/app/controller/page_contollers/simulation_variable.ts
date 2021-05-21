import { json } from "body-parser";
import { Console } from "console";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { SimulationVariableQ } from "../../models/selfAwarness/qwertyModels/SimulationVariableQ";

export async function get_simulation_variable(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var mea_id = req.body.mea_id;
    var variable: SimulationVariableQ = new SimulationVariableQ(-1, "");
    var rows = await db.qwerty(
      variable.toSqlSelect(["/@/METHOD/@/"], [mea_id])
    );
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_simulation_variable(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newVariable = req.body;
    var variable: SimulationVariableQ = new SimulationVariableQ(
      -1,
      newVariable.name
    );
    variable.active = variable.active;
    await db.qwerty(
      variable.toSqlInsert(["/@/METHOD/@/"], [newVariable.mea_id])
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function upd_simulation_variable(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newVariable = req.body;
    var variable: SimulationVariableQ = new SimulationVariableQ(
      newVariable.id,
      newVariable.name
    );
    variable.active = newVariable.active == 1;
    await db.qwerty(variable.toSqlUpdate([], []));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_simulation_variable(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newVariable = req.body;
    var variable: SimulationVariableQ = new SimulationVariableQ(newVariable.id,"");
    await db.qwerty(variable.toSqlDelete([]));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
