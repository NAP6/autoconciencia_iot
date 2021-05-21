import { SimulationScenario } from "./SimulationScenario";

export class SimulationValue {
  private _value: number;
  private _isUsed: SimulationScenario | undefined;

  constructor(value: number) {
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get isUsed(): SimulationScenario | undefined {
    return this._isUsed;
  }

  set isUsed(value: SimulationScenario | undefined) {
    this._isUsed = value;
  }
}
