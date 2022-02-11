"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionQ = void 0;
const Action_1 = require("../Action");
class ActionQ extends Action_1.Action {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO
        accion (
                acc_descripcion,
                acc_activo,
                mea_id,
		umb_id
            ) VALUES (
                '${this.description}',
                ${this.active ? 1 : 0},
		${value[tag.indexOf("/@/METHOD/@/")]},
		${this.isRecommendedln}
            )`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = "";
        if (tag.indexOf("/@/MODEL/@/") != -1) {
            sql = `SELECT 
    		acc_id as id,
    		acc_descripcion as description,
    		acc_activo as active,
    		umb_id as umbral_id
             FROM 
         	accion
	     WHERE 
	        mea_id=${value[tag.indexOf("/@/MODEL/@/")]}`;
        }
        else {
            sql = `SELECT 
    		acc_id as id,
    		acc_descripcion as description,
    		acc_activo as active,
    		umb_id as umbral_id
             FROM 
         	accion
	     WHERE 
	 	mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
	 	umb_id=${this.isRecommendedln}`;
        }
        console.log(sql);
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM accion WHERE acc_id=${this.id} `;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var sql = `UPDATE 
    accion
    SET
    acc_descripcion='${this.description}',
    acc_activo=${this.active ? 1 : 0}
  WHERE 
    acc_id=${this.id}`;
        return sql;
    }
    toObjectArray(rows) {
        var action = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new ActionQ(rows[i].id, rows[i].description);
            action.push(aux);
        }
        return action;
    }
}
exports.ActionQ = ActionQ;
