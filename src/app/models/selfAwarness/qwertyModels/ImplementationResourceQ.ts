import { ImplementationResource } from "../ImplementationResource";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class ImplementationResourceQ
  extends ImplementationResource
  implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlSelect(tag: string[], value: string[]): string {
    if (tag.indexOf("/@/ALL/@/") != -1) return `call get_recurso(${this.id})`;
    else if (tag.indexOf("/@/PARAMETER/@/") != -1) {
      var sql = `SELECT
      			ri.ri_id as id,
			ri.ri_nombre as nombre,
			ri.ri_descripcion as descripcion,
			ri.ri_tipo_recurso as tipo_recurso,
			ri.ri_tipo_dato_salida as tipo_salida,
			enu.enu_nombre_valor as tipo_salida_nombre
	    	 FROM
	    		recursoimplementacion ri,
	    		parametro par,
			enumeracion enu
	    WHERE
	    par.par_ordinal=${value[tag.indexOf("/@/PARAMETER/@/")]} AND
	    par.ri_id=ri.ri_id AND
	    enu.enu_id=ri.ri_tipo_dato_salida`;

      return sql;
    }
    var sql = `SELECT 
				ri_id as id, 
				ri_nombre as nombre, 
				ri_descripcion as descripcion, 
				ri_tipo_dato_salida as tipo_salida, 
				ri_activo as activo, 
				ri_tipo_recurso as tipo_recurso 
			   FROM 
				recursoimplementacion`;
    if (tag.indexOf("/@/TYPE/@/") != -1) {
      sql += `
		  	  WHERE
	 			ri_tipo_recurso = '${value[tag.indexOf("/@/TYPE/@/")]}'		  	
			`;
    }
    return sql;
  }
  toSqlDelete(tag: string[], value: string[]): string {
    var sql = `DELETE FROM recursoimplementacion WHERE ri_id = '${this.id}'`;
    return sql;
  }
  toSqlUpdate(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toObjectArray(rows: any): any[] {
    var implementsResource: ImplementationResourceQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var aux: ImplementationResourceQ = new ImplementationResourceQ(
        rows[i].id,
        rows[i].nombre,
        rows[i].descripcion,
        rows[i].tipo_salida_nombre
      );
      implementsResource.push(aux);
    }
    return implementsResource;
  }
}
