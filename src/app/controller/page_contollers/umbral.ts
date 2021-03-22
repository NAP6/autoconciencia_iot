import { json } from "body-parser";
import { Console } from "console";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { ThresholdQ } from "../../models/selfAwarness/qwertyModels/ThresholdQ";

export async function get_umbral(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var criteria=req.body;
    var umbral:ThresholdQ=new ThresholdQ(-1,"","",-1,-1);
    var rows= await db.qwerty(umbral.toSqlSelect(['/@/CRITERIA/@/'],[criteria.criterio]));
    res.json(rows);
    
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_umbral(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newUmbral = req.body;
    var umbral: ThresholdQ = new ThresholdQ(
      -1,
      newUmbral.name,
      newUmbral.interpretacion,
      newUmbral.inferior,
      newUmbral.superior,

    );
    umbral.active = umbral.active;
    await db.qwerty(
        umbral.toSqlInsert(
        ['/@/CRITERIA/@/'],
        [newUmbral.criterio]
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function upd_umbral(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newUmbral = req.body;
    var umbral: ThresholdQ = new ThresholdQ(
      newUmbral.id,
      newUmbral.name,
      newUmbral.interpretacion,
      newUmbral.inferior,
      newUmbral.superior,
    );
    umbral.active = umbral.active;
    await db.qwerty(
        umbral.toSqlUpdate(
        [],
        []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_umbral(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newUmbral = req.body;
    var umbral: ThresholdQ = new ThresholdQ(
        newUmbral.id,
      "",
      "",
      -1,
      -1,
    );
    await db.qwerty(
      umbral.toSqlDelete(
       []
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}