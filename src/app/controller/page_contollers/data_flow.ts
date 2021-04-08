import { json } from "body-parser";
import { Console } from "console";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { DataFlowQ } from "../../models/selfAwarness/qwertyModels/DataFlowQ";
export async function get_data_flow(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var propiedad = req.body.propiedad;
    var modeloID = req.session!.active_model.modelID;
	  var comunicacion=req.body.comunicacion;
	  var comu;
	  if(comunicacion=="SÍNCRONA"){
		  comu="Synchronous"
	  }else if(comunicacion=="ASÍNCRONA"){
		  comu=undefined;
	  }
    var data_flow:DataFlowQ = new DataFlowQ(-1, "","","","",-1);
    var rows = await db.qwerty(
      data_flow.toSqlSelect(
        ["/@/MODEL/@/", "/@/PROPERTY/@/","/@/COMUNICATION/@/"],
        [modeloID, propiedad,comu]
      )
    );
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
