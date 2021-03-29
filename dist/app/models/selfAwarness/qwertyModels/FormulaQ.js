"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaQ = void 0;
const Formula_1 = require("../Formula");
class FormulaQ extends Formula_1.Formula {
    toSqlInsert(tag, value) {
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
    toSqlSelect(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlDelete(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        throw new Error("Method not implemented.");
    }
}
exports.FormulaQ = FormulaQ;
