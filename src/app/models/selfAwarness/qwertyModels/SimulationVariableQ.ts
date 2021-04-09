import { SimulationVariable } from "../SimulationVariable";
import { SQL_Qwerty } from "../../SQL_Qwerty";
export class SimulationVariableQ extends SimulationVariable implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO
	  	variablesimulacion (
  		vs_nombre,
  		vs_activo,
		mea_id)
	  	VALUES(
  		'${this.name}',
  		${this.active ? 1:0},
		${value[tag.indexOf("/@/METHOD/@/")]})`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT
	  	vs_id as id,
		vs_nombre as name,
	  	vs_activo as active
	  	FROM
	  	variablesimulacion
	  	WHERE
	  	mea_id=${value[tag.indexOf("/@/METHOD/@/")]}`;
    return sql;
  }
  toSqlDelete(value: string[]): string {
    var sql = `DELETE FROM variablesimulacion WHERE vs_id=${this.id} `;
    return sql;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE
    		variablesimulacion
		SET
		        vs_nombre='${this.name}', 
			vs_activo=${this.active ? 1 : 0}
		WHERE 
	    		vs_id=${this.id}`;
    return sql;
  }
  toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
  }
}
