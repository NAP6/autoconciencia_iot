import { CalculationMethod } from "../CalculationMethod";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class CalculationMethodQ
  extends CalculationMethod
  implements SQL_Qwerty
{
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `call MetodoCalculo(
	      	${value[tag.indexOf("/@/PROCES/@/")]},
		${this.produces?.id},
		${this.implementationResourceType},
		${
      this.calculationPeriodStart == undefined
        ? "NULL"
        : "'" + this.calculationPeriodStart + "'"
    },
		${
      this.calculationPeriodEnd == undefined
        ? "NULL"
        : "'" + this.calculationPeriodEnd + "'"
    },
    ${this.intervalo},
    ${this.unidad},

		  @id)`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT   meto.mea_id as id,                            
		        if(meto.mc_tipo_recurso=0,"FORMULA",                                                                                                       
			if(meto.mc_tipo_recurso=1,                                                                                                         
			"FUNCION","SERVICIO")) as tipo_recurso,
			meto.mc_inicio_periodo_calculo as inicio,
			meto.mc_fin_periodo_calculo as fin,
			meto.mc_unidad_tiempo as unidad,
			enu.enu_nombre_valor as unidadT,
			meto.mc_intervalo as intervalo
		FROM
		        metodocalculo meto,                                                                                                       
			procesoautoconsciencia pro,                                                         
		        metodoaprendizajerazonamiento met,
			enumeracion enu
		 WHERE                                                                                                                                                                     pro.pa_id=${
       value[tag.indexOf("/@/PROCES/@/")]
     } AND 
		 	met.pa_id=pro.pa_id AND 
		        met.mea_id=meto.mea_id AND enu.enu_id=meto.mc_unidad_tiempo
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
    var method: CalculationMethodQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var aux: CalculationMethodQ = new CalculationMethodQ(
        rows[i].id,
        rows[i].tipo_recurso,
        rows[i].inicio,
        rows[i].fin,
        rows[i].intervalo,
        rows[i].unidadT

      );
      method.push(aux);
    }
    return method;
  }
}
