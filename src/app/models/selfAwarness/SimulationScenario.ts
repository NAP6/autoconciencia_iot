import { SimulationValue } from "./SimulationValue";

export class SimulationScenario {
  private _id: number;
  private _name: string;
  private _description: string;
  private _active: boolean;
  private _uses: SimulationValue[];

  constructor(id: number, name: string, description: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._uses = [];
    this._active = true;
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
  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  public toObjectG() {
    return {
      $: {
        id: this.id,
        name: this.name,
        description: this.description,
      },
    };
  }
}
