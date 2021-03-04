import { LearningReasoningMethod } from "./LearningReasoningMethod";
import { Property } from "./Property";

export class CollectionMethod extends LearningReasoningMethod {
  private _collectionScope;
  private _collectsProperty: Property[];
  
  constructor(id: number, collectionScope) {
    super(id);
    this._collectionScope = collectionScope;
    this._collectsProperty=[];
  }

  get collectionScope() {
    return this._collectionScope;
  }

  set collectionScope(value) {
    this._collectionScope;
  }
  get collectsProperty():Property[] {
    return this._collectsProperty;
  }

  set collectsProperty(value:Property[]) {
    this._collectsProperty;
  }
}
