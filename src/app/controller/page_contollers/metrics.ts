import { json } from "body-parser";
import { Console } from "console";
import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { MetricQ } from "../../models/selfAwarness/qwertyModels/MetricQ";

export function metrics(req: Request, res: Response) {
  res.render("metrics", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
  });
}
export async function get_metrics(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var metrics:MetricQ=new MetricQ(-1,"","","","");
    var rows= await db.qwerty(metrics.toSqlSelect([],[]));
    res.json(rows);
    
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function get_metrics_aspects(req: Request, res: Response) {
  if (req.session?.user) {
    var db = new database2();
    var id=req.body.id;
    var metrics:MetricQ=new MetricQ(-1,"","","","");
    var rows= await db.qwerty(metrics.toSqlSelect(['/@/ASPECTID/@/'],[id]));
    res.json(rows);
    
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function add_metrics(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newMetric = req.body;
    var metric: MetricQ = new MetricQ(
      -1,
      newMetric.name,
      newMetric.description,
      newMetric.abbreviation,
      newMetric.perspective,

    );
    metric.active = newMetric.active;
    await db.qwerty(
      metric.toSqlInsert(
        ["/@/TYPE/@/", "/@/ESCALE/@/", "/@/UNIT/@/"],
        [newMetric.type_metric, newMetric.scale, newMetric.unit]
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}

export async function add_metrics_aspects(req: Request, res: Response) {
  console.log(req.body);
  if(req.session?.user){
    var db = new database2();
    var element=req.body;
    for(var i=0;i<element.length;i++){
      var cont=await db.qwerty(`SELECT COUNT(asp_me.met_id) cont FROM aspectoautoconsciencia_metrica as asp_me WHERE asp_me.aa_id=${element[i].aa_id} && asp_me.met_id=${element[i].met_id}`);
      cont = cont[0]["cont"];
      console.log(cont);
      if(cont>0&& element[i].existe=='0'){
      await db.qwerty(`DELETE FROM aspectoautoconsciencia_metrica WHERE met_id=${element[i].met_id} AND aa_id=${element[i].aa_id}`);
      }else if(cont==0 && element[i].existe=='1'){
        await db.qwerty(`INSERT INTO aspectoautoconsciencia_metrica(met_id, aa_id) VALUES (${element[i].met_id},${element[i].aa_id})`);
      }
    }
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function mod_metrics(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newMetric = req.body;
    var metric: MetricQ = new MetricQ(
      newMetric.id,
      newMetric.name,
      newMetric.description,
      newMetric.abbreviation,
      newMetric.perspective,

    );
    metric.active = newMetric.active==1;
    await db.qwerty(
      metric.toSqlUpdate(
        ["/@/TYPE/@/", "/@/ESCALE/@/", "/@/UNIT/@/"],
        [newMetric.type_metric, newMetric.scale, newMetric.unit]
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
export async function del_metrics(req: Request, res: Response) {
  if(req.session?.user){
    var db = new database2();
    var newMetric = req.body;
    var metric: MetricQ = new MetricQ(
      newMetric.id,
      "",
      "",
      "",
      "",
    );
    await db.qwerty(
      metric.toSqlDelete(
       ["","",""]
      )
    );
    res.json({ Mensaje: "Los datos se han enviado con exito" });
  } else {
    res.json({ error: "debe iniciar session para poder usar la api" });
  }
}
