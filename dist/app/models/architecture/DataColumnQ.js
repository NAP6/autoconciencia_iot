"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataColumnQ = void 0;
const DataColumn_1 = require("./DataColumn");
class DataColumnQ extends DataColumn_1.DataColumn {
    toSqlInsert(tag, value) {
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
    toSqlSelect(tag, value) {
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
    toSqlDelete(tag, value) {
        return ``;
    }
    toSqlUpdate(tag, value) {
        return ``;
    }
    toObjectArray(rows) {
        return [];
    }
}
exports.DataColumnQ = DataColumnQ;
