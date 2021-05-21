"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationValue = void 0;
class SimulationValue {
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get isUsed() {
        return this._isUsed;
    }
    set isUsed(value) {
        this._isUsed = value;
    }
}
exports.SimulationValue = SimulationValue;
