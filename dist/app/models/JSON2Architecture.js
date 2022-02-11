"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSON2Architecture = void 0;
const EntityQ_1 = require("./architecture/EntityQ");
const DataFlowQ_1 = require("./architecture/DataFlowQ");
const IoTSystemQ_1 = require("./architecture/IoTSystemQ");
const PropertyQ_1 = require("./architecture/PropertyQ");
const DataColumnQ_1 = require("./architecture/DataColumnQ");
class JSON2Architecture {
    constructor(json) {
        this._json = json[Object.keys(json)[0]];
        if (this._json == undefined)
            this._json = {};
        this._modelEntity = [];
        this._modelDataFlow = [];
        this._modelDataColumn = [];
        this.relation_column_flow_property = [];
        this._modelIoTSystem = new IoTSystemQ_1.IoTSystemQ(-1, "");
        this.extractSystems();
        this.extractDataFlows();
        this.extractEntitys();
        this.relation_column_flow_property.forEach((rel) => {
            var column = this._modelDataColumn.filter((x) => {
                return x.dataColumnPath == rel[0];
            });
            if (column[0])
                column[0].propertyToDataColumn.push(rel[1]);
        });
    }
    get json() {
        return this._json;
    }
    set json(json) {
        this._json = json;
    }
    get modelEntity() {
        return this._modelEntity;
    }
    set modelEntity(modelEntity) {
        this._modelEntity = modelEntity;
    }
    get modelDataFlow() {
        return this._modelDataFlow;
    }
    set modelDataFlow(modelDataFlow) {
        this._modelDataFlow = modelDataFlow;
    }
    get modelIoTSystem() {
        return this._modelIoTSystem;
    }
    set modelIoTSystem(modelIoTSystem) {
        this._modelIoTSystem = modelIoTSystem;
    }
    get modelDataColumn() {
        return this._modelDataColumn;
    }
    set modelDataColumn(value) {
        this._modelDataColumn = value;
    }
    extractSystems() {
        if (this._json["containsIoTSystem"]) {
            var containsIoTSystem = this._json["containsIoTSystem"][0];
            var system = new IoTSystemQ_1.IoTSystemQ(containsIoTSystem.$.id, containsIoTSystem.$.name);
            if (containsIoTSystem.containsIoTSubSystem) {
                system.IoTSubSystem = this.extractSystems_recursive(containsIoTSystem.containsIoTSubSystem);
            }
            this._modelIoTSystem = system;
        }
    }
    extractSystems_recursive(system) {
        var systeRe = [];
        system.forEach((subSystem) => {
            var sub = new IoTSystemQ_1.IoTSystemQ(subSystem.$.id, subSystem.$.name);
            if (subSystem.containsIoTSubSystem) {
                sub.IoTSubSystem = this.extractSystems_recursive(subSystem.containsIoTSubSystem);
            }
            systeRe.push(sub);
        });
        return systeRe;
    }
    extractDataFlows() {
        if (this._json["containsDataFlow"]) {
            var containsDataFlow = this._json["containsDataFlow"];
            containsDataFlow.forEach((flows) => {
                var newFlow = new DataFlowQ_1.DataFlowQ(flows.$.id, flows.$.description, flows.$.communicationType);
                if (flows.containsDataMappingRule)
                    newFlow.propertyToDataColumn = flows.containsDataMappingRule;
                this._modelDataFlow.push(newFlow);
            });
        }
    }
    extractEntitys() {
        if (this._json["containsEntity"]) {
            var containsEntity = this._json["containsEntity"];
            this._modelEntity = this.extractEntitys_recursive(containsEntity, "//@containsEntity");
        }
    }
    extractEntitys_recursive(entitys, path) {
        var entitysRe = [];
        entitys.forEach((entity) => {
            var id = entity.$.id;
            var name = entity.$.name;
            var entityType = entity.$["xsi:type"].split(":")[1];
            var newEntity = new EntityQ_1.EntityQ(id, name, entityType);
            if (entity.$.isPartOf) {
                this.matchPairs_SystemEntity(newEntity, entity.$.isPartOf);
            }
            if (entity.containsService) {
                for (var i = 0; i < entity.containsService.length; i++) {
                    var service = entity.containsService[i].$;
                    var serviceEntity = new EntityQ_1.EntityQ(service.id + 1000, service.name, "Service");
                    serviceEntity.iotSystem = newEntity.iotSystem;
                    newEntity.subEntity.push(serviceEntity);
                }
            }
            // Inicio: Extraer de PhysicalEntity
            if (newEntity.entityType == "PhysicalEntity" ||
                newEntity.entityType == "IoTUser" ||
                newEntity.entityType == "HumanUser" ||
                newEntity.entityType == "NonHumanUser") {
                if (entity.containsSubPhysicalEntity) {
                    newEntity.subEntity = newEntity.subEntity.concat(this.extractSubPhysicalEntitys(entity.containsSubPhysicalEntity, path +
                        "." +
                        entitys.indexOf(entity) +
                        "/@containsSubPhysicalEntity"));
                }
                if (entity.containsComputingNode) {
                    newEntity.subEntity = newEntity.subEntity.concat(this.extractEntitys_recursive(entity.containsComputingNode, path + "." + entitys.indexOf(entity) + "/@containsComputingNode"));
                }
            }
            // Fin: Extraer de PhysicalEntity
            // Inicio: Extraer de ComputingNode
            if (newEntity.entityType == "ComputingNode" ||
                newEntity.entityType == "CloudNode" ||
                newEntity.entityType == "FogNode" ||
                newEntity.entityType == "EdgeNode" ||
                newEntity.entityType == "IoTDevice" ||
                newEntity.entityType == "IoTGateway" ||
                newEntity.entityType == "Sensor" ||
                newEntity.entityType == "Tag" ||
                newEntity.entityType == "Actuator") {
                if (entity.containsResource) {
                    newEntity.subEntity = newEntity.subEntity.concat(this.extractEntitys_recursive(entity.containsResource, path + "." + entitys.indexOf(entity) + "/@containsResource"));
                }
            }
            // Fin: Extraer de ComputingNode
            if (entity.containsDataTable) {
                var tables = entity.containsDataTable;
                for (var i = 0; i < tables.length; i++) {
                    var dataColums = tables[i].composedOfDataColumn;
                    var path_table = path + "." + entitys.indexOf(entity) + "/@containsDataTable." + i;
                    for (var j = 0; j < dataColums.length; j++) {
                        var name = dataColums[j].$.name;
                        var colum_path = path_table + "/@composedOfDataColumn." + j;
                        var dataType = dataColums[j].$.dataType;
                        var dataColumnType = dataColums[j].$.dataColumnType;
                        var newDataColumn = new DataColumnQ_1.DataColumnQ(-1, name, dataColumnType, dataType, colum_path);
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
    extractSubPhysicalEntitys(entitys, path) {
        var entitysRe = [];
        entitys.forEach((entity) => {
            var id = entity.$.id;
            var name = entity.$.name;
            var entityType = "PhysicalEntity";
            var newEntity = new EntityQ_1.EntityQ(id, name, entityType);
            if (entity.$.isPartOf) {
                this.matchPairs_SystemEntity(newEntity, entity.$.isPartOf);
            }
            if (entity.containsService) {
                for (var i = 0; i < entity.containsService.length; i++) {
                    var service = entity.containsService[i].$;
                    var serviceEntity = new EntityQ_1.EntityQ(service.id, service.name, "Service");
                    serviceEntity.iotSystem = newEntity.iotSystem;
                    newEntity.subEntity.push(serviceEntity);
                }
            }
            if (entity.containsSubPhysicalEntity) {
                newEntity.subEntity = newEntity.subEntity.concat(this.extractSubPhysicalEntitys(entity.containsSubPhysicalEntity, path + "." + entitys.indexOf(entity) + "/@containsSubPhysicalEntity"));
            }
            if (entity.containsComputingNode) {
                newEntity.subEntity = newEntity.subEntity.concat(this.extractEntitys_recursive(entity.containsComputingNode, path + "." + entitys.indexOf(entity) + "/@containsComputingNode"));
            }
            if (entity.containsDataTable) {
                var tables = entity.containsDataTable;
                for (var i = 0; i < tables.length; i++) {
                    var dataColums = tables[i].composedOfDataColumn;
                    var path_table = path + "." + entitys.indexOf(entity) + "/@containsDataTable." + i;
                    for (var j = 0; j < dataColums.length; j++) {
                        var name = dataColums[j].$.name;
                        var colum_path = path_table + "/@composedOfDataColumn." + j;
                        var dataType = dataColums[j].$.dataType;
                        var dataColumnType = dataColums[j].$.dataColumnType;
                        var newDataColumn = new DataColumnQ_1.DataColumnQ(-1, name, dataColumnType, dataType, colum_path);
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
    matchPairs_SystemEntity(entity, isPartOf) {
        var listRoutes = isPartOf.split(" ");
        listRoutes.forEach((route) => {
            var system = this._modelIoTSystem;
            var routeAux = route.substring(1, route.length).split("/@");
            routeAux = routeAux.splice(2, routeAux.length);
            var system2 = new IoTSystemQ_1.IoTSystemQ(-1, "");
            routeAux.forEach((stop) => {
                var index = parseInt(stop.split(".")[1]);
                system2 = system.IoTSubSystem[index];
            });
            if (routeAux.length > 0) {
                entity.iotSystem.push(system2);
                system2.entity.push(entity);
            }
            else {
                entity.iotSystem.push(system);
                system.entity.push(entity);
            }
        });
    }
    extractPropertys(propertys) {
        var propertysRe = [];
        propertys.forEach((prop) => {
            var newProperty = new PropertyQ_1.PropertyQ(prop.$.id, prop.$.name);
            if (prop.$.hasRulePropertyToDataColumn) {
                this.matchPairs_PropertyDataFlow(newProperty, prop.$.hasRulePropertyToDataColumn);
            }
            propertysRe.push(newProperty);
        });
        return propertysRe;
    }
    matchPairs_PropertyDataFlow(property, RuleProperty) {
        var listRoutes = RuleProperty.split(" ");
        listRoutes.forEach((route) => {
            var routeAux = route.substring(1, route.length).split("/@");
            var index_flow = parseInt(routeAux[1].split(".")[1]);
            var index_colum_route = parseInt(routeAux[2].split(".")[1]);
            var flow = this._modelDataFlow[index_flow];
            property.dataFlow.push(flow);
            flow.propertys.push(property);
            var flow_and_property_ids = [flow.id, property.id];
            this.relation_column_flow_property.push([
                flow.propertyToDataColumn[index_colum_route].$.relatesColumn,
                flow_and_property_ids,
            ]);
        });
    }
}
exports.JSON2Architecture = JSON2Architecture;
