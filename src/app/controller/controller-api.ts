import { json } from "../models/handling-json";
import { Request, Response } from "express";
import {
  mysql_connector as database,
  mysql_connector,
} from "../models/database";

export function subjects(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var db = new database();
    res.json(db.get_subjectsObjects(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function save_subjects(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var db = new mysql_connector();
    db.save_subjectsObjects(id, req.body);
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
  }
}

export function entity(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var db = new database();
    res.json(db.get_entitys(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function save_entity(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var db = new mysql_connector();
    db.save_entity(id, req.body);
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
  }
}

export function measurement_units(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    res.json(db.getUser_measurementUnit(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function add_measurement_units(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var acronym = req.body.acronym;
    var db = new database();
    db.addUser_measurementUnit(idUser, name, descripcion, acronym);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_measurement_units(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idMeasure = req.body.id;
    var db = new database();
    db.delUser_measurementUnit(idUser, idMeasure);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function upd_measurement_units(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.id;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var acronym = req.body.acronym;
    var activo=req.body.activo;
    var db = new database();
    db.updUser_measurementUnit(idUser, id, name, descripcion, acronym,activo);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function escales(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    res.json(db.getUser_escales(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_escales(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var name = req.body.nombre;
    var valor_valido = req.body.valor_valido;
    var tipo = req.body.tipo;
    var db = new database();
    db.addUser_escales(idUser, name, valor_valido,tipo);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_escales(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idDecision = req.body.id;
    var db = new database();
    db.delUser_escales(idUser, idDecision);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function upd_escales(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.id;
    var name = req.body.nombre;
    var valor_valido = req.body.valor_valido;
    var tipo = req.body.tipo;
    var activo=req.body.activo;
    var db = new database();
    db.updUser_escales(idUser, id, name, valor_valido,tipo,activo);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}




export function decision_criteria(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    res.json(db.getUser_decision_criteria(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_decision_criteria(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var db = new database();
    db.addUser_criteriaDecision(idUser, name, descripcion);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_decision_criteria(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idDecision = req.body.id;
    var db = new database();
    db.delUser_criteriaDecision(idUser, idDecision);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function upd_decision_criteria(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.id;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    
    var db = new database();
    db.updUser_criteriaDecision(idUser, id, name, descripcion);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    res.json(db.getUser_Aspects(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var descripcion = req.body.descripcion;
    var db = new database();
    db.addUser_aspects(idUser,descripcion);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idDecision = req.body.id;
    var db = new database();
    db.delUser_aspects(idUser, idDecision);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function upd_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.id;
    var descripcion = req.body.descripcion;
    
    var db = new database();
    db.updUser_aspects(idUser, id, descripcion);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function user_models(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    res.json(db.getUserModels(id));
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function home(req: Request, res: Response) {
  if (req.session!.user) {
    res.redirect("/");
  } else {
    res.send("Home Api");
  }
}

export function last_ObjectSubjectID(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var db = new database();
    var index = db.getLastObjectSubjectID(id);
    res.json({ id: index });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function last_EntityID(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var db = new database();
    var index = db.getLastEntityID(id);
    res.json({ id: index });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
