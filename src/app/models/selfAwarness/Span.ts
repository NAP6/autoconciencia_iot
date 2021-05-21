import { Goal } from "./Goal";
import { SelfAwarenessProcess } from "./SelfAwarenessProcess";

export class Span {
  private _has: Goal[];
  private _executes: SelfAwarenessProcess[];

  constructor() {
    this._has = [];
    this._executes = [];
  }

  get has(): Goal[] {
    return this._has;
  }

  set has(value: Goal[]) {
    this._has = value;
  }

  get executes(): SelfAwarenessProcess[] {
    return this._executes;
  }

  set executes(value: SelfAwarenessProcess[]) {
    this._executes = value;
  }
}
