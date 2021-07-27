"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImplementationResource = void 0;
class ImplementationResource {
    constructor(id, name, description, returnDataType) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._returnDataType = returnDataType;
        this._implementsAnalysisModel = [];
        this._implementsCalculationMethod = [];
        this._containsParameter = [];
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get returnDataType() {
        return this._returnDataType;
    }
    set returnDataType(value) {
        this._returnDataType = value;
    }
    get implementsAnalysisModel() {
        return this._implementsAnalysisModel;
    }
    set implementsAnalysisModel(value) {
        this._implementsAnalysisModel = value;
    }
    get implementsCalculationMethod() {
        return this._implementsCalculationMethod;
    }
    set implementsCalculationMethod(value) {
        this._implementsCalculationMethod = value;
    }
    get containsParameter() {
        return this._containsParameter;
    }
    set containsParameter(value) {
        this._containsParameter = value;
    }
    toObjectG() {
        return {
            $: {
                id: this.id,
                name: this.name,
                description: this.description,
                returnDataType: this.returnDataType,
            },
        };
    }
}
exports.ImplementationResource = ImplementationResource;
