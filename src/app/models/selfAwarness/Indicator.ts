import { Metric } from "./Metric";
import { CalculationMethod } from "./CalculationMethod";
import { AnalysisModel } from "./AnalysisModel";

export class Indicator extends Metric {
  private _containsCalculatedIndicator: CalculationMethod[];
  private _isProducedBy: AnalysisModel[];

  constructor(
    id: number,
    name: string,
    description: string,
    abbreviation: string,
    perspective: string
  ) {
    super(id, name, description, abbreviation, perspective);
    this._containsCalculatedIndicator = [];
    this._isProducedBy = [];
  }

  get containsCalculatedIndicator(): CalculationMethod[] {
    return this._containsCalculatedIndicator;
  }

  set containsCalculatedIndicator(value: CalculationMethod[]) {
    this._containsCalculatedIndicator = value;
  }

  get isProducedBy(): AnalysisModel[] {
    return this._isProducedBy;
  }

  set isProducedBy(value: AnalysisModel[]) {
    this._isProducedBy = value;
  }
}
