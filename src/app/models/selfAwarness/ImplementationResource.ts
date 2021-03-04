import { AnalysisModel } from "./AnalysisModel";
export class ImplementationResource{
    private _id: number;
    private _name: string;
    private _description: string;
    private _returnDataType;
    private 
  
    constructor(
      id: number,
      name: string,
      description: string,
      returnDataType,
   
    ) {
      this._id = id;
      this._name = name;
      this._description = description;
      this._returnDataType=returnDataType;
  
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
    get returnDataType(): string {
      return this._returnDataType;
    }
  
    set returnDataType(value: string) {
      this._returnDataType = value;
    }
  }
  