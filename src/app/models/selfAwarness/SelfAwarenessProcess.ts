import { Goal } from "./Goal";
import { SelfAwarenessAspect } from "./SelfAwarenessAspect";

export class SelfAwarenessProcess {
  private _id: number;
  private _name: string;
  private _description: string;
  private _type_process: number;
  private _active: boolean;
  private _executionPeriodStart: Date | undefined;
  private _executionPeriodEnd: Date | undefined;
  private _supports: Goal | undefined;
  private _captures: SelfAwarenessAspect | undefined;
  constructor(
    id: number,
    name: string,
    description: string,
    type_process: number,
    executionPeriodStart?: Date,
    executionPeriodEnd?: Date
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._type_process = type_process;
    this._active = true;
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

  get type_process(): number {
    return this._type_process;
  }

  set type_process(value: number) {
    this._type_process = value;
  }
  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }
  get executionPeriodStart(): Date | undefined {
    return this._executionPeriodStart;
  }

  set executionPeriodStart(value: Date | undefined) {
    this._executionPeriodStart = value;
  }

  get executionPeriodEnd(): Date | undefined {
    return this._executionPeriodEnd;
  }

  set executionPeriodEnd(value: Date | undefined) {
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

