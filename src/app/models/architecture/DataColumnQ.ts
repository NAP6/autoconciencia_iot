import { DataColumn } from "./DataColumn";
import { SQL_Qwerty } from "../SQL_Qwerty";
export class DataColumnQ extends DataColumn implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO data_column(
    		ma_id,
	    	data_name, 
	    	data_type, 
	    	data_column_path, 
		data_column_type
            ) VALUES (
	    	/@/MODELO/@/,
	    	'${this.name}', 
	    	'${this.dataType}',
		'${this.dataColumnPath}',
		'${this.dataColumnType}')`;

    for (var i = 0; i < tag.length; i++) {
      sql = sql.replace(tag[i], value[i]);
    }

    return sql;
  }

  toSqlSelect(tag: string[], value: string[]): string {
    var sql = `SELECT
	  	data_id as id,
		data_name as name,
	  	data_type as type,
		data_column_type as columnType,
		data_column_path as path
	  	FROM
	  	data_column
	  	WHERE
	  	ma_id=${value[tag.indexOf("/@/MODELO/@/")]} AND
	  	data_column_type="MetaData"`;
    return sql;
  }

  toSqlDelete(tag: string[], value: string[]): string {
    return ``;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    return ``;
  }

  toObjectArray(rows): SQL_Qwerty[] {
    return [];
  }
}
