export class Object {
  private _id: number;
  private _name: string;
  private _type: string;
  private _active: boolean;
  private _subObject: Object[];

  constructor(id: number, name: string, Otype: string) {
    this._id = id;
    this._name = name;
    this._type = Otype;
    this._active = true;
    this._subObject = [];
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

  get Otype(): string {
    return this._type;
  }

  set Otype(value: string) {
    this._type = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get subObject(): Object[] {
    return this._subObject;
  }

  set subObject(value: Object[]) {
    this._subObject = value;
  }
}
