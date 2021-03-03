import { DataFlow } from './DataFlow';
import { SQL_Qwerty } from '../SQL_Qwerty';

export class Property implements SQL_Qwerty {
  private _id: number;
  private _name: string;
  private _dataFlow: DataFlow[];

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
    this._dataFlow = [];
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

  get dataFlow(): DataFlow[] {
    return this._dataFlow;
  }

  toSql(): string {
    return "";
  }
}
