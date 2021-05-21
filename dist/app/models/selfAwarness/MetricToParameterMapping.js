"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricToParameterMapping = void 0;
const ArgumentToParameterMapping_1 = require("./ArgumentToParameterMapping");
class MetricToParameterMapping extends ArgumentToParameterMapping_1.ArgumentToParameterMapping {
    constructor(id) {
        super(id);
    }
    get relatesMetric() {
        return this._relatesMetric;
    }
    set relatesMetric(value) {
        this._relatesMetric = value;
    }
}
exports.MetricToParameterMapping = MetricToParameterMapping;
