import { CollectionMethod } from "../CollectionMethod";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class CollectionMethodQ extends CollectionMethod implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `call MetodoRecoleccion(
	        	${value[tag.indexOf("/@/PROCES/@/")]},
	        	${value[tag.indexOf("/@/MODEL/@/")]},
	        	${this.produces?.id},
	        	${this.isSupported?.communicationType},
	        	${this.collectsProperty[0]?.id},
	        	${this.isSupported?.id},
	        	${value[tag.indexOf("/@/OBJECT/@/")]},
			@id)`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT 
    mr.mea_id as metodoAprend_id,
    mea.mea_tipo as tipo_metodo,
    mea.pa_id as proceso_id,
    mea.met_id as metrica_id,
    mr.mr_tipo_comunicacion as comunicacion,
    mr.pro_id as propiedad, 
    mr.flu_id as flujo, 
    mr.obj_id as objeto  
		FROM 
		metodorecoleccion mr, 
		metodoaprendizajerazonamiento mea, 
		procesoautoconsciencia pro 
		WHERE 
		mr.mea_id=mea.mea_id AND 
		pro.pa_id=${value[tag.indexOf("/@/PROCES/@/")]} AND 
		pro.pa_id=mea.pa_id
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
    throw new Error("Method not implemented.");
  }
}
