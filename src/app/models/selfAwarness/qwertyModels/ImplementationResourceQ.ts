import { ImplementationResource } from "../ImplementationResource";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class ImplementationResourceQ extends ImplementationResource implements SQL_Qwerty {
	toSqlInsert(tag: string[], value: string[]): string {
		throw new Error("Method not implemented.");
	}
	toSqlSelect(tag: string[], value: string[]): string {
		var sql = `SELECT 
				ri_id as id, 
				ri_nombre as nombre, 
				ri_descripcion as descripcion, 
				ri_tipo_dato_salida as tipo_salida, 
				ri_activo as activo, 
				ri_tipo_recurso as tipo_recurso 
			   FROM 
				recursoimplementacion`;
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
