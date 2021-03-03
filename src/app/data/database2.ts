import { JSON2Architecture } from "../models/JSON2Architecture";
import { SQL_Qwerty } from "../models/SQL_Qwerty";
import { EntityQ } from "../models/architecture/EntityQ";
import { IoTSystemQ } from "../models/architecture/IoTSystemQ";
import { DataFlowQ } from "../models/architecture/DataFlowQ";
import { PropertyQ } from "../models/architecture/PropertyQ";
const mysql = require("mysql2/promise");
import constants from "../../config/constants";

export class database2 {

  constructor() { }
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

  public async insert(element: SQL_Qwerty, tag: string[], value: string[]) {
    var connection = await this.conectar();
    var sql = element.toSqlInsert();
    for (var i = 0; i < tag.length; i++) {
      sql = sql.replace(tag[i], value[i]);
    }
    var [rows, fields] = await connection.execute(sql);
    element.id = rows.insertId;
    connection.end();
  }

  public async select(element: SQL_Qwerty, tag: string[], value: string[]) { }
  public async delete(element: SQL_Qwerty, tag: string[], value: string[]) { }

  public async architecture(architecture: JSON2Architecture, modelID: string) {
    await this.insert(
      architecture.modelIoTSystem,
      ["/@/MODELO/@/", "/@/PADRE/@/"],
      [modelID, "NULL"]
    );
    var systems = architecture.modelIoTSystem.IoTSubSystem;
    var id = architecture.modelIoTSystem.id;
    for (var i = 0; i < systems.length; i++) {
      await this.insert(
        systems[i],
        ["/@/MODELO/@/", "/@/PADRE/@/"],
        [modelID, `${id}`]
      );
    }
    var dataFlows = architecture.modelDataFlow;
    for (var i = 0; i < dataFlows.length; i++) {
      await this.insert(dataFlows[i], [], []);
    }
    this.insertar_entidades_recursivo(architecture.modelEntity, [
      modelID,
      "NULL",
    ]);
  }

  private async insertar_entidades_recursivo(
    entidades: EntityQ[],
    value: string[]
  ) {
    for (var i = 0; i < entidades.length; i++) {
      await this.insert(entidades[i], ["/@/MODELO/@/", "/@/PADRE/@/"], value);
      if (entidades[i].propertys.length > 0) {
        for (var j = 0; j < entidades[i].propertys.length; j++) {
          await this.insert(
            entidades[i].propertys[j],
            ["/@/OBJETOS/@/"],
            [`${entidades[i].id}`]
          );
          this.relation_propiedad_flujo(
            entidades[i].propertys[j].id.toString(),
            entidades[i].propertys[j].dataFlow
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
      this.relation_sujeto_objeto(
        entidades[i].id.toString(),
        entidades[i].iotSystem
      );
    }
  }

  private async relation_sujeto_objeto(id: string, systemas: IoTSystemQ[]) {
    var connection = await this.conectar();
    systemas.forEach((sys) => {
      connection.execute(
        `insert INTO sujeto_objeto(suj_id,obj_id) VALUES (${sys.id},${id})`
      );
    });
    connection.end();
  }

  private async relation_propiedad_flujo(id: string, flujos: DataFlowQ[]) {
    var connection = await this.conectar();
    flujos.forEach((flu) => {
      connection.execute(
        `insert INTO propiedad_flujodatos (pro_id, flu_id) VALUES (${id},${flu.id})`
      );
    });
    connection.end();
  }
}
