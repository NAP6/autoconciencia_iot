import { json } from "../models/handling-json";
import { Request, Response } from "express";
import { mysql_connector as database } from "../models/database";

export function system(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var js = new json();
    var db = new database();
    js.setJSON(db.getfisicalModel(id));
    res.json(js.getSystem());
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function entity(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var js = new json();
    var db = new database();
    js.setJSON(db.getfisicalModel(id));
    res.json(js.getEntity());
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function measurement_units(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    res.json(db.getUser_measurementUnit(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function escales(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    res.json(db.getUser_escales(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function decision_criteria(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    res.json(db.getUser_decision_criteria(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function user_models(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    res.json(db.getUserModels(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function home(req: Request, res: Response) {
  if (req.session!.user) {
    res.redirect("/");
  } else {
    res.send("Home Api");
  }
}

export function last_ObjectSubjectID(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var db = new database();
    var index = db.getLastObjectSubjectID(id);
    res.json({id: index });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
