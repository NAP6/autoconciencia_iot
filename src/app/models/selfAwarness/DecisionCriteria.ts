import { Threshold } from "./Threshold";
import { AnalysisModel } from "./AnalysisModel";
import { Goal } from "./Goal";

export class DecisionCriteria {
  private _id: number;
  private _name: string;
  private _description: string;
  private _containsThreshold: Threshold[];
  private _isUded: AnalysisModel[];
  private _interprets: Goal[];

  constructor(id: number, name: string, description: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._containsThreshold = [];
    this._isUded = [];
    this._interprets = [];
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

  get containsThreshold(): Threshold[] {
    return this._containsThreshold;
  }

  set containsThreshold(value: Threshold[]) {
    this._containsThreshold = value;
  }

  get isUded(): AnalysisModel[] {
    return this._isUded;
  }

  set isUded(value: AnalysisModel[]) {
    this._isUded = value;
  }

  get interprets(): Goal[] {
    return this._interprets;
  }

  set interprets(value: Goal[]) {
    this._interprets = value;
  }
}
