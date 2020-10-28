import { Request, Response, NextFunction } from "express";
import {mysql_connector} from "../models/database";

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

export function start_session(req:Request, res:Response, next:NextFunction){
  var db=new mysql_connector();
  var email_user=req.body.email;
  var password_user=req.body.password;
  
  if(db.validateUser(email_user,password_user)){
    req.session!.user ={email: email_user} ;
    req.flash("error", "");
    req.flash("succes", "Exito  ");
    next();
  }else{
    req.flash("error", "El usuario no es valido");
    req.flash("succes", "");
    res.redirect('/');
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
export function home(req: Request, res: Response) {
  res.render("principal", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
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
  res.render("/modelsV/create_model", {
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

export function measurement_units(req: Request, res: Response) {
  res.render("units_of_measure", {
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

export function decision(req: Request, res: Response) {
  res.render("decision_criteria", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function formulas(req: Request, res: Response) {
  res.render("formulas", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function functions(req: Request, res: Response) {
  res.render("calcule_functions", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function generate_model(req: Request, res: Response) {
  res.render("generate_model", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export function logout(req: Request, res: Response,next:NextFunction) {
  req.session?.destroy((err) =>{if(err) throw err});
  next();
 
}

export function save_new_model(req: Request, res: Response, next: NextFunction) {
  if (req.session!.user) {
    // Guardar
    next();
  } else {
    res.redirect("/login");
  }
}
