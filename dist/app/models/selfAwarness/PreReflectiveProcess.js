"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreReflectiveProcess = void 0;
const SelfAwarenessProcess_1 = require("./SelfAwarenessProcess");
class PreReflectiveProcess extends SelfAwarenessProcess_1.SelfAwarenessProcess {
    constructor(id, name, description, type_process, executionPeriodStart, executionPeriodEnd, executionType, executionTime, executionTimeInterval) {
        super(id, name, description, type_process, executionPeriodStart, executionPeriodEnd, executionType, executionTime, executionTimeInterval);
    }
    get usesCollectionMehod() {
        return this._usesCollectionMethod;
    }
    set usesCollectionMehod(value) {
        this._usesCollectionMethod = value;
    }
    get usesAnalysisModel() {
        return this._usesAnalysisModel;
    }
    set usesAnalysisModel(value) {
        this.usesAnalysisModel = value;
    }
}
exports.PreReflectiveProcess = PreReflectiveProcess;
