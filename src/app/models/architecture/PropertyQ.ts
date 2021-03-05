import { Property } from "./Property";
import { DataFlowQ } from "./DataFlowQ";
import { SQL_Qwerty } from "../SQL_Qwerty";

export class PropertyQ extends Property implements SQL_Qwerty {
  private _dataFlowQ: DataFlowQ[];

  constructor(id: number, name: string) {
    super(id, name);
    this._dataFlowQ = [];
  }

  get dataFlow(): DataFlowQ[] {
    return this._dataFlowQ;
  }

  set dataFlow(dataFlow: DataFlowQ[]) {
    this._dataFlowQ = dataFlow;
  }

  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO 
	  	propiedad ( 
	  		pro_nombre, 
			obj_id
		) VALUES (
			'${this.name}', 
			/@/OBJETOS/@/
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
