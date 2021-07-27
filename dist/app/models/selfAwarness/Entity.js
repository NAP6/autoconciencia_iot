"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const Scope_1 = require("./Scope");
class Entity extends Scope_1.Scope {
    constructor(id, name, description) {
        super();
        this._id = id;
        this._name = name;
        this._description = description;
        this._active = true;
        this._hasProperty = [];
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
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get hasProperty() {
        return this._hasProperty;
    }
    set hasProperty(value) {
        this._hasProperty = value;
    }
}
exports.Entity = Entity;
