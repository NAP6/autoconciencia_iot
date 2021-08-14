import { AnalysisModel } from "./AnalysisModel";
import { CalculationMethod } from "./CalculationMethod";
import { SelfAwarenessProcess } from "./SelfAwarenessProcess";

export class ReflectiveProcess extends SelfAwarenessProcess {
  private _usesAnalysisModel: AnalysisModel | undefined;
  private _usesCalculationMethod: CalculationMethod | undefined;

  constructor(
    id: number,
    name: string,
    description: string,
    type_process: number,
    executionPeriodStart?: Date,
    executionPeriodEnd?: Date,
    executionType?: string,
    executionTime?: number,
    executionTimeInterval?: number
  ) {
    super(
      id,
      name,
      description,
      type_process,
      executionPeriodStart,
      executionPeriodEnd,
      executionType,
      executionTime,
      executionTimeInterval
    );
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
