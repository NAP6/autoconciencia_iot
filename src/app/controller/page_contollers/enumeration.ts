import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";

export async function get_enumeracion(req: Request, res: Response) {
  if (req.session?.user) {
    var typeEnum = req.body.tipo;
    var db = new database2();
    var rows = await db.qwerty(`SELECT 
	    				enu_id as id, 
	    				enu_nombre_valor as nombre 
	    			FROM 
	    				enumeracion 
	    			WHERE 
	    				enu_nombre_enumeracion='${typeEnum}'`);
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
