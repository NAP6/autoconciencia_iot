import { json } from '../models/handling-json';
import { Request, Response} from "express";
import { mysql_connector as database } from '../models/database';

export function system(req: Request, res: Response) {
   if (req.session!.user) {
    res.redirect("/");
  } else {
	  var js = new json();
	  var db = new database();
	  js.setJSON(db.getfisicalModel('cosaID'))
	  res.json(js.getSystem());
  }
}

export function entity(req: Request, res: Response) {
   if (req.session!.user) {
    res.redirect("/");
  } else {
	  var js = new json();
	  // Cargar json de la base de datos
	  res.json(js.getEntity());
  }
}

export function home(req: Request, res: Response) {
   if (req.session!.user) {
    res.redirect("/");
  } else {
	  res.send('Home Api');
  }
}
