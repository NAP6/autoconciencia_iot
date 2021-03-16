import{Scale} from "../Scale";
import{ SQL_Qwerty } from "../../SQL_Qwerty";
export class ScaleQ extends Scale implements SQL_Qwerty{
    toSqlInsert(tag:string[],value:string[]):string{
var sql=`INSERT INTO
        escala (
                esc_nombre,
                esc_valores_validos,
                esc_tipo,
                esc_activo
            ) VALUES (
                '${this.name}',
                '${this.validValues}',
                '${this.scaleType}',
                '${this.active ? 1: 0}',

            )`;
return sql;
    }
   toSqlSelect(tag:string[],value:string[]): string {
    var sql = `SELECT 
    esc_id as id,
    esc_nombre as name,
    esc_valores_validos as valid_values,
    esc_tipo as type,
    um_activo as active
         FROM 
         escala`;
return sql;
}
toSqlDelete(value: string[]): string {
    var sql=`DELETE FROM escala WHERE esc_id=${this.id} `;
    return sql;
}

toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE 
    escala
    SET
    esc_nombre='${this.name}', 
    esc_valores_validos='${this.validValues}',
    esc_tipo='${this.scaleType}',
    esc_activo='${this.active ? 1 : 0}'
  WHERE 
    esc_id=${this.id}`;
return sql;
}
toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
}
}