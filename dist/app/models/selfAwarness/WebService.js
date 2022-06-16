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
        this._preexisting = false;
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
    get preexisting() {
        return this._preexisting;
    }
    set preexisting(value) {
        this._preexisting = value;
    }
    toObjectG() {
        return {
            $: {
                id: this.id,
                name: this.name,
                description: this.description,
                returnDataType: this.returnDataType,
                endPoint: this.endPoint,
                instructions: this.instrucctions,
                DataFormatType: this.DataFormatType,
            },
        };
    }
}
exports.WebService = WebService;
