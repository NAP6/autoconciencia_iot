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
               pa_tipo,
	       ma_id,
	       pa_tipo_ejecucion,
	       pa_unidad_tiempo,
	       pa_intervalo_ejecucion,
	       pa_hora_ejecucion) 
	       values (
	      '${this.name}',
	      '${this.description}',
	      ${
          this.executionPeriodStart == undefined
            ? "NULL"
            : "'" + this.executionPeriodStart + "'"
        },
	     ${
         this.executionPeriodEnd == undefined
           ? "NULL"
           : "'" + this.executionPeriodEnd + "'"
       },
		${this.active},
		${value[tag.indexOf("/@/ASPECTID/@/")]},
		${value[tag.indexOf("/@/SUBJECT/@/")]},
		${this.type_process},
		${value[tag.indexOf("/@/MODEL/@/")]},
		${this.executionType},
		${value[tag.indexOf("/@/HORA/@/")]},
		${this.executionTimeInterval == undefined ? -6 : this.executionTimeInterval},
		${this.executionTime == undefined ? "NULL" : "'" + this.executionTime + "'"})`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT
	  proceso.pa_id as id,
		  proceso.pa_nombre as nombre,
		  proceso.pa_descripcion as descripcion,
		  DATE_FORMAT(proceso.pa_inicio_periodo_ejecucion,"%Y-%m-%d") as inicio,
		  DATE_FORMAT(proceso.pa_fin_periodo_ejecucion,"%Y-%m-%d") as fin,
		  proceso.aa_id as aspecto_id,
		  asp.aa_nombre as aspecto,
		  suj.suj_nombre as sujeto,
		  proceso.suj_id as sujeto_id,
		  proceso.pa_activo as activo
	  	  FROM 
		  procesoautoconsciencia proceso,
		  aspectoautoconsciencia asp, 
		  sujeto suj 
	  	  WHERE
	          proceso.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
	  	  suj.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
		  asp.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
		  proceso.aa_id=asp.aa_id AND
		  proceso.suj_id=suj.suj_id AND
		  proceso.pa_tipo=17
		  `;
    return sql;
  }
  toSqlDelete(value: string[]): string {
    var sql = `DELETE FROM procesoautoconsciencia WHERE pa_id=${this.id}`;
    return sql;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE
	  procesoautoconsciencia
	  SET
	  pa_descripcion='${this.description}',
		  pa_inicio_periodo_ejecucion=${
        this.executionPeriodStart == undefined
          ? "NULL"
          : "'" + this.executionPeriodStart + "'"
      },
		  pa_fin_periodo_ejecucion=${
        this.executionPeriodEnd == undefined
          ? "NULL"
          : "'" + this.executionPeriodEnd + "'"
      }
	  WHERE
	  pa_id=${this.id}`;
    return sql;
  }
  toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
  }
}
