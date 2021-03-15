import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { IoTSystemQ, GoalQ } from "../../models/selfAwarnessModels";

export function subject(req: Request, res: Response) {
  res.render("subject", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export async function subjects(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var db = new database2();
    var system: IoTSystemQ = new IoTSystemQ(-1, "");
    var rows = await db.qwerty(system.toSqlSelect(["/@/MODEL/@/"], [id]));
    //console.log(rows)
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function update_subjects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var elementos = req.body;
    var id = req.session!.active_model.modelID;
    for (var i = 0; i < elementos.length; i++) {
      var system: IoTSystemQ = new IoTSystemQ(parseInt(elementos[i].id), "");
      system.active = elementos[i].activo ? true : false;
      await db.qwerty(
        system.toSqlUpdate(["/@/ACTIVE/@/", "/@/MODEL/@/"], [system.active, id])
      );
    }
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
  }
}

export async function subjects_goals(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var systemID = req.body.id;
    var modelID = req.session!.active_model.modelID;
    var goal: GoalQ = new GoalQ(-1, "", "", 0, "");
    var rows = await db.qwerty(
      goal.toSqlSelect(["/@/SYSTEM/@/", "/@/MODEL/@/"], [systemID, modelID])
    );
    res.json(rows);
    
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function save_subjects_goal(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newGoal = req.body;
    var goal: GoalQ = new GoalQ(
      -1,
      newGoal.name,
      newGoal.description,
      newGoal.weigth,
      newGoal.agregationOperator
    );
    goal.active = newGoal.active;
    var modelID = req.session!.active_model.modelID;
    await db.qwerty(
      goal.toSqlInsert(
        ["/@/FATHER/@/", "/@/IOTSYSTEM/@/", "/@/MODEL/@/", "/@/CRITERIA/@/"],
        [newGoal.father, newGoal.system, modelID, newGoal.criteria]
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function delete_subjects_goal(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var goal: GoalQ = new GoalQ(req.body.id, "", "", -1, "");
    await db.qwerty(goal.toSqlDelete([], []));
    res.json({ Mensaje: "Los datos se han eliminado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
