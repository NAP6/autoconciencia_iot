import { json } from "../models/handling-json";
import { Request, Response } from "express";
import { mysql_connector as database } from "../models/database";

export function system(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.body.modelID;
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
    var id = req.body.modelID;
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
    var js = new json();
    var db = new database();
    js.setJSON(db.getUser_measurementUnit(id));
    res.json(js.getEntity());
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function user_models(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var js = new json();
    var db = new database();
    js.setJSON(db.getUserModels(id));
    res.json(js.getEntity());
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
