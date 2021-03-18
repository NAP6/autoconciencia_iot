import{Threshold} from "../Threshold";
import{ SQL_Qwerty } from "../../SQL_Qwerty";
export class ThresholdQ extends Threshold implements SQL_Qwerty{
    toSqlInsert(tag:string[],value:string[]):string{
var sql=`INSERT INTO
            umbral (
                umb_nombre,
                umb_interpretacion,
                umb_inferior,
                umb_superior,
                umb_activo,
                cd_id
            ) VALUES (
                '${this.name}',
                '${this.interpretation}',
                '${this.lowerThreshold}',
                '${this.upperThreshold}',
                '${this.active ? 1: 0}',
                '${value[tag.indexOf('/@/CRITERIA/@/')]}'

            )`;
return sql;
    }
   toSqlSelect(tag:string[],value:string[]): string {
    var sql = `SELECT 
    umb_id as id,
    umb_nombre as name,
    umb_interpretacion as interpretacion,
    umb_inferior as inferior,
    umb_superior as superior,
    cd_id as id_decicion,
    umb_activo as active
            FROM 
            umbral
            WHERE
            cd_id=${value[tag.indexOf('/@/CRITERIA/@/')]}`;
return sql;
}
toSqlDelete(value: string[]): string {
    var sql=`DELETE FROM umbral WHERE umb_id=${this.id} `;
    return sql;
}

toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE 
    umbral
    SET
    umb_nombre='${this.name}', 
    umb_interpretacion='${this.interpretation}',
    umb_inferior='${this.lowerThreshold}',
    umb_superior='${this.upperThreshold}',
    umb_activo='${this.active ? 1 : 0}'
  WHERE 
    umb_id=${this.id}`;
return sql;
}
toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
}
}