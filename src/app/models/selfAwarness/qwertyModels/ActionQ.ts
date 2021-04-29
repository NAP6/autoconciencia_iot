import{Action} from "../Action";
import{ SQL_Qwerty } from "../../SQL_Qwerty";
export class ActionQ extends Action implements SQL_Qwerty{
    toSqlInsert(tag:string[],value:string[]):string{
var sql=`INSERT INTO
        accion (
                acc_descripcion,
                acc_activo,
                mea_id,
		umb_id
            ) VALUES (
                '${this.description}',
                ${this.active ? 1: 0},
		${value[tag.indexOf("/@/METHOD/@/")]},
		${this.isRecommendedln}
            )`;
return sql;
    }
   toSqlSelect(tag:string[],value:string[]): string {
    var sql = `SELECT 
    acc_id as id,
    acc_descripcion as description,
    acc_activo as active,
    umb_id as umbral_id
         FROM 
         accion
	 WHERE 
	 mea_id=${value[tag.indexOf("/@/METHOD/@/")]} AND
	 umb_id=${this.isRecommendedln}`;
return sql;
}
toSqlDelete(value: string[]): string {
    var sql=`DELETE FROM accion WHERE acc_id=${this.id} `;
    return sql;
}

toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE 
    accion
    SET
    acc_descripcion='${this.description}',
    acc_activo=${this.active ? 1 : 0}
  WHERE 
    acc_id=${this.id}`;
return sql;
}
toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
}
}
