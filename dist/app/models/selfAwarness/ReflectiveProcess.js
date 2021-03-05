"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectiveProcess = void 0;
const SelfAwarenessProcess_1 = require("./SelfAwarenessProcess");
class ReflectiveProcess extends SelfAwarenessProcess_1.SelfAwarenessProcess {
    constructor(id, name, description, executionPeriodStart, executionPeriodEnd, supports, usesAnalysisModel, usesCalculationMethod) {
        super(id, name, description, executionPeriodStart, executionPeriodEnd, supports);
        this._usesAnalysisModel = usesAnalysisModel;
        this._usesCalculationMethod = usesCalculationMethod;
    }
}
exports.ReflectiveProcess = ReflectiveProcess;
