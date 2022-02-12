import { SelfAwarenessAspect } from "./SelfAwarenessAspect";

export class CollectiveSelfawarenessAspect extends SelfAwarenessAspect {
  private _isDerivedFrom: SelfAwarenessAspect[];

  constructor(
    id: number,
    name: string,
    description: string,
    weight: number,
    aspectType,
    aggregationOperator: string
  ) {
    super(id, name, description, weight, aspectType);
    this._aggregationOperator = aggregationOperator;
    this._isDerivedFrom = [];
  }

  get aggregationOperator(): string | undefined | {} {
    return this._aggregationOperator;
  }

  set aggregationOperator(value: string | undefined | {}) {
    this._aggregationOperator = value;
  }

  get isDerivedFrom(): SelfAwarenessAspect[] {
    return this._isDerivedFrom;
  }

  set isDerivedFrom(value: SelfAwarenessAspect[]) {
    this._isDerivedFrom = value;
  }

  public toObjectG(): any {
    var res: any = super.toObjectG();
    res.$["aggregationOperator"] = this.aggregationOperator;
    return res;
  }
}
