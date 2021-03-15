import{SelfAwarenessAspect} from "../SelfAwarenessAspect";
import{ SQL_Qwerty } from "../../SQL_Qwerty";
export class SelfAwarenessAspectQ extends SelfAwarenessAspect implements SQL_Qwerty{
    toSqlInsert(tag:string[],value:string[]):string{
var sql=`INSERT INTO
aspectoautoconsciencia (
                aa_nombre,
                aa_descripcion,
                aa_peso,
                aa_tipo,
                aa_activo,
                obj_id,
                suj_id,
                ma_id
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.weight}',
                '${this.aspectType}',
                '${this.active ? 1: 0}',
                '${value[tag.indexOf("/@/OBJECT/@/")]}',
                '${value[tag.indexOf("/@/SUBJECT/@/")]}',
                '${value[tag.indexOf("/@/MODEL/@/")]}'
            )`;
return sql;
    }
   toSqlSelect(tag:string[],value:string[]): string {

    var sql = `SELECT 
    asp.aa_id as id, 
    asp.aa_nombre as name,
    asp.aa_descripcion as description,
    asp.aa_peso as weigth,
    asp.aa_tipo as tipo_id,
    enu.enu_nombre_valor as met_aspect,
    asp.obj_id as obj,
    asp.suj_id as suj,
    asp.ma_id as model,
    asp.aa_activo as active
  FROM 
  aspectoautoconsciencia asp,
    enumeracion enu
  WHERE 
    enu.enu_id=asp.aa_tipo`;
return sql;
}
toSqlDelete(value: string[]): string {
    var sql=`DELETE FROM aspectoautoconsciencia WHERE aa_id=${this.id} `;
    return sql;
}

toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE 
    aspectoautoconsciencia
    SET
    aa_nombre='${this.name}', 
    aa_descripcion='${this.description}',
    aa_peso='${this.weight}',
    aa_tipo='${this.aspectType}',
    obj_id='${value[tag.indexOf("/@/OBJECT/@/")]}',
    ma_id='${value[tag.indexOf("/@/MODEL/@/")]}',
    suj_id='${value[tag.indexOf("/@/SUBJECT/@/")]}',
    aa_activo='${this.active ? 1 : 0}'
  WHERE 
    aa_id=${this.id}`;
return sql;
}
toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
}
}