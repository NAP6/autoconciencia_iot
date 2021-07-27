"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculationMethodQ = void 0;
const CalculationMethod_1 = require("../CalculationMethod");
class CalculationMethodQ extends CalculationMethod_1.CalculationMethod {
    toSqlInsert(tag, value) {
        var _a;
        var sql = `call MetodoCalculo(
	      	${value[tag.indexOf("/@/PROCES/@/")]},
		${(_a = this.produces) === null || _a === void 0 ? void 0 : _a.id},
		${this.implementationResourceType},
		${this.calculationPeriodStart == undefined
            ? "NULL"
            : "'" + this.calculationPeriodStart + "'"},
		${this.calculationPeriodEnd == undefined
            ? "NULL"
            : "'" + this.calculationPeriodEnd + "'"},
		  @id)`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT   meto.mea_id as id,                            
		        if(meto.mc_tipo_recurso=0,"FORMULA",                                                                                                       
			if(meto.mc_tipo_recurso=1,                                                                                                         
			"FUNCION","SERVICIO")) as tipo_recurso,
			meto.mc_inicio_periodo_calculo as inicio,
			meto.mc_fin_periodo_calculo as fin
		FROM
		        metodocalculo meto,                                                                                                                       
		        procesoautoconsciencia pro,                                                         
		        metodoaprendizajerazonamiento met                                                                                                       
		 WHERE                                                                                                                                                                     pro.pa_id=${value[tag.indexOf("/@/PROCES/@/")]} AND 
		 	met.pa_id=pro.pa_id AND 
		        met.mea_id=meto.mea_id
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
        var method = [];
        for (var i = 0; i < rows.length; i++) {
            var aux = new CalculationMethodQ(rows[i].id, rows[i].tipo_recurso, rows[i].inicio, rows[i].fin);
            method.push(aux);
        }
        return method;
    }
}
exports.CalculationMethodQ = CalculationMethodQ;
