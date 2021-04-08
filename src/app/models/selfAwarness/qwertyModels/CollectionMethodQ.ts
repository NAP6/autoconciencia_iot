import { CollectionMethod } from "../CollectionMethod";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class CollectionMethodQ extends CollectionMethod implements SQL_Qwerty {
	toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO metodoaprendizajerazonamiento (pa_id,mea_tipo,met_id) VALUES ('${data.proceso_id}','${21}','${data.m_recoleccion.met_id}')`;
		`call MetodoRecoleccion(
		${value[tag.indexOf('/@/PROCES/@/')},
		${value[tag.indexOf('/@/MODEL/@/')},
		${this.produces?.id}
			in tipo_comunicacion int(11),
			in propiedad int(11),
			in flujo int(11),
			in objeto int(11),
			OUT id int(11))`
		return sql;
	}
	toSqlSelect(tag: string[], value: string[]): string {
		throw new Error("Method not implemented.");
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
