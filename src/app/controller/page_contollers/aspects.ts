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
	  var id=req.body.id;
    
    var rows = await db.qwerty(`SELECT asp_obj.obj_id as id,
	    			       obj.obj_nombre as nombre, 
	                                obj.obj_tipo as tipo
					FROM 
				     aspectoautoconsciencia_objeto as asp_obj,
	                             objeto as obj 
	                        where 
	                             asp_obj.obj_id=obj.obj_id AND
	                             asp_obj.ma_id=obj.ma_id AND 
	                             asp_obj.aa_id=${id}`);
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function get_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
	  var modelID =req.session!.active_model.modelID;
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
      aspect.toSqlInsert(
        ["/@/OBJECT/@/", "/@/SUBJECT/@/", "/@/MODEL/@/"],
        [newAspect.obj_id, newAspect.suj_id, modelID]
      )
    );
    aspect.id = rows.insertId;
    for (var i = 0; i < newAspect.arr_entity.length; i++) {
      await db.qwerty(`INSERT INTO aspectoautoconsciencia_objeto (aa_id, obj_id, ma_id) values (${aspect.id}, ${newAspect.arr_entity[i]}, ${modelID})`);
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
      newAspect.type
    );
    aspect.active = aspect.active;
    await db.qwerty(
      aspect.toSqlUpdate(
        ["/@/OBJECT/@/", "/@/SUBJECT/@/", "/@/MODEL/@/"],
        [newAspect.obj_id, newAspect.suj_id, modelID]
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
