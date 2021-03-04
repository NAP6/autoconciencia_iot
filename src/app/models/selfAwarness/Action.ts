import { Threshold } from "./Threshold";

export class Action {
  private _id: number;
  private _description: string;
  private _sRecommendedln: Threshold | undefined;

  constructor(id: number, description: string) {
    this._id = id;
    this._description = description;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get sRecommendedln(): Threshold | undefined {
    return this._sRecommendedln;
  }

  set sRecommendedln(value: Threshold | undefined) {
    this._sRecommendedln = value;
  }
}
