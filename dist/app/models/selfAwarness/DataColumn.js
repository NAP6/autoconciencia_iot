"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataColumn = void 0;
class DataColumn {
    constructor(name, DataColumn, DataType) {
        this._name = name;
        this._DataColumn = DataColumn,
            this._DataType = DataType;
        this._isUsedIn = [];
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get DataColumn() {
        return this._DataColumn;
    }
    set DataColumn(value) {
        this._DataColumn = value;
    }
    get DataType() {
        return this._DataType;
    }
    set DataType(value) {
        this._DataType = value;
    }
    get isUsedIn() {
        return this._isUsedIn;
    }
    set isUsedIn(value) {
        this._isUsedIn = value;
    }
}
exports.DataColumn = DataColumn;
