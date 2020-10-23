export function loggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}
export function login(req, res, next) {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("login", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      session: req.session,
    });
  }
}

export function singup(req, res) {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("singup", {
      error: req.flash("error"),
      succes: req.flash("succes"),
      session: req.session,
    });
  }
}

export function singup_save(req, res) {
  if (req.session.user) {
    //Guardar
    next();
  } else {
    res.redirect("/login");
  }
}
export function home(req, res) {
  res.render("home", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function models(req, res) {
  res.render("models", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function subject(req, res) {
  res.render("subject", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function object(req, res) {
  res.render("object", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function measurement_units(req, res) {
  res.render("measurement_units", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function scales(req, res) {
  res.render("scales", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function decision(req, res) {
  res.render("decision", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function formulas(req, res) {
  res.render("formulas", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function functions(req, res) {
  res.render("functions", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function generate_model(req, res) {
  res.render("generate_model", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}

export function save_new_model(req, res, next) {
  if (req.session.user) {
    // Guardar
    next();
  } else {
    res.redirect("/login");
  }
}
