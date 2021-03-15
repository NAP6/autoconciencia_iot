import { ArgumentToParameterMapping } from "./ArgumentToParameterMapping";
import { DataColumn } from "./DataColumn";
export class MetaDataToParameterMapping extends ArgumentToParameterMapping {
    private _dataColumn:DataColumn|undefined;
    constructor( id: number) {
        super(id);
      }
      get dataColumn():DataColumn|undefined  {
        return this._dataColumn;
      }
      set dataColumn(value:DataColumn|undefined) {
        this._dataColumn=value
    }
}
