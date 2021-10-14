import { Metric } from "./Metric";

export class MeasurementUnit {
  private _id: number;
  private _name: string;
  private _description: string;
  private _acronym: string;
  private _isUsedBy: Metric[];
  private _active: Boolean;

  constructor(id: number, name: string, description: string, acronym: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._acronym = acronym;
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

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get acronym(): string {
    return this._acronym;
  }

  set acronym(value: string) {
    this._acronym = value;
  }

  get active(): Boolean {
    return this._active;
  }

  set active(value: Boolean) {
    this._active = value;
  }
  get isUsedBy(): Metric[] {
    return this._isUsedBy;
  }

  set isUsedBy(value: Metric[]) {
    this._isUsedBy = value;
  }

  public toObjectG() {
    return {
      $: {
        id: 1000 + this.id,
        name: this.name,
        description: this.description,
        acronym: this.acronym,
      },
    };
  }
}
