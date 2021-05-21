"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFlowQ = void 0;
const DataFlow_1 = require("../DataFlow");
class DataFlowQ extends DataFlow_1.DataFlow {
    toSqlInsert(tag, value) {
        var sql = ``;
        return sql;
    }
    toSqlSelect(tag, value) {
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
exports.DataFlowQ = DataFlowQ;
