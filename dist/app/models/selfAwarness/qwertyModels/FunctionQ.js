"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionQ = void 0;
const Function_1 = require("../Function");
class FunctionQ extends Function_1.Function {
    toSqlInsert(tag, value) {
        var sql = `call funcion(
	  		'${this.name}',
	  		'${this.description}',
	  		${this.returnDataType},
	  		1,
	  		'${this.path}',
	  		'${this.instrucctions}',
	  		'${value[tag.indexOf('/@/P_EXIST/@/')]}',
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
exports.FunctionQ = FunctionQ;
