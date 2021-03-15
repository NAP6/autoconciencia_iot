import { SimulationValue } from "./SimulationValue";

export class SimulationScenario {
  private _id: number;
  private _name: string;
  private _description: string;
  private _uses: SimulationValue[];

  constructor(id: number, name: string, description: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._uses = [];
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

  get uses(): SimulationValue[] {
    return this._uses;
  }

  set uses(value: SimulationValue[]) {
    this._uses = value;
  }
}
