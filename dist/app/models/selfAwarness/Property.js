"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
class Property {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._isCollectedBy = [];
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
    get isCollectedBy() {
        return this._isCollectedBy;
    }
    set isCollectedBy(value) {
        this._isCollectedBy = value;
    }
}
exports.Property = Property;
