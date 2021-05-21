
import { MetaDataToParameterMapping } from "./MetaDataToParameterMapping";
export class DataColumn{
    private _name: string;
    private _DataColumn;
    private _DataType;
    private _isUsedIn:MetaDataToParameterMapping[];
    constructor(
      name: string,
      DataColumn,
      DataType,
   
    ) {
      this._name = name; 
      this._DataColumn=DataColumn,
      this._DataType=DataType
      this._isUsedIn=[];
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      this._name = value;
    }
    get DataColumn() {
        return this._DataColumn;
      }
    
      set DataColumn(value) {
        this._DataColumn=value
  }
  get DataType() {
    return this._DataType;
  }

  set DataType(value) {
    this._DataType=value
}
get isUsedIn():MetaDataToParameterMapping[]  {
    return this._isUsedIn;
  }

  set isUsedIn(value:MetaDataToParameterMapping[]) {
    this._isUsedIn=value
}
}