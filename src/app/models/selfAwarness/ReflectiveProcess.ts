import { AnalysisModel } from "./AnalysisModel";
import { CalculationMethod } from "./CalculationMethod";
import { SelfAwarenessProcess } from "./SelfAwarenessProcess";
import { Goal } from "./Goal";

export class ReflectiveProcess extends SelfAwarenessProcess {
  private _usesAnalysisModel: AnalysisModel | undefined;
  private _usesCalculationMethod: CalculationMethod | undefined;

  constructor(
    id: number,
    name: string,
    description: string,
    executionPeriodStart: Date,
    executionPeriodEnd: Date
  ) {
    super(id, name, description, executionPeriodStart, executionPeriodEnd);
  }

  get usesAnalysisModel(): AnalysisModel | undefined {
    return this._usesAnalysisModel;
  }

  set usesAnalysisModel(value: AnalysisModel | undefined) {
    this._usesAnalysisModel = value;
  }

  get usesCalculationMethod(): CalculationMethod | undefined {
    return this._usesCalculationMethod;
  }

  set usesCalculationMethod(value: CalculationMethod | undefined) {
    this._usesCalculationMethod = value;
  }
}
