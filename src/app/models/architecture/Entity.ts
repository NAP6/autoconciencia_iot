import { Property } from './Property';
import { IoTSystem } from './IoTSystem';

export class Entity {
  private _id: number;
  private _name: string;
  private _comunicationType: string;
  private _propertys: Property[];
  private _subEntity: Entity[];
  private _iotSystem: IoTSystem[];

  public constructor(id: number, name: string, comunicationType: string) {
    this._id = id;
    this._name = name;
    this._comunicationType = comunicationType;
    this._propertys = [];
    this._subEntity = [];
    this._iotSystem = [];
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

  get comunicationType(): string {
    return this._comunicationType;
  }

  set comunicationType(comunicationType: string) {
    this._comunicationType = comunicationType;
  }

  addProperty(propertys: Property): void {
    this._propertys.push(propertys);
  }

  removeProperty(i: number): boolean {
    if (-1 >= i && i >= this._propertys.length) {
      return false;
    }
    this._propertys.splice(i, 1);
    return true;
  }

  getProperty(i: number): Property | undefined {
    if (i < this._propertys.length) {
      return this._propertys[i];
    }
    return undefined;
  }

  sizeProperty(): number {
    return this._propertys.length;
  }

  addSubEntity(entity: Entity): void {
    this._subEntity.push(entity);
  }

  removeSubEntity(i: number): boolean {
    if (-1 >= i && i >= this._subEntity.length) {
      return false;
    }
    this._subEntity.splice(i, 1);
    return true;
  }

  getSubEntity(i: number): Entity | undefined {
    if (i < this._subEntity.length) {
      return this._subEntity[i];
    }
    return undefined;
  }

  sizeSubEntity(): number {
    return this._subEntity.length;
  }

  get iotSystem(): IoTSystem[] {
    return this._iotSystem;
  }
}
