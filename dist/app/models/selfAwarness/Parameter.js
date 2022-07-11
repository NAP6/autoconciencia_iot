"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameter = void 0;
class Parameter {
    constructor(id, ordinal, name, dataType, optional) {
        this._id = id;
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
    toObjectG() {
        return {
            $: {
                id: this.id,
                ordinal: this.ordinal,
                name: this.name,
                dataType: this.dataType[1],
                optional: this.optional,
            },
        };
    }
}
exports.Parameter = Parameter;
