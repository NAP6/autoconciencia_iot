import { CollectionMethod } from "../CollectionMethod";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class CollectionMethodQ extends CollectionMethod implements SQL_Qwerty {
	toSqlInsert(tag: string[], value: string[]): string {
	var sql =`call MetodoRecoleccion(
	        	'${value[tag.indexOf('/@/PROCES/@/')]}',
	        	'${value[tag.indexOf('/@/MODEL/@/')]}',
	        	'${this.produces?.id}',
	        	'${this.isSupported?.communicationType}',
	        	'${this.collectsProperty[0]?.id}',
	        	'${this.isSupported?.id}',
	        	'${value[tag.indexOf('/@/OBJECT/@/')]}',
			'id'`
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
