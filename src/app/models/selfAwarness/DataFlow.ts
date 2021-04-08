
import { CollectionMethod } from "./CollectionMethod";

export class DataFlow{
    private _id: number;
    private _description: string;
    private _dataFlowType;
    private _communicationtType;
    private _unitOfTime;
    private _executionTimeInterval: number|undefined;
    private _flowExecutionTime: Date|undefined;
    private _support:CollectionMethod[];
    constructor(
      id: number,
      description:string,
      dataFlowType,
      communicationtType,
      unitOfTime,
      executionTimeInterval?:number,
      flowExecutionTime?:Date,
    ) {
      this._id = id; 
      this._description=description;
      this._dataFlowType=dataFlowType;
      this._communicationtType=communicationtType;
      this._unitOfTime=unitOfTime;
      this._executionTimeInterval=executionTimeInterval;
      this._flowExecutionTime=flowExecutionTime;
      this._support=[];
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(value: number) {
      this._id = value;
    }
    get description(): string {
        return this._description;
      }
    
      set description(value: string) {
        this._description = value;
      }
      get dataFlowType()  {
        return this._dataFlowType;
      }
    
      set dataFlowType(value) {
        this._dataFlowType = value;
      }
      get communicationType() {
        return this._communicationtType;
      }
    
      set communicationType(value) {
        this._communicationtType = value;
      }
      get unitOfTime() {
        return this._unitOfTime;
      }
    
      set unitOfTime(value) {
        this._unitOfTime = value;
      }
      get executionTimeInterval() {
        return this._executionTimeInterval;
      }
    
      set executionTimeInterval(value) {
        this._executionTimeInterval = value;
      }
      get flowExecutionTime()  {
        return this._flowExecutionTime;
      }
    
      set flowExecutionTime(value) {
        this._flowExecutionTime = value;
      }
    get support(): CollectionMethod[] {
        return this._support;
      }
    
      set support(value: CollectionMethod[]) {
        this._support
  }
}
