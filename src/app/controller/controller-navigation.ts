import { Request, Response, NextFunction } from "express";

export function loggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.session!.user) {
    next();
  } else {
    res.redirect("/login");
  }
}
export function login(req: Request, res: Response) {
  if (req.session!.user) {
    res.redirect("/home");
  } else {
    res.render("login", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      session: req.session,
    });
  }
}

export function singup(req: Request, res: Response) {
  if (req.session!.user) {
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
export function home(req: Request, res: Response) {
  res.render("home", {
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

export function save_new_model(req: Request, res: Response, next: NextFunction) {
  if (req.session!.user) {
    // Guardar
    next();
  } else {
    res.redirect("/login");
  }
}
