import { SimulationScenario } from "./SimulationScenario";

export class SimulationValue {
  private _variable_id: number | undefined;
  private _scenario_id: number | undefined;
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

  get variable_id(): number | undefined {
    return this._variable_id;
  }

  set variable_id(value: number | undefined) {
    this._variable_id = value;
  }

  get scenario_id(): number | undefined {
    return this._scenario_id;
  }

  set scenario_id(value: number | undefined) {
    this._scenario_id = value;
  }

  public toObjectG() {
    return {
      $: {
        value: this.value,
      },
    };
  }
}
