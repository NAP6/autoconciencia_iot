"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebService = void 0;
const ImplementationResource_1 = require("./ImplementationResource");
class WebService extends ImplementationResource_1.ImplementationResource {
    constructor(id, name, description, returnDataType, endPoint, instrucctions, DataFormatType) {
        super(id, name, description, returnDataType);
        this._endPoint = endPoint;
        this._instrucctions = instrucctions;
        this._DataFormatType = DataFormatType;
    }
    get endPoint() {
        return this._endPoint;
    }
    set endPoint(value) {
        this._endPoint = value;
    }
    get instrucctions() {
        return this._instrucctions;
    }
    set instrucctions(value) {
        this._instrucctions = value;
    }
    get DataFormatType() {
        return this._DataFormatType;
    }
    set DataFormatType(value) {
        this._DataFormatType = value;
    }
}
exports.WebService = WebService;