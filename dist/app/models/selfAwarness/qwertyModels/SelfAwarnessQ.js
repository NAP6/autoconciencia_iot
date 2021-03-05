"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAwarnessQ = void 0;
const SelfAwarness_1 = require("../SelfAwarness");
class SelfAwarnessQ extends SelfAwarness_1.SelfAwarness {
    toSqlInsert() {
        return `INSERT INTO modeloautoconsciencia (ma_nombre, ma_descripcion, ma_autor, ma_modelo_arquitectura , usr_id) VALUES ('${this.name}','${this.description}','${this.author}','${this.architectureModel}', /@/USER/@/)`;
    }
    toSqlSelect() {
        return ``;
    }
    toSqlDelete() {
        return ``;
    }
}
exports.SelfAwarnessQ = SelfAwarnessQ;
