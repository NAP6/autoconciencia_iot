import { Parameter } from "./Parameter";

export class ArgumentToParameterMapping {
  private _id: number;
  private _relatesParameter: Parameter | undefined;
  private _simulation_variable: number | undefined;
  private _metadata: number | undefined;
  constructor(
    id: number,
    simulation_variable?: number | undefined,
    metadata?: number | undefined
  ) {
    this._id = id;
    this._simulation_variable = simulation_variable;
    this._metadata = metadata;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get relatesParameter(): Parameter | undefined {
    return this._relatesParameter;
  }

  set relatesParameter(value: Parameter | undefined) {
    this._relatesParameter = value;
  }

  get simulation_variable(): number | undefined {
    return this._simulation_variable;
  }

  set simulation_variable(value: number | undefined) {
    this._simulation_variable = value;
  }

  get is_using_simulation_variable(): boolean {
    return this._simulation_variable != undefined;
  }

  get metadata(): number | undefined {
    return this._metadata;
  }

  set metadata(value: number | undefined) {
    this._metadata = value;
  }

  get is_metadata(): boolean {
    return this._metadata != undefined;
  }

  public toObjectG() {
    return { $: { id: this.id } };
  }
}
