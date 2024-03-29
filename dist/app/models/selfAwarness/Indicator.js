"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Indicator = void 0;
const Metric_1 = require("./Metric");
class Indicator extends Metric_1.Metric {
    constructor(id, name, description, abbreviation, perspective) {
        super(id, name, description, abbreviation, perspective);
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
    toObjectG() {
        return {
            $: {
                id: this.id,
                name: this.name,
                description: this.description,
                abbreviation: this.abbreviation,
                perspective: this.perspective,
            },
        };
    }
}
exports.Indicator = Indicator;
