import { AnalysisModel } from "./AnalysisModel";
import { CalculationMethod } from "./CalculationMethod";
import { SelfAwarenessProcess } from "./SelfAwarenessProcess";
import { Goal } from "./Goal";

export class ReflectiveProcess extends SelfAwarenessProcess {
  private _usesAnalysisModel: AnalysisModel;
  private _usesCalculationMethod: CalculationMethod;

  constructor(
    id: number,
    name: string,
    description: string,
    executionPeriodStart: Date,
    executionPeriodEnd: Date,
    supports: Goal,
    usesAnalysisModel: AnalysisModel,
    usesCalculationMethod: CalculationMethod
  ) {
    super(
      id,
      name,
      description,
      executionPeriodStart,
      executionPeriodEnd,
      supports
    );
    this._usesAnalysisModel = usesAnalysisModel;
    this._usesCalculationMethod = usesCalculationMethod;
  }
}
