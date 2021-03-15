import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";

import { IoTSystemQ, PhysicalEntityQ, CloudNodeQ, FogNodeQ, IoTGatewayQ,SensorQ, TagQ, ActuatorQ, NetworkQ } from "../../models/selfAwarnessModels";

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
        var seleccion = req.body.valorS;
        var system = req.body.systemID;
        var rows: any;;

        if (seleccion == "Entidades Físicas") {
            rows = await db.qwerty(new PhysicalEntityQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
        } else if (seleccion == "Nodos Cloud") {
            rows = await db.qwerty(new CloudNodeQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
        } else if (seleccion == "Nodos Fog") {
            rows = await db.qwerty(new FogNodeQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
        } else if (seleccion == "Gateway IoT") {
            rows = await db.qwerty(new IoTGatewayQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
        } else if (seleccion == "Sensores") {
            rows = await db.qwerty(new SensorQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
        } else if (seleccion == "Tags") {
            rows = await db.qwerty(new TagQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
        } else if (seleccion == "Actuadores") {
            rows = await db.qwerty(new ActuatorQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
        } else if (seleccion == "Red") {
            rows = await db.qwerty(new NetworkQ(-1, "", "").toSqlSelect(['/@/MODEL/@/', '/@/SYSTEM/@/'], [id, system]));
        }

        //var rows = await db.qwerty(objeto.toSqlSelect(["/@/MODEL/@/"], [id, seleccion]));
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
