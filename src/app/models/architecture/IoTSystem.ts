import { Entity } from "./Entity";
import { SQL_Qwerty } from '../SQL_Qwerty';

export class IoTSystem implements SQL_Qwerty {
  private _id: number;
  private _name: string;
  private _IoTSubSystem: IoTSystem[];
  private _entity: Entity[];

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
    this._IoTSubSystem = [];
    this._entity = [];
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get IoTSubSystem(): IoTSystem[] {
    return this._IoTSubSystem;
  }

  set IoTSubSystem(system: IoTSystem[]) {
    this._IoTSubSystem = system;
  }

  get entity(): Entity[] {
    return this._entity;
  }

  set entity(entity: Entity[]) {
    this._entity = entity;
  }

  toSql(): string {
    return `INSERT INTO sujeto (ma_id, suj_nombre, suj_padre) VALUES (/@/MODELO/@/, '${this._name}', /@/PADRE/@/)`;
  }
}
