import { Entity } from "./Entity";
import { PropertyQ } from "./PropertyQ";
import { IoTSystemQ } from "./IoTSystemQ";
import { SQL_Qwerty } from "../SQL_Qwerty";

export class EntityQ extends Entity implements SQL_Qwerty {
  private _propertysQ: PropertyQ[];
  private _subEntityQ: EntityQ[];
  private _iotSystemQ: IoTSystemQ[];

  constructor(id: number, name: string, entityType: string) {
    super(id, name, entityType);
    this._propertysQ = [];
    this._subEntityQ = [];
    this._iotSystemQ = [];
  }

  get propertys(): PropertyQ[] {
    return this._propertysQ;
  }

  set propertys(propertys: PropertyQ[]) {
    this._propertysQ = propertys;
  }

  get subEntity(): EntityQ[] {
    return this._subEntityQ;
  }

  set subEntity(subEntity: EntityQ[]) {
    this._subEntityQ = subEntity;
  }

  get iotSystem(): IoTSystemQ[] {
    return this._iotSystemQ;
  }

  set iotSystem(iotSystem: IoTSystemQ[]) {
    this._iotSystemQ = iotSystem;
  }

  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO objeto(
	    	ma_id, 
	    	obj_nombre, 
	    	obj_tipo, 
		obj_padre
            ) VALUES (
	    	/@/MODELO/@/, 
	    	'${this.name}', 
	    	'${this.entityType}', 
	    	/@/PADRE/@/
    	   )`;
    for (var i = 0; i < tag.length; i++) {
      sql = sql.replace(tag[i], value[i]);
    }
    return sql;
  }

  toSqlSelect(tag: string[], value: string[]): string {
    var tagList={
      "/@/MODEL/@/":"ma_id= ",
    };
    var sql=`SELECT obj_id as id, obj_nombre as name, obj_tipo as obj_type, obj_activo as active, obj_padre as father FROM objeto WHERE `
    for (var i = 0; i < tag.length; i++) {
      sql += tagList[tag[i]] + value[i];
      if (i < tag.length - 1) {
          sql += " AND ";
      }
  }
  console.log(sql);
    return sql+'  ORDER BY  ';
  }

  toSqlDelete(tag: string[], value: string[]): string {
    return ``;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    return ``;
  }

  toObjectArray(rows): SQL_Qwerty[] {
    return [];
  }
}
