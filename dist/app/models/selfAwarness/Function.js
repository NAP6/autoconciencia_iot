"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = void 0;
const ImplementationResource_1 = require("./ImplementationResource");
class Function extends ImplementationResource_1.ImplementationResource {
    constructor(id, name, description, returnDataType, path, instrucctions) {
        super(id, name, description, returnDataType);
        this._path = path;
        this._instrucctions = instrucctions;
    }
    get path() {
        return this._path;
    }
    set path(value) {
        this._path = value;
    }
    get instrucctions() {
        return this._instrucctions;
    }
    set instrucctions(value) {
        this._instrucctions = value;
    }
}
exports.Function = Function;
