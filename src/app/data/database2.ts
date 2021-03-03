import { JSON2Architecture } from "../models/JSON2Architecture";
import { SQL_Qwerty } from "../models/SQL_Qwerty";
import { Entity } from "../models/architecture/Entity";
import { IoTSystem } from "../models/architecture/IoTSystem";
import { DataFlow } from "../models/architecture/DataFlow";
const mysql = require("mysql2/promise");

export class database2 {
  private connection;

  constructor() {}
  public async conectar() {
    this.connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "db_autoconscienciaf",
    });
  }

  public async insert(element: SQL_Qwerty, tag: string[], value: string[]) {
    var sql = element.toSql();
    for (var i = 0; i < tag.length; i++) {
      sql = sql.replace(tag[i], value[i]);
    }
    var [rows, fields] = await this.connection.execute(sql);
    element.id = rows.insertId;
  }
  public async select(element: SQL_Qwerty, tag: string[], value: string[]) {}
  public async delete(element: SQL_Qwerty, tag: string[], value: string[]) {}
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
    entidades: Entity[],
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

  private relation_sujeto_objeto(id: string, systemas: IoTSystem[]) {
    systemas.forEach((sys) => {
      this.connection.execute(
        `insert INTO sujeto_objeto(suj_id,obj_id) VALUES (${sys.id},${id})`
      );
    });
  }

  private relation_propiedad_flujo(id: string, flujos: DataFlow[]) {
    flujos.forEach((flu) => {
      this.connection.execute(
        `insert INTO propiedad_flujodatos (pro_id, flu_id) VALUES (${id},${flu.id})`
      );
    });
  }
}
