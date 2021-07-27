"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectMetric = void 0;
const Metric_1 = require("./Metric");
class DirectMetric extends Metric_1.Metric {
    constructor(id, name, description, abbreviation) {
        super(id, name, description, abbreviation, "");
        this._isProducedBy = [];
    }
    get isProducedBy() {
        return this._isProducedBy;
    }
    set isProducedBy(value) {
        this._isProducedBy = value;
    }
    toObjectG() {
        return {
            $: {
                id: this.id,
                name: this.name,
                description: this.description,
                abbreviation: this.abbreviation,
            },
        };
    }
}
exports.DirectMetric = DirectMetric;
