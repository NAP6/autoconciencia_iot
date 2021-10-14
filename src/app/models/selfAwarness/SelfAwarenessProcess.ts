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
  private _executionType: string | undefined;
  private _executionTimeInterval: number | undefined;
  private _unitOfTime: string | undefined;
  private _executionTime: number | undefined;
  private _supports: Goal | undefined;
  private _captures: SelfAwarenessAspect | undefined;
  constructor(
    id: number,
    name: string,
    description: string,
    type_process: number,
    executionPeriodStart?: Date,
    executionPeriodEnd?: Date,
    executionType?: string,
    executionTimeInterval?: number,
    executionTime?: number,
    unitOfTime?: string
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._type_process = type_process;
    this._active = true;
    this._executionPeriodStart = executionPeriodStart;
    this._executionPeriodEnd = executionPeriodEnd;
    this._executionType = executionType;
    this._executionTimeInterval = executionTimeInterval;
    this.unitOfTime = unitOfTime;
    this._executionTime = executionTime;
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

  get executionType(): string | undefined {
    return this._executionType;
  }

  set executionType(value: string | undefined) {
    this._executionType = value;
  }
  get executionTime(): number | undefined {
    return this._executionTime;
  }

  set executionTime(value: number | undefined) {
    this._executionTime = value;
  }
  get unitOfTime(): string | undefined {
    return this._unitOfTime;
  }

  set unitOfTime(value: string | undefined) {
    this._unitOfTime = value;
  }
  get executionTimeInterval(): number | undefined {
    return this._executionTimeInterval;
  }

  set executionTimeInterval(value: number | undefined) {
    this._executionTimeInterval = value;
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

  public toObjectG(): any {
    var res: any = {};
    res.$ = {
      id: this.id,
      name: this.name,
      description: this.description,
      executionPeriodStart: this.executionPeriodStart,
      executionPeriodEnd: this.executionPeriodEnd,
      executionType: this.executionType,
      unitOfTime: this.unitOfTime,
      executionTimeInterval: this.executionTimeInterval,
      executionTime: this.executionTime,
    };
    return res;
  }
}
