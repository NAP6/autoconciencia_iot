"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaDataToParameterMapping = void 0;
const ArgumentToParameterMapping_1 = require("./ArgumentToParameterMapping");
class MetaDataToParameterMapping extends ArgumentToParameterMapping_1.ArgumentToParameterMapping {
    constructor(id) {
        super(id);
    }
    get dataColumn() {
        return this._dataColumn;
    }
    set dataColumn(value) {
        this._dataColumn = value;
    }
}
exports.MetaDataToParameterMapping = MetaDataToParameterMapping;
