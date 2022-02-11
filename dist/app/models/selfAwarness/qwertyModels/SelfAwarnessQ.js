"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAwarnessQ = void 0;
const SelfAwarness_1 = require("../SelfAwarness");
class SelfAwarnessQ extends SelfAwarness_1.SelfAwarness {
    toSqlInsert(tag, value) {
        var architectureModel = this.architectureModel.replace(/\\/g, "\\\\");
        architectureModel = architectureModel.replace(/'/g, "\\'");
        var sql = `INSERT INTO modeloautoconsciencia(ma_nombre, ma_descripcion, ma_autor, ma_modelo_arquitectura, usr_id) VALUES ('${this.name}','${this.description}','${this.author}','${architectureModel
        /*.split("'")
        .join("`")*/
        }', /@/USER/@/)`;
        for (var i = 0; i < tag.length; i++) {
            sql = sql.replace(tag[i], value[i]);
        }
        return sql;
    }
    toSqlSelect(tag, value) {
        var tagList = {
            "/@/USER/@/": "usr_id = ",
            "/@/MODEL/@/": "ma_id = ",
        };
        var sql = `SELECT 
    		ma_id as id, 
		ma_nombre as name, 
		ma_descripcion as description, 
		ma_autor as author, 
		CONVERT(ma_modelo_arquitectura USING utf8) as architectureModel,
		ma_activo as active
            FROM 
	    	modeloautoconsciencia
            WHERE `;
        for (var i = 0; i < tag.length; i++) {
            sql += tagList[tag[i]] + value[i];
            if (i < tag.length - 1) {
                sql += " AND ";
            }
        }
        return sql;
    }
    toSqlDelete(tag, value) {
        return ``;
    }
    toSqlUpdate(tag, value) {
        return `UPDATE modeloautoconsciencia SET ma_nombre = '${this.name}', ma_descripcion = '${this.description}', ma_activo = '${this.active ? 1 : 0}' WHERE ma_id = '${this.id}'`;
    }
    toObjectArray(rows) {
        var results = [];
        rows.forEach((element) => {
            var aux = new SelfAwarnessQ(element.id, element.name, element.description, element.author, element.architectureModel);
            aux.active = element.active;
            results.push(aux);
        });
        return results;
    }
}
exports.SelfAwarnessQ = SelfAwarnessQ;
