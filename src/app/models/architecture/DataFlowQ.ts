import { DataFlow } from "./DataFlow";
import { PropertyQ } from "./PropertyQ";
import { SQL_Qwerty } from "../SQL_Qwerty";

export class DataFlowQ extends DataFlow implements SQL_Qwerty {
  private _propertysQ: PropertyQ[];

  constructor(id: number, description: string, comunicationType: string) {
    super(id, description, comunicationType);
    this._propertysQ = [];
  }

  get propertys(): PropertyQ[] {
    return this._propertysQ;
  }

  set propertys(propertys: PropertyQ[]) {
    this._propertysQ = propertys;
  }

  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO 
	  	flujodatos (
			flu_id,
			ma_id,
	  		flu_descripcion,
		  	flu_tipo_comunicacion
  		) VALUES (
	  		'${this.id}',
		  	/@/MODELO/@/, 
	  		'${this.description}',
		  	'${this.comunicationType}'
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

  toSqlUpdate(tag: string[], value: string[]): string {
    return ``;
  }

  toObjectArray(rows): SQL_Qwerty[] {
    return [];
  }
}
