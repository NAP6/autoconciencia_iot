"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementUnit = void 0;
class MeasurementUnit {
    constructor(id, name, description, acronym) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._acronym = acronym;
        this._isUsedBy = [];
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
    get acronym() {
        return this._acronym;
    }
    set acronym(value) {
        this._acronym = value;
    }
    get isUsedBy() {
        return this._isUsedBy;
    }
    set isUsedBy(value) {
        this._isUsedBy = value;
    }
}
exports.MeasurementUnit = MeasurementUnit;
