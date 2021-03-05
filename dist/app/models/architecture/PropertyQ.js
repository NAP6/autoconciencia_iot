"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyQ = void 0;
const Property_1 = require("./Property");
class PropertyQ extends Property_1.Property {
    constructor(id, name) {
        super(id, name);
        this._dataFlowQ = [];
    }
    get dataFlow() {
        return this._dataFlowQ;
    }
    set dataFlow(dataFlow) {
        this._dataFlowQ = dataFlow;
    }
    toSqlInsert() {
        return `INSERT INTO propiedad ( pro_nombre, obj_id) VALUES ('${this.name}', /@/OBJETOS/@/)`;
    }
    toSqlSelect() {
        return ``;
    }
    toSqlDelete() {
        return ``;
    }
}
exports.PropertyQ = PropertyQ;
