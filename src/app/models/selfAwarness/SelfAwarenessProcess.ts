import { Goal } from "./Goal";
import { SelfAwarenessAspect } from "./SelfAwarenessAspect";

export class SelfAwarenessProcess {
  private _id: number;
  private _name: string;
  private _description: string;
  private _executionPeriodStart: Date;
  private _executionPeriodEnd: Date;
  private _supports: Goal | undefined;
  private _captures: SelfAwarenessAspect | undefined;

  constructor(
    id: number,
    name: string,
    description: string,
    executionPeriodStart: Date,
    executionPeriodEnd: Date
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._executionPeriodStart = executionPeriodStart;
    this._executionPeriodEnd = executionPeriodEnd;
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

  get executionPeriodStart(): Date {
    return this._executionPeriodStart;
  }

  set executionPeriodStart(value: Date) {
    this._executionPeriodStart = value;
  }

  get executionPeriodEnd(): Date {
    return this._executionPeriodEnd;
  }

  set executionPeriodEnd(value: Date) {
    this._executionPeriodEnd = value;
  }

  get supports(): Goal | undefined {
    return this._supports;
  }

  set supports(value: Goal | undefined) {
    this._supports = value;
  }

  get captures(): SelfAwarenessAspect | undefined {
    return this._captures;
  }

  set captures(value: SelfAwarenessAspect | undefined) {
    this._captures = value;
  }
}
