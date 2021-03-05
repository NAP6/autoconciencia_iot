"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationVariable = void 0;
class SimulationVariable {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._isUsedIn = [];
        this._containsSimulationValue = [];
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get isUsedIn() {
        return this._isUsedIn;
    }
    set isUsedIn(value) {
        this._isUsedIn = value;
    }
    get containsSimulationValue() {
        return this._containsSimulationValue;
    }
    set containsSimulationValue(value) {
        this._containsSimulationValue = value;
    }
}
exports.SimulationVariable = SimulationVariable;
