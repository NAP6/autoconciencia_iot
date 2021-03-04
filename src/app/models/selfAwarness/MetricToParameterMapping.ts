import { ArgumentToParameterMapping } from "./ArgumentToParameterMapping";
import { Metric } from "./Metric";

export class MetricToParameterMapping extends ArgumentToParameterMapping {
    private _relatesMetric:Metric|undefined;
    constructor( id: number) {
        super(id);
      }
      get relatesMetric(): Metric|undefined {
        return this._relatesMetric;
      }
    
      set relatesMetric(value: Metric|undefined) {
        this._relatesMetric = value;
      }
}
