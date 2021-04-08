import { Property } from "../Property";
import { SQL_Qwerty } from "../../SQL_Qwerty";
export class PropertyQ extends Property implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = ``;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT
    	pro.pro_id as id,
	pro.pro_nombre as nombre
	  FROM
	  propiedad pro,
	  objeto obj,
	  aspectoautoconsciencia_objeto asp_obj,
	  aspectoautoconsciencia asp
	  WHERE
	  pro.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
	  obj.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
	  asp_obj.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
	  asp.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
	  asp.aa_id=${value[tag.indexOf("/@/ASPECTID/@/")]} AND
	  asp.aa_id=asp_obj.aa_id AND
	  asp_obj.obj_id=obj.obj_id AND
	  obj.obj_id=pro.obj_id
	  `;
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
