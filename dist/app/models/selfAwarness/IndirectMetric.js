"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndirectMetric = void 0;
const Metric_1 = require("./Metric");
class IndirectMetric extends Metric_1.Metric {
    constructor(id, name, description, abbreviation) {
        super(id, name, description, abbreviation);
        this._containsCalculatedIndirectMetric = [];
        this._isProducedBy = [];
    }
    get containsCalculatedIndirectMetric() {
        return this._containsCalculatedIndirectMetric;
    }
    set containsCalculatedIndirectMetric(value) {
        this._containsCalculatedIndirectMetric = value;
    }
    get isProducedBy() {
        return this._isProducedBy;
    }
    set isProducedBy(value) {
        this._isProducedBy = value;
    }
}
exports.IndirectMetric = IndirectMetric;
