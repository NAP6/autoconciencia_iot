"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreReflecriveProcess = void 0;
const SelfAwarenessProcess_1 = require("./SelfAwarenessProcess");
class PreReflecriveProcess extends SelfAwarenessProcess_1.SelfAwarenessProcess {
    constructor(id, name, description, executionPeriodStart, executionPeriodEnd, supports, usesCollectionMehod, usesAnalysisModel) {
        super(id, name, description, executionPeriodStart, executionPeriodEnd, supports);
        this._usesCollectionMethod = usesCollectionMehod;
        this._usesAnalysisModel = usesAnalysisModel;
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
exports.PreReflecriveProcess = PreReflecriveProcess;
