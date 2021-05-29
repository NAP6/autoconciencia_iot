import { AnalysisModel } from "./AnalysisModel";
import { CalculationMethod } from "./CalculationMethod";
import { Parameter } from "./Parameter";
export class ImplementationResource {
  private _id: number;
  private _name: string;
  private _description: string;
  private _returnDataType;
  private _implementsAnalysisModel: AnalysisModel[];
  private _implementsCalculationMethod: CalculationMethod[];
  private _containsParameter: Parameter[];

  constructor(id: number, name: string, description: string, returnDataType) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._returnDataType = returnDataType;
    this._implementsAnalysisModel = [];
    this._implementsCalculationMethod = [];
    this._containsParameter = [];
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
  get returnDataType(): string {
    return this._returnDataType;
  }

  set returnDataType(value: string) {
    this._returnDataType = value;
  }
  get implementsAnalysisModel(): AnalysisModel[] {
    return this._implementsAnalysisModel;
  }

  set implementsAnalysisModel(value: AnalysisModel[]) {
    this._implementsAnalysisModel = value;
  }
  get implementsCalculationMethod(): CalculationMethod[] {
    return this._implementsCalculationMethod;
  }

  set implementsCalculationMethod(value: CalculationMethod[]) {
    this._implementsCalculationMethod = value;
  }
  get containsParameter(): Parameter[] {
    return this._containsParameter;
  }

  set containsParameter(value: Parameter[]) {
    this._containsParameter = value;
  }

  public toObjectG() {
    return {
      $: {
        id: this.id,
        name: this.name,
        description: this.description,
        returnDataType: this.returnDataType,
      },
    };
  }
}

