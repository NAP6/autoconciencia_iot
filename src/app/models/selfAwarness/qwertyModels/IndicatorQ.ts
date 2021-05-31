import { SQL_Qwerty } from "../../SQL_Qwerty";
import { Indicator } from "../Indicator";

export class IndicatorQ extends Indicator implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT 
	  	mt.met_id as id,
		mt.met_nombre as name,
		mt.met_descripcion as description, 
		mt.met_abreviacion as abreviacion,
		mt.met_perspectivaindicador as perspectiva

	     FROM 
	     	metrica mt, 
		metodoaprendizajerazonamiento mea 
	     WHERE 
	  	mea.mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
	  	mt.met_id=mea.met_id AND
	  	mt.met_tipo=12`;

    return sql;
  }
  toSqlDelete(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlUpdate(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toObjectArray(rows: any): any[] {
    var indicator: IndicatorQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var aux: IndicatorQ = new IndicatorQ(
        rows[i].id,
        rows[i].name,
        rows[i].description,
        rows[i].abreviacion,
        rows[i].perspectiva
      );
      indicator.push(aux);
    }
    return indicator;
  }
}
