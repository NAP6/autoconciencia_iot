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

  toSqlInsert(): string {
    return `INSERT INTO flujodatos (flu_descripcion,flu_tipo_comunicacion) VALUES ('${this.description}','${this.comunicationType}')`;
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

  /* static parceQ(value: DataFlow): DataFlowQ {
        var flow = new DataFlowQ(value.id, value.description, value.comunicationType);
        flow.propertys = value.propertys;
        return flow;
    }

    static parceQA(value: DataFlow[]): DataFlowQ[] {
        var returnV: DataFlowQ[] = [];
        for (var i = 0; i < value.length; i++) {
            var flow = new DataFlowQ(value[i].id, value[i].description, value[i].comunicationType);
            flow.propertys = value[i].propertys;
            returnV.push(flow);
        }
        return returnV;
    } */
}
