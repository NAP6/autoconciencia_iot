import { LearningReasoningMethod } from "./LearningReasoningMethod";

export class CollectionMethod extends LearningReasoningMethod {
  private _collectionScope;

  constructor(id: number, collectionScope) {
    super(id);
    this._collectionScope = collectionScope;
  }

  get collectionScope() {
    return this._collectionScope;
  }

  set collectionScope(value) {
    this._collectionScope;
  }
}
