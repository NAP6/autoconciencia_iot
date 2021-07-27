"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoTSystem = void 0;
class IoTSystem {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._IoTSubSystem = [];
        this._entity = [];
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get IoTSubSystem() {
        return this._IoTSubSystem;
    }
    set IoTSubSystem(system) {
        this._IoTSubSystem = system;
    }
    get entity() {
        return this._entity;
    }
    set entity(entity) {
        this._entity = entity;
    }
}
exports.IoTSystem = IoTSystem;
