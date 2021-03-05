"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFlowQ = void 0;
const DataFlow_1 = require("./DataFlow");
class DataFlowQ extends DataFlow_1.DataFlow {
    constructor(id, description, comunicationType) {
        super(id, description, comunicationType);
        this._propertysQ = [];
    }
    get propertys() {
        return this._propertysQ;
    }
    set propertys(propertys) {
        this._propertysQ = propertys;
    }
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO 
	  	flujodatos (
	  		flu_descripcion,
		  	flu_tipo_comunicacion
  		) VALUES (
	  		'${this.description}',
		  	'${this.comunicationType}'
  		)`;
        for (var i = 0; i < tag.length; i++) {
            sql.replace(tag[i], value[i]);
        }
        return sql;
    }
    toSqlSelect(tag, value) {
        return ``;
    }
    toSqlDelete(tag, value) {
        return ``;
    }
    toObjectArray(rows) {
        return [];
    }
}
exports.DataFlowQ = DataFlowQ;
