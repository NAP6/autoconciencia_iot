"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoTSystemQ = void 0;
const IoTSystem_1 = require("./IoTSystem");
class IoTSystemQ extends IoTSystem_1.IoTSystem {
    constructor(id, name) {
        super(id, name);
        this._IoTSubSystemQ = [];
        this._entityQ = [];
    }
    get IoTSubSystem() {
        return this._IoTSubSystemQ;
    }
    set IoTSubSystem(system) {
        this._IoTSubSystemQ = system;
    }
    get entity() {
        return this._entityQ;
    }
    set entity(entity) {
        this._entityQ = entity;
    }
    toSqlInsert() {
        return `INSERT INTO sujeto (ma_id, suj_nombre, suj_padre) VALUES (/@/MODELO/@/, '${this.name}', /@/PADRE/@/)`;
    }
    toSqlSelect() {
        return ``;
    }
    toSqlDelete() {
        return ``;
    }
}
exports.IoTSystemQ = IoTSystemQ;
