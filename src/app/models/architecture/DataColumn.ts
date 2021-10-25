export class DataColumn {
  private _id: number;
  private _name: string;
  private _dataColumnType: string | undefined;
  private _dataColumnPath: string | undefined;
  private _dataType: string | undefined;

  constructor(
    id: number,
    name: string,
    dataColumnType: string,
    dataType: string,
    dataColumnPath: string
  ) {
    this._id = id;
    this._name = name;
    this._dataColumnType = dataColumnType;
    this._dataColumnPath = dataColumnPath;
    this._dataType = dataType;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get dataColumnType(): string | undefined {
    return this._dataColumnType;
  }

  set dataColumnType(dataType: string | undefined) {
    this._dataColumnType = this.dataColumnType;
  }

  get dataType(): string | undefined {
    return this._dataType;
  }

  set dataType(dataType: string | undefined) {
    this._dataType = dataType;
  }
  get dataColumnPath(): string | undefined {
    return this._dataColumnPath;
  }

  set dataColumnPath(dataColumnPath: string | undefined) {
    this._dataColumnPath = dataColumnPath;
  }
}
