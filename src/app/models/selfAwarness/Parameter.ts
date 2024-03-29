import { ArgumentToParameterMapping } from "./ArgumentToParameterMapping";
export class Parameter {
  private _id: number;
  private _ordinal: number;
  private _name: string;
  private _dataType;
  private _optional: Boolean;
  private _isUsedIn: ArgumentToParameterMapping[];

  constructor(
    id: number,
    ordinal: number,
    name: string,
    dataType,
    optional: boolean
  ) {
    this._id = id;
    this._ordinal = ordinal;
    this._name = name;
    this._dataType = dataType;
    this._optional = optional;
    this._isUsedIn = [];
  }

  get ordinal(): number {
    return this._ordinal;
  }

  set ordinal(value: number) {
    this._ordinal = value;
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

  get dataType(): string {
    return this._dataType;
  }

  set dataType(value: string) {
    this._dataType = value;
  }
  get optional(): Boolean {
    return this._optional;
  }

  set optional(value: Boolean) {
    this._optional = value;
  }
  get isUsedIn(): ArgumentToParameterMapping[] {
    return this._isUsedIn;
  }

  set isUsedIn(value: ArgumentToParameterMapping[]) {
    this._isUsedIn = value;
  }

  public toObjectG() {
    return {
      $: {
        id: this.id,
        ordinal: this.ordinal,
        name: this.name,
        dataType: this.dataType[1],
        optional: this.optional,
      },
    };
  }
}
