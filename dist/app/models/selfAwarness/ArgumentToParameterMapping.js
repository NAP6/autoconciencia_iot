"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentToParameterMapping = void 0;
class ArgumentToParameterMapping {
    constructor(id, simulation_variable, metadata) {
        this._id = id;
        this._simulation_variable = simulation_variable;
        this._metadata = metadata;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get relatesParameter() {
        return this._relatesParameter;
    }
    set relatesParameter(value) {
        this._relatesParameter = value;
    }
    get simulation_variable() {
        return this._simulation_variable;
    }
    set simulation_variable(value) {
        this._simulation_variable = value;
    }
    get is_using_simulation_variable() {
        return this._simulation_variable != undefined;
    }
    get metadata() {
        return this._metadata;
    }
    set metadata(value) {
        this._metadata = value;
    }
    get is_metadata() {
        return this._metadata != undefined;
    }
    toObjectG() {
        return { $: { id: this.id } };
    }
}
exports.ArgumentToParameterMapping = ArgumentToParameterMapping;
