import { JSON2Architecture } from "../models/JSON2Architecture";
import { SQL_Qwerty } from "../models/SQL_Qwerty";
import { EntityQ } from "../models/architecture/EntityQ";
import { IoTSystemQ } from "../models/architecture/IoTSystemQ";
import { DataFlowQ } from "../models/architecture/DataFlowQ";
import mysql from "mysql2/promise";
import constants from "../../config/constants";
import { DataColumnQ } from "../models/architecture/DataColumnQ";

export class database2 {
  constructor() {}

  private async conectar() {
    var connection = await mysql.createConnection({
      host: constants["db-url"],
      port: constants["db-port"],
      user: constants["db-user"],
      password: constants["db-password"],
      database: constants["db-schema"],
    });
    return connection;
  }

  public async qwerty(sql: string): Promise<any> {
    //console.log(sql);
    var connection = await this.conectar();
    try {
      var [rows, fields] = await connection.execute(sql);
    } catch (e) {
      console.log("++++++++++++++++++++++++++++++++++++++++++++");
      console.log(e);
      console.log(sql);
      console.log("++++++++++++++++++++++++++++++++++++++++++++");
    }
    connection.end();
    return rows;
  }

  public async architecture(architecture: JSON2Architecture, modelID: string) {
    await this.insertar_sistemas_recursivo(
      modelID,
      "NULL",
      architecture.modelIoTSystem
    );
    var dataFlows = architecture.modelDataFlow;
    for (var i = 0; i < dataFlows.length; i++) {
      var insertedFlow = await this.qwerty(
        dataFlows[i].toSqlInsert(["/@/MODELO/@/"], [modelID])
      );
    }
    await this.insertar_entidades_recursivo(architecture.modelEntity, [
      modelID,
      "NULL",
    ]);
    var dataColumn: DataColumnQ[] = architecture.modelDataColumn;
    for (var i = 0; i < dataColumn.length; i++) {
      var insertedColumn = await this.qwerty(
        dataColumn[i].toSqlInsert(["/@/MODELO/@/"], [modelID])
      );
      var insertedID = insertedColumn.insertId;
      //aqui insertar las relaciones
      dataColumn[i].propertyToDataColumn.forEach(async (rel) => {
        var new_sql = `INSERT INTO I_AM_BATMAN (ma_id, id_flow, id_proces, id_colum) values (${modelID}, ${rel[0]}, ${rel[1]}, ${insertedID})`;
        await this.qwerty(new_sql);
      });
    }
  }

  private async insertar_sistemas_recursivo(
    modelID: string,
    idPadre: string,
    system: IoTSystemQ
  ) {
    var architectureFather = await this.qwerty(
      system.toSqlInsert(
        ["/@/MODELO/@/", "/@/PADRE/@/"],
        [modelID, `${idPadre}`]
      )
    );
    var systems = system.IoTSubSystem;
    for (var i = 0; i < systems.length; i++) {
      await this.insertar_sistemas_recursivo(
        modelID,
        system.id.toString(),
        systems[i]
      );
    }
  }

  private async insertar_entidades_recursivo(
    entidades: EntityQ[],
    value: string[]
  ) {
    for (var i = 0; i < entidades.length; i++) {
      var insertEnt = await this.qwerty(
        entidades[i].toSqlInsert(["/@/MODELO/@/", "/@/PADRE/@/"], value)
      );
      if (entidades[i].propertys.length > 0) {
        for (var j = 0; j < entidades[i].propertys.length; j++) {
          var insertProp = await this.qwerty(
            entidades[i].propertys[j].toSqlInsert(
              ["/@/MODELO/@/", "/@/OBJETOS/@/"],
              [value[0], `${entidades[i].id}`]
            )
          );
          await this.relation_propiedad_flujo(
            entidades[i].propertys[j].id.toString(),
            entidades[i].propertys[j].dataFlow,
            value[0],
            entidades[i].id.toString()
          );
        }
      }
      if (entidades[i].subEntity.length > 0) {
        var valueAux = [value[0], entidades[i].id.toString()];
        await this.insertar_entidades_recursivo(
          entidades[i].subEntity,
          valueAux
        );
      }
      await this.relation_sujeto_objeto(
        entidades[i].id.toString(),
        entidades[i].iotSystem,
        value[0]
      );
    }
  }

  private async relation_sujeto_objeto(
    id: string,
    systemas: IoTSystemQ[],
    ma_id: string
  ) {
    var connection = await this.conectar();
    systemas.forEach((sys) => {
      var sql = `insert INTO sujeto_objeto(suj_id,obj_id,ma_id) VALUES (${sys.id},${id}, ${ma_id})`;
      connection.execute(sql);
    });
    connection.end();
  }

  private async relation_propiedad_flujo(
    prop_id: string,
    flujos: DataFlowQ[],
    ma_id: string,
    obj_id: string
  ) {
    var connection = await this.conectar();
    flujos.forEach((flu) => {
      connection.execute(
        `insert INTO propiedad_flujodatos (pro_id, flu_id, ma_id, obj_id) VALUES (${prop_id},${flu.id}, ${ma_id}, ${obj_id})`
      );
    });
    connection.end();
  }
}
