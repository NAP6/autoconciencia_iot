import { Parameter } from "../Parameter";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class ParameterQ extends Parameter implements SQL_Qwerty {
  private _active: boolean = false;

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get id(): number {
    return this.ordinal;
  }

  set id(value: number) {
    this.ordinal = value;
  }

  toSqlInsert(tag: string[], value: string[]): string {
    if (this.id != undefined) {
      var sql = `INSERT INTO 
	  		parametro (
			        par_id,
	  			par_ordinal, 
		  		par_nombre, 
		  		par_opcional, 
		  		par_activo, 
		  		par_tipo_dato, 
		  		ri_id
  			) VALUES (
			        '${this.ordinal}',
	  			'${this.ordinal}', 
		  		'${this.name}', 
		  		'${this.optional ? 1 : 0}', 
				'${value[tag.indexOf("/@/ACTIVE/@/")]}',
		  		'${this.dataType}', 
				'${value[tag.indexOf("/@/ID/@/")]}'
  			)`;
      console.log(sql);
      return sql;
    } else {
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
		  		'${this.optional ? 1 : 0}', 
				'${value[tag.indexOf("/@/ACTIVE/@/")]}',
		  		'${this.dataType}', 
				'${value[tag.indexOf("/@/ID/@/")]}'
  			)`;
      console.log(sql);
      return sql;
    }
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = "";
    if (tag.indexOf("/@/MAPPING/@/") != -1) {
      sql = `SELECT 
      			pa.par_id as id,
	  		pa.par_ordinal as ordinal,
		  	pa.par_nombre as nombre, 
		  	pa.par_opcional as opcional, 
		  	pa.par_activo as activo,
		  	pa.par_tipo_dato as tipo,
		  	enu.enu_nombre_valor as nombre_salida 
	  	FROM 	
			parametro pa, 
			enumeracion enu,
			mapeoparametros map
		WHERE 
	  		map.md_id=${value[tag.indexOf("/@/MAPPING/@/")]} AND 
			map.par_ordinal=pa.par_id AND
			pa.par_tipo_dato=enu.enu_id`;
    } else {
      sql = `SELECT 
      			pa.par_id as id,
	  		pa.par_ordinal as ordinal,
		  	pa.par_nombre as nombre, 
		  	pa.par_opcional as opcional, 
		  	pa.par_activo as activo,
		  	pa.par_tipo_dato as tipo,
		  	enu.enu_nombre_valor as nombre_salida 
	  	FROM 	
			parametro pa, 
			enumeracion enu
		WHERE 
	  		ri_id = '${value[tag.indexOf("/@/RI_ID/@/")]}' AND 
			pa.par_tipo_dato=enu.enu_id`;
    }
    console.log(sql);
    return sql;
  }
  toSqlDelete(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlUpdate(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toObjectArray(rows: any): any[] {
    var parameters: ParameterQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var par = new ParameterQ(
        rows[i].ordinal,
        rows[i].id,
        rows[i].nombre,
        [rows[i].tipo, rows[i].nombre_salida],
        rows[i].opcional == 1 ? true : false
      );
      par.active = rows[i].activo == 1 ? true : false;
      parameters.push(par);
    }
    return parameters;
  }
}
