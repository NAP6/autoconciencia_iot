"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
class Property {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._dataFlow = [];
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
    get dataFlow() {
        return this._dataFlow;
    }
    set dataFlow(dataFlow) {
        this._dataFlow = dataFlow;
    }
}
exports.Property = Property;
