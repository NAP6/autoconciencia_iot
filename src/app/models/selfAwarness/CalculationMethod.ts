import { LearningReasoningMethod } from "./LearningReasoningMethod";
import { SimulationScenario } from "./SimulationScenario";
import { ImplementationResource } from "./ImplementationResource";
import { ArgumentToParameterMapping } from "./ArgumentToParameterMapping";
import { SimulationVariable } from "./SimulationVariable";
import { IndirectMetric } from "./IndirectMetric";

export class CalculationMethod extends LearningReasoningMethod {
  private _implementationResourceType;
  private _calculationPeriodStart: Date | undefined;
  private _calculationPeriodEnd: Date | undefined;
  private _containsSimulationScenario: SimulationScenario[];
  private _isImplmentedBy: ImplementationResource | undefined;
  private _containsArgumentToParameterMapping: ArgumentToParameterMapping[];
  private _containsSimulationVariable: SimulationVariable[];
  private _produces: IndirectMetric | undefined;

  constructor(
    id: number,
    implementationResourceType,
    calculationPeriodStart?: Date,
    calculationPeriodEnd?: Date
  ) {
    super(id);
    this._implementationResourceType = implementationResourceType;
    this._calculationPeriodStart = calculationPeriodStart;
    this._calculationPeriodEnd = calculationPeriodEnd;
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

  get calculationPeriodStart(): Date | undefined {
    return this._calculationPeriodStart;
  }

  set calculationPeriodStart(value: Date | undefined) {
    this._calculationPeriodStart = value;
  }

  get calculationPeriodEnd(): Date | undefined {
    return this._calculationPeriodEnd;
  }

  set calculationPeriodEnd(value: Date | undefined) {
    this._calculationPeriodEnd = value;
  }

  get containsSimulationScenario(): SimulationScenario[] {
    return this._containsSimulationScenario;
  }

  set containsSimulationScenario(value: SimulationScenario[]) {
    this._containsSimulationScenario = value;
  }

  get isImplmentedBy(): ImplementationResource | undefined {
    return this._isImplmentedBy;
  }

  set isImplmentedBy(value: ImplementationResource | undefined) {
    this._isImplmentedBy = value;
  }

  get containsArgumentToParameterMapping(): ArgumentToParameterMapping[] {
    return this._containsArgumentToParameterMapping;
  }

  set containsArgumentToParameterMapping(value: ArgumentToParameterMapping[]) {
    this._containsArgumentToParameterMapping = value;
  }
  get containsSimulationVariable(): SimulationVariable[] {
    return this._containsSimulationVariable;
  }

  set containsSimulationVariable(value: SimulationVariable[]) {
    this._containsSimulationVariable = value;
  }

  get produces(): IndirectMetric | undefined {
    return this._produces;
  }

  set produces(value: IndirectMetric | undefined) {
    this._produces = value;
  }
  public toObjectG(): any {
    return {
      $: {
        id: this.id,
        implementationResourceType: this.implementationResourceType,
        calculationPeriodStart: this.calculationPeriodStart,
        calculationPeriodEnd: this.calculationPeriodEnd,
      },
    };
  }
}
