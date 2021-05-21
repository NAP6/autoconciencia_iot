import { SelfAwarenessAspect } from "./SelfAwarenessAspect";

export class Scope {
  private _containsSelfAwarenessAspect: SelfAwarenessAspect[];
  constructor() {
    this._containsSelfAwarenessAspect = [];
  }

  get containsSelfAwarenessAspect(): SelfAwarenessAspect[] {
    return this._containsSelfAwarenessAspect;
  }

  set containsSelfAwarenessAspect(value: SelfAwarenessAspect[]) {
    this._containsSelfAwarenessAspect = value;
  }
}
