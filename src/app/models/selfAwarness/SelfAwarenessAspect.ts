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
  protected _aggregationOperator: string | undefined | {};
  private _isEvaluated: Metric[];
  private _derives: CollectiveSelfawarenessAspect[];
  private _scope: string | undefined;

  constructor(
    id: number,
    name: string,
    description: string,
    weight: number,
    aspectType,
    aggregationOperator?: string,
    scope?: string
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._weight = weight;
    this._aspectType = aspectType;
    this._active = true;
    this._isEvaluated = [];
    this._derives = [];
    this._aggregationOperator = aggregationOperator;
    this._scope = scope;
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

  get aggregationOperator(): string | undefined | {}{
    return this._aggregationOperator;
  }

  set aggregationOperator(value: string | undefined | {}) {
    this._aggregationOperator = value;
  }

  get isEvaluated(): Metric[] {
    return this._isEvaluated;
  }

  set isEvaluated(value: Metric[]) {
    this._isEvaluated = value;
  }

  get scope(): string | undefined {
    return this._scope;
  }

  set scope(value: string | undefined) {
    this._scope = value;
  }

  public is_individual(): boolean {
    return this._scope == "INDIVIDUAL";
  }

  public is_colective(): boolean {
    return this._scope == "COLECTIVO";
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
    if (this.is_colective())
      res.$.aggregationOperator = this.aggregationOperator;
    return res;
  }
}
