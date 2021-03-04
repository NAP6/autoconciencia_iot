import { LearningReasoningMethod } from "./LearningReasoningMethod";
import { SimulationScenario } from "./SimulationScenario";

export class CalculationMethod extends LearningReasoningMethod {
  private _implementationResourceType;
  private _calculationPeriodStart: Date;
  private _calculationPeriodEnd: Date;
  private _containsSimulationScenario: SimulationScenario[];

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
}
