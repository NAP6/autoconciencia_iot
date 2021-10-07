"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectiveSelfawarenessAspect = void 0;
const SelfAwarenessAspect_1 = require("./SelfAwarenessAspect");
class CollectiveSelfawarenessAspect extends SelfAwarenessAspect_1.SelfAwarenessAspect {
    constructor(id, name, description, weight, aspectType, aggregationOperator) {
        super(id, name, description, weight, aspectType);
        this._aggregationOperator = aggregationOperator;
        this._isDerivedFrom = [];
    }
    get aggregationOperator() {
        return this._aggregationOperator;
    }
    set aggregationOperator(value) {
        this._aggregationOperator = value;
    }
    get isDerivedFrom() {
        return this._isDerivedFrom;
    }
    set isDerivedFrom(value) {
        this._isDerivedFrom = value;
    }
    toObjectG() {
        var res = super.toObjectG();
        res.$["aggregationOperator"] = this.aggregationOperator;
        return res;
    }
}
exports.CollectiveSelfawarenessAspect = CollectiveSelfawarenessAspect;
