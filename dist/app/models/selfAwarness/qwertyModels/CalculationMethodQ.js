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
		${this.calculationPeriodStart == undefined ? "NULL"
            : "'" + this.calculationPeriodStart + "'"},
		${this.calculationPeriodEnd == undefined ? "NULL"
            : "'" + this.calculationPeriodEnd + "'"},
		  @id)`;
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
        throw new Error("Method not implemented.");
    }
}
exports.CalculationMethodQ = CalculationMethodQ;
