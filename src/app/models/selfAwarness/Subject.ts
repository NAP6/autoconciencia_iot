export class Subject {
  private _id: number;
  private _name: string;
  private _active: boolean;
  private _subSubjects: Subject[];

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
    this._active = true;
    this._subSubjects = [];
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

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get subSubjects(): Subject[] {
    return this._subSubjects;
  }

  set subSubjects(value: Subject[]) {
    this._subSubjects = value;
  }
}
