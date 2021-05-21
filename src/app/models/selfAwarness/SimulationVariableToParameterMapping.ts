import { ArgumentToParameterMapping } from "./ArgumentToParameterMapping";
import { SimulationVariable } from "./SimulationVariable";

export class SimulationVariableToParameterMapping extends ArgumentToParameterMapping {
   private _relatesSimulationVariable:SimulationVariable|undefined;
  constructor( id: number) {
        super(id);
      }
      get relatesSimulationVariable(): SimulationVariable|undefined {
        return this._relatesSimulationVariable;
      }
    
      set relatesSimulationVariable(value: SimulationVariable|undefined) {
        this._relatesSimulationVariable = value;
      }
}
