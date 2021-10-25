import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";

import {
	DataColumnQ,
} from "../../models/architecture/DataColumnQ";

export async function get_metadata(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var modelo= req.session!.active_model.modelID;
    var mea_id = req.body.mea_id;
    var metadata: DataColumnQ = new DataColumnQ(-1, "","","","");
    var rows = await db.qwerty(
      metadata.toSqlSelect(["/@/METHOD/@/","/@/MODELO/@/"], [mea_id,modelo])
    );
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
