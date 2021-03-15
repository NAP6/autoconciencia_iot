import { SimulationVariableToParameterMapping } from "./SimulationVariableToParameterMapping";
import { SimulationValue } from "./SimulationValue";
export class SimulationVariable{
    private _id: number;
    private _name: string;
    private _isUsedIn:SimulationVariableToParameterMapping[];
    private _containsSimulationValue:SimulationValue[];
    
    constructor(
      id: number,
      name:string,
   
    ) {
      this._id = id; 
      this._name=name;
      this._isUsedIn=[];
      this._containsSimulationValue=[];
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(value: number) {
      this._id = value;
    }
    get name(): string {
        return this._name;
      }
    
      set name(value: string) {
        this._name = value;
      }
      get isUsedIn(): SimulationVariableToParameterMapping[] {
        return this._isUsedIn;
      }
    
      set isUsedIn(value: SimulationVariableToParameterMapping[]) {
        this._isUsedIn = value;
      }
      get containsSimulationValue(): SimulationValue[] {
        return this._containsSimulationValue;
      }
    
      set containsSimulationValue(value: SimulationValue[]) {
        this._containsSimulationValue = value;
      }

}