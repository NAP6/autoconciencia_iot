import { CollectionMethod } from "./CollectionMethod";
export class Property {
  private _id: number;
  private _name: string;
  private _isCollectedBy: CollectionMethod[];


  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
    this._isCollectedBy=[];
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
  get isCollectedBy(): CollectionMethod[] {
    return this._isCollectedBy;
  }

  set isCollectedBy(value: CollectionMethod[]) {
    this._isCollectedBy = value;
  }
}
