import { Scope } from "./Scope";
import { Property } from "./Property";

export class Entity extends Scope {
  private _id: number;
  private _name: string;
  private _description: string;
  private _active: boolean;
  private _hasProperty:Property[];

  constructor(id: number, name: string, description:string) {
    super();
    this._id = id;
    this._name = name;
    this._description = description;
    this._active = true;
    this._hasProperty=[];
    
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
  
  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }
  get hasProperty(): Property[] {
    return this._hasProperty;
  }

  set hasProperty(value: Property[]) {
    this._hasProperty = value;
  }
  
  
}
