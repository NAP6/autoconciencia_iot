"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyQ = void 0;
const Property_1 = require("../Property");
class PropertyQ extends Property_1.Property {
    toSqlInsert(tag, value) {
        var sql = ``;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT
    	pro.pro_id as id,
	pro.pro_nombre as nombre,
	pro.obj_id as obj_id
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
    toSqlDelete(value) {
        var sql = ``;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var sql = ``;
        return sql;
    }
    toObjectArray(rows) {
        throw new Error("Method not implemented.");
    }
}
exports.PropertyQ = PropertyQ;
