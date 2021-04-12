import{Action} from "../Action";
import{ SQL_Qwerty } from "../../SQL_Qwerty";
export class ActionQ extends Action implements SQL_Qwerty{
    toSqlInsert(tag:string[],value:string[]):string{
var sql=`INSERT INTO
        action (
                esc_nombre,
                esc_valores_validos,
                esc_tipo,
                esc_activo
            ) VALUES (
                '${this.name}',
                '${this.validValues}',
                '${this.scaleType}',
                '${this.active ? 1: 0}'

            )`;
return sql;
    }
   toSqlSelect(tag:string[],value:string[]): string {
    var sql = `SELECT 
    esc_id as id,
    esc_nombre as name,
    esc_valores_validos as valid_values,
    esc_tipo as type_id,
    enu.enu_nombre_valor as type,
    esc_activo as active
         FROM 
         escala es,
	 enumeracion enu
	 WHERE 
	 es.esc_tipo=enu.enu_id`;
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
    esc_activo=${this.active ? 1 : 0}
  WHERE 
    esc_id=${this.id}`;
return sql;
}
toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
}
}
