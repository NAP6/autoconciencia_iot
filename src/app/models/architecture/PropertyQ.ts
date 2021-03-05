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

  toSqlInsert(): string {
    return `INSERT INTO propiedad ( pro_nombre, obj_id) VALUES ('${this.name}', /@/OBJETOS/@/)`;
  }

  toSqlSelect(): string {
    return ``;
  }

  toSqlDelete(): string {
    return ``;
  }

  toObjectArray(rows): SQL_Qwerty[] {
    return [];
  }

  /* static parceQ(value: Property): PropertyQ {
        var pro = new PropertyQ(value.id, value.name);
        pro.dataFlow = value.dataFlow;
        return pro;
    }

    static parceQA(value: Property[]): PropertyQ[] {
        var returnV: PropertyQ[] = [];
        for (var i = 0; i < value.length; i++) {
            var pro = new PropertyQ(value[i].id, value[i].name);
            pro.dataFlow = value[i].dataFlow;
            returnV.push(pro);
        }
        return returnV;
    } */
}

