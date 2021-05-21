export class CalculatedIndicator {
  private _value: number;
  private _timeStamp: Date;

  constructor(value: number, timeStamp: Date) {
    this._value = value;
    this._timeStamp = timeStamp;
  }

  get value(): number {
    return this._value;
  }

  set valeu(value: number) {
    this._value = value;
  }

  get timeStamp(): Date {
    return this._timeStamp;
  }

  set timeStamp(value: Date) {
    this._timeStamp = value;
  }
}
