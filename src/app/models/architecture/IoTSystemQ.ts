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

  toSqlInsert(): string {
    return `INSERT INTO sujeto (ma_id, suj_nombre, suj_padre) VALUES (/@/MODELO/@/, '${this.name}', /@/PADRE/@/)`;
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

  /* static parceQ(value: IoTSystem): IoTSystemQ {
        var sys = new IoTSystemQ(value.id, value.name);
        sys.IoTSubSystem = value.IoTSubSystem;
        sys.entity = value.entity;
        return sys;
    }

    static parceQA(value: IoTSystem[]): IoTSystemQ[] {
        var returnV: IoTSystemQ[] = [];
        for (var i = 0; i < value.length; i++) {
            var sys = new IoTSystemQ(value[i].id, value[i].name);
            sys.IoTSubSystem = value[i].IoTSubSystem;
            sys.entity = value[i].entity;
            returnV.push(sys);
        }
        return returnV;
    } */
}

