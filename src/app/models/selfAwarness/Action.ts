import { Threshold } from "./Threshold";

export class Action {
  private _id: number;
  private _name: string;
  private _description: string;
  private _active: boolean;
  private _isRecommendedln: Threshold | undefined;
  constructor(id: number, description: string, name: string) {
    this._id = id;
    this._name = name;
    this._description = description;
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
  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get isRecommendedln(): Threshold | undefined {
    return this._isRecommendedln;
  }

  set isRecommendedln(value: Threshold | undefined) {
    this._isRecommendedln = value;
  }
}
