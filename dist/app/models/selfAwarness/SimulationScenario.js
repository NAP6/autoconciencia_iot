"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationScenario = void 0;
class SimulationScenario {
    constructor(id, name, description) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._uses = [];
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
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get uses() {
        return this._uses;
    }
    set uses(value) {
        this._uses = value;
    }
}
exports.SimulationScenario = SimulationScenario;
