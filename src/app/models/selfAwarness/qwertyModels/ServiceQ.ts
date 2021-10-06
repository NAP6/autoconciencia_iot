import { Service } from "../Service";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class ServiceQ extends Service implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }

  toSqlSelect(tag: string[], value: string[]): string {
    if (tag.indexOf("/@/SYSTEM/@/") != -1)
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
                o.ma_id = os.ma_id AND 
                os.ma_id = ${value[tag.indexOf("/@/MODEL/@/")]} AND 
                o.obj_tipo = 'Service' AND 
                os.suj_id = ${value[tag.indexOf("/@/SYSTEM/@/")]}  
                ORDER BY id`;
    return `SELECT 
            obj_id as id, 
            obj_tipo as tipo, 
            obj_nombre as nombre, 
            obj_activo as activo, 
            obj_padre as padre 
            FROM 
            objeto 
            WHERE ma_id = ${value[tag.indexOf("/@/MODEL/@/")]} AND 
            obj_tipo = 'FogNode'  
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
