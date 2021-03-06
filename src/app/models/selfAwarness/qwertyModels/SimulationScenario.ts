import { SimulationScenario } from "../SimulationScenario";
import { SQL_Qwerty } from "../../SQL_Qwerty";
export class SimulationScenarioQ
  extends SimulationScenario
  implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO escenariosimulacion(es_nombre,es_descripcion,es_activo,mea_id)VALUES('${
      this.name
    }','${this.description}',
		  ${this.active ? 1 : 0},${value[tag.indexOf("/@/METHOD/@/")]})`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT
	  	es_id as id,
		es_nombre as name,
		es_descripcion as description,
		es_activo as active
		FROM
		escenariosimulacion
		WHERE
		mea_id=${value[tag.indexOf("/@/METHOD/@/")]}
	  	`;
    return sql;
  }
  toSqlDelete(value: string[]): string {
    var sql = `DELETE FROM escenariosimulacion WHERE es_id=${this.id} `;
    return sql;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE
	  	escenariosimulacion
	  	SET
	  	es_nombre='${this.name}',
		  es_descripcion='${this.description}',
		  es_activo='${this.active}'
		  WHERE
	 	es_id=${this.id}
		  `;
    return sql;
  }
  toObjectArray(rows: any): any[] {
    var SimulationSce: SimulationScenarioQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var aux: SimulationScenarioQ = new SimulationScenarioQ(
        rows[i].id,
        rows[i].name,
        rows[i].description
      );
      SimulationSce.push(aux);
    }
    return SimulationSce;
  }
}
