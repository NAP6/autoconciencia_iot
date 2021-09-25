import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { PropertyQ } from "../../models/selfAwarness/qwertyModels/PropertyQ";
export async function get_properties(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var aspectoID=req.body.aspectoID;
    var modeloID = req.session!.active_model.modelID;
    var property: PropertyQ = new PropertyQ(-1, "");
    var rows = await db.qwerty(property.toSqlSelect(["/@/MODEL/@/","/@/ASPECTID/@/"], [modeloID,aspectoID]));
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
