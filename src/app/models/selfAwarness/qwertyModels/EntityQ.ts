import { Entity } from "../Entity";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class EntityQ extends Entity implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlSelect(tag: string[], value: string[]): string {
    return `SELECT 
                    o.obj_id as id, 
                    o.obj_tipo as tipo, 
                    o.obj_nombre as nombre, 
                    o.obj_activo as activo, 
                    o.obj_padre as padre 
                    FROM 
                    objeto as o,
                    sujeto_objeto as os 
                    WHERE 
                    o.obj_id = os.obj_id AND 
                    o.ma_id = ${value[tag.indexOf("/@/MODEL/@/")]} AND 
                    os.ma_id = ${value[tag.indexOf("/@/MODEL/@/")]} AND 
                    o.obj_tipo IN (${value[tag.indexOf("/@/TYPE/@/")]}) AND 
                    os.suj_id = ${value[tag.indexOf("/@/SYSTEM/@/")]}  AND
		    o.obj_padre = ${value[tag.indexOf("/@/OBJECT/@/")]}
                    ORDER BY id`;
  }
  toSqlDelete(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlUpdate(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
  }
}
