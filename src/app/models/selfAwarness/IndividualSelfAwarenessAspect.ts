import { SelfAwarenessAspect } from "./SelfAwarenessAspect";
import { Scope } from "./Scope";

export class IndividualSelfAwarenessAspect extends SelfAwarenessAspect {
  private _belongsTo: Scope[];

  constructor(
    id: number,
    name: string,
    description: string,
    weight: number,
    aspectType,
    aggregationOperator: String | null | {}
  ) {
    super(id, name, description, weight, aspectType);
    this._belongsTo = [];
  }

  get belongsTo(): Scope[] {
    return this._belongsTo;
  }

  set belongsTo(value: Scope[]) {
    this._belongsTo = value;
  }
}
