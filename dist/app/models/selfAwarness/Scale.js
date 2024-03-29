"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scale = void 0;
class Scale {
    constructor(id, name, validValues, scaleType) {
        this._id = id;
        this._name = name;
        this._validValues = validValues;
        this._scaleType = scaleType;
        this._isUsedBy = [];
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
    get validValues() {
        return this._validValues;
    }
    set validValues(value) {
        this._validValues = value;
    }
    get scaleType() {
        return this._scaleType;
    }
    set scaleType(value) {
        this._scaleType = value;
    }
    get isUsedBy() {
        return this._isUsedBy;
    }
    set isUsedBy(value) {
        this._isUsedBy = value;
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
                validValues: this.validValues,
                type: this.scaleType,
            },
        };
    }
}
exports.Scale = Scale;
