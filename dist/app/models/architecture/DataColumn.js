"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataColumn = void 0;
class DataColumn {
    constructor(id, name, dataColumnType, dataType, dataColumnPath) {
        this._id = id;
        this._name = name;
        this._dataColumnType = dataColumnType;
        this._dataColumnPath = dataColumnPath;
        this._dataType = dataType;
        this._PropertyToDataColumn = [];
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get dataColumnType() {
        return this._dataColumnType;
    }
    set dataColumnType(dataType) {
        this._dataColumnType = this.dataColumnType;
    }
    get dataType() {
        return this._dataType;
    }
    set dataType(dataType) {
        this._dataType = dataType;
    }
    get propertyToDataColumn() {
        return this._PropertyToDataColumn;
    }
    set propertyToDataColumn(dataColumnPath) {
        this._PropertyToDataColumn = dataColumnPath;
    }
    get dataColumnPath() {
        return this._dataColumnPath;
    }
    set dataColumnPath(dataColumnPath) {
        this._dataColumnPath = dataColumnPath;
    }
}
exports.DataColumn = DataColumn;
