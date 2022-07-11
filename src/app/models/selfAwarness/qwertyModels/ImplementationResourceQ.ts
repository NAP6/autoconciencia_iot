import { ImplementationResource } from "../ImplementationResource";
import { SQL_Qwerty } from "../../SQL_Qwerty";
import { FormulaQ } from "./FormulaQ";
import { FunctionQ } from "./FunctionQ";
import { WebServiceQ } from "./WebServiceQ";

export class ImplementationResourceQ
  extends ImplementationResource
  implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlSelect(tag: string[], value: string[]): string {
    if (tag.indexOf("/@/ALL/@/") != -1) return `call get_recurso(${this.id})`;
    else if (tag.indexOf("/@/PARAMETER/@/") != -1) {
      var sql = `call get_recurso((SELECT
      ri.ri_id as id
	     FROM
	     recursoimplementacion ri,
		     parametro par
	     WHERE
	      par.par_id=${value[tag.indexOf("/@/PARAMETER/@/")]} AND
	       par.ri_id=ri.ri_id))
	    `;
	    console.log(sql);
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
    rows = rows[0];
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].tipo_recurso == 0) {
        var aux: FormulaQ = new FormulaQ(
          rows[i].id,
          rows[i].nombre,
          rows[i].descripcion,
          rows[i].dato_salida,
          rows[i].expresion
        );
        implementsResource.push(aux);
      } else if (rows[i].tipo_recurso == 1) {
        var aux2: FunctionQ = new FunctionQ(
          rows[i].id,
          rows[i].nombre,
          rows[i].descripcion,
          rows[i].dato_salida,
          rows[i].path_funcion,
          rows[i].instrucciones
        );
        implementsResource.push(aux2);
      } else {
        var aux3: WebServiceQ = new WebServiceQ(
          rows[i].id,
          rows[i].nombre,
          rows[i].descripcion,
          rows[i].dato_salida,
          rows[i].punto_final,
          rows[i].instrucciones,
          rows[i].tipo_formato_dato_salida
        );
        implementsResource.push(aux3);
      }
    }
    return implementsResource;
  }
}
