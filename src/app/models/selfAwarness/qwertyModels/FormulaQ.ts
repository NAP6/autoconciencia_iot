import { Formula } from "../Formula";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class FormulaQ extends Formula implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `call formula(
	  		'${this.name}',
	  		"${this.description}",
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
    var formulas: FormulaQ[] = [];
    rows = rows[0];
    for (var i = 0; i < rows.length; i++) {
      var form = new FormulaQ(
        rows[i].id,
        rows[i].nombre,
        rows[i].descripcion,
        [rows[i].dato_salida, rows[i].dato_salida_id],
        rows[i].expresion
      );
      formulas.push(form);
    }
    return formulas;
  }
}
