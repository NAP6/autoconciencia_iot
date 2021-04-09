import { SimulationValue } from "../SimulationValue";
import { SQL_Qwerty } from "../../SQL_Qwerty";
export class SimulationValueQ extends SimulationValue implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO
		  		valorsimulacion(
				es_id,
				vs_id,
				vas_valor
				)
				VALUES(${this.isUsed},${value[tag.indexOf("/@/VARIABLE/@/")]},${this.value}
	  				)`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT
		  		vs_id as variable_id,
			  	vas_valor as valor
		  		FROM
		  		valorsimulacion vs,
				escenariosimulacion es,
				variablesimulacion var
		  		WHERE
				es.mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
				var.mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
				es.es_id=${this.isUsed} AND 
		  		es.es_id=vs.es_id AND
		  		var.vs_id=${value[tag.indexOf("/@/VARIABLE/@/")]} AND
		  		var.vs_id=vs.vs_id`;
    return sql;
  }
  toSqlDelete(tag: string[], value: string[]): string {
    var sql = `DELETE FROM valorsimulacion WHERE es_id=${
      this.isUsed
    } AND vs_id=${value[tag.indexOf("/@/VARIABLE/@/")]}`;
    return sql;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE
		  		valorsimulacion
		  		SET
		  		vas_valor=${this.value}
		  		WHERE
		  		es_id=${this.isUsed} AND
		  		vs_id=${value[tag.indexOf("/@/VARIABLE/@/")]}`;
    return sql;
  }
  toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
  }
}
