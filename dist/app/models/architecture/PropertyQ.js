"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyQ = void 0;
const Property_1 = require("./Property");
class PropertyQ extends Property_1.Property {
    constructor(id, name) {
        super(id, name);
        this._dataFlowQ = [];
    }
    get dataFlow() {
        return this._dataFlowQ;
    }
    set dataFlow(dataFlow) {
        this._dataFlowQ = dataFlow;
    }
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO 
	  	propiedad ( 
			pro_id,
			ma_id,
	  		pro_nombre, 
			obj_id
		) VALUES (
			'${this.id}', 
			/@/MODELO/@/,
			'${this.name}', 
			/@/OBJETOS/@/
		)`;
        for (var i = 0; i < tag.length; i++) {
            sql = sql.replace(tag[i], value[i]);
        }
        return sql;
    }
    toSqlSelect(tag, value) {
        return ``;
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
exports.PropertyQ = PropertyQ;
