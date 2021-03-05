import { SelfAwarenessProcess } from "./SelfAwarenessProcess";
import { Goal } from "./Goal";
import { CollectionMethod } from "./CollectionMethod";
import { AnalysisModel } from "./AnalysisModel";

export class PreReflecriveProcess extends SelfAwarenessProcess {
  private _usesCollectionMethod: CollectionMethod;
  private _usesAnalysisModel: AnalysisModel;

  constructor(
    id: number,
    name: string,
    description: string,
    executionPeriodStart: Date,
    executionPeriodEnd: Date,
    usesCollectionMehod: CollectionMethod,
    usesAnalysisModel: AnalysisModel
  ) {
    super(
      id,
      name,
      description,
      executionPeriodStart,
      executionPeriodEnd
    );
    this._usesCollectionMethod = usesCollectionMehod;
    this._usesAnalysisModel = usesAnalysisModel;
  }

  get usesCollectionMehod(): CollectionMethod {
    return this._usesCollectionMethod;
  }

  set usesCollectionMehod(value: CollectionMethod) {
    this._usesCollectionMethod = value;
  }

  get usesAnalysisModel(): AnalysisModel {
    return this._usesAnalysisModel;
  }

  set usesAnalysisModel(value: AnalysisModel) {
    this.usesAnalysisModel = value;
  }
}
