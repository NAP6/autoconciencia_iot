import { Entity } from "./Entity";
import { PropertyQ } from "./PropertyQ";
import { IoTSystemQ } from "./IoTSystemQ";
import { SQL_Qwerty } from "../SQL_Qwerty";

export class EntityQ extends Entity implements SQL_Qwerty {
  private _propertysQ: PropertyQ[];
  private _subEntityQ: EntityQ[];
  private _iotSystemQ: IoTSystemQ[];

  constructor(id: number, name: string, entityType: string) {
    super(id, name, entityType);
    this._propertysQ = [];
    this._subEntityQ = [];
    this._iotSystemQ = [];
  }

  get propertys(): PropertyQ[] {
    return this._propertysQ;
  }

  set propertys(propertys: PropertyQ[]) {
    this._propertysQ = propertys;
  }

  get subEntity(): EntityQ[] {
    return this._subEntityQ;
  }

  set subEntity(subEntity: EntityQ[]) {
    this._subEntityQ = subEntity;
  }

  get iotSystem(): IoTSystemQ[] {
    return this._iotSystemQ;
  }

  set iotSystem(iotSystem: IoTSystemQ[]) {
    this._iotSystemQ = iotSystem;
  }

  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO objeto(
	    	ma_id, 
	    	obj_nombre, 
	    	obj_tipo, 
		obj_padre
            ) VALUES (
	    	/@/MODELO/@/, 
	    	'${this.name}', 
	    	'${this.entityType}', 
	    	/@/PADRE/@/
    	   )`;
    for (var i = 0; i < tag.length; i++) {
      sql = sql.replace(tag[i], value[i]);
    }
    return sql;
  }

  toSqlSelect(tag: string[], value: string[],seleccion:string): string {
    var select;
    var listaS = [
      "PhysicalEntity",
      "CloudNode",
      "FogNode",
      "IoTGateway",
      "Sensor",
      "Tag",
      "Actuator",
      "Network",
    ];
    var i = -1;
    if (seleccion == "Entidades Físicas") {
      i = listaS.indexOf("PhysicalEntity");
      select = "PhysicalEntity";
    } else if (seleccion == "Nodos Cloud") {
      i = listaS.indexOf("CloudNode");
      select = "CloudNode";
    } else if (seleccion == "Nodos Fog") {
      i = listaS.indexOf("FogNode");
      select = "FogNode";
    } else if (seleccion == "Gateway IoT") {
      i = listaS.indexOf("IoTGateway");
      select = "IoTGateway";
    } else if (seleccion == "Sensores") {
      i = listaS.indexOf("Sensor");
      select = "Sensor";
    } else if (seleccion == "Tags") {
      i = listaS.indexOf("Tag");
      select = "Tag";
    } else if (seleccion == "Actuadores") {
      i = listaS.indexOf("Actuator");
      select = "Actuator";
    } else if (seleccion == "Red") {
      i = listaS.indexOf("Network");
      select = "Network";
    }
    if (i != -1) {
      listaS.splice(i, 1);
    }
    
    var tagList={
      "/@/MODEL/@/":"ma_id= ",
    };
    var sql = `SELECT obj_id as id, obj_tipo as tipo, obj_nombre as nombre, obj_activo as activo, obj_padre as padre FROM objeto WHERE `;
    for (var i = 0; i < tag.length; i++) {
      sql += tagList[tag[i]] + value[i];
      if (i < tag.length - 1) {
          sql += " AND ";
      }
  }
    select = listaS.pop();
    listaS.forEach((element) => {
      sql += `obj_tipo!='${element}' AND `;
    });
    sql += `obj_tipo!='${select}' ORDER BY id`;
  
  console.log(sql);
    return sql+'  ORDER BY  ';
  }

  toSqlDelete(tag: string[], value: string[]): string {
    return ``;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    return ``;
  }

  toObjectArray(rows): SQL_Qwerty[] {
    return [];
  }
}
