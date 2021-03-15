"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalQ = void 0;
const Goal_1 = require("../Goal");
class GoalQ extends Goal_1.Goal {
    toSqlInsert(tag, value) {
        var sql = ``;
        sql = `INSERT INTO 
	    	objetivo (
	    		obj_nombre, 
		    	obj_descripcion, 
		    	obj_peso, 
		    	obj_operacion_agregacion, 
		    	suj_id, 
			ma_id,
			cd_id,
		    	obj_activo,
			obj_padre
		) VALUES (
			'${this.name}',
			'${this.description}',
			'${this.weight}',
			'${this.aggregationOperator}',
			'${value[tag.indexOf("/@/IOTSYSTEM/@/")]}',
			'${value[tag.indexOf("/@/MODEL/@/")]}',
			'${value[tag.indexOf("/@/CRITERIA/@/")]}',
			'${this.active ? 1 : 0}', 
			${value[tag.indexOf("/@/FATHER/@/")]
            ? "'" + value[tag.indexOf("/@/FATHER/@/")] + "'"
            : "NULL"}
    		);`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = ` SELECT 
	  	obj_id as id, 
		obj_nombre as nombre, 
		obj_descripcion as descripcion, 
		obj_peso as peso, 
		obj_operacion_agregacion as asignacion, 
		obj_activo as activo, 
		obj_padre as padre  
	     FROM 
	     	objetivo `;
        if (value.length == 1)
            sql += `WHERE 
	  	suj_id = ${value[tag.indexOf('/@/SYSTEM/@/')]} AND ma_id = ${value[tag.indexOf('/@/MODEL/@/')]} ORDER BY id`;
        return sql;
    }
    toSqlDelete(tag, value) {
        return `DELETE FROM objetivo WHERE obj_id = ${this.id}`;
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        throw new Error("Method not implemented.");
    }
}
exports.GoalQ = GoalQ;
