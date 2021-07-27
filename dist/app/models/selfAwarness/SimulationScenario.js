"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationScenario = void 0;
class SimulationScenario {
    constructor(id, name, description) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._uses = [];
        this._active = true;
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
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    toObjectG() {
        return {
            $: {
                id: this.id,
                name: this.name,
                description: this.description,
            },
        };
    }
}
exports.SimulationScenario = SimulationScenario;
