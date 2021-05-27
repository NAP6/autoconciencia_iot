import { AnalysisModel } from "../AnalysisModel";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class AnalysisModelQ extends AnalysisModel implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `call ModeloAnalisis(
	         ${value[tag.indexOf("/@/PROCES/@/")]},
		 ${this.produces?.id},
                 ${this.implementationResourceType},
	         ${value[tag.indexOf("/@/CRITERIA/@/")]},
                  @id)`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT 
	  		moda.mea_id,
			if(moda.ma_tipo_recurso=0,"FORMULA",
				if(moda.ma_tipo_recurso=1,
					"FUNCION","SERVICIO")) as tipo_recurso 
	  	FROM 
			modeloanalisis moda,
			procesoautoconsciencia pro,
			metodoaprendizajerazonamiento met
	  	WHERE 
			pro.pa_id=${value[tag.indexOf("/@/PROCES/@/")]} AND
			met.pa_id=pro.pa_id AND
			met.mea_id=moda.mea_id
			
	  `;
    return sql;
  }
  toSqlDelete(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlUpdate(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toObjectArray(rows: any): any[] {
    var models: AnalysisModelQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var aux: AnalysisModelQ = new AnalysisModelQ(
        rows[i].mea_id,
        rows[i].tipo_recurso
      );
      models.push(aux);
    }
    return models;
  }
}
