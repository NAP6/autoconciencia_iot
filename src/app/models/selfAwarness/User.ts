export class User {
  private _id: number;
  private _name: string;
  private _mail: string;
  private _password: string;

  constructor(
    id: number,
    name: string,
    mail: string,
    password: string
  ) {
    this._id = id;
    this._name = name;
    this._mail = mail;
    this._password = password;
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
  get mail(): string {
    return this._mail;
  }

  set mail(value: string) {
    this._mail = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
