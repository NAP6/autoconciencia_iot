"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectiveProcess = void 0;
const SelfAwarenessProcess_1 = require("./SelfAwarenessProcess");
class ReflectiveProcess extends SelfAwarenessProcess_1.SelfAwarenessProcess {
    constructor(id, name, description, type_process, executionPeriodStart, executionPeriodEnd, executionType, executionTime, executionTimeInterval) {
        super(id, name, description, type_process, executionPeriodStart, executionPeriodEnd, executionType, executionTime, executionTimeInterval);
    }
    get usesAnalysisModel() {
        return this._usesAnalysisModel;
    }
    set usesAnalysisModel(value) {
        this._usesAnalysisModel = value;
    }
    get usesCalculationMethod() {
        return this._usesCalculationMethod;
    }
    set usesCalculationMethod(value) {
        this._usesCalculationMethod = value;
    }
}
exports.ReflectiveProcess = ReflectiveProcess;
