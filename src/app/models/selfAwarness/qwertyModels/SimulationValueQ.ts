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
    var sql = "";
    if (value[tag.indexOf("/@/VARIABLE/@/")] != undefined) {
      sql = `SELECT
			vs_id,
			es_id,
	    		vas_valor
	    		FROM
	    		valorsimulacion
			WHERE
	    		vs_id=${value[tag.indexOf("/@/VARIABLE/@/")]}`;
    } else {
      sql = `SELECT
		  		vs.vs_id as variable_id,
			  	vs.vas_valor as valor,
				var.vs_nombre as nombre_variable
		  		FROM
		  		valorsimulacion vs,
				escenariosimulacion es,
				variablesimulacion var
		  		WHERE
				es.mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
				var.vs_id=vs.vs_id AND
				es.es_id=${this.isUsed} AND 
		  		es.es_id=vs.es_id`;
    }
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
    var simulation: SimulationValueQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var aux: SimulationValueQ = new SimulationValueQ(rows[i].vas_valor);
      aux.scenario_id = rows[i].es_id;
      aux.variable_id = rows[i].vs_id;
      simulation.push(aux);
    }
    return simulation;
  }
}
