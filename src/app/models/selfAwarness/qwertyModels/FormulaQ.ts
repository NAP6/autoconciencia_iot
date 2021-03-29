import { Formula } from "../Formula";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class FormulaQ extends Formula implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `call formula(
	  		'${this.name}',
	  		'${this.description}',
	  		${this.returnDataType},
	  		1,
	  		'${this.expression}',
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
