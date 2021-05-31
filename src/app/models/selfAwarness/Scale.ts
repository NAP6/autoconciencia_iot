import { Metric } from "./Metric";

export class Scale {
  private _id: number;
  private _name: string;
  private _validValues: string;
  private _scaleType;
  private _isUsedBy: Metric[];
  private _active: Boolean;

  constructor(id: number, name: string, validValues: string, scaleType) {
    this._id = id;
    this._name = name;
    this._validValues = validValues;
    this._scaleType = scaleType;
    this._isUsedBy = [];
    this._active = true;
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

  get validValues(): string {
    return this._validValues;
  }

  set validValues(value: string) {
    this._validValues = value;
  }

  get scaleType() {
    return this._scaleType;
  }

  set scaleType(value) {
    this._scaleType = value;
  }

  get isUsedBy(): Metric[] {
    return this._isUsedBy;
  }

  set isUsedBy(value: Metric[]) {
    this._isUsedBy = value;
  }
  get active(): Boolean {
    return this._active;
  }

  set active(value: Boolean) {
    this._active = value;
  }

  public toObjectG() {
    return {
      $: {
        id: this.id,
        name: this.name,
        validValues: this.validValues,
        type: this.scaleType,
      },
    };
  }
}
