import { Entity } from "./architecture/Entity";
import { DataFlow } from "./architecture/DataFlow";
import { IoTSystem } from "./architecture/IoTSystem";
//import { Property } from "./architecture/Property";

export class JSON2Architecture {
  private _json: Architecture;
  private _modelEntity: Entity[];
  private _modelDataFlow: DataFlow[];
  private _modelIoTSystem: IoTSystem[];

  constructor(json: Architecture) {
    this._json = json;
    this._modelEntity = [];
    this._modelDataFlow = [];
    this._modelIoTSystem = [];
  }

  get json(): Architecture {
    return this._json;
  }

  set json(json: Architecture) {
    this._json = json;
  }

  get modelEntity(): Entity[] {
    return this._modelEntity;
  }

  set modelEntity(modelEntity: Entity[]) {
    this._modelEntity = modelEntity;
  }

  get modelDataFlow(): DataFlow[] {
    return this._modelDataFlow;
  }

  set modelDataFlow(modelDataFlow: DataFlow[]) {
    this._modelDataFlow = modelDataFlow;
  }

  get modelIoTSystem(): IoTSystem[] {
    return this._modelIoTSystem;
  }

  set modelIoTSystem(modelIoTSystem: IoTSystem[]) {
    this.modelIoTSystem = modelIoTSystem;
  }

  private extractSystems(){}
  private extractEntitys(){}
  private extractDataFlows(){}
  private extractPropertys(){}
}

interface Architecture {}
