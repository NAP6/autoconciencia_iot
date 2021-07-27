"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object = void 0;
class Object {
    constructor(id, name, Otype) {
        this._id = id;
        this._name = name;
        this._type = Otype;
        this._active = true;
        this._subObject = [];
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
    get Otype() {
        return this._type;
    }
    set Otype(value) {
        this._type = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get subObject() {
        return this._subObject;
    }
    set subObject(value) {
        this._subObject = value;
    }
}
exports.Object = Object;
