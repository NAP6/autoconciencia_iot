import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { SelfAwarnessQ } from "../../models/selfAwarnessModels";

export async function user_models(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user._id;
    var db = new database2();
    var model: SelfAwarnessQ = new SelfAwarnessQ(-1, "", "", "", "");
    console.log(req.session?.user);
    var rows = await db.qwerty(
      model.toSqlSelect(["/@/USER/@/"], [id.toString()])
    );
    console.log(model.toObjectArray(rows));
    res.json(model.toObjectArray(rows));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
