import { IoTSystem } from "./IoTSystem";
import { EntityQ } from "./EntityQ";
import { SQL_Qwerty } from "../SQL_Qwerty";

export class IoTSystemQ extends IoTSystem implements SQL_Qwerty {
  private _IoTSubSystemQ: IoTSystemQ[];
  private _entityQ: EntityQ[];

  constructor(id: number, name: string) {
    super(id, name);
    this._IoTSubSystemQ = [];
    this._entityQ = [];
  }

  get IoTSubSystem(): IoTSystemQ[] {
    return this._IoTSubSystemQ;
  }

  set IoTSubSystem(system: IoTSystemQ[]) {
    this._IoTSubSystemQ = system;
  }

  get entity(): EntityQ[] {
    return this._entityQ;
  }

  set entity(entity: EntityQ[]) {
    this._entityQ = entity;
  }

  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO 
	  	sujeto (
	  		ma_id, 
		  	suj_nombre, 
		  	suj_padre
  		) VALUES (
		  	/@/MODELO/@/, 
		  	'${this.name}', 
		  	/@/PADRE/@/
  		)`;

    for (var i = 0; i < tag.length; i++) {
      sql = sql.replace(tag[i], value[i]);
    }
    return sql;
  }

  toSqlSelect(tag: string[], value: string[]): string {
    return ``;
  }

  toSqlDelete(tag: string[], value: string[]): string {
    return ``;
  }

  toObjectArray(rows): SQL_Qwerty[] {
    return [];
  }
}
