import { Metric } from "./Metric";
import { SelfAwarenessProcess } from "./SelfAwarenessProcess";
import { CollectiveSelfawarenessAspect } from "./CollectiveSelfawarenessAspect";

export class SelfAwarenessAspect {
  private _id: number;
  private _name: string;
  private _description: string;
  private _aspectType;
  private _weight: number;
  private _active: boolean;
  private _isEvaluated: Metric[];
  private _derives: CollectiveSelfawarenessAspect[];

  constructor(
    id: number,
    name: string,
    description: string,
    weight: number,
    aspectType
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._weight = weight;
    this._aspectType = aspectType;
    this._active = true;
    this._isEvaluated = [];
    this._derives = [];
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
  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get isEvaluated(): Metric[] {
    return this._isEvaluated;
  }

  set isEvaluated(value: Metric[]) {
    this._isEvaluated = value;
  }

  public toObjectG(): any {
    var res: any = {};
    res.$ = {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.aspectType,
      weight: this.weight,
    };
    return res;
  }
}
