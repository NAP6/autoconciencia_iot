import { Function } from "../Function";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class FunctionQ extends Function implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `call funcion(
	  		'${this.name}',
	  		'${this.description}',
	  		${this.returnDataType},
	  		1,
	  		'${this.path}',
	  		'${this.instrucctions}',
	  		'${value[tag.indexOf('/@/P_EXIST/@/')]}',
			@id
		  )`;
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
