import { Metric } from "./Metric";
import { CollectionMethod } from "./CollectionMethod";

export class DirectMetric extends Metric {
  private _isProducedBy: CollectionMethod[];

  constructor(

id: number,
    name: string,
    description: string,
    abbreviation: string,
    perspective:string,
  ) {
    super(id, name, description, abbreviation, perspective);
    this._isProducedBy = [];
  }

  get isProducedBy(): CollectionMethod[] {
    return this._isProducedBy;
  }

  set isProducedBy(value: CollectionMethod[]) {
    this._isProducedBy = value;
  }
}
