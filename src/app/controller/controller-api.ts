import { json } from "../models/handling-json";
import { Request, Response } from "express";
import {
  mysql_connector as database,
  mysql_connector,
} from "../data/database";
export function add_deployment_resources(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database();
    db.add_deployment_resources(req.body, (json: object) => {
      res.json(json);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function del_deployment_resources(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database();
    db.del_deployment_resources(req.body.id, (json: object) => {
      res.json(json);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function ask_deployment_resources_select(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database();
    db.ask_deployment_resources_select(req.body.tipo, (json: object) => {
      res.json(json);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function ask_deployment_resources(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database();

    db.ask_deployment_resources(req.body.id, (json: object) => {
      res.json(json);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function ask_input_arguments(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database();
    db.sk_input_arguments(req.body.aspectoId,req.body.metricaId, (json: object) => {
      res.json(json);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function deployment_resources(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database();
    db.get_deployment_resources((json: object) => {
      res.json(json);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
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

export function delete_subjects_objects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database();
    var objectID = req.body.id;
    db.delete_subjects_objects(objectID, () => {
      res.json({ Mensaje: "Los datos se han eliminado con exito" });
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function save_subjects_objects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database();
    var newSubjectObject = req.body;
    db.save_subjects_objects(newSubjectObject, () => {
      res.json({ Mensaje: "Los datos se han enviado con exito" });
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

export function update_subjects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new mysql_connector();
    var elementos = req.body;
    elementos.forEach((e: { id: string; activo: string }) => {
      db.update_subject(e.id, e.activo);
    });
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
  }
}

export function entity(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session!.active_model.modelID;
    var seleccion = req.body.valorS;
    var db = new database();

    db.get_entitys(id, seleccion, (json: object) => {
      res.json(json);
    });
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
export function update_entity(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new mysql_connector();
    var elementos = req.body;
    elementos.forEach((e: { id: string; activo: string }) => {
      db.update_entity(e.id, e.activo);
    });
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
export function get_enumeracion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var nombre = req.body.tipo;
    var db = new database();
    db.getUser_get_enumeracion(id, nombre, (jsonEscala: object) => {
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
export function get_escales_select(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUser_escales_select(id, (jsonEscala: object) => {
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
export function get_umbral(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var nombre = req.body.nombre;
    var db = new database();
    db.getUser_get_umbral(id, nombre, (jsonEscala: object) => {
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
    var idP = req.body.id;
    var db = new database();
    db.getUser_Aspects(id, idP, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var tipo = req.body.tipoS;
    var peso = req.body.peso;
    var idP = req.body.id;
    var activo = req.body.activo.toString();
    console.log(tipo);
    var db = new database();
    db.addUser_aspects(idUser, name, descripcion, tipo, peso, idP, activo);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idaspecto = req.body.idD;
    var db = new database();
    db.delUser_aspects(idUser, idaspecto);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_metrica(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var abreviatura = req.body.abreviatura;
    var escala = req.body.escala;
    var unidad = req.body.unidad;
    var tipo = req.body.tipo;
    var idP = req.body.id;
    var activo = req.body.activo.toString();
    var db = new database();
    db.addUser_metrica(
      idUser,
      name,
      descripcion,
      abreviatura,
      escala,
      unidad,
      tipo,
      idP,
      activo
    );
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function get_metrica(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var idP = req.body.id;
    var db = new database();
    db.getUser_Metrica(id, idP, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function get_metrica_select(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var nombreAs = req.body.nombre;
    var tipoM = req.body.tipo;
    var db = new database();
    db.getUser_Metrica_select(id, nombreAs, tipoM, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function del_metrica(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idaspecto = req.body.idD;
    var db = new database();
    db.delUser_metrica(idUser, idaspecto);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_accion(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var meaId= req.body.meaId;
    var idP = req.body.UmbralId;
    var db = new database();
    db.addUser_accion(idUser, name, descripcion,idP,meaId);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function get_accion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var idP = req.body.id;
    var db = new database();
    db.getUser_accion(id, idP, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_accion(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idaccion = req.body.id;
    var db = new database();
    db.delUser_accion(idUser, idaccion);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function upd_acciones_umbrales(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var idaccion = req.body.id;
    var nombre =req.body.nombre;
    var descripcion=req.body.descripcion;
    var activo=req.body.activo.toString();
    console.log(activo);
    var db = new database();
    db.upd_acciones_umbrales(idUser, idaccion,nombre,descripcion,activo);
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
    var expresion = req.body.expresion;
    var path = req.body.path;
    var instruccion = req.body.instruccion;
    var pf = req.body.pf;
    var instruccionS = req.body.instruccionS;
    var ts = req.body.ts;
    var db = new database();
    db.addUser_ri(
      idUser,
      name,
      descripcion,
      tipo_dato_salida,
      tipo_recurso,
      expresion,
      path,
      instruccion,
      pf,
      instruccionS,
      ts
    );
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
export function add_process_pre_reflexive(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var inicioP = req.body.inicioP;
    var finP = req.body.finP;
    var aspId=req.body.aspId;
    var sujId=req.body.sujId;
    var paTipo=req.body.paTipo;
    var objId=req.body.objId;
    var objetivo=req.body.objetivo;
    var db = new database();
    db.add_process_pre_reflexive(idUser, name, descripcion,inicioP,finP,aspId,objId,sujId,paTipo,objetivo,(id: number) => {
      res.json({id:id});
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function procesos_pre_reflexive(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUser_procesos_pre_reflexive(id, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function process_pre_reflexive_id(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.id;
    var db = new database();
    db.getUser_procesos_pre_reflexive_id(idUser, id,(jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function del_process_pre_reflexive(req: Request, res: Response) {
  if (req.session?.user) {
    var idUser = req.session?.user.userID;
    var id = req.body.id;
    var db = new database();
    db.del_process_pre_reflexive(idUser, id);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function mod_process_pre_reflexive(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.body.id;
    var name = req.body.nombre;
    var descripcion = req.body.descripcion;
    var inicio = req.body.inicio;
    var fin = req.body.fin;
    var db = new database();
    db.mod_process_pre_reflexive(
       id,name,descripcion,inicio,fin
    );
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_metodo_modelo(req: Request, res: Response) {
  if (req.session?.user) {
    var data:metodo_modelo_proceso=req.body;
    console.log(data);
    var db = new database();
    db.add_metodo_modelo(data, (resp) => {
      res.json(resp);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
  
}
export function add_mapeo_parametros(req: Request, res: Response) {
  if (req.session?.user) {
    var data:[mapeo_parametros]=req.body;
    var db = new database();
    db.add_mapeo_parametros(data);
    res.json({ mensaje: "La accion fue realizada con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
  
}
export function procesos_reflexive(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    db.getUser_procesos_reflexive(id, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function properties(req: Request, res: Response) {
  if (req.session?.user) {

    var idObj=req.body.id;
    var db = new database();
    db.getUser_properties(idObj,(jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function add_metodo_modelo_reflexivos(req: Request, res: Response) {
  if (req.session?.user) {
    var data:metodo_modelo_proceso_reflexivos=req.body;
    console.log(data);
    var db = new database();
    db.add_metodo_modelo_reflexivos(data, (resp) => {
      res.json(resp);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
  
}
export function objetivos_sujetos(req: Request, res: Response) {
  if (req.session?.user) {
    var id=req.body.id;

    var db = new database();
    db.objetivos_sujetos(id, (resp) => {
      res.json(resp);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
  
}
export function get_metodo_aprendizaje(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var metodoid=req.body.id;
    db.get_metodo_aprendizaje(id,metodoid, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function add_escenario_simulacion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var nombre=req.body.nombre;
    var descripcion=req.body.descripcion;
    var mea_id=req.body.mea_id;
    db.add_escenario_simulacion(id,nombre,descripcion,mea_id, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function escenario_simulacion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var mea_id=req.body.mea_id;
    db.escenario_simulacion(id,mea_id, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function del_escenario_simulacion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var idE=req.body.id;
    db.del_escenario_simulacion(id,idE, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function upd_escenario_simulacion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var idE=req.body.id;
    var nombre=req.body.nombre;
    var descripcion = req.body.descripcion;
    var activo=req.body.activo.toString();
    db.upd_escenario_simulacion(id,idE,nombre,descripcion,activo, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function get_variables_valor(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var idV=req.body.id;
    db.get_variables_valor(id,idV, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function get_variable_simulacion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var mea_id=req.body.mea_id;
    db.get_variable_simulacion(id,mea_id, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function get_variable_simulacion_id(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var idP= req.body.id;
    db.get_variable_simulacion_id(id,idP, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function add_variable_simulacion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var nombre=req.body.nombre;
    var mea_id=req.body.mea_id;
    db.add_variable_simulacion(id,nombre,mea_id, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_variable_simulacion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var idE=req.body.id;
    db.del_variable_simulacion(id,idE, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function upd_variable_simulacion(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var idE=req.body.id;
    var nombre=req.body.nombre;
    var activo=req.body.activo.toString();
    db.upd_variable_simulacion(id,idE,nombre,activo, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function add_variables_valor(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var es_id=req.body.es_id;
    var vs_id=req.body.vs_id;
    var vas_valor=req.body.vas_valor;
      db.add_variables_valor(id,es_id,vs_id,vas_valor, (jsonEscala: object) => {
        res.json(jsonEscala);
      });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export function del_variables_valor(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var idE=req.body.vas_valor;
    db.del_variables_valor(id,idE, (jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export function upd_variables_valor(req: Request, res: Response) {
  if (req.session?.user) {
    var id = req.session?.user.userID;
    var db = new database();
    var vs_id=req.body.vs_id;
    var vas_valor=req.body.vas_valor;
    var vas_valor_viejo=req.body.vas_valor_viejo;
    db.upd_variables_valor(id,vs_id,vas_valor,vas_valor_viejo,(jsonEscala: object) => {
      res.json(jsonEscala);
    });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
interface metodo_modelo_proceso {
  proceso_id: string;
  m_recoleccion:{
    mr_tipo:string;
    pro_id:string;
    pro_alcance:string;
    met_id:string;
  };
  m_modelo:{
    ma_tipo:string;
    criterio_id:string;
    met_id:string;
  }
}
interface mapeo_parametros{
  par_ordinal:string;
  mea_id:string;
  mp_tipo_entrada:string;
  met_id:string;
  vs_id:string;
  md_id:string;
}
interface metodo_modelo_proceso_reflexivos {
  proceso_id: string;
  m_calculo:{
    inicio:string;
    fin:string;
    tipo_recurso:string;
    met_id:string;
  };
  modelo:{
    modeloTipo:string;
    criterio_id:string;
    met_id:string;
  }
}