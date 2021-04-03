import { ImplementationResource } from "./ImplementationResource";

export class Function extends ImplementationResource {
  private _path: string;
  private _instrucctions: string;
  private _preexisting: boolean;
  constructor(
    id: number,
    name: string,
    description: string,
    returnDataType,
    path: string,
    instrucctions: string
  ) {
    super(id, name, description, returnDataType);
    this._path = path;
    this._instrucctions = instrucctions;
    this._preexisting = false;
  }

  get path(): string {
    return this._path;
  }

  set path(value: string) {
    this._path = value;
  }

  get instrucctions(): string {
    return this._instrucctions;
  }

  set instrucctions(value: string) {
    this._instrucctions = value;
  }
  get preexisting(): boolean {
    return this._preexisting;
  }

  set preexisting(value: boolean) {
    this._preexisting = value;
  }
}
