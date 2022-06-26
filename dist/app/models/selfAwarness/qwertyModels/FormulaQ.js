"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaQ = void 0;
const Formula_1 = require("../Formula");
class FormulaQ extends Formula_1.Formula {
    toSqlInsert(tag, value) {
        var sql = `call formula(
	  		'${this.name}',
	  		"${this.description}",
	  		${this.returnDataType},
	  		1,
	  		'${this.expression}',
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
    toSqlUpdate(tag, recurso) {
        console.log(recurso);
        var sql = `call modificar_formula(
		  '${this.name}',
		  "${this.description}",
		  ${this.returnDataType},
		  1,
		  '${this.expression}',
		  ${recurso},
		  @id)`;
        return sql;
    }
    toObjectArray(rows) {
        var formulas = [];
        rows = rows[0];
        for (var i = 0; i < rows.length; i++) {
            var form = new FormulaQ(rows[i].id, rows[i].nombre, rows[i].descripcion, [rows[i].dato_salida, rows[i].dato_salida_id], rows[i].expresion);
            formulas.push(form);
        }
        return formulas;
    }
}
exports.FormulaQ = FormulaQ;
