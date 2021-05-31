import { Metric } from "./Metric";
import { CalculatedIndirectMetric } from "./CalculatedIndirectMetric";
import { CalculationMethod } from "./CalculationMethod";

export class IndirectMetric extends Metric {
  private _containsCalculatedIndirectMetric: CalculatedIndirectMetric[];
  private _isProducedBy: CalculationMethod[];
  constructor(
    id: number,
    name: string,
    description: string,
    abbreviation: string
  ) {
    super(id, name, description, abbreviation, "");
    this._containsCalculatedIndirectMetric = [];
    this._isProducedBy = [];
  }

  get containsCalculatedIndirectMetric(): CalculatedIndirectMetric[] {
    return this._containsCalculatedIndirectMetric;
  }

  set containsCalculatedIndirectMetric(value: CalculatedIndirectMetric[]) {
    this._containsCalculatedIndirectMetric = value;
  }

  get isProducedBy(): CalculationMethod[] {
    return this._isProducedBy;
  }

  set isProducedBy(value: CalculationMethod[]) {
    this._isProducedBy = value;
  }

  public toObjectG() {
    return {
      $: {
        id: this.id,
        name: this.name,
        description: this.description,
        abbreviation: this.abbreviation,
      },
    };
  }
}
