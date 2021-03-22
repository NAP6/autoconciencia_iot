import { json } from "body-parser";
import { Console } from "console";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { ScaleQ } from "../../models/selfAwarness/qwertyModels/ScaleQ";

export function scales(req: Request, res: Response) {
  res.render("scales", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export async function get_scales(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var scale:ScaleQ=new ScaleQ(-1,"","","");
    var rows= await db.qwerty(scale.toSqlSelect([],[]));
    res.json(rows);
    
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_scales(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newScale = req.body;
    var scale: ScaleQ = new ScaleQ(
      -1,
      newScale.name,
      newScale.valid_values,
      newScale.type,
    );
    scale.active = scale.active;
    await db.qwerty(
        scale.toSqlInsert(
        [],
        []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function upd_scales(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newScale = req.body;
    var scale: ScaleQ = new ScaleQ(
      newScale.id,
      newScale.name,
      newScale.valid_values,
      newScale.type,
    );
    scale.active = scale.active;
    await db.qwerty(
        scale.toSqlUpdate(
        [],
        []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_scales(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newScale = req.body;
    var scale: ScaleQ = new ScaleQ(
        newScale.id,
      "",
      "",
      "",
    );
    await db.qwerty(
      scale.toSqlDelete(
       []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}