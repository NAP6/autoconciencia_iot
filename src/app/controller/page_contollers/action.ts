import { json } from "body-parser";
import { Console } from "console";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { ActionQ } from "../../models/selfAwarness/qwertyModels/ActionQ";

export async function get_action(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var metodo = req.body.mea_id;
    console.log(metodo);
    var action: ActionQ = new ActionQ(-1, "");
    action.isRecommendedln = req.body.umbral;
    var rows = await db.qwerty(action.toSqlSelect(["/@/METHOD/@/"], [metodo]));
    res.json({ umbral_id: req.body.umbral, acciones: rows });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_action(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newAction = req.body;
    var action: ActionQ = new ActionQ(
      -1,
      newAction.description,
    );
    action.active = action.active;
    action.isRecommendedln = newAction.umbral;
    await db.qwerty(action.toSqlInsert(["/@/METHOD/@/"], [newAction.mea_id]));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function upd_action(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newAction = req.body;
    var action: ActionQ = new ActionQ(
      newAction.id,
      newAction.description
    );
    action.active = newAction.active == 1;
    await db.qwerty(action.toSqlUpdate([], []));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_action(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newAction = req.body;
    var action: ActionQ = new ActionQ(newAction.id, "");
    await db.qwerty(action.toSqlDelete([]));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
