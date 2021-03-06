import { Span } from "./Span";
import { DecisionCriteria } from "./DecisionCriteria";
import { Scale } from "./Scale";
import { Scope } from "./Scope";
import { ImplementationResource } from "./ImplementationResource";
import {  } from "./DataFlow";
import { DataFlow } from "../architecture/DataFlow";
import { Metric } from "../selfAwarness/Metric";

export class SelfAwarness {
  private _id: number;
  private _name: string;
  private _description: string;
  private _author: string;
  private _active: boolean;
  private _architectureModel: string;
  private _containsSpan: Span[];
  private _containsDecisionCriteria: DecisionCriteria[];
  private _containsScale: Scale[];
  private _containsScope: Scope[];
  private _containsImplementationResource:ImplementationResource[];
  private _containsDataFlow:DataFlow[];
  private _containsMetric: Metric[];

  constructor(
    id: number,
    name: string,
    description: string,
    author: string,
    architectureModel: string
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._author = author;
    this._active = true;
    this._architectureModel = architectureModel;
    this._containsSpan = [];
    this._containsDecisionCriteria = [];
    this._containsScope=[];
    this._containsScale=[];
    this._containsImplementationResource=[];
    this._containsDataFlow=[];
    this._containsMetric=[]
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

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get architectureModel(): string {
    return this._architectureModel;
  }

  set architectureModel(value: string) {
    this._architectureModel = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get containsSpan(): Span[] {
    return this._containsSpan;
  }

  set containsSpan(value: Span[]) {
    this._containsSpan = value;
  }

  get containsDecisionCriteria(): DecisionCriteria[] {
    return this._containsDecisionCriteria;
  }

  set containsDecisionCriteria(value: DecisionCriteria[]) {
    this._containsDecisionCriteria = value;
  }

  get containsScale(): Scale[] {
    return this._containsScale;
  }

  set containsScale(value: Scale[]) {
    this._containsScale = value;
  }

  get containsScope(): Scope[] {
    return this._containsScope;
  }

  set containsScope(value: Scope[]) {
    this._containsScope = value;
  }
  get containsImplementationResource(): ImplementationResource[] {
    return this._containsImplementationResource;
  }

  set containsImplementationResource(value: ImplementationResource[]) {
    this._containsImplementationResource = value;
  }

  get containsDataFlow(): DataFlow[] {
    return this._containsDataFlow;
  }

  set containsDataFlow(value: DataFlow[]) {
    this._containsDataFlow = value;
  }
  get containsMetric(): Metric[] {
    return this._containsMetric;
  }

  set containsMetric(value: Metric[]) {
    this._containsMetric = value;
  }
}
