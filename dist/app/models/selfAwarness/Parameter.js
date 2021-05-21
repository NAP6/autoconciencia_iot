"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameter = void 0;
class Parameter {
    constructor(ordinal, name, dataType, optional) {
        this._ordinal = ordinal;
        this._name = name;
        this._dataType = dataType;
        this._optional = optional;
        this._isUsedIn = [];
    }
    get ordinal() {
        return this._ordinal;
    }
    set ordinal(value) {
        this._ordinal = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get dataType() {
        return this._dataType;
    }
    set dataType(value) {
        this._dataType = value;
    }
    get optional() {
        return this._optional;
    }
    set optional(value) {
        this._optional = value;
    }
    get isUsedIn() {
        return this._isUsedIn;
    }
    set isUsedIn(value) {
        this._isUsedIn = value;
    }
}
exports.Parameter = Parameter;
