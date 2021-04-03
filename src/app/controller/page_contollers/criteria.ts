import { json } from "body-parser";
import { Console } from "console";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { DecisionCriteriaQ } from "../../models/selfAwarness/qwertyModels/DecisionCriteriaQ";

export function criteria(req: Request, res: Response) {
  res.render("decision_criteria", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export async function get_criteria(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var criteria:DecisionCriteriaQ=new DecisionCriteriaQ(-1,"","");
    var rows= await db.qwerty(criteria.toSqlSelect([],[]));
    res.json(rows);
    
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_criteria(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newCriteria = req.body;
    var criteria: DecisionCriteriaQ = new DecisionCriteriaQ(
      -1,
      newCriteria.name,
      newCriteria.description,
    );
    criteria.active = criteria.active;
    await db.qwerty(
        criteria.toSqlInsert(
        [],
        []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function upd_criteria(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newCriteria = req.body;
    var criteria: DecisionCriteriaQ = new DecisionCriteriaQ(
      newCriteria.id,
      newCriteria.name,
      newCriteria.description,
    );
    criteria.active = newCriteria.activo;
    await db.qwerty(
        criteria.toSqlUpdate(
        [],
        []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_criteria(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newCriteria = req.body;
    var criteria: DecisionCriteriaQ = new DecisionCriteriaQ(
        newCriteria.id,
      "",
      "",
    );
    await db.qwerty(
      criteria.toSqlDelete(
       []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
