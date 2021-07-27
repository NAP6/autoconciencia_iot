"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleQ = void 0;
const Scale_1 = require("../Scale");
class ScaleQ extends Scale_1.Scale {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO
        escala (
                esc_nombre,
                esc_valores_validos,
                esc_tipo,
                esc_activo
            ) VALUES (
                '${this.name}',
                '${this.validValues}',
                '${this.scaleType}',
                '${this.active ? 1 : 0}'

            )`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = "";
        if (tag.indexOf("/@/METRIC/@/") != -1) {
            sql = `	SELECT
      			es.esc_id as id,
			es.esc_nombre as name,
			es.esc_valores_validos as valid_values,
			es.esc_tipo as tipo

	    	FROM 
	    		escala es,
		    	metrica met 
	    	WHERE
	    		met.met_id=${value[tag.indexOf("/@/METRIC/@/")]} AND
	    		met.esc_id=es.esc_id`;
        }
        else {
            sql = `SELECT 
    esc_id as id,
    esc_nombre as name,
    esc_valores_validos as valid_values,
    esc_tipo as type_id,
    enu.enu_nombre_valor as type,
    esc_activo as active
         FROM 
         escala es,
	 enumeracion enu
	 WHERE 
	 es.esc_tipo=enu.enu_id`;
        }
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM escala WHERE esc_id=${this.id} `;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var sql = `UPDATE 
    escala
    SET
    esc_nombre='${this.name}', 
    esc_valores_validos='${this.validValues}',
    esc_tipo='${this.scaleType}',
    esc_activo=${this.active ? 1 : 0}
  WHERE 
    esc_id=${this.id}`;
        return sql;
    }
    toObjectArray(rows) {
        var scale = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new ScaleQ(rows[i].id, rows[i].name, rows[i].valid_values, rows[i].tipo);
            scale.push(aux);
        }
        return scale;
    }
}
exports.ScaleQ = ScaleQ;
