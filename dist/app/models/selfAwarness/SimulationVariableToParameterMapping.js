"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationVariableToParameterMapping = void 0;
const ArgumentToParameterMapping_1 = require("./ArgumentToParameterMapping");
class SimulationVariableToParameterMapping extends ArgumentToParameterMapping_1.ArgumentToParameterMapping {
    constructor(id) {
        super(id);
    }
    get relatesSimulationVariable() {
        return this._relatesSimulationVariable;
    }
    set relatesSimulationVariable(value) {
        this._relatesSimulationVariable = value;
    }
}
exports.SimulationVariableToParameterMapping = SimulationVariableToParameterMapping;
