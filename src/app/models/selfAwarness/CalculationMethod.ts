import { LearningReasoningMethod } from "./LearningReasoningMethod";
import { SimulationScenario } from "./SimulationScenario";
import { ImplementationResource } from "./ImplementationResource";
import { ArgumentToParameterMapping } from "./ArgumentToParameterMapping";

export class CalculationMethod extends LearningReasoningMethod {
  private _implementationResourceType;
  private _calculationPeriodStart: Date;
  private _calculationPeriodEnd: Date;
  private _containsSimulationScenario: SimulationScenario[];
  private _isImplmentedBy: ImplementationResource|undefined;
  private _containsArgumentToParameterMapping: ArgumentToParameterMapping[];

  constructor(
    id: number,
    implementationResourceType,
    calculationPeriodStart: Date,
    calculationPeriodEnd: Date
  ) {
    super(id);
    this._implementationResourceType = implementationResourceType;
    this._calculationPeriodStart = calculationPeriodStart;
    this._calculationPeriodEnd = calculationPeriodEnd;
    this._containsSimulationScenario = [];
    this._containsArgumentToParameterMapping = [];
  }

  get implementationResourceType() {
    return this._implementationResourceType;
  }

  set implementationResourceType(value) {
    this._implementationResourceType = value;
  }

  get calculationPeriodStart(): Date {
    return this._calculationPeriodStart;
  }

  set calculationPeriodStart(value: Date) {
    this._calculationPeriodStart = value;
  }

  get calculationPeriodEnd(): Date {
    return this._calculationPeriodEnd;
  }

  set calculationPeriodEnd(value: Date) {
    this._calculationPeriodEnd = value;
  }

  get containsSimulationScenario(): SimulationScenario[] {
    return this._containsSimulationScenario;
  }

  set containsSimulationScenario(value: SimulationScenario[]) {
    this._containsSimulationScenario = value;
  }
  get isImplmentedBy(): ImplementationResource| undefined {
    return this._isImplmentedBy;
  }

  set isImplmentedBy(value: ImplementationResource| undefined) {
    this._isImplmentedBy = value;
  }
  get containsArgumentToParameterMapping(): ArgumentToParameterMapping[] {
    return this._containsArgumentToParameterMapping;
  }

  set containsArgumentToParameterMapping(value: ArgumentToParameterMapping[]) {
    this._containsArgumentToParameterMapping = value;
  }
}
