"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionCriteriaQ = void 0;
const DecisionCriteria_1 = require("../DecisionCriteria");
class DecisionCriteriaQ extends DecisionCriteria_1.DecisionCriteria {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO
            criteriodecision (
                cd_nombre,
                cd_descripcion,
                cd_activo
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.active ? 1 : 0}'

            )`;
        return sql;
    }
    toSqlSelect(tag, value) {
        var sql = `SELECT 
    cd_id as id,
    cd_nombre as name,
    cd_descripcion as description,
    cd_activo as active
         FROM 
         criteriodecision`;
        return sql;
    }
    toSqlDelete(value) {
        var sql = `DELETE FROM criteriodecision WHERE cd_id=${this.id} `;
        return sql;
    }
    toSqlUpdate(tag, value) {
        var sql = `UPDATE 
    criteriodecision
    SET
    cd_nombre='${this.name}', 
    cd_descripcion='${this.description}',
    esc_activo='${this.active ? 1 : 0}'
  WHERE 
    cd_id=${this.id}`;
        return sql;
    }
    toObjectArray(rows) {
        throw new Error("Method not implemented.");
    }
}
exports.DecisionCriteriaQ = DecisionCriteriaQ;
