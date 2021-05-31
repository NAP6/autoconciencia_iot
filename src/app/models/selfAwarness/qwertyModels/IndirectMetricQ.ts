import { SQL_Qwerty } from "../../SQL_Qwerty";
import { IndirectMetric } from "../IndirectMetric";

export class IndirectMetricQ extends IndirectMetric implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT 
	  	mt.met_id as id,
		mt.met_nombre as name,
		mt.met_descripcion as description, 
		mt.met_abreviacion as abreviacion
	     FROM 
	     	metrica mt, 
		metodoaprendizajerazonamiento mea 
	     WHERE 
	  	mea.mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
	  	mt.met_id=mea.met_id AND
		mt.met_tipo=11;
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
    var directMetric: IndirectMetricQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var aux: IndirectMetricQ = new IndirectMetricQ(
        rows[i].id,
        rows[i].name,
        rows[i].description,
        rows[i].abreviacion,
      );
      directMetric.push(aux);
    }
    return directMetric;
  }
}
