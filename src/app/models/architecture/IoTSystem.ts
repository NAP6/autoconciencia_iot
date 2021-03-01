import { Entity } from './Entity';

export class IoTSystem {
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

  addSubSystem(system: IoTSystem): void {
    this._IoTSubSystem.push(system);
  }

  removeSubSystem(i: number): boolean {
    if (-1 >= i && i >= this._IoTSubSystem.length) {
      return false;
    }
    this._IoTSubSystem.splice(i, 1);
    return true;
  }

  getSubSystem(i: number): IoTSystem | undefined {
    if (i < this._IoTSubSystem.length) {
      return this._IoTSubSystem[i];
    }
    return undefined;
  }

  sizeSubSystem(): number {
    return this._IoTSubSystem.length;
  }

  get entity(): Entity[] {
    return this._entity;
  }
}
