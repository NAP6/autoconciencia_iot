import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { IoTSystemQ, GoalQ } from "../../models/selfAwarnessModels";
import { SelfAwarenessAspectQ } from "../../models/selfAwarness/qwertyModels/SelfAwarenessAspectQ";

export function aspects(req: Request, res: Response) {
  res.render("aspects", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export async function get_aspects_objects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var modeloID = req.session?.active_model.modelID;
 var system=req.body.systemID;
	  //   var categoriT = req.body.category;
   /* if (categoriT) {
      var system = req.body.systemID;
      var newCat: string = "";
      if (categoriT == "Entidades Físicas") {
        newCat = "PhysicalEntity";
      } else if (categoriT == "Nodos Cloud") {
        newCat = "CloudNode";
      } else if (categoriT == "Nodos Fog") {
        newCat = "FogNode";
      } else if (categoriT == "Gateway IoT") {
        newCat = "IoTGateway";
      } else if (categoriT == "Sensores") {
        newCat = "Sensor";
      } else if (categoriT == "Tags") {
        newCat = "Tag";
      } else if (categoriT == "Actuadores") {
        newCat = "Actuator";
      } else if (categoriT == "Red") {
        newCat = "Network";
      }*/
      var rows = await db.qwerty(`SELECT 
    					DISTINCT asp.aa_id as idAspecto,
	    				asp.aa_nombre as nombreAspecto
	    			FROM 
	     				aspectoautoconsciencia asp, 
					sujeto suj
	    			WHERE   
	                		suj.suj_id=${system} AND 
	                		asp.ma_id=${modeloID} AND
					suj.ma_id=${modeloID} AND
					suj.suj_id=asp.suj_id`);
      res.json(rows);
  }else{
	res.json({error: "Debe iniciar sesion para poder usar la api"});
  }
}
export async function get_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var modelID = req.session!.active_model.modelID;
    var aspects: SelfAwarenessAspectQ = new SelfAwarenessAspectQ(
      -1,
      "",
      "",
      -1,
      ""
    );
    var rows = await db.qwerty(aspects.toSqlSelect(["/@/MODEL/@/"], [modelID]));
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function add_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newAspect = req.body;
    console.log(newAspect);
    var modelID = req.session!.active_model.modelID;
    var aspect: SelfAwarenessAspectQ = new SelfAwarenessAspectQ(
      -1,
      newAspect.name,
      newAspect.description,
      newAspect.weigth,
      newAspect.type
    );
    aspect.active = aspect.active;
    var rows = await db.qwerty(
      aspect.toSqilInsert(
        ["/@/OBJECT/@/", "/@/SUBJECT/@/", "/@/MODEL/@/"],
        [newAspect.obj_id, newAspect.suj_id, modelID]
      )
    );
    aspect.id = rows.insertId;
    for (var i = 0; i < newAspect.arr_entity.length; i++) {
      await db.qwerty(
        `INSERT INTO aspectoautoconsciencia_objeto (aa_id, obj_id, ma_id) values (${aspect.id}, ${newAspect.arr_entity[i]}, ${modelID})`
      );
    }
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function mod_aspecs(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newAspect = req.body;
    var modelID = req.session!.active_model.modelID;
    var aspect: SelfAwarenessAspectQ = new SelfAwarenessAspectQ(
      newAspect.id,
      newAspect.name,
      newAspect.description,
      newAspect.weigth,
      newAspect.tipo
    );
    aspect.active = newAspect.active;
    await db.qwerty(
      aspect.toSqlUpdate(
        ["/@/OBJECT/@/", "/@/MODEL/@/"],
        [newAspect.objetivo, modelID]
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newAspect = req.body;
    var aspect: SelfAwarenessAspectQ = new SelfAwarenessAspectQ(
      newAspect.id,
      "",
      "",
      -1,
      ""
    );
    await db.qwerty(aspect.toSqlDelete(["", "", ""]));
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
