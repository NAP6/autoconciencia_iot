import { PreReflectiveProcess } from "../PreReflectiveProcess";
import { SQL_Qwerty } from "../../SQL_Qwerty";
export class PreReflectiveProcessQ
  extends PreReflectiveProcess
  implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO 
	       procesoautoconsciencia(
	       pa_nombre,
	       pa_descripcion,
	       pa_inicio_periodo_ejecucion,
	       pa_fin_periodo_ejecucion,
	       pa_activo,
	       aa_id,
	       suj_id,
               pa_tipo) 
	       values (
	      '${this.name}',
	      '${this.description}',
	      '${
          this.executionPeriodStart == undefined
            ? "NULL"
            : this.executionPeriodStart
        }',
	     '${
         this.executionPeriodEnd == undefined ? "NULL" : this.executionPeriodEnd
       }',
		${this.active},
		${value[tag.indexOf("/@/ASPECTID/@/")]},
		${value[tag.indexOf("/@/SUBJECT/@/")]},
		${this.type_process})`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = ``;
    return sql;
  }
  toSqlDelete(value: string[]): string {
    var sql = ` `;
    return sql;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    var activo;

    var sql = ``;
    return sql;
  }
  toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
  }
}
