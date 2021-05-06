"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAwarenessAspectQ = void 0;
const SelfAwarenessAspect_1 = require("../SelfAwarenessAspect");
class SelfAwarenessAspectQ extends SelfAwarenessAspect_1.SelfAwarenessAspect {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO
aspectoautoconsciencia (
                aa_nombre,
                aa_descripcion,
                aa_peso,
                aa_tipo,
                aa_activo,
                obj_id,
                suj_id,
                ma_id
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.weight}',
                '${this.aspectType}',
                '${this.active ? 1 : 0}',
                '${value[tag.indexOf("/@/OBJECT/@/")]}',
                '${value[tag.indexOf("/@/SUBJECT/@/")]}',
                '${value[tag.indexOf("/@/MODEL/@/")]}'
            )`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = ` SELECT
	      asp.aa_id as id,
	      asp.aa_nombre as name,
              asp.aa_descripcion as description,
	      asp.aa_peso as weigth,
              asp.aa_tipo as tipo_id,
              enu.enu_nombre_valor as met_aspect,
              asp.obj_id as obj,
              asp.suj_id as suj,
              suj.suj_nombre as sujeto,
              asp.ma_id as model,
              asp.aa_activo as active
	         FROM
	      aspectoautoconsciencia asp,
              enumeracion enu,
              sujeto suj
	         WHERE
	      enu.enu_id=asp.aa_tipo AND
	   	 asp.suj_id= suj.suj_id AND
	        suj.ma_id = ${value[tag.indexOf("/@/MODEL/@/")]} AND
	        asp.ma_id=${value[tag.indexOf("/@/MODEL/@/")]}`;
        if (tag.indexOf("/@/SYSTEM/@/") != -1) {
            sql += ` AND
		suj.suj_id=${value[tag.indexOf("/@/SYSTEM/@/")]}`;
        }
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM aspectoautoconsciencia WHERE aa_id=${this.id} `;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var sql = `UPDATE 
    aspectoautoconsciencia
    SET
    aa_nombre='${this.name}', 
    aa_descripcion='${this.description}',
    aa_peso='${this.weight}',
    aa_tipo='${this.aspectType}',
    obj_id='${value[tag.indexOf("/@/OBJECT/@/")]}',
    ma_id='${value[tag.indexOf("/@/MODEL/@/")]}',
    aa_activo=${this.active ? 1 : 0}
  WHERE 
    aa_id=${this.id}`;
        return sql;
    }
    toObjectArray(rows) {
        rows = rows;
        var res;
        res = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new SelfAwarenessAspectQ(rows[i].id, rows[i].name, rows[i].description, rows[i].weight, rows[i].met_aspect);
            res.push(aux);
        }
        return res;
    }
}
exports.SelfAwarenessAspectQ = SelfAwarenessAspectQ;
