"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentToParameterMapping = void 0;
class ArgumentToParameterMapping {
    constructor(id) {
        this._id = id;
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
        this._relatesParameter;
    }
    toObjectG() {
        return { $: { id: this.id } };
    }
}
exports.ArgumentToParameterMapping = ArgumentToParameterMapping;
