import { Action } from "./Action";

export class Threshold {
  private _id: number;
  private _name: string;
  private _interpretation: string;
  private _lowerThreshold: number;
  private _upperThreshold: number;
  private _active:Boolean;
  private _recommends: Action[];

  constructor(
    id: number,
    name: string,
    interpretation: string,
    lowerThreshold: number,
    upperThreshold: number
  ) {
    this._id = id;
    this._name = name;
    this._interpretation = interpretation;
    this._lowerThreshold = lowerThreshold;
    this._upperThreshold = upperThreshold;
    this._recommends = [];
    this._active=true;
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

  get interpretation(): string {
    return this._interpretation;
  }

  set interpretation(value: string) {
    this._interpretation = value;
  }

  get lowerThreshold(): number {
    return this._lowerThreshold;
  }

  set lowerThreshold(value: number) {
    this._lowerThreshold = value;
  }

  get upperThreshold(): number {
    return this._upperThreshold;
  }

  set upperThreshold(value: number) {
    this._upperThreshold = value;
  }
  get active(): Boolean {
    return this._active;
  }

  set active(value: Boolean) {
    this._active = value;
  }
  get recommends(): Action[] {
    return this._recommends;
  }

  set recommends(value: Action[]) {
    this._recommends = value;
  }
}
