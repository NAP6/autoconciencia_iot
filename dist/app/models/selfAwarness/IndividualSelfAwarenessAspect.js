"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndividualSelfAwarenessAspect = void 0;
const SelfAwarenessAspect_1 = require("./SelfAwarenessAspect");
class IndividualSelfAwarenessAspect extends SelfAwarenessAspect_1.SelfAwarenessAspect {
    constructor(id, name, description, weight, aspectType, aggregationOperator) {
        super(id, name, description, weight, aspectType);
        this._belongsTo = [];
    }
    get belongsTo() {
        return this._belongsTo;
    }
    set belongsTo(value) {
        this._belongsTo = value;
    }
}
exports.IndividualSelfAwarenessAspect = IndividualSelfAwarenessAspect;
