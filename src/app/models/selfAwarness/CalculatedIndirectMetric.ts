export class CalculatedIndirectMetric {
  private _value: string;
  private _timeStamp: Date;

  constructor(value: string, timeStamp: Date) {
    this._value = value;
    this._timeStamp = timeStamp;
  }

  get value(): string {
    return this._value;
  }

  set valeu(value: string) {
    this._value = value;
  }

  get timeStamp(): Date {
    return this._timeStamp;
  }

  set timeStamp(value: Date) {
    this._timeStamp = value;
  }
}
