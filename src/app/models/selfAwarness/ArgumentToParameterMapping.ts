
import { Parameter } from "./Parameter";

export class ArgumentToParameterMapping{
    private _id: number;
    private _relatesParameter:Parameter|undefined;
    constructor(
      id: number,
   
    ) {
      this._id = id; 
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(value: number) {
      this._id = value;
    }
    get relatesParameter(): Parameter|undefined {
        return this._relatesParameter;
      }
    
      set relatesParameter(value: Parameter|undefined) {
        this._relatesParameter
  }
}