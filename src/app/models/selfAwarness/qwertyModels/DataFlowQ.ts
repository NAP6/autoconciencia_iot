import { DataFlow } from "../DataFlow";
import { SQL_Qwerty } from "../../SQL_Qwerty";
export class DataFlowQ extends DataFlow implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = ``;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT
    		flu.flu_id as id,
		flu.flu_descripcion as descripcion
	  FROM
	  flujodatos flu,
	  propiedad pro,
	  propiedad_flujodatos pro_flu
	  WHERE
	  flu.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
	  pro.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
	  pro_flu.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
	  pro.pro_id=${value[tag.indexOf("/@/PROPERTY/@/")]} AND
	  pro.pro_id=pro_flu.pro_id AND
	  pro_flu.flu_id=flu.flu_id AND
	  flu.flu_tipo_comunicacion ='${value[tag.indexOf("/@/COMUNICATION/@/")]}'`;
    return sql;
  }
  toSqlDelete(value: string[]): string {
    var sql = ``;
    return sql;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    var sql = ``;
    return sql;
  }
  toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
  }
}
