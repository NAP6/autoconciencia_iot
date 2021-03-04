import { LearningReasoningMethod } from "./LearningReasoningMethod";
import { Property } from "./Property";
import { DirectMetric } from "./DirectMetric";

export class CollectionMethod extends LearningReasoningMethod {
  private _collectionScope;
  private _collectsProperty: Property[];
  private _produces: DirectMetric | undefined;

  constructor(id: number, collectionScope) {
    super(id);
    this._collectionScope = collectionScope;
    this._collectsProperty = [];
  }

  get collectionScope() {
    return this._collectionScope;
  }

  set collectionScope(value) {
    this._collectionScope = value;
  }

  get collectsProperty(): Property[] {
    return this._collectsProperty;
  }

  set collectsProperty(value: Property[]) {
    this._collectsProperty = value;
  }

  get produces(): DirectMetric | undefined {
    return this._produces;
  }

  set produces(value: DirectMetric | undefined) {
    this._produces = value;
  }
}
