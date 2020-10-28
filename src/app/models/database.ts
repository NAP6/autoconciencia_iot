import * as mysql from "mysql";
import constants from "../../config/constants";

export class mysql_connector {
  private connector;

  constructor() {
    this.connector = mysql.createConnection({
      host: constants["db-url"],
      port: constants["db-port"],
      user: constants["db-user"],
      password: constants["db-password"],
      database: constants["db-schema"],
    });
  }

  public save_fisicalModel(model: object): void {
    //implementacion para guardar el modelo en la base de datos
  }
  public getfisicalModel(modelID: string): object {
    return this.modelo;
  }
  public validateUser(userName: string, passwoedUser: string): boolean {
    if (userName == "nicolas@ejemplo.com" && passwoedUser == "1234")
      return true;
    return false;
  }

  public getUserModels(userID: string): object {
    return {
      "modelo 1": { id: "modelo 1", nombre: "Nombre modelo 1" },
      "modelo 2": { id: "modelo 2", nombre: "Nombre modelo 2" },
    };
  }

  public getUser_measurementUnit(userID: string): object {
    return [
      {
        id: "1",
        nombre: "Centimeros",
        descripcion: "Unidad de medida que representa 1/100 metros",
        acronimo: "cm",
      },
      {
        id: "2",
        nombre: "Milimetros",
        descripcion: "Unidad de medida que representa 1/1000 metros",
        acronimo: "mm",
      },
    ];
  }

  private modelo = {
    "MonitorIoT:DataMonitoringArchitectureModel": {
      $: {
        "xmi:version": "2.0",
        "xmlns:xmi": "http://www.omg.org/XMI",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:MonitorIoT": "http://www.uazuay.edu.ec/MonitorIoT",
        "xsi:schemaLocation":
          "http://www.uazuay.edu.ec/MonitorIoT tesismetamodelo.ecore",
        name: "EmergencySystemArchModel",
        description:
          "Data monitoring architecture for an emergency management system",
      },
      containsEntity: [
        {
          $: {
            "xsi:type": "MonitorIoT:CloudNode",
            isPartOf:
              "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
            id: "GoogleCloudPlatform",
            name: "GoogleCloudPlatform",
            Platform: "GoogleCloudPlatform",
          },
          containsResource: [
            {
              $: {
                "xsi:type": "MonitorIoT:DataStore",
                isPartOf:
                  "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
                id: "GlobalPostgreSQLServer",
                name: "GlobalPostgreSQLServer",
                usesProtocol: "//@containsProtocol.2",
              },
              containsDataTable: [
                {
                  $: {
                    name: "HeartRateSummary",
                    persistenceType: "Permanent",
                    hasLinkServiceToDatable: "//@containsLink.15",
                  },
                  composedOfDataColumn: [
                    {
                      $: {
                        name: "DialyHeartRate",
                        hasRuleAsDestination:
                          "//@containsDataFlow.4/@containsDataMappingRule.0",
                      },
                    },
                    {
                      $: {
                        name: "UserId",
                        DataColumnType: "MetaData",
                        dataType: "String",
                      },
                    },
                    {
                      $: {
                        name: "Date",
                        DataColumnType: "MetaData",
                        dataType: "Date",
                        sourceType: "Formula",
                        formulaExpression: "sysdate",
                      },
                    },
                  ],
                },
              ],
            },
            {
              $: {
                "xsi:type": "MonitorIoT:Middleware",
                isPartOf:
                  "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
                id: "GlobalExpressServer",
                name: "GlobalExpressServer",
                usesProtocol: "//@containsProtocol.0",
              },
              containsService: [
                {
                  $: {
                    isPartOf: "//@represents.0/@iotSubsystem.1",
                    id: "AnalyticalHeartRate",
                    name: "AnalyticalHeartRate",
                  },
                },
              ],
            },
            {
              $: {
                "xsi:type": "MonitorIoT:NetworkInterface",
                isPartOf:
                  "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
                id: "OpticalFiberConnection",
                name: "OpticalFiberConnection",
                connects: "//@containsEntity.2 //@containsEntity.4",
                communicationTechnology: "OpticalFiber",
              },
            },
          ],
        },
        {
          $: {
            "xsi:type": "MonitorIoT:PhysicalEntity",
            isPartOf:
              "//@represents.0/@iotSubsystem.1 //@represents.0/@iotSubsystem.0",
            id: "House",
            name: "House",
          },
          containsComputingNode: [
            {
              $: {
                "xsi:type": "MonitorIoT:FogNode",
                isPartOf:
                  "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
                id: "LocalAdministrationServer",
                name: "LocalAdministrationServer",
                descrption: "Servidor Local",
                deploymentModel: "Private",
              },
              containsResource: [
                {
                  $: {
                    "xsi:type": "MonitorIoT:DataStore",
                    isPartOf:
                      "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
                    id: "LocalPostgreSQLServer",
                    name: "LocalPostgreSQLServer",
                    usesProtocol: "//@containsProtocol.2",
                  },
                  containsDataTable: [
                    {
                      $: {
                        name: "EnvironmentTemperature&Humidity",
                        persistenceType: "Permanent",
                        hasLinkServiceToDatable: "//@containsLink.3",
                      },
                      composedOfDataColumn: [
                        {
                          $: {
                            name: "Temperature",
                            hasRulePropertyToDataColumn:
                              "//@containsDataFlow.0/@containsDataMappingRule.0 //@containsDataFlow.1/@containsDataMappingRule.0",
                            dataType: "Float",
                          },
                        },
                        {
                          $: {
                            name: "Humidity",
                            hasRulePropertyToDataColumn:
                              "//@containsDataFlow.0/@containsDataMappingRule.1 //@containsDataFlow.1/@containsDataMappingRule.1",
                            dataType: "Float",
                          },
                        },
                        {
                          $: {
                            name: "SensorId",
                            hasRulePropertyToDataColumn:
                              "//@containsDataFlow.0/@containsDataMappingRule.2",
                            DataColumnType: "MetaData",
                            dataType: "String",
                          },
                        },
                        {
                          $: {
                            name: "TimeStamp",
                            DataColumnType: "MetaData",
                            dataType: "Date",
                            sourceType: "Formula",
                            formulaExpression: "sysdate",
                          },
                        },
                      ],
                    },
                    {
                      $: {
                        name: "EnvironmentCo&Smoke",
                        persistenceType: "Permanent",
                        hasLinkServiceToDatable: "//@containsLink.8",
                      },
                      composedOfDataColumn: [
                        {
                          $: {
                            name: "Co",
                            hasRulePropertyToDataColumn:
                              "//@containsDataFlow.2/@containsDataMappingRule.0",
                            dataType: "Float",
                          },
                        },
                        {
                          $: {
                            name: "Smoke",
                            hasRulePropertyToDataColumn:
                              "//@containsDataFlow.2/@containsDataMappingRule.1",
                            dataType: "Float",
                          },
                        },
                        {
                          $: {
                            name: "SensorId",
                            hasRulePropertyToDataColumn:
                              "//@containsDataFlow.1/@containsDataMappingRule.2 //@containsDataFlow.2/@containsDataMappingRule.2",
                            DataColumnType: "MetaData",
                            dataType: "String",
                          },
                        },
                        {
                          $: {
                            name: "TimeStamp",
                            DataColumnType: "MetaData",
                            dataType: "Date",
                            sourceType: "Formula",
                            formulaExpression: "sysdate",
                          },
                        },
                      ],
                    },
                    {
                      $: {
                        name: "Location",
                        persistenceType: "Permanent",
                        hasLinkServiceToDatable: "//@containsLink.21",
                      },
                      composedOfDataColumn: [
                        {
                          $: {
                            name: "LocationId",
                            hasRulePropertyToDataColumn:
                              "//@containsDataFlow.6/@containsDataMappingRule.0",
                          },
                        },
                        {
                          $: {
                            name: "UserId",
                            hasRulePropertyToDataColumn:
                              "//@containsDataFlow.3/@containsDataMappingRule.1",
                            DataColumnType: "MetaData",
                            dataType: "String",
                          },
                        },
                        {
                          $: {
                            name: "TimeStamp",
                            DataColumnType: "MetaData",
                            dataType: "Date",
                            sourceType: "Formula",
                            formulaExpression: "sysdate",
                          },
                        },
                      ],
                    },
                    {
                      $: {
                        name: "HeartRate",
                        persistenceType: "Permanent",
                        hasLinkServiceToDatable:
                          "//@containsLink.13 //@containsLink.14",
                      },
                      composedOfDataColumn: [
                        {
                          $: {
                            name: "HeartRate",
                            hasRulePropertyToDataColumn:
                              "//@containsDataFlow.3/@containsDataMappingRule.0",
                            hasRuleAsSource:
                              "//@containsDataFlow.4/@containsDataMappingRule.0",
                          },
                        },
                        {
                          $: {
                            name: "UserId",
                            hasRulePropertyToDataColumn:
                              "//@containsDataFlow.6/@containsDataMappingRule.1",
                            DataColumnType: "MetaData",
                            dataType: "String",
                          },
                        },
                        {
                          $: {
                            name: "TimeStamp",
                            DataColumnType: "MetaData",
                            dataType: "Date",
                            sourceType: "Formula",
                            formulaExpression: "sysdate",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:Middleware",
                    isPartOf:
                      "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
                    id: "LocalExpressServer",
                    name: "LocalExpressServer",
                    usesProtocol: "//@containsProtocol.0",
                  },
                  containsService: [
                    {
                      $: {
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "SaveTemperature&HumiditySync",
                        name: "SaveTemperature&HumiditySync",
                        method: "POST",
                        hasLinkAppToService: "//@containsLink.2",
                        hasLinkServiceToDataTable: "//@containsLink.3",
                      },
                      containsParameter: [
                        {
                          $: {
                            name: "Temperature",
                            dataType: "Float",
                            receives: "//@containsEntityCategory.0/@has.0",
                          },
                        },
                        {
                          $: {
                            Ordinal: "1",
                            name: "Humidity",
                            dataType: "Float",
                            receives: "//@containsEntityCategory.0/@has.1",
                          },
                        },
                      ],
                    },
                    {
                      $: {
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "SaveLocationSync",
                        name: "SaveLocationSync",
                        method: "POST",
                        hasLinkAppToService: "//@containsLink.20",
                        hasLinkServiceToDataTable: "//@containsLink.21",
                      },
                    },
                    {
                      $: {
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "SaveCo&SmokeSync",
                        name: "SaveCo&SmokeSync",
                        method: "POST",
                        hasLinkAppToService: "//@containsLink.7",
                        hasLinkServiceToDataTable: "//@containsLink.8",
                      },
                      containsParameter: [
                        {
                          $: {
                            name: "Co&Smoke",
                          },
                        },
                      ],
                    },
                    {
                      $: {
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "GetTemperatureAirConditioning",
                        name: "GetTemperatureAirConditioning",
                      },
                    },
                    {
                      $: {
                        isPartOf: "//@represents.0/@iotSubsystem.1",
                        id: "SaveHeartRate Async",
                        name: "SaveHeartRate Async",
                        method: "POST",
                        hasLinkServiceToDataTable: "//@containsLink.13",
                        hasLinkServiceToBroker: "//@containsLink.12",
                      },
                    },
                    {
                      $: {
                        id: "DailyAverageHeartRate",
                        name: "DailyAverageHeartRate",
                        hasLinkServiceToDataTable:
                          "//@containsLink.14 //@containsLink.15",
                      },
                    },
                  ],
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:Broker",
                    isPartOf: "//@represents.0/@iotSubsystem.1",
                    id: "Mosquitto",
                    name: "Mosquitto",
                    usesProtocol: "//@containsProtocol.1",
                    hasLinkServiceToBroker: "//@containsLink.12",
                    hasLinkAppToBroker: "//@containsLink.11",
                  },
                  containsTopic: [
                    {
                      $: {
                        incluyes:
                          "//@containsEntity.1/@subPhysicalEntity.3/@has.1",
                        id: "HeartRate",
                        name: "HeartRate",
                        isTransferredByService: "//@containsLink.12",
                        isTransferredByApp: "//@containsLink.11",
                      },
                    },
                  ],
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:NetworkInterface",
                    isPartOf:
                      "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
                    id: "WifiConnection",
                    name: "WifiConnection",
                    connects: "//@containsEntity.4 //@containsEntity.2",
                  },
                },
              ],
            },
            {
              $: {
                "xsi:type": "MonitorIoT:IoTGateway",
                isPartOf: "//@represents.0/@iotSubsystem.0",
                id: "RaspberryPi3",
                name: "RaspberryPi3",
                descrption:
                  "Microcontrolador de sensores de temperatura, humedad, Co y Humo",
                controls:
                  "//@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.1 //@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.2 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.1 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.2",
                gatewayType: "Microcontroller",
              },
              containsResource: [
                {
                  $: {
                    "xsi:type": "MonitorIoT:Application",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "EnvironmentController",
                    name: "EnvironmentController",
                    type: "Embedded",
                    hasLinkAppToService: "//@containsLink.2 //@containsLink.7",
                    hasLinkAppToAPI: "//@containsLink.1 //@containsLink.6",
                  },
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:API",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "DHT11Sensor",
                    name: "DHT11Sensor",
                    hasLinkAppToAPI: "//@containsLink.1",
                    hasLinkAPIToIoTDevice:
                      "//@containsLink.0 //@containsLink.4",
                  },
                  containsParameter: [
                    {
                      $: {
                        name: "SensorId",
                        dataType: "String",
                        receives: "//@containsEntityCategory.1/@has.0",
                      },
                    },
                  ],
                  containsReturnVariable: [
                    {
                      $: {
                        name: "Temperature",
                        dataType: "Float",
                        returns: "//@containsEntityCategory.0/@has.0",
                      },
                    },
                    {
                      $: {
                        Ordinal: "1",
                        name: "Humidity",
                        dataType: "Float",
                        returns: "//@containsEntityCategory.0/@has.1",
                      },
                    },
                  ],
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:API",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "Co&SmokeSensor",
                    name: "Co&SmokeSensor",
                    hasLinkAppToAPI: "//@containsLink.6",
                    hasLinkAPIToIoTDevice: "//@containsLink.5",
                  },
                  containsParameter: [
                    {
                      $: {
                        name: "SensorId",
                        dataType: "String",
                        receives: "//@containsEntityCategory.3/@has.0",
                      },
                    },
                  ],
                  containsReturnVariable: [
                    {
                      $: {
                        name: "Co",
                        dataType: "Float",
                        returns: "//@containsEntityCategory.0/@has.2",
                      },
                    },
                    {
                      $: {
                        Ordinal: "1",
                        name: "Smoke",
                        dataType: "Float",
                        returns: "//@containsEntityCategory.0/@has.3",
                      },
                    },
                  ],
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:API",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "AirConditioningActuator",
                    name: "AirConditioningActuator",
                  },
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:NetworkInterface",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "BluetoothConnection",
                    name: "BluetoothConnection",
                    connects: "//@containsEntity.3",
                    communicationTechnology: "Bluetooth",
                  },
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:NetworkInterface",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "WifiConnection",
                    name: "WifiConnection",
                    connects: "//@containsEntity.4",
                  },
                },
              ],
            },
          ],
          subPhysicalEntity: [
            {
              $: {
                isPartOf: "//@represents.0/@iotSubsystem.0",
                id: "Livingroom",
                name: "Livingroom",
                descrption: "Sala de la casa",
                belongsTo: "//@containsEntityCategory.0",
              },
              has: [
                {
                  $: {
                    id: "LivingroomTemperatura",
                    name: "LivingroomTemperature",
                    basedOn: "//@containsEntityCategory.0/@has.0",
                    hasRulePropertyToDataColumn:
                      "//@containsDataFlow.0/@containsDataMappingRule.0",
                  },
                },
                {
                  $: {
                    id: "LivingroomHumidity",
                    name: "LivingroomHumidity",
                    basedOn: "//@containsEntityCategory.0/@has.1",
                    hasRulePropertyToDataColumn:
                      "//@containsDataFlow.0/@containsDataMappingRule.1",
                  },
                },
              ],
              containsComputingNode: [
                {
                  $: {
                    "xsi:type": "MonitorIoT:Tag",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "Beacon1",
                    name: "Beacon1",
                    isControlled:
                      "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0",
                    hasLinkAPIToIoTDevice: "//@containsLink.16",
                  },
                  containsResource: [
                    {
                      $: {
                        "xsi:type": "MonitorIoT:NetworkInterface",
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "BluetoothConnection",
                        name: "BluetoothConnection",
                        connects: "//@containsEntity.3",
                        communicationTechnology: "Bluetooth",
                      },
                    },
                  ],
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:Sensor",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "DHT11_1",
                    name: "DHT11_1",
                    belongsTo: "//@containsEntityCategory.1",
                    isControlled:
                      "//@containsEntity.1/@containsComputingNode.1",
                    hasLinkAPIToIoTDevice: "//@containsLink.0",
                  },
                  has: [
                    {
                      $: {
                        id: "DHT11_1SensorId",
                        name: "DHT11_1SensorId",
                        Value: "DHT11_1",
                        basedOn: "//@containsEntityCategory.1/@has.0",
                        hasRulePropertyToDataColumn:
                          "//@containsDataFlow.0/@containsDataMappingRule.2",
                      },
                    },
                  ],
                  containsResource: [
                    {
                      $: {
                        "xsi:type": "MonitorIoT:NetworkInterface",
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "BluetoothConnection",
                        name: "BluetoothConnection",
                        connects: "//@containsEntity.3",
                        communicationTechnology: "Bluetooth",
                      },
                    },
                  ],
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:Actuator",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "AirConditioning1",
                    name: "AirConditioning1",
                    isControlled:
                      "//@containsEntity.1/@containsComputingNode.1",
                  },
                  has: [
                    {
                      $: {
                        id: "TemperatureAirConditioning1",
                        name: "TemperatureAirConditioning1",
                      },
                    },
                  ],
                  containsResource: [
                    {
                      $: {
                        "xsi:type": "MonitorIoT:NetworkInterface",
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "BluetoothConnection",
                        name: "BluetoothConnection",
                        connects: "//@containsEntity.3",
                        communicationTechnology: "Bluetooth",
                      },
                    },
                  ],
                },
              ],
            },
            {
              $: {
                isPartOf: "//@represents.0/@iotSubsystem.0",
                id: "Bedroom",
                name: "Bedroom",
                descrption: "Dormitorio de la casa",
                belongsTo: "//@containsEntityCategory.0",
              },
              has: [
                {
                  $: {
                    id: "BedroomTemperature",
                    name: "BedroomTemperature",
                    basedOn: "//@containsEntityCategory.0/@has.0",
                    hasRulePropertyToDataColumn:
                      "//@containsDataFlow.1/@containsDataMappingRule.0",
                  },
                },
                {
                  $: {
                    id: "BedroomHumidity",
                    name: "BedroomHumidity",
                    basedOn: "//@containsEntityCategory.0/@has.1",
                    hasRulePropertyToDataColumn:
                      "//@containsDataFlow.1/@containsDataMappingRule.1",
                  },
                },
              ],
              containsComputingNode: [
                {
                  $: {
                    "xsi:type": "MonitorIoT:Tag",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "Beacon2",
                    name: "Beacon2",
                    isControlled:
                      "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0",
                    hasLinkAPIToIoTDevice: "//@containsLink.17",
                  },
                  containsResource: [
                    {
                      $: {
                        "xsi:type": "MonitorIoT:NetworkInterface",
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "BluetoothConnection",
                        name: "BluetoothConnection",
                        connects: "//@containsEntity.3",
                        communicationTechnology: "Bluetooth",
                      },
                    },
                  ],
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:Sensor",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "DHT11_2",
                    name: "DHT11_2",
                    belongsTo: "//@containsEntityCategory.1",
                    isControlled:
                      "//@containsEntity.1/@containsComputingNode.1",
                    hasLinkAPIToIoTDevice: "//@containsLink.4",
                  },
                  has: [
                    {
                      $: {
                        id: "DHT11_2SensorId",
                        name: "DHT11_2SensorId",
                        Value: "DHT11_2",
                        basedOn: "//@containsEntityCategory.1/@has.0",
                        hasRulePropertyToDataColumn:
                          "//@containsDataFlow.1/@containsDataMappingRule.2",
                      },
                    },
                  ],
                  containsResource: [
                    {
                      $: {
                        "xsi:type": "MonitorIoT:NetworkInterface",
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "BluetoothConnection",
                        name: "BluetoothConnection",
                        connects: "//@containsEntity.3",
                        communicationTechnology: "Bluetooth",
                      },
                    },
                  ],
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:Actuator",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "AirConditioning2",
                    name: "AirConditioning2",
                    isControlled:
                      "//@containsEntity.1/@containsComputingNode.1",
                  },
                  has: [
                    {
                      $: {
                        id: "TemperatureAirConditioning2",
                        name: "TemperatureAirConditioning2",
                      },
                    },
                  ],
                  containsResource: [
                    {
                      $: {
                        "xsi:type": "MonitorIoT:NetworkInterface",
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "BluetoothConnection",
                        name: "BluetoothConnection",
                        connects: "//@containsEntity.3",
                        communicationTechnology: "Bluetooth",
                      },
                    },
                  ],
                },
              ],
            },
            {
              $: {
                isPartOf: "//@represents.0/@iotSubsystem.0",
                id: "Kitchen",
                name: "Kitchen",
                descrption: "Cocina de la casa",
                belongsTo: "//@containsEntityCategory.0",
              },
              has: [
                {
                  $: {
                    id: "KitchenCo",
                    name: "KitchenCo",
                    basedOn: "//@containsEntityCategory.0/@has.2",
                    hasRulePropertyToDataColumn:
                      "//@containsDataFlow.2/@containsDataMappingRule.0",
                  },
                },
                {
                  $: {
                    id: "KitchenSmoke",
                    name: "KitchenSmoke",
                    basedOn: "//@containsEntityCategory.0/@has.2",
                    hasRulePropertyToDataColumn:
                      "//@containsDataFlow.2/@containsDataMappingRule.1",
                  },
                },
              ],
              containsComputingNode: [
                {
                  $: {
                    "xsi:type": "MonitorIoT:Tag",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "Beacon3",
                    name: "Beacon3",
                    isControlled:
                      "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0",
                    hasLinkAPIToIoTDevice: "//@containsLink.18",
                  },
                  containsResource: [
                    {
                      $: {
                        "xsi:type": "MonitorIoT:NetworkInterface",
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "BluetoothConnection",
                        name: "BluetoothConnection",
                        connects: "//@containsEntity.3",
                        communicationTechnology: "Bluetooth",
                      },
                    },
                  ],
                },
                {
                  $: {
                    "xsi:type": "MonitorIoT:Sensor",
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "Co&Smoke",
                    name: "Co&Smoke",
                    belongsTo: "//@containsEntityCategory.3",
                    isControlled:
                      "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0",
                    hasLinkAPIToIoTDevice: "//@containsLink.5",
                  },
                  has: [
                    {
                      $: {
                        id: "Co&SmokeSensorId",
                        name: "Co&SmokeSensorId",
                        basedOn: "//@containsEntityCategory.3/@has.0",
                        hasRulePropertyToDataColumn:
                          "//@containsDataFlow.2/@containsDataMappingRule.2",
                      },
                    },
                  ],
                  containsResource: [
                    {
                      $: {
                        "xsi:type": "MonitorIoT:NetworkInterface",
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "BluetoothConnection",
                        name: "BluetoothConnection",
                        connects: "//@containsEntity.3",
                        communicationTechnology: "Bluetooth",
                      },
                    },
                  ],
                },
              ],
            },
            {
              $: {
                "xsi:type": "MonitorIoT:HumanUser",
                isPartOf:
                  "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
                id: "Patient",
                name: "Patient",
                descrption: "Paciente que vive en la casa",
                belongsTo: "//@containsEntityCategory.2",
                interactsUsing:
                  "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.0",
              },
              has: [
                {
                  $: {
                    id: "LocationId",
                    name: "LocationId",
                    basedOn: "//@containsEntityCategory.2/@has.0",
                    hasRulePropertyToDataColumn:
                      "//@containsDataFlow.6/@containsDataMappingRule.0",
                  },
                },
                {
                  $: {
                    id: "HeartRate",
                    name: "HeartRate",
                    basedOn: "//@containsEntityCategory.2/@has.1",
                    isIncluded:
                      "//@containsEntity.1/@containsComputingNode.0/@containsResource.2/@containsTopic.0",
                    hasRulePropertyToDataColumn:
                      "//@containsDataFlow.3/@containsDataMappingRule.0",
                  },
                },
                {
                  $: {
                    id: "UserId",
                    name: "UserId",
                    basedOn: "//@containsEntityCategory.2/@has.2",
                    hasRulePropertyToDataColumn:
                      "//@containsDataFlow.3/@containsDataMappingRule.1 //@containsDataFlow.6/@containsDataMappingRule.1",
                  },
                },
              ],
              subPhysicalEntity: [
                {
                  $: {
                    isPartOf: "//@represents.0/@iotSubsystem.0",
                    id: "SmartPhone",
                    name: "SmartPhone",
                  },
                  containsComputingNode: [
                    {
                      $: {
                        "xsi:type": "MonitorIoT:IoTGateway",
                        isPartOf: "//@represents.0/@iotSubsystem.0",
                        id: "SmartPhoneGateway",
                        name: "SmartPhoneGateway",
                        controls:
                          "//@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.0 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.0 //@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.0 //@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.1",
                        gatewayType: "Smartphone",
                      },
                      containsResource: [
                        {
                          $: {
                            "xsi:type": "MonitorIoT:Application",
                            isPartOf: "//@represents.0/@iotSubsystem.0",
                            id: "LocationController",
                            name: "LocationController",
                            isUsedByUser:
                              "//@containsEntity.1/@subPhysicalEntity.3",
                            type: "Mobile",
                            hasLinkAppToService: "//@containsLink.20",
                            hasLinkAppToAPI: "//@containsLink.19",
                          },
                        },
                        {
                          $: {
                            "xsi:type": "MonitorIoT:API",
                            isPartOf: "//@represents.0/@iotSubsystem.0",
                            id: "Beacon",
                            name: "Beacon",
                            hasLinkAppToAPI: "//@containsLink.19",
                            hasLinkAPIToIoTDevice:
                              "//@containsLink.16 //@containsLink.17 //@containsLink.18",
                          },
                          containsReturnVariable: [
                            {
                              $: {
                                name: "LocationId",
                                returns: "//@containsEntityCategory.2/@has.0",
                              },
                            },
                          ],
                        },
                        {
                          $: {
                            "xsi:type": "MonitorIoT:NetworkInterface",
                            isPartOf: "//@represents.0/@iotSubsystem.0",
                            id: "BluetoothConnection",
                            name: "BluetoothConnection",
                            connects: "//@containsEntity.3",
                            communicationTechnology: "Bluetooth",
                          },
                        },
                        {
                          $: {
                            "xsi:type": "MonitorIoT:NetworkInterface",
                            isPartOf: "//@represents.0/@iotSubsystem.0",
                            id: "WifiConnection",
                            name: "WifiConnection",
                            connects: "//@containsEntity.4",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  $: {
                    isPartOf: "//@represents.0/@iotSubsystem.1",
                    id: "SmartWatch",
                    name: "SmartWatch",
                  },
                  containsComputingNode: [
                    {
                      $: {
                        "xsi:type": "MonitorIoT:IoTGateway",
                        isPartOf: "//@represents.0/@iotSubsystem.1",
                        id: "SmartWatchGateway",
                        name: "SmartWatchGateway",
                        controls:
                          "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.1",
                        gatewayType: "SmartWatch",
                      },
                      containsResource: [
                        {
                          $: {
                            "xsi:type": "MonitorIoT:Application",
                            isPartOf: "//@represents.0/@iotSubsystem.1",
                            id: "HealthControler",
                            name: "HealthController",
                            type: "Mobile",
                            hasLinkAppToAPI: "//@containsLink.10",
                            hasLinkAppToBroker: "//@containsLink.11",
                          },
                        },
                        {
                          $: {
                            "xsi:type": "MonitorIoT:API",
                            isPartOf: "//@represents.0/@iotSubsystem.1",
                            id: "HeartRateSensor",
                            name: "HeartRateSensor",
                            hasLinkAppToAPI: "//@containsLink.10",
                            hasLinkAPIToIoTDevice: "//@containsLink.9",
                          },
                          containsParameter: [
                            {
                              $: {
                                name: "UserId",
                                receives: "//@containsEntityCategory.2/@has.2",
                              },
                            },
                          ],
                          containsReturnVariable: [
                            {
                              $: {
                                name: "HeartRate",
                                returns: "//@containsEntityCategory.2/@has.1",
                              },
                            },
                          ],
                        },
                        {
                          $: {
                            "xsi:type": "MonitorIoT:NetworkInterface",
                            isPartOf: "//@represents.0/@iotSubsystem.1",
                            id: "WifiConnection",
                            name: "WifiConnection",
                            descrption: "",
                            connects: "//@containsEntity.4",
                          },
                        },
                      ],
                    },
                    {
                      $: {
                        "xsi:type": "MonitorIoT:Sensor",
                        isPartOf: "//@represents.0/@iotSubsystem.1",
                        id: "HeartRate1",
                        name: "HeartRate1",
                        belongsTo: "//@containsEntityCategory.2",
                        isControlled:
                          "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0",
                        hasLinkAPIToIoTDevice: "//@containsLink.9",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          $: {
            "xsi:type": "MonitorIoT:Network",
            isPartOf:
              "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
            id: "Internet",
            name: "Internet",
            descrption: "Red de internet",
            isConnected:
              "//@containsEntity.0/@containsResource.2 //@containsEntity.1/@containsComputingNode.0/@containsResource.3",
            usesProtocol: "//@containsProtocol.0 //@containsProtocol.2",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:Network",
            isPartOf: "//@represents.0/@iotSubsystem.0",
            id: "Proximity",
            name: "Proximity",
            descrption: "Red de proximidad a los sensores",
            isConnected:
              "//@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.2/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.2/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.2 //@containsEntity.1/@containsComputingNode.1/@containsResource.4",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:Network",
            isPartOf:
              "//@represents.0/@iotSubsystem.0 //@represents.0/@iotSubsystem.1",
            id: "LAN",
            name: "LAN",
            descrption: "Red de área local",
            isConnected:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.3 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.2 //@containsEntity.1/@containsComputingNode.1/@containsResource.5 //@containsEntity.1/@containsComputingNode.0/@containsResource.3 //@containsEntity.0/@containsResource.2",
            usesProtocol:
              "//@containsProtocol.0 //@containsProtocol.1 //@containsProtocol.2",
          },
        },
      ],
      represents: [
        {
          $: {
            id: "EmergencySystem",
            name: "EmergencySystem",
            descrption:
              "Emergency management system aimed at patients or elders who are at home.",
            domain: "Health",
          },
          iotSubsystem: [
            {
              $: {
                isComposedOf:
                  "//@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.1 //@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.0 //@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.2 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.0 //@containsEntity.1/@subPhysicalEntity.0 //@containsEntity.1/@subPhysicalEntity.1 //@containsEntity.1/@subPhysicalEntity.2 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.1 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.2 //@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.0 //@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.1 //@containsEntity.1/@subPhysicalEntity.3 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0 //@containsEntity.1/@containsComputingNode.1 //@containsEntity.1/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsComputingNode.1/@containsResource.1 //@containsEntity.1/@containsComputingNode.1/@containsResource.2 //@containsEntity.1/@containsComputingNode.1/@containsResource.3 //@containsEntity.1/@containsComputingNode.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.1 //@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.2 //@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.1 //@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.3 //@containsEntity.0 //@containsEntity.0/@containsResource.0 //@containsEntity.0/@containsResource.1 //@containsEntity.1 //@containsEntity.2 //@containsEntity.3 //@containsEntity.4 //@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.2/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.2/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.1/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.2 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.3 //@containsEntity.1/@containsComputingNode.1/@containsResource.4 //@containsEntity.1/@containsComputingNode.1/@containsResource.5 //@containsEntity.1/@containsComputingNode.0/@containsResource.3 //@containsEntity.0/@containsResource.2 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.1",
                id: "EnvironmentalControlSubsystem",
                name: "EnvironmentalControlSubsystem",
                descrption:
                  "Environmental control subsystem, responsible for monitoring the temperature, the presence of carbon monoxide (Co) and smoke in the environment, as well as the location of the user inside the house.",
                domain: "Domotic",
              },
            },
            {
              $: {
                isComposedOf:
                  "//@containsEntity.1/@subPhysicalEntity.3 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.1 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.1 //@containsEntity.1/@containsComputingNode.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.1 //@containsEntity.1/@containsComputingNode.0/@containsResource.2 //@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.4 //@containsEntity.0 //@containsEntity.0/@containsResource.0 //@containsEntity.0/@containsResource.1 //@containsEntity.0/@containsResource.1/@containsService.0 //@containsEntity.1 //@containsEntity.2 //@containsEntity.4 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.2 //@containsEntity.1/@containsComputingNode.0/@containsResource.3 //@containsEntity.0/@containsResource.2",
                id: "HealthSubsystem",
                name: "HealthSubsystem",
                descrption:
                  "Health subsystem for monitoring the user's vital signs.",
                domain: "Health",
              },
            },
          ],
        },
      ],
      containsDataFlow: [
        {
          $: {
            id: "CollectionTemperatureHumidityLivingRoom",
            description:
              "Flujo de recolección de temperatura de la sala (livingroom)",
            isSupported:
              "//@containsLink.0 //@containsLink.1 //@containsLink.2 //@containsLink.3",
            communicationType: "Synchronous",
            unitOfTime: "Minute",
            timeIntervalBetweenFlows: "10",
          },
          containsDataMappingRule: [
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyLivingroomTemperatureToColumnTemperature",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.0",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.0/@has.0",
              },
            },
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyLivingroomHumidityToColumnHumidity",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.1",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.0/@has.1",
              },
            },
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyDHT11_1SensorIdToColumnSensorId",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.2",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.1/@has.0",
              },
            },
          ],
        },
        {
          $: {
            id: "CollectionTemperatureHumidityBedRoom",
            description:
              "Flujo de recolección de temperatura del dormitorio (bedroom)",
            isSupported:
              "//@containsLink.4 //@containsLink.1 //@containsLink.2 //@containsLink.3",
            communicationType: "Synchronous",
            unitOfTime: "Minute",
            timeIntervalBetweenFlows: "10",
          },
          containsDataMappingRule: [
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyBedroomTemperatureToColumnTemperature",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.0",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.1/@has.0",
              },
            },
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyBedroomHumidityToColumnHumidity",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.1",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.1/@has.1",
              },
            },
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyDHT11_2SensorIdToColumnSensorId",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.1/@composedOfDataColumn.2",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.1/@has.0",
              },
            },
          ],
        },
        {
          $: {
            id: "CollectionCo&SmokeKitchen",
            description:
              "Flujo de recolección de Co - humo en la cocina (kitchen)",
            isSupported:
              "//@containsLink.5 //@containsLink.6 //@containsLink.7 //@containsLink.8",
            communicationType: "Synchronous",
            unitOfTime: "Minute",
            timeIntervalBetweenFlows: "10",
          },
          containsDataMappingRule: [
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyKitchenCoToColumnCo",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.1/@composedOfDataColumn.0",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.2/@has.0",
              },
            },
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyKitchenCoToColumnCo",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.1/@composedOfDataColumn.1",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.2/@has.1",
              },
            },
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyKitchenSensorIdToColumnSensorId",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.1/@composedOfDataColumn.2",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.1/@has.0",
              },
            },
          ],
        },
        {
          $: {
            id: "CollectionHeartRatePatient",
            description:
              "Flujo de recolección de frecuencia cardiaca del paciente",
            isSupported:
              "//@containsLink.9 //@containsLink.10 //@containsLink.11 //@containsLink.12 //@containsLink.13",
            unitOfTime: "Minute",
            timeIntervalBetweenFlows: "30",
          },
          containsDataMappingRule: [
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyHeartRateToColumnHeartRate",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.3/@composedOfDataColumn.0",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.3/@has.1",
              },
            },
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyUserIdToColumnUserId",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.2/@composedOfDataColumn.1",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.3/@has.2",
              },
            },
          ],
        },
        {
          $: {
            id: "AggregationDailyAverageHeartRate",
            description:
              "Flujo de agregación que obtiene el promedio diario de la frecuencia cardiaca de un paciente",
            isSupported: "//@containsLink.14 //@containsLink.15",
            dataFlowType: "DataAggregationFlow",
            unitOfTime: "Day",
            timeIntervalBetweenFlows: "1",
          },
          containsDataMappingRule: [
            {
              $: {
                "xsi:type": "MonitorIoT:DataColumnToDataColumn",
                id: "ColumnHeartRateToColumnDialyHeartRate",
                aggregationOperation: "Sum",
                relatesSourceColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.3/@composedOfDataColumn.0",
                relatesDestinationColumn:
                  "//@containsEntity.0/@containsResource.0/@containsDataTable.0/@composedOfDataColumn.0",
                GroupBy: "HumanUserId",
              },
            },
          ],
        },
        {
          $: {
            id: "ActuatingTemperatureAirConditioning",
            description:
              "Flujo para modificar la temperatura del aire acondicionado",
            dataFlowType: "ActuatingFlow",
            unitOfTime: "Minute",
            timeIntervalBetweenFlows: "10",
          },
        },
        {
          $: {
            id: "CollectionLocationIdPatient",
            description: "Flujo de datos de la localización del usuario.",
            isSupported:
              "//@containsLink.16 //@containsLink.17 //@containsLink.18 //@containsLink.19 //@containsLink.20 //@containsLink.21",
            communicationType: "Synchronous",
            unitOfTime: "Automatic",
          },
          containsDataMappingRule: [
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyLocationIdToColumnLocationId",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.2/@composedOfDataColumn.0",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.3/@has.0",
              },
            },
            {
              $: {
                "xsi:type": "MonitorIoT:PropertyToDataColumn",
                id: "PropertyUserIdToColumnUserId",
                relatesColumn:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.3/@composedOfDataColumn.1",
                relatesSpecificProperty:
                  "//@containsEntity.1/@subPhysicalEntity.3/@has.2",
              },
            },
          ],
        },
      ],
      containsLink: [
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAPIToIoTDevice",
            supports: "//@containsDataFlow.0",
            Id: "APIDHT11SensorToDHT11_1Sensor",
            linksIoTDevice:
              "//@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.1",
            linksAPI:
              "//@containsEntity.1/@containsComputingNode.1/@containsResource.1",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAppToAPI",
            supports: "//@containsDataFlow.0 //@containsDataFlow.1",
            previousLink: "//@containsLink.0",
            Id: "AppEnvironmentControllerToAPIDHT11Sensor",
            linksAPI:
              "//@containsEntity.1/@containsComputingNode.1/@containsResource.1",
            linksApp:
              "//@containsEntity.1/@containsComputingNode.1/@containsResource.0",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAppToService",
            supports: "//@containsDataFlow.0 //@containsDataFlow.1",
            previousLink: "//@containsLink.1",
            Id: "AppEnvironmentControllerToServiceSaveTemperature&HumiditySync",
            linksApp:
              "//@containsEntity.1/@containsComputingNode.1/@containsResource.0",
            linksService:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.0",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkServiceToDataTable",
            supports: "//@containsDataFlow.0 //@containsDataFlow.1",
            previousLink: "//@containsLink.2",
            Id:
              "ServiceSaveTemperature&HumiditySyncToDataTableEnvironmentTemperature&Humidity",
            linkService:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.0",
            linksDataTable:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.0",
            type: "Insert",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAPIToIoTDevice",
            supports: "//@containsDataFlow.1",
            Id: "APIDHT11SensorToDHT11_2Sensor",
            linksIoTDevice:
              "//@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.1",
            linksAPI:
              "//@containsEntity.1/@containsComputingNode.1/@containsResource.1",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAPIToIoTDevice",
            supports: "//@containsDataFlow.2",
            Id: "APICo&SmokeSensorToCo&SmokeSensor",
            linksIoTDevice:
              "//@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.1",
            linksAPI:
              "//@containsEntity.1/@containsComputingNode.1/@containsResource.2",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAppToAPI",
            supports: "//@containsDataFlow.2",
            previousLink: "//@containsLink.5",
            Id: "AppEnvironmentControllerToAPCo&SmokeSensor",
            linksAPI:
              "//@containsEntity.1/@containsComputingNode.1/@containsResource.2",
            linksApp:
              "//@containsEntity.1/@containsComputingNode.1/@containsResource.0",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAppToService",
            supports: "//@containsDataFlow.2",
            previousLink: "//@containsLink.6",
            Id: "AppEnvironmentControllerToServiceCo&SmokeSync",
            linksApp:
              "//@containsEntity.1/@containsComputingNode.1/@containsResource.0",
            linksService:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.2",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkServiceToDataTable",
            supports: "//@containsDataFlow.2",
            previousLink: "//@containsLink.7",
            Id: "ServiceSaveCo&SmokeSyncToDataTableEnvironmentCo&Smoke",
            linkService:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.2",
            linksDataTable:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.1",
            type: "Insert",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAPIToIoTDevice",
            supports: "//@containsDataFlow.3",
            Id: "APIHeartRateSensorToHeartRateSensor",
            linksIoTDevice:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.1",
            linksAPI:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.1",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAppToAPI",
            supports: "//@containsDataFlow.3",
            previousLink: "//@containsLink.9",
            Id: "AppHealthControllerToAPIHeartSensor",
            linksAPI:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.1",
            linksApp:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.0",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAppToBroker",
            supports: "//@containsDataFlow.3",
            previousLink: "//@containsLink.10",
            Id: "AppHealthControllerToMosquittoBroker",
            linksApp:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.0",
            linksBroker:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.2",
            transfers:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.2/@containsTopic.0",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkServiceToBroker",
            supports: "//@containsDataFlow.3",
            previousLink: "//@containsLink.11",
            Id: "ServiceSaveHeartRateAsyncToMosquittoBroker",
            linksBroker:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.2",
            linksService:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.4",
            transfers:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.2/@containsTopic.0",
            type: "Pull",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkServiceToDataTable",
            supports: "//@containsDataFlow.3",
            previousLink: "//@containsLink.12",
            Id: "ServiceSaveHeartRateAsyncToDataTableHeartRate",
            linkService:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.4",
            linksDataTable:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.3",
            type: "Insert",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkServiceToDataTable",
            supports: "//@containsDataFlow.4",
            Id: "ServiceDailyAverageHeartRateToDataTableHeartRate",
            linkService:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.5",
            linksDataTable:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.3",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkServiceToDataTable",
            supports: "//@containsDataFlow.4",
            previousLink: "//@containsLink.14",
            Id: "ServiceDailyAverageHeartRateToDataTableHeartRateSummary",
            linkService:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.5",
            linksDataTable:
              "//@containsEntity.0/@containsResource.0/@containsDataTable.0",
            type: "Insert",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAPIToIoTDevice",
            supports: "//@containsDataFlow.6",
            Id: "APIBeaconToTagBeacon1",
            linksIoTDevice:
              "//@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.0",
            linksAPI:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.1",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAPIToIoTDevice",
            supports: "//@containsDataFlow.6",
            Id: "APIBeaconToTagBeacon2",
            linksIoTDevice:
              "//@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.0",
            linksAPI:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.1",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAPIToIoTDevice",
            supports: "//@containsDataFlow.6",
            Id: "APIBeaconToTagBeacon3",
            linksIoTDevice:
              "//@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.0",
            linksAPI:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.1",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAppToAPI",
            supports: "//@containsDataFlow.6",
            previousLink:
              "//@containsLink.16 //@containsLink.17 //@containsLink.18",
            Id: "AppLocationControllerToAPIBeacon",
            linksAPI:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.1",
            linksApp:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.0",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkAppToService",
            supports: "//@containsDataFlow.6",
            previousLink: "//@containsLink.19",
            Id: "AppLocationControllerToServiceSaveLocationSync",
            linksApp:
              "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.0",
            linksService:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.1",
          },
        },
        {
          $: {
            "xsi:type": "MonitorIoT:LinkServiceToDataTable",
            supports: "//@containsDataFlow.6",
            previousLink: "//@containsLink.20",
            Id: "Service SaveLocationSyncToDataTableLocation",
            linkService:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.1",
            linksDataTable:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.0/@containsDataTable.2",
            type: "Insert",
          },
        },
      ],
      containsEntityCategory: [
        {
          $: {
            id: "Room",
            name: "Room",
            description: "Habitación de una casa",
            groups:
              "//@containsEntity.1/@subPhysicalEntity.0 //@containsEntity.1/@subPhysicalEntity.1 //@containsEntity.1/@subPhysicalEntity.2",
          },
          has: [
            {
              $: {
                id: "Temperature",
                name: "Temperature",
                definition: "Temperatura de una habitación",
                propertyType: "Telemetry",
                dataType: "Float",
                isParticularized:
                  "//@containsEntity.1/@subPhysicalEntity.0/@has.0 //@containsEntity.1/@subPhysicalEntity.1/@has.0",
                isReturned:
                  "//@containsEntity.1/@containsComputingNode.1/@containsResource.1/@containsReturnVariable.0",
                isReceived:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.0/@containsParameter.0",
              },
            },
            {
              $: {
                id: "Humidity",
                name: "Humidity",
                definition: "Humedad de una habitación",
                propertyType: "Telemetry",
                dataType: "Float",
                isParticularized:
                  "//@containsEntity.1/@subPhysicalEntity.0/@has.1 //@containsEntity.1/@subPhysicalEntity.1/@has.1",
                isReturned:
                  "//@containsEntity.1/@containsComputingNode.1/@containsResource.1/@containsReturnVariable.1",
                isReceived:
                  "//@containsEntity.1/@containsComputingNode.0/@containsResource.1/@containsService.0/@containsParameter.1",
              },
            },
            {
              $: {
                id: "Co",
                name: "Co",
                definition: "Detecta el Co de una habitación",
                dataType: "Float",
                isParticularized:
                  "//@containsEntity.1/@subPhysicalEntity.2/@has.0 //@containsEntity.1/@subPhysicalEntity.2/@has.1",
                isReturned:
                  "//@containsEntity.1/@containsComputingNode.1/@containsResource.2/@containsReturnVariable.0",
              },
            },
            {
              $: {
                id: "Smoke",
                name: "Smoke",
                definition: "Detecta el humo de una habitación",
                isReturned:
                  "//@containsEntity.1/@containsComputingNode.1/@containsResource.2/@containsReturnVariable.1",
              },
            },
          ],
        },
        {
          $: {
            id: "DHT11Sensor",
            name: "DHT11Sensor",
            description:
              "Tipo de sensor DHT11 para recuperar la humedad y temperatura de una habitación",
            groups:
              "//@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.1 //@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.1",
          },
          has: [
            {
              $: {
                id: "SensorId",
                name: "SensorId",
                definition: "Identificación del sensor DHT11",
                identifier: "true",
                dataType: "String",
                AssignedAtDesignTime: "true",
                isParticularized:
                  "//@containsEntity.1/@subPhysicalEntity.0/@containsComputingNode.1/@has.0 //@containsEntity.1/@subPhysicalEntity.1/@containsComputingNode.1/@has.0",
                isReceived:
                  "//@containsEntity.1/@containsComputingNode.1/@containsResource.1/@containsParameter.0",
              },
            },
          ],
        },
        {
          $: {
            id: "Patient",
            name: "Patient",
            description: "Paciente que vive en la casa",
            groups:
              "//@containsEntity.1/@subPhysicalEntity.3 //@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.1",
          },
          has: [
            {
              $: {
                id: "LocationId",
                name: "LocationId",
                definition: "Localización del paciente",
                propertyType: "Telemetry",
                isParticularized:
                  "//@containsEntity.1/@subPhysicalEntity.3/@has.0",
                isReturned:
                  "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.0/@containsComputingNode.0/@containsResource.1/@containsReturnVariable.0",
              },
            },
            {
              $: {
                id: "HeartRate",
                name: "HeartRate",
                definition: "Ritmo cardiaco del paciente",
                propertyType: "Telemetry",
                isParticularized:
                  "//@containsEntity.1/@subPhysicalEntity.3/@has.1",
                isReturned:
                  "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.1/@containsReturnVariable.0",
              },
            },
            {
              $: {
                id: "UserId",
                name: "UserId",
                definition: "Identificacion del usuario",
                identifier: "true",
                dataType: "String",
                isParticularized:
                  "//@containsEntity.1/@subPhysicalEntity.3/@has.2",
                isReceived:
                  "//@containsEntity.1/@subPhysicalEntity.3/@subPhysicalEntity.1/@containsComputingNode.0/@containsResource.1/@containsParameter.0",
              },
            },
          ],
        },
        {
          $: {
            id: "Co&SmokeSensor",
            name: "Co&SmokeSensor",
            description: "Tipo de sensor para detectar Co y humo",
            groups:
              "//@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.1",
          },
          has: [
            {
              $: {
                id: "SensorId",
                name: "SensorId",
                definition: "Identificador del sensor",
                identifier: "true",
                isParticularized:
                  "//@containsEntity.1/@subPhysicalEntity.2/@containsComputingNode.1/@has.0",
                isReceived:
                  "//@containsEntity.1/@containsComputingNode.1/@containsResource.2/@containsParameter.0",
              },
            },
          ],
        },
      ],
      containsProtocol: [
        {
          $: {
            isUsedByMiddleware:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.1 //@containsEntity.0/@containsResource.1",
            name: "HTTP",
            Puerto: "80",
            isUsedByNetwork: "//@containsEntity.2 //@containsEntity.4",
          },
        },
        {
          $: {
            isUsedByMiddleware:
              "//@containsEntity.1/@containsComputingNode.0/@containsResource.2",
            name: "MQTT",
            Puerto: "8083",
            isUsedByNetwork: "//@containsEntity.4",
          },
        },
        {
          $: {
            isUsedByDataStore:
              "//@containsEntity.0/@containsResource.0 //@containsEntity.1/@containsComputingNode.0/@containsResource.0",
            name: "Postgresql",
            Puerto: "5432",
            isUsedByNetwork: "//@containsEntity.4 //@containsEntity.2",
          },
        },
      ],
    },
  };
}
