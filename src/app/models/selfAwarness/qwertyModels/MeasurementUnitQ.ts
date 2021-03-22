import{MeasurementUnit} from "../MeasurementUnit";
import{ SQL_Qwerty } from "../../SQL_Qwerty";
export class MeasurementUnitQ extends MeasurementUnit implements SQL_Qwerty{
    toSqlInsert(tag:string[],value:string[]):string{
var sql=`INSERT INTO
        unidadmedicion (
                um_nombre,
                um_descripcion,
                um_acronimo,
                um_activo
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.acronym}',
                '${this.active ? 1: 0}'

            )`;
return sql;
    }
   toSqlSelect(tag:string[],value:string[]): string {
    var sql = `SELECT 
    um_id as id,
    um_nombre as name,
    um_descripcion as description,
    um_acronimo as acronym,
    um_activo as active
         FROM 
         unidadmedicion`;
return sql;
}
toSqlDelete(value: string[]): string {
    var sql=`DELETE FROM unidadmedicion WHERE um_id=${this.id} `;
    return sql;
}

toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE 
    unidadmedicion
    SET
    um_nombre='${this.name}', 
    um_descripcion='${this.description}',
    um_acronimo='${this.acronym}',
    met_activo='${this.active ? 1 : 0}'
  WHERE 
    um_id=${this.id}`;
return sql;
}
toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
}
}