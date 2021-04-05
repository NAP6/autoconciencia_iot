import{PreReflectiveProcess} from "../PreReflectiveProcess";
import{ SQL_Qwerty } from "../../SQL_Qwerty";
export class PreReflectiveProcessQ extends PreReflectiveProcess implements SQL_Qwerty{
	toSqlInsert(tag:string[],value:string[]):string{
var sql=``;
return sql;
		        }
	toSqlSelect(tag:string[],value:string[]): string {
var sql = ``;
return sql;
	   }
	toSqlDelete(value: string[]): string {
var sql=` `;
return sql;
	}

	toSqlUpdate(tag: string[], value: string[]): string {
		    var activo;
		  
		    var sql = ``;
		return sql;
	}
	toObjectArray(rows: any): any[] {
		    throw new Error("Method not implemented.");
	}
}

