import { ImplementationResource } from "./ImplementationResource";

export class WebService extends ImplementationResource {
    private _endPoint:string;
    private _instrucctions:string;
    private _DataFormatType:JSON;
    constructor(id: number,
        name: string,
        description: string,
        returnDataType,endPoint:string,instrucctions:string,DataFormatType) {
        super(id,name,description,returnDataType);
        this._endPoint=endPoint;
        this._instrucctions=instrucctions;
        this._DataFormatType=DataFormatType;

      }
      get endPoint(): string {
        return this._endPoint;
      }
    
      set endPoint(value: string) {
        this._endPoint = value;
      }
      get instrucctions(): string {
        return this._instrucctions;
      }
    
      set instrucctions(value: string) {
        this._instrucctions = value;
      }
      get DataFormatType(): JSON {
        return this._DataFormatType;
      }
    
      set DataFormatType(value: JSON) {
        this._DataFormatType = value;
      }
}