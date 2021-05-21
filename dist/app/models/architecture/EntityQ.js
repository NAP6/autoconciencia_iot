"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityQ = void 0;
const Entity_1 = require("./Entity");
class EntityQ extends Entity_1.Entity {
    constructor(id, name, entityType) {
        super(id, name, entityType);
        this._propertysQ = [];
        this._subEntityQ = [];
        this._iotSystemQ = [];
    }
    get propertys() {
        return this._propertysQ;
    }
    set propertys(propertys) {
        this._propertysQ = propertys;
    }
    get subEntity() {
        return this._subEntityQ;
    }
    set subEntity(subEntity) {
        this._subEntityQ = subEntity;
    }
    get iotSystem() {
        return this._iotSystemQ;
    }
    set iotSystem(iotSystem) {
        this._iotSystemQ = iotSystem;
    }
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO objeto(
		obj_id,
	    	ma_id, 
	    	obj_nombre, 
	    	obj_tipo, 
		obj_padre
            ) VALUES (
	    	'${this.id}', 
	    	/@/MODELO/@/, 
	    	'${this.name}', 
	    	'${this.entityType}', 
	    	/@/PADRE/@/
    	   )`;
        for (var i = 0; i < tag.length; i++) {
            sql = sql.replace(tag[i], value[i]);
        }
        return sql;
    }
    toSqlSelect(tag, value) {
        return "";
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
exports.EntityQ = EntityQ;
