import{DecisionCriteria} from "../DecisionCriteria";
import{ SQL_Qwerty } from "../../SQL_Qwerty";
export class DecisionCriteriaQ extends DecisionCriteria implements SQL_Qwerty{
    toSqlInsert(tag:string[],value:string[]):string{
var sql=`INSERT INTO
            criteriodecision (
                cd_nombre,
                cd_descripcion,
                cd_activo
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.active ? 1: 0}'

            )`;
return sql;
    }
   toSqlSelect(tag:string[],value:string[]): string {
    var sql = `SELECT 
    cd_id as id,
    cd_nombre as name,
    cd_descripcion as description,
    cd_activo as active
         FROM 
         criteriodecision`;
return sql;
}
toSqlDelete(value: string[]): string {
    var sql=`DELETE FROM criteriodecision WHERE cd_id=${this.id} `;
    return sql;
}

toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE 
    criteriodecision
    SET
    cd_nombre='${this.name}', 
    cd_descripcion='${this.description}',
    cd_activo=${this.active ? 1 : 0}
  WHERE 
    cd_id=${this.id}`;
return sql;
}
toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
}
}
