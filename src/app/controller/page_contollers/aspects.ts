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

export function aspects_collective(req: Request, res: Response) {
  res.render("aspects_collective", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export async function get_aspects_objects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var modeloID = req.session?.active_model.modelID;
    var system = req.body.systemID;
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
    var rows = await db.qwerty(`SELECT asp_obj.obj_id as id,
	      	    			       obj.obj_nombre as nombre, 
	      	                                obj.obj_tipo as tipo
	      					FROM 
	      				     aspectoautoconsciencia_objeto as asp_obj,
	      	                             objeto as obj 
	      	                        where 
	      	                             asp_obj.obj_id=obj.obj_id AND
	      	                             asp_obj.ma_id=obj.ma_id AND 
	      	                             asp_obj.aa_id=${system}`);
    res.json(rows);
  } else {
    res.json({ error: "Debe iniciar sesion para poder usar la api" });
  }
}
export async function get_aspects_objects_process(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var modeloID = req.session?.active_model.modelID;
    var system = req.body.systemID;
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
  } else {
    res.json({ error: "Debe iniciar sesion para poder usar la api" });
  }
}

export async function get_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var id = req.body.id;
    var rows = await db.qwerty(
      `SELECT aa_id as id, aa_nombre as name, aa_descripcion as description FROM aspectoautoconsciencia WHERE suj_id=${id}`
    );
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function get_aspects_ind(req: Request, res: Response) {
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
        ["/@/OBJECT/@/", "/@/SUBJECT/@/", "/@/MODEL/@/", "/@/ALCANCE/@/"],
        [newAspect.obj_id, newAspect.suj_id, modelID, newAspect.aa_alcance]
      )
    );
    aspect.id = rows.insertId;
    await add_relation_objects_aspects_intern(
      aspect.id,
      modelID,
      newAspect.arr_entity
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function add_relation_objects_aspects(
  req: Request,
  res: Response
) {
  if (req.session?.user) {
    await add_relation_objects_aspects_intern(
      req.body.aa_id,
      req.session!.active_model.modelID,
      req.body.arr_entity
    );
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

async function add_relation_objects_aspects_intern(
  aa_id: number,
  modelID: number,
  arr_obj: any[]
) {
  var db = new database2();
  for (var i = 0; i < arr_obj.length; i++) {
    await db.qwerty(
      `INSERT INTO aspectoautoconsciencia_objeto (aa_id, obj_id, ma_id) values (${aa_id}, ${arr_obj[i]}, ${modelID})`
    );
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
export async function del_aspects_objects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newAspect = req.body;
    await db.qwerty(
      `DELETE FROM aspectoautoconsciencia_objeto WHERE aa_id=${newAspect.aa_id} `
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function get_aspects_individuales(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var id = req.body.id;
    var rows = await db.qwerty(
      `SELECT aa_id as id, aa_nombre as name, aa_descripcion as description FROM aspectoautoconsciencia WHERE suj_id=${id} AND aa_alcance=53`
    );
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function add_aspects_colective(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newAspect = req.body;
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
      `INSERT INTO
aspectoautoconsciencia (
                aa_nombre,
                aa_descripcion,
                aa_peso,
                aa_tipo,
                aa_activo,
		aa_alcance,
		aa_operador,
                suj_id,
                ma_id
            ) VALUES (
                '${newAspect.name}',
                '${newAspect.description}',
                '${newAspect.weigth}',
                '${newAspect.type}',
                '${newAspect.active ? 1 : 0}',
                '${newAspect.aa_alcance}',
		${newAspect.operador},
		'${newAspect.suj_id}',
                '${modelID}'
            )`
    );
    aspect.id = rows.insertId;
    await add_relation_aspects_indi_aspects_colec(
      aspect.id,
      modelID,
      newAspect.arr_aspects
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_relation_aspects_indi_aspects_colec(
  aa_id: number,
  modelID: number,
  arr_asp: any[]
) {
  var db = new database2();
  for (var i = 0; i < arr_asp.length; i++) {
    await db.qwerty(
      `INSERT INTO aspectoautoconsciencia_derivado (aad_padre,aad_hijo) values (${aa_id},${arr_asp[i]})`
    );
  }
}

export async function get_aspects_colective(req: Request, res: Response) {
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
    var rows = await db.qwerty(`
		SELECT
	      asp.aa_id as id,
	      asp.aa_nombre as name,
              asp.aa_descripcion as description,
	      asp.aa_peso as weigth,
              asp.aa_tipo as tipo_id,
              enu.enu_nombre_valor as met_aspect,
              asp.suj_id as suj,
              suj.suj_nombre as sujeto,
              asp.ma_id as model,
              asp.aa_activo as active,
	      asp.aa_operador as operador
	         FROM
	      aspectoautoconsciencia asp,
              enumeracion enu,
              sujeto suj
	         WHERE
		 asp.aa_alcance=54 AND
	      enu.enu_id=asp.aa_tipo AND
	   	 asp.suj_id= suj.suj_id AND
	        suj.ma_id = ${modelID} AND
	        asp.ma_id=${modelID}`);
    res.json(rows);
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function get_aspects_padres(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var modeloID = req.session?.active_model.modelID;
    var system = req.body.systemID;
    var rows = await db.qwerty(`SELECT 
	    asp_dev.aad_padre as id_padre
	    FROM 
	     aspectoautoconsciencia_derivado asp_dev,
	      aspectoautoconsciencia asp
	    WHERE
	     asp_dev.aad_hijo=${system} AND asp.aa_id=asp_dev.aad_hijo`);
    res.json(rows);
  } else {
    res.json({ error: "Debe iniciar sesion para poder usar la api" });
  }
}

export async function mod_aspects_colective(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var newAspect = req.body;
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
      `UPDATE
aspectoautoconsciencia 
SET	
                aa_nombre= '${newAspect.name}',
                aa_descripcion='${newAspect.description}',
                aa_peso= '${newAspect.weigth}',
                aa_tipo= '${newAspect.type}',
                aa_activo='${newAspect.active ? 1 : 0}',
		aa_operador=${newAspect.operador}
             WHERE 
		aa_id='${newAspect.id}'
	    `
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function get_aspects_hijos(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var modeloID = req.session?.active_model.modelID;
    var id = req.body.id;
    var rows = await db.qwerty(`SELECT asp.aa_id as id, asp.aa_nombre as name, asp.aa_descripcion as description 
	    FROM aspectoautoconsciencia asp INNER JOIN aspectoautoconsciencia_derivado asp_dev ON asp.aa_id=asp_dev.aad_hijo 
	    WHERE asp_dev.aad_padre=${id}`);
    res.json(rows);
  } else {
    res.json({ error: "Debe iniciar sesion para poder usar la api" });
  }
}
export async function get_aspects_hijos_seleccionados(
  req: Request,
  res: Response
) {
  if (req.session?.user) {
    var db = new database2();
    var modeloID = req.session?.active_model.modelID;
    var id = req.body.id;
    var rows = await db.qwerty(`
	    SELECT 
	    aad.aad_hijo as hijos
	    FROM 
	    aspectoautoconsciencia_derivado aad 
	    WHERE
	    aad.aad_padre=${id}`);
    res.json(rows);
  } else {
    res.json({ error: "Debe iniciar sesion para poder usar la api" });
  }
}
