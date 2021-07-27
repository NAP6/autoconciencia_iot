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
    get variable_id() {
        return this._variable_id;
    }
    set variable_id(value) {
        this._variable_id = value;
    }
    get scenario_id() {
        return this._scenario_id;
    }
    set scenario_id(value) {
        this._scenario_id = value;
    }
    toObjectG() {
        return {
            $: {
                value: this.value,
            },
        };
    }
}
exports.SimulationValue = SimulationValue;
