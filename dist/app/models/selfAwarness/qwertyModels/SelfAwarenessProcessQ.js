"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAwarenessProcessQ = void 0;
const SelfAwarenessProcess_1 = require("../SelfAwarenessProcess");
class SelfAwarenessProcessQ extends SelfAwarenessProcess_1.SelfAwarenessProcess {
    toSqlInsert(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlSelect(tag, value) {
        var sql = `select  
  		pa.pa_id as id, 
		pa.pa_nombre as nombre,
		pa.pa_descripcion as descripcion,
		pa.pa_tipo as tipo,
		pa.pa_inicio_periodo_ejecucion as periodo_ini,
		pa.pa_fin_periodo_ejecucion as periodo_fin,
		pa.pa_activo as activo,
		aa_id,
		suj_id,
		ma_id,
		pa.pa_tipo_ejecucion as tipo_ejecucion_id,
		enu2.enu_nombre_valor as tipo_ejecucion,
		pa.pa_unidad_tiempo as unidad_tiempo_id,
		enu.enu_nombre_valor as unidad_tiempo,
		pa.pa_intervalo_ejecucion as intervalo_ejecucion,
		pa.pa_hora_ejecucion as hora_ejecucion
	     from 
	  	procesoautoconsciencia pa,
		enumeracion enu,
		enumeracion enu2
	     where
	     
	  	pa.pa_activo=1 and 
	  	suj_id=${value[tag.indexOf("/@/SYSTEM/@/")]} and 
	  	ma_id=${value[tag.indexOf("/@/MODEL/@/")]} and
	  	enu.enu_id=pa.pa_unidad_tiempo and
	  	enu2.enu_id=pa.pa_tipo_ejecucion`;
        return sql;
    }
    toSqlDelete(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        rows = rows;
        var res;
        res = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new SelfAwarenessProcessQ(rows[i].id, rows[i].nombre, rows[i].descripcion, rows[i].tipo, rows[i].periodo_ini, rows[i].periodo_fin, rows[i].tipo_ejecucion, rows[i].intervalo_ejecucion, rows[i].hora_ejecucion, rows[i].unidad_tiempo);
            res.push(aux);
        }
        return res;
    }
}
exports.SelfAwarenessProcessQ = SelfAwarenessProcessQ;
