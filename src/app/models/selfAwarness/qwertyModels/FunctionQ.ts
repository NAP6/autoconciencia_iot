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
	  		'${value[tag.indexOf("/@/P_EXIST/@/")]}',
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
var sql = `call modificar_funcion(
	  		'${this.name}',
	  		'${this.description}',
	  		${this.returnDataType},
	  		1,
	  		'${this.path}',
	  		'${this.instrucctions}',
	  		'${value[tag.indexOf("/@/P_EXIST/@/")]}',
			${value[tag.indexOf("/@/ID_RECURSO/@/")]},
			@id
		  )`;
    return sql;
  }
  toObjectArray(rows: any): any[] {
    var functions: FunctionQ[] = [];
    rows = rows[0];
    for (var i = 0; i < rows.length; i++) {
      var func = new FunctionQ(
        rows[i].id,
        rows[i].nombre,
        rows[i].descripcion,
        [rows[i].dato_salida, rows[i].dato_salida_id],
        rows[i].path_funcion,
        rows[i].instrucciones
      );
      func.preexisting = rows[i].pre_existente == 1? true : false;
      functions.push(func);
    }
    return functions;
  }
}
