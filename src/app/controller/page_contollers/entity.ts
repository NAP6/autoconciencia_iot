import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { EntityQ } from "../../models/architecture/EntityQ";
import { IoTSystemQ } from "../../models/selfAwarness/qwertyModels/IoTSystemQ";

export function entity(req: Request, res: Response) {
    res.render("entity", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}

export async function entitys(req: Request, res: Response) {
    if (req.session?.user) {
        var id = req.session!.active_model.modelID;
        var db = new database2();
        var seleccion=req.body.valorS;
       
        var objeto: EntityQ = new EntityQ(-1, "","");
        var rows = await db.qwerty(objeto.toSqlSelect(["/@/MODEL/@/"], [id],seleccion));
        //console.log(rows)
        res.json(rows);
    } else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}

export async function update_entitys(req: Request, res: Response) {
    if (req.session?.user) {
        res.json({ Mensaje: "Los datos se han enviado con exito" });
    } else {
        res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
    }
}
