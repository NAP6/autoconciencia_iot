"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoTSystemQ = void 0;
const IoTSystem_1 = require("../IoTSystem");
class IoTSystemQ extends IoTSystem_1.IoTSystem {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO 
	  	sujeto (
	  		ma_id, 
		  	suj_nombre, 
		  	suj_padre
  		) VALUES (
		  	/@/MODELO/@/, 
		  	'${this.name}', 
		  	/@/PADRE/@/
  		)`;
        for (var i = 0; i < tag.length; i++) {
            sql = sql.replace(tag[i], value[i]);
        }
        return sql;
    }
    toSqlSelect(tag, value) {
        var tagList = {
            "/@/MODEL/@/": "ma_id = ",
        };
        var sql = `SELECT suj_id as id, suj_nombre as name, suj_activo as active, suj_padre as father FROM sujeto WHERE  `;
        for (var i = 0; i < tag.length; i++) {
            sql += tagList[tag[i]] + value[i];
            if (i < tag.length - 1) {
                sql += " AND ";
            }
        }
        return sql + " ORDER BY id ";
    }
    toSqlDelete(tag, value) {
        return ``;
    }
    toSqlUpdate(tag, value) {
        var sql = `UPDATE sujeto SET `;
        var aux = false;
        if (tag.indexOf("/@/NAME/@/") != -1) {
            sql += `suj_nombre = '${this.name}'`;
            aux = true;
        }
        if (tag.indexOf("/@/ACTIVE/@/") != -1) {
            if (aux)
                sql += ", ";
            sql += `suj_activo = '${this.active ? 1 : 0}'`;
        }
        sql += ` WHERE suj_id = '${this.id}' AND ma_id= ${value[tag.indexOf("/@/MODEL/@/")]}`;
        return sql;
    }
    toObjectArray(rows) {
        var results = [];
        rows.forEach((element) => {
            var aux = new IoTSystem_1.IoTSystem(element.id, element.name);
            aux.active = element.active;
            var b = false;
            if (element.father == "NULL")
                results.push(aux);
            else
                b = this.buscarPadreAgregar(results, element.father, aux);
            if (!b)
                console.log("NO SE GUARDO UN ELEMENTO");
        });
        return results;
    }
    buscarPadreAgregar(lists, id, element) {
        lists.forEach((list) => {
            if (list.id == id) {
                list.containsSubIoTSystem.push(element);
                return true;
            }
            else {
                var b = this.buscarPadreAgregar(list.containsSubIoTSystem, id, element);
                if (b)
                    return true;
            }
        });
        return false;
    }
}
exports.IoTSystemQ = IoTSystemQ;
