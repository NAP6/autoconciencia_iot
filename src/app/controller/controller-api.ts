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
    db.get_subjects(id, (json: object) => {
      res.json(json);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function subjects_objects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database();
    var subjectID = req.body.id;
    db.get_subjectsObjects(subjectID, (json: object) => {
      res.json(json);
    });
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
export function enumeracion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUser_enumeracion(id, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function measurement_units(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUser_measurementUnit(id, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
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
    res.json({ mensaje: "La accion fue realizada con exito" });
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
    res.json({ mensaje: "La accion fue realizada con exito" });
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
    var activo = req.body.activo.toString();

    console.log(activo);
    var db = new database();
    db.updUser_measurementUnit(idUser, id, name, descripcion, acronym, activo);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function escales(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUser_escales(id, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
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
    db.addUser_escales(idUser, name, valor_valido, tipo);
    res.json({ mensaje: "La accion fue realizada con exito" });
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
    res.json({ mensaje: "La accion fue realizada con exito" });
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
    var activo = req.body.activo.toString();

    var db = new database();
    db.updUser_escales(idUser, id, name, valor_valido, tipo, activo);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function decision_criteria(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUser_decision_criteria(id, (jsonCriterio: object) => {
      res.json(jsonCriterio);
    });
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
    res.json({ mensaje: "La accion fue realizada con exito" });
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
    res.json({ mensaje: "La accion fue realizada con exito" });
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
    var activo = req.body.activo.toString();
    console.log(activo);
    var db = new database();
    db.updUser_criteriaDecision(idUser, id, name, descripcion, activo);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function umbral(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var idDecision = req.body.id;
    var db = new database();
    db.getUser_umbral(id, idDecision, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_umbral(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.criterio_select;
    var name = req.body.nombre;
    var Interpretacion = req.body.interpretacion;
    var inferior = req.body.inferior;
    var superior = req.body.superior;
    console.log(superior);
    var db = new database();
    db.addUser_umbral(idUser, name, Interpretacion, inferior, superior, id);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_umbral(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id_umbral = req.body.id;
    var db = new database();
    db.delUser_umbral(idUser, id_umbral);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function upd_umbral(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.id;
    var name = req.body.nombre;
    var interpretacion = req.body.interpretacion;
    var inferior = req.body.inferior;
    var superior = req.body.superior;
    var activo = req.body.activo.toString();

    var db = new database();
    db.updUser_umbral(
      idUser,
      id,
      name,
      interpretacion,
      inferior,
      superior,
      activo
    );
    res.json({ mensaje: "La accion fue realizada con exito" });
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
    db.addUser_aspects(idUser, descripcion);
    res.json({ mensaje: "La accion fue realizada con exito" });
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
    res.json({ mensaje: "La accion fue realizada con exito" });
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
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function user_models(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUserModels(id, (jsonModel: object) => {
      res.json(jsonModel);
    });
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

// RECURSOS IMPLEMENTACION
export function ri(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUser_ri(id, (jsonRI: object) => {
      res.json(jsonRI);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_ri(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var tipo_dato_salida = req.body.tipo_dato_salida;
    var tipo_recurso = req.body.tipo_recurso;
    var db = new database();
    db.addUser_ri(idUser, name, descripcion, tipo_dato_salida, tipo_recurso);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_ri(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idDecision = req.body.id;
    var db = new database();
    db.delUser_ri(idUser, idDecision);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function upd_ri(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.id;
    var name = req.body.nombre;
    var valor_valido = req.body.valor_valido;
    var tipo = req.body.tipo;
    var activo = req.body.activo;
    var db = new database();
    db.updUser_ri(idUser, id, name, valor_valido, tipo, activo);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
<<<<<<< HEAD

// Formulas
export function formula(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUser_ri(id,(jsonRI: object) => {
      res.json(jsonRI);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_formula(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var tipo_dato_salida = req.body.tipo_dato_salida;
    var tipo_recurso = req.body.tipo_recurso;
    var db = new database();
    db.addUser_ri(idUser, name, descripcion, tipo_dato_salida, tipo_recurso);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_formula(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idDecision = req.body.id;
    var db = new database();
    db.delUser_ri(idUser, idDecision);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function upd_formula(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.id;
    var name = req.body.nombre;
    var valor_valido = req.body.valor_valido;
    var tipo = req.body.tipo;
    var activo=req.body.activo;
    var db = new database();
    db.updUser_ri(idUser, id, name, valor_valido,tipo,activo);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

// Funciones
export function funcion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUser_ri(id,(jsonRI: object) => {
      res.json(jsonRI);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_funcion(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var tipo_dato_salida = req.body.tipo_dato_salida;
    var tipo_recurso = req.body.tipo_recurso;
    var db = new database();
    db.addUser_ri(idUser, name, descripcion, tipo_dato_salida, tipo_recurso);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_funcion(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idDecision = req.body.id;
    var db = new database();
    db.delUser_ri(idUser, idDecision);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function upd_funcion(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.id;
    var name = req.body.nombre;
    var valor_valido = req.body.valor_valido;
    var tipo = req.body.tipo;
    var activo=req.body.activo;
    var db = new database();
    db.updUser_ri(idUser, id, name, valor_valido,tipo,activo);
    res.json({mensaje: "La accion fue realizada con exito"});
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
=======
>>>>>>> 4a6ceeac8030852165672aaeea93a2c0e0689173
