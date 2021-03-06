import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { IoTSystemQ } from "../../models/selfAwarness/qwertyModels/IoTSystemQ";

export function subject(req: Request, res: Response) {
    res.render("subject", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}

export async function subjects(req: Request, res: Response) {
    if (req.session?.user) {
        var id = req.session!.active_model.modelID;
        var db = new database2();
        var system: IoTSystemQ = new IoTSystemQ(-1, "");
        var rows = await db.qwerty(system.toSqlSelect(["/@/MODEL/@/"], [id]));
        //console.log(rows)
        res.json(rows);
    } else {
        res.json({ error: "debe iniciar session para poder usar la api" });
    }
}

export async function update_subjects(req: Request, res: Response) {
    if (req.session?.user) {
        var db = new database2();
        var elementos = req.body;
        for (var i = 0; i < elementos.length; i++) {
            var system: IoTSystemQ = new IoTSystemQ(parseInt(elementos[i].id), "");
            system.active = elementos[i].activo ? true : false;
            await db.qwerty(system.toSqlUpdate(['/@/ACTIVE/@/'], []));
        }
        res.json({ Mensaje: "Los datos se han enviado con exito" });
    } else {
        res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
    }
}
