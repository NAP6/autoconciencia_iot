import { Metric } from "./Metric";
import { SelfAwarenessProcess } from "./SelfAwarenessProcess";

export class SelfAwarenessAspect {
  private _id: number;
  private _name: string;
  private _description: string;
  private _aspectType;
  private _weight: number;
  private _isEvaluated: Metric[];
  private _isCaptured: SelfAwarenessProcess[];

  constructor(
    id: number,
    name: string,
    description: string,
    aspectType,
    weight: number
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._aspectType = aspectType;
    this._weight = weight;
    this._isEvaluated = [];
    this._isCaptured = [];
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
  get aspectType(): string {
    return this._aspectType;
  }

  set aspectType(value: string) {
    this._aspectType = value;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }

  get isEvaluated(): Metric[] {
    return this._isEvaluated;
  }

  set isEvaluated(value: Metric[]) {
    this._isEvaluated = value;
  }

  get isCaptured(): SelfAwarenessProcess[] {
    return this._isCaptured;
  }

  set isCaptured(value: SelfAwarenessProcess[]) {
    this._isCaptured = value;
  }
}
