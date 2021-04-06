import { SelfAwarenessProcess } from "./SelfAwarenessProcess";
import { CollectionMethod } from "./CollectionMethod";
import { AnalysisModel } from "./AnalysisModel";

export class PreReflectiveProcess extends SelfAwarenessProcess {
  private _usesCollectionMethod: CollectionMethod | undefined;
  private _usesAnalysisModel: AnalysisModel | undefined;
  constructor(
    id: number,
    name: string,
    description: string,
    type_process:number,
    executionPeriodStart: Date,
    executionPeriodEnd: Date,
  ) {
    super(
      id,
      name,
      description,
      type_process,
      executionPeriodStart,
      executionPeriodEnd
    );
  }

  get usesCollectionMehod(): CollectionMethod | undefined {
    return this._usesCollectionMethod;
  }

  set usesCollectionMehod(value: CollectionMethod | undefined) {
    this._usesCollectionMethod = value;
  }

  get usesAnalysisModel(): AnalysisModel | undefined {
    return this._usesAnalysisModel;
  }

  set usesAnalysisModel(value: AnalysisModel | undefined) {
    this.usesAnalysisModel = value;
  }
}
