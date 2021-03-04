import { Request, Response, NextFunction } from "express";
import { mysql_connector } from "../data/database";
import { database2 } from "../data/database2";
import * as fs from "fs";
import { parseString } from "xml2js";
import { JSON2Architecture } from "../models/JSON2Architecture";
import { SelfAwarnessQ } from "../models/selfAwarness/qwertyModels/SelfAwarnessQ";

export function loggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.session!.user) {
    next();
  } else {
    res.redirect("/login");
  }
}
export function login(req: Request, res: Response) {
  if (req.session?.user) {
    res.redirect("/home");
    req.flash("error");
    req.flash("succes");
  } else {
    res.render("login", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      session: req.session,
    });
  }
}

export function logout(req: Request, res: Response, next: NextFunction) {
  delete req.session?.user;
  res.redirect("/login");
}

export function singup(req: Request, res: Response) {
  if (req.session?.user) {
    res.redirect("/home");
  } else {
    res.render("singup", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      session: req.session,
    });
  }
}

export function singup_save(req: Request, res: Response, next: NextFunction) {
  if (req.session!.user) {
    //Guardar
    next();
  } else {
    res.redirect("/login");
  }
}

//Inicia sesion de usuario
export function start_session(req: Request, res: Response, next: NextFunction) {
  var db = new mysql_connector();
  var email_user = req.body.email;
  var password_user = req.body.password;

  db.validateUser(email_user, password_user, (cont: number) => {
    if (cont == 1) {
      db.getUser(email_user, password_user, (user: object) => {
        req.session!.user = user;
        req.flash("error", "");
        req.flash("succes", "Bienvenido de vuelta");
        next();
      });
    } else {
      req.flash("error", "El usuario no es valido");
      req.flash("succes", "");
      res.redirect("/");
    }
  });
}

export function select_model(req: Request, res: Response) {
  res.render("select_model", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function models(req: Request, res: Response) {
  res.render("models", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function update_model(req: Request, res: Response) {
  var db = new mysql_connector();
  var idModel = req.body.id_modelo_update;
  var nameModel = req.body.nombre_modelo_update;
  var descripcionModel = req.body.descripcion_ecenario_update;
  var activo = (req.body.activoModelo != undefined).toString();
  db.update_modal(idModel, nameModel, descripcionModel, activo);

  res.render("models", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function subject(req: Request, res: Response) {
  res.render("subject", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export function object(req: Request, res: Response) {
  res.render("object", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export function pre_reflexivos(req: Request, res: Response) {
  res.render("pre_reflexivos", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export function reflexivos(req: Request, res: Response) {
  res.render("reflexivos", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function self_awareness_processes(req: Request, res: Response) {
  res.render("self_awareness_processes", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function measurement_units(req: Request, res: Response) {
  res.render("measurement_units", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function scales(req: Request, res: Response) {
  res.render("scales", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function decision_criteria(req: Request, res: Response) {
  res.render("decision_criteria", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function deployment_resources(req: Request, res: Response) {
  res.render("deployment_resources", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export function proceso_pre_reflexivo(req: Request, res: Response) {
  res.render("proceso_pre_reflexivo", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export function modificar_pre_reflexivos(req: Request, res: Response) {
  var id = req.body.proceso_seleccionado;
  var idUser = req.session?.user.userID;
  var db = new mysql_connector();
  db.getUser_procesos_pre_reflexive_id(idUser, id, (jsonEscala: object) => {
    res.render("modificar_pre_reflexivos", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      modificar: jsonEscala,
      session: req.session,
    });
  });
}
export function modificar_reflexivos(req: Request, res: Response) {
  var id = req.body.proceso_reflexivo_seleccionado;
  var idUser = req.session?.user.userID;
  var db = new mysql_connector();
  db.getUser_procesos_reflexive_id(idUser, id, (jsonEscala: object) => {
    res.render("modificar_reflexivos", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      modificar: jsonEscala,
      session: req.session,
    });
  });
}
export function procesos_reflexivos(req: Request, res: Response) {
  res.render("procesos_reflexivos", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export function generate_model(req: Request, res: Response) {
  var modeloID = req.session?.active_model.modelID;
  var db = new mysql_connector();
  db.generar_modelo(modeloID, (modelo: any) => {
    console.log();
    res.render("generate_model", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      model: JSON.stringify(modelo, null, "  "),
      session: req.session,
    });
  });
}

export async function save_new_model(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session!.user) {
    var nombre = req.body.nombre_modelo;
    var descripcion = req.body.descripcion_ecenario;
    var autor = req.body.autor_modelo;
    var user_id = req.session?.user.userID;
    var db = new mysql_connector();
    //######################
    var db2 = new database2();
    var json: object = [];
    try {
      const xml = fs.readFileSync(req.file.path);
      parseString(xml, function (err: Error, result: Object) {
        if (err) throw err;
        json = result;
      });
    } catch (error) {
      console.log("No se ha ingresado ningun valor");
    }
    var arquitectura = new JSON2Architecture(json);
    var modelo = new SelfAwarnessQ(
      -1,
      nombre,
      descripcion,
      autor,
      JSON.stringify(json, null, "  ")
    );
    await db2.insert(modelo, ["/@/USER/@/"], [user_id.toString()]);
    db2.architecture(arquitectura, modelo.id.toString());
    req.session!.active_model = {
      nombre: modelo.name,
      descripcion: modelo.description,
      modelID: modelo.id.toString(),
    };
    console.log(req.session!.active_model);
    //#####################################################
    next();
  } else {
    res.redirect("/login");
  }
}

export function active_model(req: Request, res: Response, next: NextFunction) {
  var db = new mysql_connector();
  db.getModel(req.body.select_model, (active_model: object) => {
    req.session!.active_model = active_model;
    next();
  });
}

export function home(req: Request, res: Response) {
  res.render("principal", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
