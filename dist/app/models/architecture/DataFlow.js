"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFlow = void 0;
class DataFlow {
    constructor(id, description, comunicationType) {
        this._id = id;
        this._description = description;
        this._comunicationType = comunicationType;
        this._propertys = [];
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    get comunicationType() {
        return this._comunicationType;
    }
    set comunicationType(comunicationType) {
        this._comunicationType = comunicationType;
    }
    get propertys() {
        return this._propertys;
    }
    set propertys(propertys) {
        this._propertys = propertys;
    }
}
exports.DataFlow = DataFlow;
