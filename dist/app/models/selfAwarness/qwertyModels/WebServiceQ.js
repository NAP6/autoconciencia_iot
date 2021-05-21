"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServiceQ = void 0;
const WebService_1 = require("../WebService");
class WebServiceQ extends WebService_1.WebService {
    toSqlInsert(tag, value) {
        var sql = `call servicio(
	  		'${this.name}',
	  		'${this.description}',
	  		${this.returnDataType},
	  		1,
	  		'${this.endPoint}',
	  		'${this.instrucctions}',
	  		'${value[tag.indexOf("/@/P_EXIST/@/")]}',
	  		'${this.DataFormatType}',
			@id
		  )`;
        return sql;
    }
    toSqlSelect(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlDelete(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        var services = [];
        rows = rows[0];
        for (var i = 0; i < rows.length; i++) {
            var service = new WebServiceQ(rows[i].id, rows[i].nombre, rows[i].descripcion, [rows[i].dato_salida, rows[i].dato_salida_id], rows[i].punto_final, rows[i].instrucciones, rows[i].tipo_formato_dato_salida);
            service.preexisting = rows[i].pre_existente == 1 ? true : false;
            services.push(service);
        }
        return services;
    }
}
exports.WebServiceQ = WebServiceQ;
