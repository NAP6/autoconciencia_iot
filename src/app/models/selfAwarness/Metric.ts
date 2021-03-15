import { Scale } from "./Scale";
import { MeasurementUnit } from "./MeasurementUnit";
import { MetricToParameterMapping } from "./MetricToParameterMapping";
import{SelfAwarenessAspect} from "./SelfAwarenessAspect"

export class Metric {
  private _id: number;
  private _name: string;
  private _description: string;
  private _abbreviation: string;
  private _perspective:string;
  private _active:boolean;
  private _isValidatedBy: Scale | undefined;
  private _isExpressedIn: MeasurementUnit | undefined;
  private _isUsedIn:MetricToParameterMapping[];
  private _evaluates: SelfAwarenessAspect[]; 

  constructor(
    id: number,
    name: string,
    description: string,
    abbreviation: string,
    perspective:string,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._abbreviation = abbreviation;
    this._perspective=perspective;
    this._active=true;
    this._isUsedIn=[];
    this._evaluates=[];
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

  get abbreviation(): string {
    return this._abbreviation;
  }

  set abbreviation(value: string) {
    this._abbreviation = value;
  }
  get perspective(): string {
    return this._perspective;
  }

  set perspective(value: string) {
    this._perspective = value;
  }
  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get isValidatedBy(): Scale | undefined {
    return this._isValidatedBy;
  }

  set isValidatedBy(value: Scale | undefined) {
    this._isValidatedBy = value;
  }

  get isExpressedIn(): MeasurementUnit | undefined {
    return this._isExpressedIn;
  }

  set isExpressedIn(value: MeasurementUnit | undefined) {
    this._isExpressedIn = value;
  }
  get isUsedIn(): MetricToParameterMapping[]{
    return this._isUsedIn;
  }

  set isUsedIn(value: MetricToParameterMapping[]) {
    this._isUsedIn = value;
  }

  get evaluates(): SelfAwarenessAspect[]{
    return this._evaluates;
  }

  set evaluates(value: SelfAwarenessAspect[]) {
    this._evaluates = value;
  }
}
