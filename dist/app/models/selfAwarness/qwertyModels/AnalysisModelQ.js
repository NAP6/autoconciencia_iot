"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisModelQ = void 0;
const AnalysisModel_1 = require("../AnalysisModel");
class AnalysisModelQ extends AnalysisModel_1.AnalysisModel {
    toSqlInsert(tag, value) {
        var _a;
        var sql = `call ModeloAnalisis(
	         ${value[tag.indexOf("/@/PROCES/@/")]},
		 ${(_a = this.produces) === null || _a === void 0 ? void 0 : _a.id},
                 ${this.implementationResourceType},
	         ${value[tag.indexOf("/@/CRITERIA/@/")]},
                  @id)`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT 
	  		moda.mea_id,
			if(moda.ma_tipo_recurso=0,"FORMULA",
				if(moda.ma_tipo_recurso=1,
					"FUNCION","SERVICIO")) as tipo_recurso 
	  	FROM 
			modeloanalisis moda,
			procesoautoconsciencia pro,
			metodoaprendizajerazonamiento met
	  	WHERE 
			pro.pa_id=${value[tag.indexOf("/@/PROCES/@/")]} AND
			met.pa_id=pro.pa_id AND
			met.mea_id=moda.mea_id
			
	  `;
        return sql;
    }
    toSqlDelete(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        var models = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new AnalysisModelQ(rows[i].mea_id, rows[i].tipo_recurso);
            models.push(aux);
        }
        return models;
    }
}
exports.AnalysisModelQ = AnalysisModelQ;
