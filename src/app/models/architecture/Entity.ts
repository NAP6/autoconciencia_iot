import { Property } from "./Property";
import { IoTSystem } from "./IoTSystem";

export class Entity {
  private _id: number;
  private _name: string;
  private _entityType: string;
  private _propertys: Property[];
  private _subEntity: Entity[];
  private _iotSystem: IoTSystem[];

  constructor(id: number, name: string, entityType: string) {
    this._id = id;
    this._name = name;
    this._entityType = entityType;
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

  get entityType(): string {
    return this._entityType;
  }

  set entityType(entityType: string) {
    this._entityType = entityType;
  }

  get propertys(): Property[] {
    return this._propertys;
  }

  set propertys(propertys: Property[]) {
    this._propertys = propertys;
  }

  get subEntity(): Entity[] {
    return this._subEntity;
  }

  set subEntity(subEntity: Entity[]) {
    this._subEntity = subEntity;
  }

  get iotSystem(): IoTSystem[] {
    return this._iotSystem;
  }

  set iotSystem(iotSystem: IoTSystem[]) {
    this._iotSystem = iotSystem;
  }
}
