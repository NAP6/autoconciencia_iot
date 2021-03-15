"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Indicator = void 0;
const Metric_1 = require("./Metric");
class Indicator extends Metric_1.Metric {
    constructor(id, name, description, abbreviation) {
        super(id, name, description, abbreviation);
        this._containsCalculatedIndicator = [];
        this._isProducedBy = [];
    }
    get containsCalculatedIndicator() {
        return this._containsCalculatedIndicator;
    }
    set containsCalculatedIndicator(value) {
        this._containsCalculatedIndicator = value;
    }
    get isProducedBy() {
        return this._isProducedBy;
    }
    set isProducedBy(value) {
        this._isProducedBy = value;
    }
}
exports.Indicator = Indicator;
