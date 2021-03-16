import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";

export async function deployment_resources(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    await db.qwerty('');
      //res.json(json);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

