"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculationMethod = void 0;
const LearningReasoningMethod_1 = require("./LearningReasoningMethod");
class CalculationMethod extends LearningReasoningMethod_1.LearningReasoningMethod {
    constructor(id, implementationResourceType, calculationPeriodStart, calculationPeriodEnd, intervalo, unidad) {
        super(id);
        this._implementationResourceType = implementationResourceType;
        this._calculationPeriodStart = calculationPeriodStart;
        this._calculationPeriodEnd = calculationPeriodEnd;
        this._intervalo = intervalo;
        this._unidad = unidad;
        this._containsSimulationScenario = [];
        this._containsArgumentToParameterMapping = [];
        this._containsSimulationVariable = [];
    }
    get implementationResourceType() {
        return this._implementationResourceType;
    }
    set implementationResourceType(value) {
        this._implementationResourceType = value;
    }
    get calculationPeriodStart() {
        return this._calculationPeriodStart;
    }
    set calculationPeriodStart(value) {
        this._calculationPeriodStart = value;
    }
    get calculationPeriodEnd() {
        return this._calculationPeriodEnd;
    }
    set calculationPeriodEnd(value) {
        this._calculationPeriodEnd = value;
    }
    get intervalo() {
        return this._intervalo;
    }
    set intervalo(value) {
        this._intervalo = value;
    }
    get unidad() {
        return this._unidad;
    }
    set unidad(value) {
        this._unidad = value;
    }
    get containsSimulationScenario() {
        return this._containsSimulationScenario;
    }
    set containsSimulationScenario(value) {
        this._containsSimulationScenario = value;
    }
    get isImplmentedBy() {
        return this._isImplmentedBy;
    }
    set isImplmentedBy(value) {
        this._isImplmentedBy = value;
    }
    get containsArgumentToParameterMapping() {
        return this._containsArgumentToParameterMapping;
    }
    set containsArgumentToParameterMapping(value) {
        this._containsArgumentToParameterMapping = value;
    }
    get containsSimulationVariable() {
        return this._containsSimulationVariable;
    }
    set containsSimulationVariable(value) {
        this._containsSimulationVariable = value;
    }
    get produces() {
        return this._produces;
    }
    set produces(value) {
        this._produces = value;
    }
    toObjectG() {
        return {
            $: {
                id: this.id,
                implementationResourceType: this.implementationResourceType,
                calculationPeriodStart: this.calculationPeriodStart,
                calculationPeriodEnd: this.calculationPeriodEnd,
                unitDataPeriod: this.unidad,
                dataRange: this.intervalo,
            },
        };
    }
}
exports.CalculationMethod = CalculationMethod;
