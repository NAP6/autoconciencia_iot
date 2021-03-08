"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatedIndirectMetric = void 0;
class CalculatedIndirectMetric {
    constructor(value, timeStamp) {
        this._value = value;
        this._timeStamp = timeStamp;
    }
    get value() {
        return this._value;
    }
    set valeu(value) {
        this._value = value;
    }
    get timeStamp() {
        return this._timeStamp;
    }
    set timeStamp(value) {
        this._timeStamp = value;
    }
}
exports.CalculatedIndirectMetric = CalculatedIndirectMetric;
