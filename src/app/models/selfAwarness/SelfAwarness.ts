import { SQL_Qwerty } from "../SQL_Qwerty";

export class SelfAwarness implements SQL_Qwerty {
  private _id: number;
  private _name: string;
  private _description: string;
  private _author: string;
  private _active: boolean;
  private _architectureModel: string;

  constructor(id: number, name: string, description: string, author: string, architectureModel: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._author = author;
    this._active = true;
    this._architectureModel = architectureModel
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

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get author(): string {
    return this._author;
  }

  set author(value: string) {
    this._author = value;
  }

  get architectureModel(): string {
    return this._architectureModel;
  }

  set architectureModel(value: string) {
    this._architectureModel = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  toSql(): string {
    return `INSERT INTO modeloautoconsciencia (ma_nombre, ma_descripcion, ma_autor, ma_modelo_arquitectura , usr_id) VALUES ('${this._name}','${this._description}','${this._author}','${this._architectureModel}', /@/USER/@/)`;
  }
}
