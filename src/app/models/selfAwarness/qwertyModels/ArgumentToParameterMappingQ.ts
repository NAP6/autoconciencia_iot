import { SQL_Qwerty } from "../../SQL_Qwerty";
import { ArgumentToParameterMapping } from "../ArgumentToParameterMapping";

export class ArgumentToParameterMappingQ
  extends ArgumentToParameterMapping
  implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }

  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT
    		  map.mp_tipo_entrada as tipo_entrada,
		  map.met_id as metrica,
		  map.vs_id as variable,
		  map.md_id as id
	  FROM
	  mapeoparametros map,
		  metodoaprendizajerazonamiento mea
	  WHERE
	  mea.mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
	  mea.mea_id=map.mea_id`;
    return sql;
  }

  toSqlDelete(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }

  toObjectArray(rows: any): any[] {
    var mapping: ArgumentToParameterMappingQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var aux: ArgumentToParameterMappingQ = new ArgumentToParameterMappingQ(
        rows[i].id
      );
      mapping.push(aux);
    }
    return mapping;
  }
}
