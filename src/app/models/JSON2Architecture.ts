import { Entity } from "./architecture/Entity";
import { DataFlow } from "./architecture/DataFlow";
import { IoTSystem } from "./architecture/IoTSystem";
import { Property } from "./architecture/Property";

export class JSON2Architecture {
  private _json: Architecture;
  private _modelEntity: Entity[];
  private _modelDataFlow: DataFlow[];
  private _modelIoTSystem: IoTSystem;

  constructor(json: Architecture) {
    this._json = json[Object.keys(json)[0]];
    if (this._json == undefined) this._json = {}
    this._modelEntity = [];
    this._modelDataFlow = [];
    this._modelIoTSystem = new IoTSystem(-1, "");
    this.extractSystems();
    this.extractDataFlows();
    this.extractEntitys();
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

  get modelIoTSystem(): IoTSystem {
    return this._modelIoTSystem;
  }

  set modelIoTSystem(modelIoTSystem: IoTSystem) {
    this.modelIoTSystem = modelIoTSystem;
  }

  private extractSystems() {
    if (this._json["containsIoTSystem"]) {
      var containsIoTSystem = this._json["containsIoTSystem"][0];
      var system = new IoTSystem(containsIoTSystem.$.id, containsIoTSystem.$.name);
      if (containsIoTSystem.containsIoTSubSystem) {
        system.IoTSubSystem = this.extractSystems_recursive(
          containsIoTSystem.containsIoTSubSystem
        );
      }
      this._modelIoTSystem = system;
    }
  }

  private extractSystems_recursive(system: any): IoTSystem[] {
    var systeRe: IoTSystem[] = [];
    system.forEach((subSystem) => {
      var sub = new IoTSystem(subSystem.$.id, subSystem.$.name);
      if (subSystem.containsIoTSubSystem) {
        sub.IoTSubSystem = this.extractSystems_recursive(
          subSystem.containsIoTSubSystem
        );
      }
      systeRe.push(sub);
    });
    return systeRe;
  }

  private extractDataFlows() {
    if (this._json["containsDataFlow"]) {
      var containsDataFlow = this._json["containsDataFlow"];
      containsDataFlow.forEach((flows) => {
        var newFlow = new DataFlow(
          flows.$.id,
          flows.$.description,
          flows.$.communicationType
        );
        this._modelDataFlow.push(newFlow);
      });
    }
  }

  private extractEntitys() {
    if (this._json["containsEntity"]) {
      var containsEntity = this._json["containsEntity"];
      this._modelEntity = this.extractEntitys_recursive(containsEntity);
    }
  }

  private extractEntitys_recursive(entitys: any): Entity[] {
    var entitysRe: Entity[] = [];
    entitys.forEach((entity) => {
      var id = entity.$.id;
      var name = entity.$.name;
      var entityType = entity.$["xsi:type"].split(":")[1];
      var newEntity = new Entity(id, name, entityType);

      if (entity.$.isPartOf) {
        this.matchPairs_SystemEntity(newEntity, entity.$.isPartOf);
      }

      // Inicio: Extraer de PhysicalEntity
      if (
        newEntity.entityType == "PhysicalEntity" ||
        newEntity.entityType == "IoTUser" ||
        newEntity.entityType == "HumanUser" ||
        newEntity.entityType == "NonHumanUser"
      ) {
        if (entity.containsSubPhysicalEntity) {
          newEntity.subEntity = newEntity.subEntity.concat(
            this.extractSubPhysicalEntitys(entity.containsSubPhysicalEntity)
          );
        }
        if (entity.containsComputingNode) {
          newEntity.subEntity = newEntity.subEntity.concat(
            this.extractEntitys_recursive(entity.containsComputingNode)
          );
        }
      }
      // Fin: Extraer de PhysicalEntity

      // Inicio: Extraer de ComputingNode
      if (
        newEntity.entityType == "ComputingNode" ||
        newEntity.entityType == "CloudNode" ||
        newEntity.entityType == "FogNode" ||
        newEntity.entityType == "EdgeNode" ||
        newEntity.entityType == "IoTDevice" ||
        newEntity.entityType == "IoTGateway" ||
        newEntity.entityType == "Sensor" ||
        newEntity.entityType == "Tag" ||
        newEntity.entityType == "Actuator"
      ) {
        if (entity.containsResource) {
          newEntity.subEntity = newEntity.subEntity.concat(
            this.extractEntitys_recursive(entity.containsResource)
          );
        }
      }
      // Fin: Extraer de ComputingNode

      if (entity.hasProperty) {
        newEntity.propertys = this.extractPropertys(entity.hasProperty);
      }
      entitysRe.push(newEntity);
    });
    return entitysRe;
  }

  private extractSubPhysicalEntitys(entitys: any): Entity[] {
    var entitysRe: Entity[] = [];
    entitys.forEach((entity) => {
      var id = entity.$.id;
      var name = entity.$.name;
      var entityType = "PhysicalEntity";
      var newEntity = new Entity(id, name, entityType);

      if (entity.$.isPartOf) {
        this.matchPairs_SystemEntity(newEntity, entity.$.isPartOf);
      }

      if (entity.containsSubPhysicalEntity) {
        newEntity.subEntity = newEntity.subEntity.concat(
          this.extractSubPhysicalEntitys(entity.containsSubPhysicalEntity)
        );
      }
      if (entity.containsComputingNode) {
        newEntity.subEntity = newEntity.subEntity.concat(
          this.extractEntitys_recursive(entity.containsComputingNode)
        );
      }
      if (entity.hasProperty) {
        newEntity.propertys = this.extractPropertys(entity.hasProperty);
      }
      entitysRe.push(newEntity);
    });
    return entitysRe;
  }

  private matchPairs_SystemEntity(entity: Entity, isPartOf: string) {
    var listRoutes = isPartOf.split(" ");
    listRoutes.forEach((route) => {
      var system: IoTSystem = this._modelIoTSystem;
      var routeAux: string[] = route.substring(1, route.length).split("/@");
      routeAux = routeAux.splice(2, routeAux.length);
      routeAux.forEach((stop) => {
        var index: number = parseInt(stop.split(".")[1]);
        system = system.IoTSubSystem[index];
      });
      entity.iotSystem.push(system);
      system.entity.push(entity);
    });
  }

  private extractPropertys(propertys: any): Property[] {
    var propertysRe: Property[] = [];
    propertys.forEach((prop) => {
      var newProperty = new Property(prop.$.id, prop.$.name);
      if (prop.$.hasRulePropertyToDataColumn) {
        this.matchPairs_PropertyDataFlow(
          newProperty,
          prop.$.hasRulePropertyToDataColumn
        );
      }
      propertysRe.push(newProperty);
    });
    return propertysRe;
  }

  private matchPairs_PropertyDataFlow(
    property: Property,
    RuleProperty: string
  ) {
    var listRoutes = RuleProperty.split(" ");
    listRoutes.forEach((route) => {
      var routeAux: string = route.substring(1, route.length).split("/@")[1];
      var index: number = parseInt(routeAux.split(".")[1]);
      var flow = this._modelDataFlow[index];
      property.dataFlow.push(flow);
      flow.propertys.push(property);
    });
  }
}

interface Architecture { }
