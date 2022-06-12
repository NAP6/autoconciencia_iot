import { ImplementationResource } from "./ImplementationResource";

export class WebService extends ImplementationResource {
  private _endPoint: string;
  private _instrucctions: string;
  private _DataFormatType: any;
  private _preexisting: boolean;
  constructor(
    id: number,
    name: string,
    description: string,
    returnDataType,
    endPoint: string,
    instrucctions: string,
    DataFormatType
  ) {
    super(id, name, description, returnDataType);
    this._endPoint = endPoint;
    this._instrucctions = instrucctions;
    this._DataFormatType = DataFormatType;
    this._preexisting = false;
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
  get DataFormatType(): any {
    return this._DataFormatType;
  }

  set DataFormatType(value: any) {
    this._DataFormatType = value;
  }

  get preexisting(): boolean {
    return this._preexisting;
  }

  set preexisting(value: boolean) {
    this._preexisting = value;
  }

  public toObjectG() {
    return {
      $: {
        id: this.id,
        name: this.name,
        description: this.description,
        returnDataType: this.returnDataType,
        endPoint: this.endPoint,
        instructions: this.instrucctions,
        DataFormatType: this.DataFormatType,
      },
    };
  }
}
