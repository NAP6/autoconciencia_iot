"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(id, name, entityType) {
        this._id = id;
        this._name = name;
        this._entityType = entityType;
        this._propertys = [];
        this._subEntity = [];
        this._iotSystem = [];
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
    get entityType() {
        return this._entityType;
    }
    set entityType(entityType) {
        this._entityType = entityType;
    }
    get propertys() {
        return this._propertys;
    }
    set propertys(propertys) {
        this._propertys = propertys;
    }
    get subEntity() {
        return this._subEntity;
    }
    set subEntity(subEntity) {
        this._subEntity = subEntity;
    }
    get iotSystem() {
        return this._iotSystem;
    }
    set iotSystem(iotSystem) {
        this._iotSystem = iotSystem;
    }
}
exports.Entity = Entity;
