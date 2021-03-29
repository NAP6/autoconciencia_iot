import { Parameter } from "../Parameter";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class ParameterQ extends Parameter implements SQL_Qwerty {
  get id(): number {
    return this.ordinal;
  }

  set id(value: number) {
    this.ordinal = value;
  }
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO 
	  		parametro (
	  			par_ordinal, 
		  		par_nombre, 
		  		par_opcional, 
		  		par_activo, 
		  		par_tipo_dato, 
		  		ri_id
  			) VALUES (
	  			'${this.ordinal}', 
		  		'${this.name}', 
		  		'${this.ordinal ? 1 : 0}', 
				'${value[tag.indexOf("/@/ACTIVE/@/")]}',
		  		'${this.dataType}', 
				'${value[tag.indexOf("/@/ID/@/")]}'
  			)`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT 
	  		pa.par_ordinal as ordinal,
		  	pa.par_nombre as nombre, 
		  	pa.par_opcional as opcional, 
		  	pa.par_activo as activo,
		  	pa.par_tipo_dato as tipo,
		  	enu.enu_nombre_valor as nombre_salida 
	  	FROM 	
			parametro pa, 
			enumeracion enu  
		WHERE ri_id = '${this.id}' AND pa.par_tipo_dato=enu.enu_id`;
    return sql;
  }
  toSqlDelete(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlUpdate(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
  }
}
