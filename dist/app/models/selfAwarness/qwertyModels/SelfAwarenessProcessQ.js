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
  		pa_id as id, 
		pa_nombre as nombre,
		pa_descripcion as descripcion,
		pa_tipo as tipo,
		pa_inicio_periodo_ejecucion as periodo_ini,
		pa_fin_periodo_ejecucion as periodo_fin,
		pa_activo as activo,
		aa_id,
		suj_id,
		ma_id 
	     from 
	  	procesoautoconsciencia 
	     where 
	  	pa_activo=1 and 
	  	suj_id=${value[tag.indexOf("/@/SYSTEM/@/")]} and 
	  	ma_id=${value[tag.indexOf("/@/MODEL/@/")]}`;
        return sql;
    }
    toSqlDelete(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        var res;
        res = [];
        for (var i = 0; i < rows; i++) {
            console.log(rows[i]);
            var aux = new SelfAwarenessProcessQ(rows[i].id, rows[i].nombre, rows[i].descripcion, rows[i].tipo, rows[i].periodo_ini, rows[i].periodo_fin);
            res.push(aux);
        }
        return res;
    }
}
exports.SelfAwarenessProcessQ = SelfAwarenessProcessQ;