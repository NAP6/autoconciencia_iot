import { SelfAwarenessProcess } from "./SelfAwarenessProcess";
import { DecisionCriteria } from "./DecisionCriteria";

export class Goal {
  private _id: number;
  private _name: string;
  private _description: string;
  private _weight: number;
  private _aggregationOperator: string;
  private _containsSubGoal: Goal[];
  private _isSuported: SelfAwarenessProcess[];
  private _isInterpretedBy: DecisionCriteria | undefined;

  constructor(
    id: number,
    name: string,
    description: string,
    weight: number,
    aggregationOperator: string
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._weight = weight;
    this._aggregationOperator = aggregationOperator;
    this._containsSubGoal = [];
    this._isSuported = [];
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get weight(): number {
    return this._weight;
  }

  set weight(value: number) {
    this._weight = value;
  }

  get aggregationOperator(): string {
    return this._aggregationOperator;
  }

  set aggregationOperator(value: string) {
    this._aggregationOperator = value;
  }

  get containsSubGoal(): Goal[] {
    return this._containsSubGoal;
  }

  set containsSubGoal(value: Goal[]) {
    this._containsSubGoal = value;
  }

  get isSuported(): SelfAwarenessProcess[] {
    return this._isSuported;
  }

  set isSuported(value: SelfAwarenessProcess[]) {
    this._isSuported = value;
  }

  get isInterpretedBy(): DecisionCriteria | undefined {
    return this._isInterpretedBy;
  }

  set isInterpretedBy(value: DecisionCriteria | undefined) {
    this._isInterpretedBy = value;
  }
}
