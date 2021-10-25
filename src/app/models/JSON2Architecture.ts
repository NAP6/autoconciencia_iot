import { EntityQ } from "./architecture/EntityQ";
import { DataFlowQ } from "./architecture/DataFlowQ";
import { IoTSystemQ } from "./architecture/IoTSystemQ";
import { PropertyQ } from "./architecture/PropertyQ";
import { DataColumnQ } from "./architecture/DataColumnQ";
import { DataColumn } from "./architecture/DataColumn";

export class JSON2Architecture {
  private _json: any;
  private _modelEntity: EntityQ[];
  private _modelDataFlow: DataFlowQ[];
  private _modelIoTSystem: IoTSystemQ;
  private _modelDataColumn: DataColumnQ[];

  constructor(json: any) {
    this._json = json[Object.keys(json)[0]];
    if (this._json == undefined) this._json = {};
    this._modelEntity = [];
    this._modelDataFlow = [];
    this._modelDataColumn = [];
    this._modelIoTSystem = new IoTSystemQ(-1, "");
    this.extractSystems();
    this.extractDataFlows();
    this.extractEntitys();
  }

  get json(): any {
    return this._json;
  }

  set json(json: any) {
    this._json = json;
  }

  get modelEntity(): EntityQ[] {
    return this._modelEntity;
  }

  set modelEntity(modelEntity: EntityQ[]) {
    this._modelEntity = modelEntity;
  }

  get modelDataFlow(): DataFlowQ[] {
    return this._modelDataFlow;
  }

  set modelDataFlow(modelDataFlow: DataFlowQ[]) {
    this._modelDataFlow = modelDataFlow;
  }

  get modelIoTSystem(): IoTSystemQ {
    return this._modelIoTSystem;
  }

  set modelIoTSystem(modelIoTSystem: IoTSystemQ) {
    this._modelIoTSystem = modelIoTSystem;
  }

  get modelDataColumn(): DataColumnQ[] {
    return this._modelDataColumn;
  }

  set modelDataColumn(value: DataColumnQ[]) {
    this._modelDataColumn = value;
  }

  private extractSystems() {
    if (this._json["containsIoTSystem"]) {
      var containsIoTSystem = this._json["containsIoTSystem"][0];
      var system = new IoTSystemQ(
        containsIoTSystem.$.id,
        containsIoTSystem.$.name
      );
      if (containsIoTSystem.containsIoTSubSystem) {
        system.IoTSubSystem = this.extractSystems_recursive(
          containsIoTSystem.containsIoTSubSystem
        );
      }
      this._modelIoTSystem = system;
    }
  }

  private extractSystems_recursive(system: any): IoTSystemQ[] {
    var systeRe: IoTSystemQ[] = [];
    system.forEach((subSystem) => {
      var sub = new IoTSystemQ(subSystem.$.id, subSystem.$.name);
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
        var newFlow = new DataFlowQ(
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
      this._modelEntity = this.extractEntitys_recursive(
        containsEntity,
        "//@containsEntity"
      );
    }
  }

  private extractEntitys_recursive(entitys: any, path: string): EntityQ[] {
    var entitysRe: EntityQ[] = [];
    entitys.forEach((entity) => {
      var id = entity.$.id;
      var name = entity.$.name;
      var entityType = entity.$["xsi:type"].split(":")[1];
      var newEntity = new EntityQ(id, name, entityType);

      if (entity.$.isPartOf) {
        this.matchPairs_SystemEntity(newEntity, entity.$.isPartOf);
      }

      if (entity.containsService) {
        for (var i = 0; i < entity.containsService.length; i++) {
          var service = entity.containsService[i].$;
          var serviceEntity = new EntityQ(
            service.id + 1000,
            service.name,
            "Service"
          );
          serviceEntity.iotSystem = newEntity.iotSystem;
          console.log(
            `la entidad ${serviceEntity.name} tiene ${serviceEntity.iotSystem.length} sistemas`
          );
          newEntity.subEntity.push(serviceEntity);
        }
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
            this.extractSubPhysicalEntitys(
              entity.containsSubPhysicalEntity,
              path +
                "." +
                entitys.indexOf(entity) +
                "/@containsSubPhysicalEntity"
            )
          );
        }
        if (entity.containsComputingNode) {
          newEntity.subEntity = newEntity.subEntity.concat(
            this.extractEntitys_recursive(
              entity.containsComputingNode,
              path + "." + entitys.indexOf(entity) + "/@containsComputingNode"
            )
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
            this.extractEntitys_recursive(
              entity.containsResource,
              path + "." + entitys.indexOf(entity) + "/@containsResource"
            )
          );
        }
      }
      // Fin: Extraer de ComputingNode

      if (entity.containsDataTable) {
        var tables = entity.containsDataTable;
        for (var i = 0; i < tables.length; i++) {
          var dataColums = tables[i].composedOfDataColumn;
          var path_table =
            path + "." + entitys.indexOf(entity) + "/@containsDataTable." + i;
          for (var j = 0; j < dataColums.length; j++) {
            var name = dataColums[j].$.name;
            var colum_path = path_table + "/@composedOfDataColumn." + j;
            var dataType = dataColums[j].$.dataType;
            var dataColumnType = dataColums[j].$.dataColumnType;
            var newDataColumn: DataColumnQ = new DataColumnQ(
              -1,
              name,
              dataColumnType,
              dataType,
              colum_path
            );
            this._modelDataColumn.push(newDataColumn);
          }
        }
      }

      if (entity.hasProperty) {
        newEntity.propertys = this.extractPropertys(entity.hasProperty);
      }
      entitysRe.push(newEntity);
    });
    return entitysRe;
  }

  private extractSubPhysicalEntitys(entitys: any, path: string): EntityQ[] {
    var entitysRe: EntityQ[] = [];
    entitys.forEach((entity) => {
      var id = entity.$.id;
      var name = entity.$.name;
      var entityType = "PhysicalEntity";
      var newEntity = new EntityQ(id, name, entityType);

      if (entity.$.isPartOf) {
        this.matchPairs_SystemEntity(newEntity, entity.$.isPartOf);
      }

      if (entity.containsService) {
        for (var i = 0; i < entity.containsService.length; i++) {
          var service = entity.containsService[i].$;
          var serviceEntity = new EntityQ(service.id, service.name, "Service");
          serviceEntity.iotSystem = newEntity.iotSystem;
          newEntity.subEntity.push(serviceEntity);
        }
      }

      if (entity.containsSubPhysicalEntity) {
        newEntity.subEntity = newEntity.subEntity.concat(
          this.extractSubPhysicalEntitys(
            entity.containsSubPhysicalEntity,
            path + "." + entitys.indexOf(entity) + "/@containsSubPhysicalEntity"
          )
        );
      }
      if (entity.containsComputingNode) {
        newEntity.subEntity = newEntity.subEntity.concat(
          this.extractEntitys_recursive(
            entity.containsComputingNode,
            path + "." + entitys.indexOf(entity) + "/@containsComputingNode"
          )
        );
      }
      if (entity.hasProperty) {
        newEntity.propertys = this.extractPropertys(entity.hasProperty);
      }
      entitysRe.push(newEntity);
    });
    return entitysRe;
  }

  private matchPairs_SystemEntity(entity: EntityQ, isPartOf: string) {
    var listRoutes = isPartOf.split(" ");
    listRoutes.forEach((route) => {
      var system: IoTSystemQ = this._modelIoTSystem;
      var routeAux: string[] = route.substring(1, route.length).split("/@");
      routeAux = routeAux.splice(2, routeAux.length);
      var system2 = new IoTSystemQ(-1, "");
      routeAux.forEach((stop) => {
        var index: number = parseInt(stop.split(".")[1]);
        system2 = system.IoTSubSystem[index];
      });
      entity.iotSystem.push(system2);
      system2.entity.push(entity);
    });
  }

  private extractPropertys(propertys: any): PropertyQ[] {
    var propertysRe: PropertyQ[] = [];
    propertys.forEach((prop) => {
      var newProperty = new PropertyQ(prop.$.id, prop.$.name);
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
    property: PropertyQ,
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
