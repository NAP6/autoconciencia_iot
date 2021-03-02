import { Property } from './Property';

export class DataFlow {
    private _id: number;
    private _description: string;
    private _comunicationType: string;
    private _propertys: Property[];

    constructor(id: number, description: string, comunicationType: string) {
        this._id = id;
        this._description = description;
        this._comunicationType = comunicationType;
        this._propertys = [];
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get comunicationType(): string {
        return this._comunicationType;
    }

    set comunicationType(comunicationType: string) {
        this._comunicationType = comunicationType;
    }

    get propertys(): Property[] {
        return this._propertys;
    }
}
