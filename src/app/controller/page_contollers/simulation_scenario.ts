import { json } from "body-parser";
import { Console } from "console";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import {SimulationScenarioQ } from "../../models/selfAwarness/qwertyModels/SimulationScenarioQ";

export async function get_simulation_scenario(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var mea_id = req.body.mea_id;
    var escenario: SimulationScenarioQ = new SimulationScenarioQ(-1, "","");
    var rows = await db.qwerty(
      escenario.toSqlSelect(["/@/METHOD/@/"], [mea_id])
    );
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_simulation_scenario(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newEscenario = req.body;
    var escenario: SimulationScenarioQ = new SimulationScenarioQ(
      -1,
      newEscenario.name,
	    newEscenario.description,
    );
    escenario.active = escenario.active;
    await db.qwerty(
      escenario.toSqlInsert(["/@/METHOD/@/"], [newEscenario.mea_id])
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function upd_simulation_scenario(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newEscenario = req.body;
    var escenario: SimulationScenarioQ = new SimulationScenarioQ(
      newEscenario.id,
      newEscenario.name,
	    newEscenario.description
    );
    escenario.active = newEscenario.active == 1;
    await db.qwerty(escenario.toSqlUpdate([], []));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_simulation_scenario(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newEscenario = req.body;
    var escenario: SimulationScenarioQ = new SimulationScenarioQ(newEscenario.id,"","");
    await db.qwerty(escenario.toSqlDelete([]));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
