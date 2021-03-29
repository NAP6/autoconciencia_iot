import { WebService } from "../WebService";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class WebServiceQ extends WebService implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `call servicio(
	  		'${this.name}',
	  		'${this.description}',
	  		${this.returnDataType},
	  		1,
	  		'${this.endPoint}',
	  		'${this.instrucctions}',
	  		'${value[tag.indexOf('/@/P_EXIST/@/')]}',
	  		'${this.DataFormatType}',
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
