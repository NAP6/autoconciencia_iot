"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisModelQ = void 0;
const AnalysisModel_1 = require("../AnalysisModel");
class AnalysisModelQ extends AnalysisModel_1.AnalysisModel {
    toSqlInsert(tag, value) {
        var _a;
        var sql = `call ModeloAnalisis(
	         ${value[tag.indexOf('/@/PROCES/@/')]},
		 ${(_a = this.produces) === null || _a === void 0 ? void 0 : _a.id},
                 ${this.implementationResourceType},
	         ${value[tag.indexOf('/@/CRITERIA/@/')]},
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
exports.AnalysisModelQ = AnalysisModelQ;
