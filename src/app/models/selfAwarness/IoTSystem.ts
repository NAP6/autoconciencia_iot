import { Span } from "./Span";

export class IoTSystem extends Span {
  private _id: number;
  private _name: string;
  private _active: boolean;
  private _containsSubIoTSystem: IoTSystem[];

  constructor(id: number, name: string) {
    super();
    this._id = id;
    this._name = name;
    this._active = true;
    this._containsSubIoTSystem = [];
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

  get containsSubIoTSystem(): IoTSystem[] {
    return this._containsSubIoTSystem;
  }

  set containsSubIoTSystem(value: IoTSystem[]) {
    this._containsSubIoTSystem = value;
  }
}
