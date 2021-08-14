import { IndividualSelfAwarenessAspect } from "./IndividualSelfAwarenessAspect";

export class Scope {
  private _has: IndividualSelfAwarenessAspect[];
  constructor() {
    this._has = [];
  }

  get containsSelfAwarenessAspect(): IndividualSelfAwarenessAspect[] {
    return this._has;
  }

  set containsSelfAwarenessAspect(value: IndividualSelfAwarenessAspect[]) {
    this._has = value;
  }
}
