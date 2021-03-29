"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServiceQ = void 0;
const WebService_1 = require("../WebService");
class WebServiceQ extends WebService_1.WebService {
    toSqlInsert(tag, value) {
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
exports.WebServiceQ = WebServiceQ;
