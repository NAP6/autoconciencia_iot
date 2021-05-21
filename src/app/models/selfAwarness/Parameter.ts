
import {ArgumentToParameterMapping } from "./ArgumentToParameterMapping";
export class Parameter{
    private _ordinal: number;
    private _name: string;
    private _dataType;
    private _optional: Boolean;
    private _isUsedIn:ArgumentToParameterMapping[];

    constructor(
      ordinal: number,
      name: string,
      dataType,
      optional:boolean,
   
    ) {
      this._ordinal = ordinal;
      this._name = name;
      this._dataType = dataType;
      this._optional=optional;
      this._isUsedIn=[];
  
    }
  
    get ordinal(): number {
      return this._ordinal;
    }
  
    set ordinal(value: number) {
      this._ordinal = value;
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      this._name = value;
    }
  
    get dataType(): string {
      return this._dataType;
    }
  
    set dataType(value: string) {
      this._dataType = value;
    }
    get optional(): Boolean {
      return this._optional;
    }
  
    set optional(value: Boolean) {
      this._optional = value;
    }
    get isUsedIn(): ArgumentToParameterMapping[] {
        return this._isUsedIn;
      }
    
      set isUsedIn(value: ArgumentToParameterMapping[]) {
        this._isUsedIn = value;
      }
  
  }
  