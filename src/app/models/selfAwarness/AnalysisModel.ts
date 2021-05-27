import { LearningReasoningMethod } from "./LearningReasoningMethod";
import { Action } from "./Action";
import { DecisionCriteria } from "./DecisionCriteria";
import { Indicator } from "./Indicator";

export class AnalysisModel extends LearningReasoningMethod {
  private _implementationResourceType;
  private _containsAction: Action[];
  private _uses: DecisionCriteria | undefined;
  private _produces: Indicator | undefined;

  constructor(id: number, implementationResourceType) {
    super(id);
    this._implementationResourceType = implementationResourceType;
    this._containsAction = [];
  }

  get implementationResourceType() {
    return this._implementationResourceType;
  }

  set implementationResourceType(value) {
    this._implementationResourceType = value;
  }

  get uses(): DecisionCriteria | undefined {
    return this._uses;
  }

  set uses(value: DecisionCriteria | undefined) {
    this._uses = value;
  }

  get containsAction(): Action[] {
    return this._containsAction;
  }

  set containsAction(value: Action[]) {
    this._containsAction = value;
  }

  get produces(): Indicator | undefined {
    return this._produces;
  }

  set produces(value: Indicator | undefined) {
    this._produces = value;
  }

  public toObjectG() {
    return {
      $: {
        id: this.id,
        implementationResourceType: this.implementationResourceType,
      },
    };
  }
}
