import { Console } from "console";
import { randomInt } from "crypto";
import * as mysql from "mysql";
import constants from "../../config/constants";
import { objetivos_sujetos } from "../controller/controller-api";

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
  //seleccionar Enumeracion
  public getEnumeracion(tipo: string, func: Function): void {
    var sql = `SELECT enu_nombre_valor, enu_valor
      FROM enumeracion
      WHERE enu_nombre_enumeracion = '${tipo}'`;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaEnumeracion: Array<object> = [];
      for (const i in result) {
        var aux = {
          nombre: result[i]["ma_id"],
          valor: result[i]["ma_nombre"],
        };
        listaEnumeracion.push(aux);
      }
      func(listaEnumeracion);
    });
  }
  public getUser_get_enumeracion(
    userID: string,
    tipo: string,
    func: Function
  ): void {
    console.log(
      `############# Envio a la funcion 'getUser_get_Enumeracion' el id de usuario '${tipo}`
    );
    this.connector.query(
      `SELECT enu_id, enu_nombre_valor FROM enumeracion WHERE enu_nombre_enumeracion='${tipo}'`,
      (err, result, fields) => {
        if (err) err;
        var listaUmedicion: Array<object> = [];
        for (const i in result) {
          var auxmedicion = {
            id: result[i]["enu_id"],
            nombre: result[i]["enu_nombre_valor"],
          };
          listaUmedicion.push(auxmedicion);
        }
        func(listaUmedicion);
      }
    );
  }
  //Guarda un nuevo modelo
  public save_newModel(
    nombre: string,
    descripcion: string,
    autor: string,
    modelo: object,
    user_id: string,
    func: Function
  ): void {
    var sql = `INSERT INTO modeloautoconsciencia (ma_nombre, ma_descripcion, ma_autor, ma_activo, ma_modelo_arquitectura, usr_id) 
    VALUES ('${nombre}', '${descripcion}', '${autor}', '1', '${JSON.stringify(
      modelo
    ).replace("'", "$/COMILLA_SIMPLE/")}','${user_id}')`;
    this.connector.query(sql, function (error, results) {
      if (error) throw error;
      func(results.insertId);
    });
  }

  public update_modal(
    id: string,
    nombre: string,
    descripcion: string,
    activo: string
  ) {
    console.log(
      `########## Envio a la funcion de actualizar modelo ID: ${id}, Nombre: ${nombre}, descripcion: ${descripcion},activo:${activo}`
    );
    if (activo == "true") {
      var activ = "1";
    } else {
      activ = "0";
    }
    this.connector.query(
      `UPDATE modeloautoconsciencia 
      SET ma_nombre = '${nombre}', ma_descripcion = '${descripcion}', ma_activo = '${activ}'
      WHERE ma_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  //Eliminar modelo
  public delete_modal(id: string) {
    console.log(`########## Envio a la funcion de eliminar modelo ID: ${id}`);
    this.connector.query(
      `DELETE FROM modeloautoconsciencia 
      WHERE ma_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }

  public del_deployment_resources(id: string, func: Function) {

    var sql = `DELETE FROM recursoimplementacion WHERE ri_id = '${id}'`;

    this.connector.query(sql, function (err, result) {
      if (err) throw err;
      func({ mensaje: "exito al eleminar" });
    });
  }
  public ask_deployment_resources_select(tipo: string, func: Function) {
    var sql = `SELECT ri_id as id, ri_nombre as nombre FROM recursoimplementacion WHERE ri_tipo_recurso = '${tipo}'`;


    this.connector.query(sql, function (err, result) {
      if (err) throw err;
      func(result);
    });
  }
  public ask_deployment_resources(id: string, func: Function) {
    var sql = `SELECT ri.ri_nombre as nombre, ri.ri_descripcion as descripcion, ri.ri_tipo_dato_salida as tipo , ri.ri_activo as activo, ri.ri_tipo_recurso as recurso,en.enu_nombre_valor as nombre_salida FROM recursoimplementacion ri ,enumeracion en WHERE ri_id = '${id}'  AND ri.ri_tipo_dato_salida=en.enu_id`;
    var respuesta: resource = { nombre: "", descripcion: "", tipoRecurso: "", EspecificoTipo: { datoSalida: "" }, arregloParametros: [] };

    this.connector.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result[0]);
      respuesta.nombre = result[0]['nombre'];
      respuesta.descripcion = result[0]['descripcion'];
      respuesta.EspecificoTipo.datoSalida = result[0]['tipo'].toString();
      respuesta.EspecificoTipo.nombre_datoSalida = result[0]['nombre_salida'];
      respuesta.tipoRecurso = result[0]['recurso'].toString();
      var db = new mysql_connector();
      db.ask_parametros(respuesta, id, func);

    });
  }
  public sk_input_arguments(AspectoId: string, metricaT: string, func: Function) {
    var sql = `SELECT met_id as id, met_nombre as nombre FROM metrica WHERE met_activo=1 AND aa_id=${AspectoId} AND met_tipo=${metricaT}`;
    this.connector.query(sql, function (err, result) {
      if (err) throw err;
      func(result);


    });
  }

  public ask_tipo_recurso(json: resource, id: string, func: Function,) {
    if (json.tipoRecurso == "0") {
      var sql = `SELECT for_expresion as expresion FROM formula  WHERE ri_id = '${id}'`;

      this.connector.query(sql, function (err, result) {
        if (err) throw err;
        json.EspecificoTipo.formula = result[0]['expresion'];
        func(json);
      });
    } else if (json.tipoRecurso == "1") {
      var sql = `SELECT fun_instrucciones as instrucciones FROM funcion WHERE ri_id = '${id}'`;

      this.connector.query(sql, function (err, result) {
        if (err) throw err;
        json.EspecificoTipo.instrucciones = result[0]['instrucciones'];
        func(json);
      });

    } else if (json.tipoRecurso == "2") {
      var sql = `SELECT ser_punto_final as punto,ser_instrucciones as instrucciones, ser_tipo_formato_dato_salida as formato FROM servicio  WHERE ri_id = '${id}'`;
      this.connector.query(sql, function (err, result) {
        if (err) throw err;
        json.EspecificoTipo.endPoint = result[0].punto;
        json.EspecificoTipo.instrucciones = result[0]['instrucciones'];
        json.EspecificoTipo.formatoSalida = result[0]['formato'].toString();
        func(json);
      });
    }
  }
  public ask_parametros(json: resource, id: string, func: Function,) {
    var sql = `SELECT pa.par_ordinal as ordinal,pa.par_nombre as nombre, pa.par_opcional as opcional, pa.par_activo as activo,pa.par_tipo_dato as tipo,enu.enu_nombre_valor as nombre_salida FROM parametro pa, enumeracion enu  WHERE ri_id = '${id}' AND pa.par_tipo_dato=enu.enu_id`;
    this.connector.query(sql, function (err, result) {
      if (err) throw err;
      result.forEach(element => {
        var par: parametros = { ordinal: element['ordinal'].toString(), nombre: element['nombre'], opcional: element['opcional'].toString(), activo: element['activo'].toString(), tipo: element['tipo'].toString(), tipoNombre: element['nombre_salida'] };
        json.arregloParametros.push(par);
      });
      var db = new mysql_connector();
      db.ask_tipo_recurso(json, id, func);

    });
  }


  public add_deployment_resources(json: resource, func: Function) {
    var sql = `INSERT INTO recursoimplementacion (ri_nombre, ri_descripcion, ri_tipo_dato_salida, ri_tipo_recurso) VALUES ('${json.nombre}', '${json.descripcion.replace("'", "\\'")}', '${json.EspecificoTipo.datoSalida}', '${json.tipoRecurso}');`;
    this.connector.query(sql, (err, result) => {
      if (err) throw err;
      console.log(json);
      if (json.tipoRecurso == "0") {
        sql = `INSERT INTO formula (for_expresion,ri_id) VALUES ('${json.EspecificoTipo.formula}','${result.insertId}');`;
        this.connector.query(sql, (err, result) => {
          if (err) throw err;
        });
      } else if (json.tipoRecurso == "1") {
        sql = `INSERT INTO funcion (fun_instrucciones,fun_pre_existente, ri_id) VALUES ('${json.EspecificoTipo.instrucciones}','${json.EspecificoTipo.preExistent ? 1 : 0}', '${result.insertId}');`;
        this.connector.query(sql, (err, result) => {
          if (err) throw err;
        });
      } else if (json.tipoRecurso == "2") {
        sql = `INSERT INTO servicio (ser_punto_final, ser_instrucciones,ser_pre_existente, ser_tipo_formato_dato_salida, ri_id) VALUES ('${json.EspecificoTipo.endPoint}', '${json.EspecificoTipo.instrucciones}','${json.EspecificoTipo.preExistent ? 1 : 0}', '${json.EspecificoTipo.formatoSalida}', '${result.insertId}')`;

        this.connector.query(sql, (err, result) => {
          if (err) throw err;
        });
      }
      json.arregloParametros.forEach((parametro) => {
        sql = `INSERT INTO parametro (par_ordinal, par_nombre, par_opcional, par_activo, par_tipo_dato, ri_id) VALUES ('${parametro!.ordinal
          }', '${parametro!.nombre}', '${parametro!.opcional == "true" ? 1 : 0
          }', '${parametro!.activo == "true" ? 1 : 0}', '${parametro!.tipo}', '${result.insertId
          }');`;

        this.connector.query(sql, (err, result) => {
          if (err) throw err;
        });
      });
    });

    func({ mensaje: "todo bien" });
  }

  public get_deployment_resources(func: Function) {
    var sql = `SELECT ri_id as id, ri_nombre as nombre, ri_descripcion as descripcion, ri_tipo_dato_salida as tipo_salida, ri_activo as activo, ri_tipo_recurso as tipo_recurso FROM recursoimplementacion`;
    this.connector.query(sql, (err, result) => {
      if (err) throw err;
      func(result);
    });
  }

  public get_subjects(modelID: string, func: Function) {
    var sql = `SELECT suj_id as id, suj_nombre as nombre, suj_activo as activo, suj_padre as padre FROM sujeto WHERE ma_id = ${modelID} ORDER BY id`;
    this.connector.query(sql, (err, result) => {
      if (err) throw err;
      func(result);
    });
  }

  public delete_subjects_objects(objectID: string, func: Function) {
    var sql = `DELETE FROM objetivo WHERE objetivo.obj_id = ${objectID}`;
    this.connector.query(sql, (err, result) => {
      if (err) throw err;
      func();
    });
  }
  public get_subjectsObjects(subjectID: string, func: Function) {
    var sql = `SELECT obj_id as id, obj_nombre as nombre, obj_descripcion as descripcion, obj_peso as peso, obj_operacion_agregacion as asignacion, obj_activo as activo, obj_padre as padre  FROM objetivo WHERE suj_id = ${subjectID} ORDER BY id`;

    this.connector.query(sql, (err, result) => {
      if (err) throw err;
      func(result);
    });
  }

  public save_subjects_objects(
    newObject: {
      id_padre: string;
      nombre: string;
      descripcion: string;
      peso: string;
      operador: string;
      activo: boolean;
      sujeto_id: string;
    },
    func: Function
  ) {
    var sql = ``;
    if (newObject.id_padre) {
      sql = `INSERT INTO objetivo (obj_nombre, obj_descripcion, obj_peso, obj_operacion_agregacion, suj_id, obj_activo, obj_padre) VALUES ('${newObject.nombre
        }', '${newObject.descripcion}', '${newObject.peso}', '${newObject.operador
        }', '${newObject.sujeto_id}', '${newObject.activo ? 1 : 0}', '${newObject.id_padre
        }');`;
    } else {
      sql = `INSERT INTO objetivo (obj_nombre, obj_descripcion, obj_peso, obj_operacion_agregacion, suj_id, obj_activo) VALUES ('${newObject.nombre
        }', '${newObject.descripcion}', '${newObject.peso}', '${newObject.operador
        }', '${newObject.sujeto_id}', '${newObject.activo ? 1 : 0}');`;
    }
    this.connector.query(sql, function (err, results) {
      if (err) throw err;
      func();
    });
  }
  public get_entitys(modelID: string, seleccion: string, func: Function) {
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
    var sql = `SELECT obj_id as id, obj_tipo as tipo, obj_nombre as nombre, obj_activo as activo, obj_padre as padre FROM objeto WHERE ma_id = ${modelID} AND `;
    select = listaS.pop();
    listaS.forEach((element) => {
      sql += `obj_tipo!='${element}' AND `;
    });
    sql += `obj_tipo!='${select}' ORDER BY id`;
    this.connector.query(sql, (err, result) => {
      if (err) throw err;
      func(result);
    });
  }

  public async save_subjects(modelID: string, subjects: [systemObj]) {
    subjects.forEach((elem) => {
      this.save_oneSubject(modelID, elem);
    });
  }

  public async save_oneSubject(
    modelID: string,
    subject: systemObj,
    subjectSup?: number
  ) {
    var sql = ``;
    if (subjectSup) {
      sql = `INSERT INTO sujeto (ma_id, suj_nombre, suj_padre) VALUES (${modelID}, '${subject.$.name}', ${subjectSup});`;
    } else {
      sql = `INSERT INTO sujeto (ma_id, suj_nombre) VALUES (${modelID}, '${subject.$.name}')`;
    }
    this.connector.query(sql, function (err, results) {
      if (err) throw err;
      if (subject.iotSubsystem) {
        subject.iotSubsystem.forEach((sub) => {
          var db = new mysql_connector();
          db.save_oneSubject(modelID, sub, results.insertId);
        });
      }
    });
  }

  public update_subject(id: string, active: string) {
    var sql = `UPDATE sujeto SET suj_activo = '${active ? 1 : 0
      }' WHERE sujeto.suj_id = ${id};`;
    this.connector.query(sql, function (err, results) {
      if (err) throw err;
    });
  }

  public save_subjectsObjects(modelID: string, json: object): void {
    console.log(
      `########## Envio a la funcion de guardar objetos del sujeto, modelo: ${modelID} \n ${JSON.stringify(
        json
      )}`
    );
  }

  public async save_entity(modelID: string, subjects: [systemEnt] | undefined) {
    if (subjects)
      subjects.forEach((elem) => {
        this.save_oneEntity(modelID, elem);
      });
  }
  public async save_oneEntity(
    modelID: string,
    entity: systemEnt,
    subjectSup?: number
  ) {
    var sql = ``;

    if (
      subjectSup &&
      !(entity.$["xsi:type"] == "Tag") &&
      !(entity.$["xsi:type"] == "FogNode") &&
      !(entity.$["xsi:type"] == "Sensor") &&
      !(entity.$["xsi:type"] == "Actuator") &&
      !(entity.$["xsi:type"] == "IoTGateway")
    ) {
      sql = `INSERT INTO objeto (ma_id, obj_tipo, obj_nombre, obj_padre) VALUES (${modelID},'${entity.$["xsi:type"]}','${entity.$.name}', ${subjectSup});`;
    } else {
      sql = `INSERT INTO objeto (ma_id, obj_tipo, obj_nombre) VALUES (${modelID}, '${entity.$["xsi:type"]}', '${entity.$.name}')`;
    }
    this.connector.query(sql, function (err, results) {
      if (err) throw err;
      if (entity.has) {
        var db = new mysql_connector();
        db.save_properties(entity, results.insertId);
      }
      if (entity.containsResource) {
        entity.containsResource.forEach((sub) => {
          var db = new mysql_connector();
          db.save_oneEntity(modelID, sub, results.insertId);
        });
      }
      if (entity.Entity) {
        entity.Entity.forEach((sub) => {
          var db = new mysql_connector();
          db.save_oneEntity(modelID, sub, results.insertId);
        });
      }
      if (entity.comput) {
        entity.comput.forEach((sub) => {
          var db = new mysql_connector();
          db.save_oneEntity(modelID, sub, results.insertId);
        });
      }
    });
  }
  public save_properties(system: systemEnt, id: string) {

    system.has?.forEach(element => {
      var sql = `INSERT INTO propiedad(pro_nombre,obj_id) VALUES ('${element?.$.name}','${id}')`;
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        var prop_id = results.insertId;
        var db = new mysql_connector();
        element?.dataFlow?.forEach(elemento => {
          db.save_flujo(element, prop_id);
        });
      });
    });

  }

  public save_flujo(system: flujos, id_prop: string) {

    system.dataFlow?.forEach(element => {
      var sql = `INSERT INTO flujodatos(flu_descripcion,flu_tipo_comunicacion) VALUES ('${element?.description}','${element?.communicationType}')`;
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        var flu_id = results.insertId;
        var db = new mysql_connector();
        db.save_flujo_propiedades(flu_id, id_prop);
      });
    });

  }
  public save_flujo_propiedades(flu_id: string, id_prop: string) {
    var sql = `INSERT INTO propiedad_flujodatos(pro_id,flu_id) VALUES ('${flu_id}','${id_prop}')`;
    this.connector.query(sql, function (err, results) {
      if (err) throw err;
    });

  }



  public update_entity(id: string, active: string) {
    var sql = `UPDATE objeto SET obj_activo = '${active ? 1 : 0
      }' WHERE objeto.obj_id = ${id};`;
    this.connector.query(sql, function (err, results) {
      if (err) throw err;
    });
  }

  public getfisicalModel(modelID: string): object {
    console.log(
      `############# Envio a la funcion 'getfisicalModel' el id de usuario '${modelID}`
    );

    return this.modelo;
  }
  //Valida el usuario ingresado
  public validateUser(
    emailUser: string,
    passwoedUser: string,
    func: Function
  ): void {
    var sql = `SELECT count(usr_id) as count FROM usuario WHERE usr_correo = '${emailUser}' and usr_password = '${passwoedUser}' `;
    this.connector.query(sql, (err, result) => {
      if (err) {
        err;
      }
      func(result[0].count);
    });
  }
  //Obtiene el usuario para validarlo
  public getUser(
    userEmail: string,
    passwoedUser: string,
    func: Function
  ): void {
    this.connector.query(
      `SELECT usr_id, usr_nombre, usr_correo FROM usuario WHERE usr_correo = '${userEmail}' `,
      function (error, results, fields) {
        if (error) throw error;
        func({
          userID: results[0].usr_id,
          userName: results[0]!.usr_nombre,
          email: results[0]!.usr_correo,
        });
      }
    );
  }

  public getUserModels(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUserModels' el id de usuario '${userID}'`
    );
    var sql = `SELECT ma_id, ma_nombre, ma_descripcion, ma_autor, CONVERT(ma_modelo_arquitectura USING utf8) as ma_modelo_arquitectura,ma_activo
      FROM modeloautoconsciencia
      WHERE usr_id = '${userID}'`;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaModelo: Array<object> = [];
      var act;
      for (const i in result) {
        if (result[i]["ma_activo"] == 1) {
          act = "true";
        } else if (result[i]["ma_activo"] == 0) {
          act = "false";
        }
        var auxmodel = {
          id: result[i]["ma_id"],
          nombre: result[i]["ma_nombre"],
          descripcion: result[i]["ma_descripcion"],
          autor: result[i]["ma_autor"],
          json: result[i]["ma_modelo_arquitectura"].replace(
            "$/COMILLA_SIMPLE/",
            "'"
          ),
          activo: act,
        };
        listaModelo.push(auxmodel);
      }
      func(listaModelo);
    });
  }
  public async getModel(modelID: string, func: Function): Promise<void> {
    console.log(
      `############# Envio a la funcion 'getModel' el id de usuario '${modelID}`
    );
    var sql = `SELECT ma_id,ma_nombre,ma_descripcion,ma_autor,ma_activo
    FROM modeloautoconsciencia
    WHERE ma_id = '${modelID}'`;
    await this.connector.query(sql, (err, result) => {
      if (err) err;
      func({
        nombre: result[0].ma_nombre,
        descripcion: result[0].ma_descripcion,
        modelID: result[0].ma_id,
      });
    });
  }

  public getUser_measurementUnit(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_measurementUnit' el id de usuario '${userID}`
    );

    this.connector.query(
      `SELECT um_id, um_nombre, um_descripcion, um_acronimo, um_activo
      FROM unidadmedicion`,
      (err, result, fields) => {
        if (err) err;
        var listaUmedicion: Array<object> = [];
        var act;
        for (const i in result) {
          //console.log(result[i]);
          if (result[i]["um_activo"] == 1) {
            act = "true";
          } else if (result[i]["um_activo"] == 0) {
            act = "false";
          }
          var auxmedicion = {
            id: result[i]["um_id"],
            nombre: result[i]["um_nombre"],
            descripcion: result[i]["um_descripcion"],
            acronimo: result[i]["um_acronimo"],
            activo: act,
          };
          listaUmedicion.push(auxmedicion);
        }
        func(listaUmedicion);
      }
    );
  }
  public getUser_enumeracion(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_measurementUnit' el id de usuario '${userID}`
    );

    this.connector.query(
      `SELECT enu_id, enu_nombre_valor FROM enumeracion`,
      (err, result, fields) => {
        if (err) err;
        var listaUmedicion: Array<object> = [];

        for (const i in result) {
          var auxmedicion = {
            id: result[i]["enu_id"],
            nombre: result[i]["enu_nombre_valor"],
          };

          listaUmedicion.push(auxmedicion);
        }
        func(listaUmedicion);
      }
    );
  }
  public addUser_measurementUnit(
    idUser: string,
    name: string,
    descripcion: string,
    acronym: string
  ): void {
    console.log(
      `############# Envio a la funcion 'addUser_measurementUnit' el id de usuario '${idUser}, nombre: ${name}, descripcion: ${descripcion}, acronym: ${acronym}`
    );
    this.connector.query(
      `INSERT INTO unidadmedicion (um_nombre, um_descripcion, um_acronimo, um_activo) 
      VALUES ('${name}', '${descripcion}','${acronym}', '1')`,
      function (error, results) {
        if (error) throw error;
        //console.log('The solution is: ', results[0].solution);
      }
    );
  }

  public delUser_measurementUnit(idUser: string, id: string): void {
    /* console.log(
      `############# Envio a la funcion 'delUser_measurementUnit' el id de usuario '${idUser}, id: ${id}`
    ); */
    this.connector.query(
      `DELETE  FROM unidadmedicion 
      WHERE um_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public updUser_measurementUnit(
    idUser: string,
    id: string,
    name: string,
    descripcion: string,
    acronym: string,
    activo: string
  ): void {
    console.log(
      `############# Envio a la funcion 'updUser_measurementUnit' el id de usuario '${idUser}, id: ${id}, nombre: ${name}, descripcion: ${descripcion}, acronym: ${acronym},activo:${activo}`
    );
    var act;
    if (activo == "true") {
      act = 1;
    } else if (activo == "false") {
      act = 0;
    }
    this.connector.query(
      `UPDATE unidadmedicion 
      SET um_nombre = '${name}', um_descripcion = '${descripcion}', um_acronimo = '${acronym}', um_activo = '${act}'
      WHERE um_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public getUser_escales_select(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_escales' el id de usuario '${userID}`
    );
    this.connector.query(
      `SELECT esc_id, esc_nombre
      FROM escala`,
      (err, result, fields) => {
        if (err) err;
        var listaEscala: Array<object> = [];
        for (const i in result) {
          //console.log(result[i]);
          var auxescala = {
            id: result[i]["esc_id"],
            nombre: result[i]["esc_nombre"],
          };
          listaEscala.push(auxescala);
        }
        func(listaEscala);
      }
    );
  }

  public getUser_escales(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_escales' el id de usuario '${userID}`
    );
    this.connector.query(
      `SELECT esc_id, esc_nombre, esc_valores_validos, esc_tipo, esc_activo
      FROM escala`,
      (err, result, fields) => {
        if (err) err;
        var listaEscala: Array<object> = [];
        var tip;
        var act;
        for (const i in result) {
          //console.log(result[i]);
          if (result[i]["esc_tipo"] == 1) {
            tip = "Ordinal";
          } else if (result[i]["esc_tipo"] == 2) {
            tip = "Nominal";
          } else if (result[i]["esc_tipo"] == 3) {
            tip = "Rango";
          } else if (result[i]["esc_tipo"] == 4) {
            tip = "Ratio";
          }

          if (result[i]["esc_activo"] == 1) {
            act = "true";
          } else if (result[i]["esc_activo"] == 0) {
            act = "false";
          }
          var auxescala = {
            id: result[i]["esc_id"],
            nombre: result[i]["esc_nombre"],
            valor_valido: result[i]["esc_valores_validos"],
            tipo: tip,
            activo: act,
          };
          listaEscala.push(auxescala);
        }
        func(listaEscala);
      }
    );
  }
  public addUser_escales(
    idUser: string,
    name: string,
    valor_valido: string,
    tipo: string
  ): void {
    var tip;
    if (tipo == "Ordinal") {
      tip = 1;
    } else if (tipo == "Nominal") {
      tip = 2;
    } else if (tipo == "Rango") {
      tip = 3;
    } else if (tipo == "Ratio") {
      tip = 4;
    }
    this.connector.query(
      `INSERT INTO escala (esc_nombre, esc_valores_validos, esc_tipo, esc_activo) 
      VALUES ('${name}', '${valor_valido}','${tip}', '1')`,
      function (error, results) {
        if (error) throw error;
        //console.log('The solution is: ', results[0].solution);
      }
    );
  }

  public delUser_escales(idUser: string, id: string): void {
    console.log(
      `############# Envio a la funcion 'delUser_escales' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(
      `DELETE  FROM escala 
      WHERE esc_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public updUser_escales(
    idUser: string,
    id: string,
    name: string,
    valor_valido: string,
    tipo: string,
    activo: string
  ): void {
    console.log(
      `############# Envio a la funcion 'updUser_escales' el id de usuario '${idUser}, id: ${id}, nombre: ${name}, valor_valido: ${valor_valido},tipo: ${tipo},activo: ${activo}`
    );
    var tip;
    var act;
    if (tipo == "Ordinal") {
      tip = 1;
    } else if (tipo == "Nominal") {
      tip = 2;
    } else if (tipo == "Rango") {
      tip = 3;
    } else if (tipo == "Ratio") {
      tip = 4;
    }

    if (activo == "true") {
      act = 1;
    } else if (activo == "false") {
      act = 0;
    }
    this.connector.query(
      `UPDATE escala 
      SET esc_nombre = '${name}', esc_valores_validos = '${valor_valido}', esc_tipo = '${tip}', esc_activo = '${act}'
      WHERE esc_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }

  //INICIO RECURSOS DE IMPLEMENTACION

  public getUser_ri(userID: string, func: Function): void {
    this.connector.query(
      `SELECT ri_id, ri_nombre, ri_descripcion, ri_tipo_dato_salida, 
              ri_tipo_recurso, ri_activo
      FROM recursoimplementacion`,
      (err, result, fields) => {
        if (err) err;
        var lista: Array<object> = [];
        var act;
        for (const i in result) {
          //console.log(result[i]);
          if (result[i]["ri_activo"] == 1) {
            act = "true";
          } else if (result[i]["ri_activo"] == 0) {
            act = "false";
          }
          var aux = {
            id: result[i]["ri_id"],
            nombre: result[i]["ri_nombre"],
            descripcion: result[i]["ri_descripcion"],
            tipo_dato_salida: result[i]["ri_tipo_dato_salida"],
            tipo_recurso: result[i]["ri_tipo_recurso"],
            activo: act,
          };
          lista.push(aux);
        }
        func(lista);
      }
    );
  }
  public addUser_ri(
    idUser: string,
    name: string,
    descripcion: string,
    tds: string, //tipo dato salida
    tr: string, //tipo recurso
    exp: string, //expresion formula
    path: string, //path funcion
    inst: string, //instruccion funcion
    pf: string, //punto final servicio
    instS: string, //instruccion salida
    ts: string //tipo formato salida servicio
  ): void {
    console.log("es de tipo recurso" + tr);
    var aux;
    if (tr == "modal_tipo_recurso_formula_add") {
      aux = "FÓRMULA";
    } else if (tr == "modal_tipo_recurso_funcion_add") {
      aux = "FUNCIÓN";
    } else if (tr == "modal_tipo_recurso_servicio_add") {
      aux = "SERVICIO";
    }
    this.connector.query(
      `INSERT INTO recursoimplementacion (ri_nombre, ri_descripcion, ri_tipo_dato_salida, ri_tipo_recurso, ri_activo) 
      VALUES ('${name}', '${descripcion}', '${tds}', '${aux}', '1')`,

      function (error, results) {
        if (error) throw error;
        //console.log('The solution is: ', results[0].solution);
      }
    );
    if (tr == "modal_tipo_recurso_formula_add") {
      this.addUser_formula(name, tr, exp);
    } else if (tr == "modal_tipo_recurso_funcion_add") {
      this.addUser_funcion(name, tr, path, inst);
    } else if (tr == "modal_tipo_recurso_servicio_add") {
      this.addUser_servicio(name, tr, pf, instS, ts);
    }
  }

  public addUser_formula(name: string, tr: string, expresion: string): void {
    console.log("es de tipo recurso" + expresion);
    var aux;
    var ri_id;
    if (tr == "modal_tipo_recurso_formula_add") {
      aux = "FÓRMULA";
    } else if (tr == "modal_tipo_recurso_funcion_add") {
      aux = "FUNCIÓN";
    } else if (tr == "modal_tipo_recurso_servicio_add") {
      aux = "SERVICIO";
    }

    ri_id = this.connector.query(
      `SELECT ri_id FROM recursoimplementacion 
      WHERE ri_tipo_recurso = '${aux}' and ri_nombre = '${name}'`
    );

    this.connector.query(
      `SELECT ri_id FROM recursoimplementacion 
      WHERE ri_tipo_recurso = '${aux}' and ri_nombre = '${name}'`,

      `INSERT INTO formula (for_expresion, ri_id) 
      VALUES ('${expresion}', '${ri_id}')`,

      function (error, results) {
        if (error) throw error;
        //console.log('The solution is: ', results[0].solution);
      }
    );
  }

  public addUser_funcion(
    name: string,
    tr: string,
    path: string,
    inst: string
  ): void {
    console.log("es de tipo recurso" + tr);
    var aux;
    var ri_id;
    if (tr == "modal_tipo_recurso_formula_add") {
      aux = "FÓRMULA";
    } else if (tr == "modal_tipo_recurso_funcion_add") {
      aux = "FUNCIÓN";
    } else if (tr == "modal_tipo_recurso_servicio_add") {
      aux = "SERVICIO";
    }
    this.connector.query(
      (ri_id = `SELECT ri_id FROM recursoimplementacion 
      WHERE ri_tipo_recurso = '${aux}' and ri_nombre = '${name}'`),
      `INSERT INTO funcion (fun_path, fu_instrucciones, ri_id) 
      VALUES ('${path}', '${inst}', '${ri_id}')`,

      function (error, results) {
        if (error) throw error;
        //console.log('The solution is: ', results[0].solution);
      }
    );
  }

  public addUser_servicio(
    name: string,
    tr: string,
    pf: string,
    instS: string,
    ts: string
  ): void {
    console.log("es de tipo recurso" + tr);
    var aux;
    var ri_id;
    if (tr == "modal_tipo_recurso_formula_add") {
      aux = "FÓRMULA";
    } else if (tr == "modal_tipo_recurso_funcion_add") {
      aux = "FUNCIÓN";
    } else if (tr == "modal_tipo_recurso_servicio_add") {
      aux = "SERVICIO";
    }
    this.connector.query(
      (ri_id = `SELECT ri_id FROM recursoimplementacion 
      WHERE ri_tipo_recurso = '${aux}' and ri_nombre = '${name}'`),
      `INSERT INTO servicio (ser_punto_final, ser_instrucciones, ser_tipo_formato_dato_salida, ri_id) 
      VALUES ('${pf}', '${instS}', '${ts}', '${ri_id}')`,

      function (error, results) {
        if (error) throw error;
        //console.log('The solution is: ', results[0].solution);
      }
    );
  }

  public delUser_ri(idUser: string, id: string): void {
    console.log(
      `############# Envio a la funcion 'delUser_escales' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(
      `DELETE  FROM escala 
      WHERE esc_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public updUser_ri(
    idUser: string,
    id: string,
    name: string,
    valor_valido: string,
    activo: string,
    tipo: string
  ): void {
    /* console.log(
      `############# Envio a la funcion 'updUser_escales' el id de usuario '${idUser}, id: ${id}, nombre: ${name}, valor_valido: ${valor_valido},activo: ${activo},tipo: ${tipo}`
    ); */
    var tip;
    var act;
    if (tipo == "Ordinal") {
      tip = 1;
    } else if (tipo == "Nominal") {
      tip = 2;
    } else if (tipo == "Rango") {
      tip = 3;
    } else if (tipo == "Ratio") {
      tip = 4;
    }
    if (activo == "true") {
      act = 1;
    } else if (activo == "false") {
      act = 0;
    }
    this.connector.query(
      `UPDATE escala 
      SET esc_nombre = '${name}', esc_valores_validos = '${valor_valido}', esc_tipo = '${tip}', esc_activo = '${act}'
      WHERE esc_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }

  //FIN RECURSOS DE IMPLEMENTACION

  public getUser_decision_criteria(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_escales' el id de usuario '${userID}`
    );
    this.connector.query(
      `SELECT cd_id, cd_nombre, cd_descripcion, cd_activo
      FROM criteriodecision`,
      (err, result, fields) => {
        if (err) err;
        var lista: Array<object> = [];
        var act;
        for (const i in result) {
          //console.log(result[i]);

          if (result[i]["cd_activo"] == 1) {
            act = "true";
          } else if (result[i]["cd_activo"] == 0) {
            act = "false";
          }
          var aux = {
            id: result[i]["cd_id"],
            nombre: result[i]["cd_nombre"],
            descripcion: result[i]["cd_descripcion"],
            activo: act,
          };
          lista.push(aux);
        }
        func(lista);
      }
    );
  }
  public addUser_criteriaDecision(
    idUser: string,
    name: string,
    descripcion: string
  ): void {
    console.log(
      `############# Envio a la funcion 'addUser_criteriaDecision' el id de usuario '${idUser}, nombre: ${name}, descripcion: ${descripcion}`
    );
    var sql = `INSERT INTO criteriodecision (cd_nombre, cd_descripcion, cd_activo) 
    VALUES ('${name}', '${descripcion}', '1')`;
    this.connector.query(sql, function (error, results) {
      if (error) throw error;
      //console.log('The solution is: ', results[0].solution);
    });
  }

  public delUser_criteriaDecision(idUser: string, id: string): void {
    console.log(
      `############# Envio a la funcion 'delUser_criteriaDecision' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(
      `DELETE  FROM criteriodecision 
      WHERE cd_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public updUser_criteriaDecision(
    idUser: string,
    id: string,
    name: string,
    descripcion: string,
    activo: string
  ): void {
    console.log(
      `############# Envio a la funcion 'updUser_criteriaDecision' el id de usuario '${idUser}, id: ${id}, nombre: ${name}, descripcion: ${descripcion},activo:${activo}`
    );
    var act;
    if (activo == "true") {
      act = 1;
    } else if (activo == "false") {
      act = 0;
    }
    this.connector.query(
      `UPDATE criteriodecision 
      SET cd_nombre = '${name}', cd_descripcion = '${descripcion}', cd_activo = '${act}'
      WHERE cd_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public getUser_umbral(
    userID: string,
    id_decicion: string,
    func: Function
  ): void {
    this.connector.query(
      `SELECT umb_id, umb_nombre, umb_interpretacion, umb_inferior, umb_superior,umb_activo
    FROM umbral WHERE cd_id=${id_decicion}`,
      (err, result, fields) => {
        if (err) err;
        var listaumb: { id_decicion: string; umbrales: Array<object> } = {
          id_decicion: id_decicion,
          umbrales: [],
        };
        var act;
        for (const i in result) {
          //console.log(result[i]);
          if (result[i]["umb_activo"] == 1) {
            act = "true";
          } else if (result[i]["umb_activo"] == 0) {
            act = "false";
          }
          var auxmedicion = {
            id: result[i]["umb_id"],
            nombre: result[i]["umb_nombre"],
            interpretacion: result[i]["umb_interpretacion"],
            inferior: result[i]["umb_inferior"],
            superior: result[i]["umb_superior"],
            activo: act,
          };
          listaumb.umbrales.push(auxmedicion);
        }
        func(listaumb);
      }
    );
  }
  public getUser_get_umbral(
    userID: string,
    nombre: string,
    func: Function
  ): void {
    var sql = `SELECT umb_id, umb_nombre, umb_inferior, umb_superior
    FROM umbral WHERE cd_id= (SELECT cd_id FROM criteriodecision WHERE cd_nombre = '${nombre}')`;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaumb: { umbrales: Array<object> } = {
        umbrales: [],
      };
      var act;
      for (const i in result) {
        var auxmedicion = {
          id: result[i]["umb_id"],
          nombre: result[i]["umb_nombre"],
          inferior: result[i]["umb_inferior"],
          superior: result[i]["umb_superior"],
        };
        listaumb.umbrales.push(auxmedicion);
      }
      func(listaumb);
      console.log(listaumb);
    });
  }
  public addUser_umbral(
    idUser: string,
    name: string,
    interpretacion: string,
    inferior: string,
    superior: string,
    id_decision: string
  ): void {
    console.log(
      `############# Envio a la funcion 'addUser_umbral' el id de usuario '${idUser}, nombre: ${name}, descripcion: ${interpretacion},inferior: ${inferior},superior: ${superior},criterio: ${id_decision}`
    );
    var sql = `INSERT INTO umbral (umb_nombre, umb_interpretacion,umb_inferior,umb_superior,cd_id, umb_activo) 
    VALUES ('${name}', '${interpretacion}','${inferior}','${superior}','${id_decision}', '1')`;
    this.connector.query(sql, function (error, results) {
      if (error) throw error;
      //console.log('The solution is: ', results[0].solution);
    });
  }
  public delUser_umbral(idUser: string, id: string): void {
    console.log(
      `############# Envio a la funcion 'delUser_umb' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(
      `DELETE  FROM umbral 
      WHERE umb_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public updUser_umbral(
    idUser: string,
    id: string,
    name: string,
    interpretacion: string,
    inferior: string,
    superior: string,
    activo: string
  ): void {
    console.log(
      `############# Envio a la funcion 'updUser_criteriaDecision' el id de usuario '${idUser}, id: ${id}, nombre: ${name}, interpretacion: ${interpretacion},inferior:${inferior},superior:${superior},activo:${activo}`
    );
    var act;
    if (activo == "true") {
      act = 1;
    } else if (activo == "false") {
      act = 0;
    }
    this.connector.query(
      `UPDATE umbral 
      SET umb_nombre = '${name}', umb_interpretacion = '${interpretacion}', umb_inferior = '${inferior}', umb_superior = '${superior}', umb_activo = '${act}'
      WHERE umb_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public getUser_Aspects(userID: string, id: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_Aspectes' el id de usuario '${userID}' ${id}`
    );
    var sql = `SELECT aa_id, aa_nombre, aa_tipo, (SELECT enu_nombre_valor FROM enumeracion WHERE enu_id=aa_tipo) AS tipo, aa_activo
    FROM aspectoautoconsciencia WHERE obj_id=${id} Order BY aa_id`;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaUmedicion: Array<object> = [];
      var act;
      for (const i in result) {
        if (result[i]["aa_activo"] == 1) {
          act = "true";
        } else if (result[i]["aa_activo"] == 0) {
          act = "false";
        }
        var auxmedicion = {
          id: result[i]["aa_id"],
          nombre: result[i]["aa_nombre"],
          tipo: result[i]["tipo"],
          activo: act,
        };
        listaUmedicion.push(auxmedicion);
      }
      func(listaUmedicion);
    });
  }
  public addUser_aspects(
    idUser: string,
    name: string,
    descripcion: string,
    tipo: string,
    peso: string,
    id: string,
    activo: string
  ): void {
    var idTipo = tipo;
    var sqltipo = `SELECT enu_id FROM enumeracion WHERE enu_nombre_valor='${idTipo}'`;
    this.connector.query(sqltipo, (err, result) => {
      if (err) err;
      idTipo = tipo;
      idTipo = result[0]["enu_id"];
      var act;
      if (activo == "true") {
        act = 1;
      } else {
        act = 0;
      }
      var sql = `INSERT INTO aspectoautoconsciencia (aa_nombre, aa_descripcion, aa_peso, aa_tipo, obj_id, aa_activo) 
    VALUES ('${name}', '${descripcion}','${peso}','${idTipo}','${id}', '${act}')`;
      this.connector.query(sql, function (error, results) {
        if (error) throw error;
      });
    });
  }
  public addUser_metrica(
    idUser: string,
    name: string,
    descripcion: string,
    abreviatura: string,
    escala: string,
    unidad: string,
    tipo: string,
    idP: string,
    activo: string
  ): void {
    var idMedida = unidad;
    var sqlEscala = `SELECT esc_id FROM escala WHERE esc_nombre='${escala}'`;
    this.connector.query(sqlEscala, (err, result, fields) => {
      if (err) err;
      var idEscala = escala;
      for (const i in result) {
        idEscala = result[i]["esc_id"];
      }
      var idTipo = tipo;
      var sqltipo = `SELECT enu_id FROM enumeracion WHERE enu_nombre_valor='${idTipo}'`;
      this.connector.query(sqltipo, (err, result) => {
        if (err) err;
        idTipo = tipo;
        for (const i in result) {
          idTipo = result[i]["enu_id"];
        }
        var sqlEscala = `SELECT um_id FROM unidadmedicion WHERE um_nombre='${unidad}'`;
        this.connector.query(sqlEscala, (err, result, fields) => {
          if (err) err;
          for (const i in result) {
            idMedida = result[i]["um_id"];
          }
          var act;
          if (activo == "true") {
            act = 1;
          } else {
            act = 0;
          }
          this.connector.query(
            `INSERT INTO metrica (met_nombre, met_descripcion, met_abreviacion, aa_id, esc_id, um_id, met_activo, met_tipo) 
      VALUES ('${name}', '${descripcion}','${abreviatura}','${idP}','${idEscala}', '${idMedida}','${act}','${idTipo}')`,
            function (error, results) {
              if (error) throw error;
            }
          );
        });
      });
    });
  }
  public addUser_accion(
    idUser: string,
    name: string,
    descripcion: string,
    idP: string,
    meaId: string
  ): void {
    var act;
    var sql = `INSERT INTO accion (acc_nombre, acc_descripcion, umb_id, acc_activo,mea_id) 
    VALUES ('${name}', '${descripcion}','${idP}','1',${meaId})`;
    console.log(sql);
    this.connector.query(sql,
      function (error, results) {
        if (error) throw error;
      }
    );
  }
  public getUser_accion(userID: string, id: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_Metrica' el id de usuario '${userID}' ${id}`
    );
    var act;
    var sql = `SELECT acc_id, acc_nombre, acc_descripcion, acc_activo
    FROM accion WHERE umb_id=${id} Order BY acc_id`;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaUmedicion: Array<object> = [];
      for (const i in result) {
        if (result[i]["acc_activo"] == 1) {
          act = "true";
        } else if (result[i]["acc_activo"] == 0) {
          act = "false";
        }
        var auxmedicion = {
          id: result[i]["acc_id"],
          nombre: result[i]["acc_nombre"],
          descripcion: result[i]["acc_descripcion"],
          activo: act,
        };
        listaUmedicion.push(auxmedicion);
      }
      func(listaUmedicion);
    });
  }
  public delUser_accion(idUser: string, id: string): void {
    console.log(
      `############# Envio a la funcion 'delUser_aspects' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(
      `DELETE  FROM accion 
      WHERE acc_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public upd_acciones_umbrales(
    id: string,
    idE: string,
    nombre: string,
    descripcion: string,
    activo: string,
  ): void {
    if (activo == "true") {
      var act = "1";
    } else {
      var act = "0"
    }
    var sql = `UPDATE accion 
    SET acc_nombre = '${nombre}', acc_descripcion = '${descripcion}', acc_activo = '${act}'
    WHERE acc_id = '${idE}'`;
    console.log(sql);
    this.connector.query(sql,
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  }

  public delUser_aspects(idUser: string, id: string): void {
    console.log(
      `############# Envio a la funcion 'delUser_aspects' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(
      `DELETE  FROM aspectoautoconsciencia 
      WHERE aa_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public delUser_metrica(idUser: string, id: string): void {
    console.log(
      `############# Envio a la funcion 'delUser_aspects' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(
      `DELETE  FROM metrica 
      WHERE met_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }
  public getLastObjectSubjectID(modelID: string): number {
    console.log(`############# Entra en getLastObjectID y envia ${modelID}`);
    return Math.floor(Math.random() * 600000);
  }
  public getLastEntityID(modelID: string): number {
    console.log(`############# Entra en getLastEntityID y envia ${modelID}`);
    return Math.floor(Math.random() * 600000);
  }
  public getUser_Metrica(userID: string, id: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_Metrica' el id de usuario '${userID}' ${id}`
    );
    var act;
    var sql = `SELECT met_id, met_nombre, (SELECT enu_nombre_valor FROM enumeracion WHERE enu_id=met_tipo) AS tipo, met_abreviacion, met_activo
    FROM metrica WHERE aa_id=${id} Order BY met_id`;

    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaUmedicion: Array<object> = [];
      for (const i in result) {
        if (result[i]["met_activo"] == 1) {
          act = "true";
        } else if (result[i]["met_activo"] == 0) {
          act = "false";
        }
        var auxmedicion = {
          id: result[i]["met_id"],
          nombre: result[i]["met_nombre"],
          tipo: result[i]["tipo"],
          abreviatura: result[i]["met_abreviacion"],
          activo: act,
        };
        listaUmedicion.push(auxmedicion);
      }
      func(listaUmedicion);
    });
  }
  public getUser_Metrica_select(
    userID: string,
    id: string,
    tipo: string,
    func: Function
  ): void {
    console.log(
      `############# Envio a la funcion 'getUser_Metrica' el id de usuario '${userID}' ${id}`
    );
    var act;
    var sql = `SELECT met_id, met_nombre
    FROM metrica WHERE (SELECT aa_id From aspectoautoconsciencia WHERE aa_nombre='${id}') = aa_id AND met_tipo = (SELECT enu_id FROM enumeracion WHERE enu_nombre_valor='${tipo}' ) Order BY met_id`;

    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaUmedicion: Array<object> = [];
      for (const i in result) {
        var auxmedicion = {
          id: result[i]["met_id"],
          nombre: result[i]["met_nombre"],
        };
        listaUmedicion.push(auxmedicion);
      }
      func(listaUmedicion);
    });
  }
  public add_process_pre_reflexive(
    idUser: string,
    name: string,
    descripcion: string,
    inicioP: string,
    finP: string,
    aspId: string,
    objId: string,
    sujId: string,
    paTipo: string,
    objetivo: string,
    func: Function,
  ): void {
    console.log(
      `############# Envio a la funcion 'addUser_procesos_pre_reflexivos' el id de usuario '${idUser}, nombre: ${name}, descripcion: ${descripcion}`
    );
    var sql = `INSERT INTO procesoautoconsciencia (pa_nombre, pa_descripcion, pa_inicio_periodo_ejecucion,pa_fin_periodo_ejecucion,pa_activo,aa_id,suj_id,pa_tipo,obj_id) 
    VALUES ('${name}', '${descripcion}','${inicioP == undefined ? "NULL" : "" + inicioP + ""}','${finP == undefined ? "NULL" : "" + finP + ""}','1','${aspId}','${sujId}','${paTipo}','${objetivo}')`;
    console.log(sql);
    this.connector.query(sql, function (error, results) {
      if (error) throw error;
      func(results.insertId)
    });
  }

  public getUser_procesos_pre_reflexive(
    userID: string,
    func: Function
  ): void {
    var sql = `SELECT pro.pa_id as id, pro.pa_nombre as nombre,pro.pa_descripcion as descripcion,pro.pa_inicio_periodo_ejecucion as inicio,pro.pa_fin_periodo_ejecucion as fin,pro.pa_activo as activo, asp.aa_nombre as aspecto ,su.suj_nombre as sujeto FROM procesoautoconsciencia pro, aspectoautoconsciencia asp,sujeto su WHERE asp.aa_id=pro.aa_id AND su.suj_id =pro.suj_id AND pro.pa_tipo=17 ORDER BY pro.pa_id`;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaProcesos: { procesos: Array<object> } = {
        procesos: [],
      };
      var act;
      for (const i in result) {
        if (result[i]["activo"] == 1) {
          act = "true";
        } else {
          act = "false";
        }
        var auxmedicion = {
          id: result[i]["id"],
          nombre: result[i]["nombre"],
          descripcion: result[i]["descripcion"],
          inicio: result[i]["inicio"],
          fin: result[i]["fin"],
          aspecto: result[i]["aspecto"],
          sujeto: result[i]["sujeto"],
          objeto: result[i]["objeto"],
          activo: act,
        };
        listaProcesos.procesos.push(auxmedicion);
      }
      func(listaProcesos);
    });
  }
  public getUser_procesos_pre_reflexive_id(
    userID: string,
    id: string,
    func: Function
  ): void {
    var sql = `SELECT  pa.pa_id as id, 
    pa.pa_nombre as nombre,
    pa.pa_descripcion as descripcion,
    DATE_FORMAT(pa.pa_inicio_periodo_ejecucion,"%Y-%m-%d") as inicio,
    DATE_FORMAT(pa.pa_fin_periodo_ejecucion,"%Y-%m-%d") as fin,
    asp.aa_nombre as aspecto_nombre,
    asp.aa_id as aspecto_id,
    obj.obj_nombre as objeto_nombre,
    obj.obj_id as objeto_id,
    obj.obj_tipo as objeto_tipo,
    pa.suj_id as sujeto,
    pa.pa_activo as activo,
enu.enu_nombre_valor as tipoComunicacion,
enu.enu_id as tipo_comunicacion_id,
enu2.enu_nombre_valor as alcance,
enu2.enu_id as alcance_id,
pro.pro_nombre as propiedad,
pro.pro_id as propiedad_id,
model.ma_tipo_recurso as recurso,
met2.met_nombre as indicador,
met2.met_id as indicador_id,
met.met_nombre as metrica,
met.met_id as metrica_id,
crt.cd_id as criterio_id,
crt.cd_nombre as criterio,
objetivo.obj_nombre as objetivo_nombre,
objetivo.obj_id as objetivo_id
FROM    procesoautoconsciencia pa,
aspectoautoconsciencia asp,
    objeto obj,
metodoaprendizajerazonamiento apren,
metodoaprendizajerazonamiento apren2,
metodorecoleccion mr,
enumeracion enu,
enumeracion enu2,
propiedad pro,
modeloanalisis model,
metrica met,
metrica met2,
criteriodecision crt,
objetivo objetivo
WHERE   pa.pa_id=${id} AND
    pa.aa_id=asp.aa_id AND
    obj.obj_id=asp.obj_id AND
apren.pa_id=pa.pa_id AND
mr.mea_id=apren.mea_id AND
mr.mr_tipo_comunicacion=enu.enu_id AND
mr.mr_alcance_recoleccion=enu2.enu_id AND
pro.pro_id= mr.pro_id AND
met.met_id=apren.met_id AND
apren2.pa_id=pa.pa_id AND
model.mea_id=apren2.mea_id AND
apren2.met_id= met2.met_id AND
crt.cd_id=model.cd_id AND
objetivo.obj_id =pa.obj_id`;
    console.log(sql);
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var act;
      if (result[0]["activo"] == 1) {
        act = "true";
      } else {
        act = "false";
      }
      var procesos = result[0];
      /*  {
          id: result[0]["id"],
          nombre: result[0]["nombre"],
          descripcion: result[0]["descripcion"],
          inicio: result[0]["inicio"],
          fin: result[0]["fin"],
          aspecto: result[0]["aspecto_nombre"],
          sujeto: result[0]["sujeto"],
          activo: act,
        }; */

      func(procesos);
    });
  }
  public del_process_pre_reflexive(idUser: string, id: string): void {
    console.log(
      `############# Envio a la funcion 'delUser_aspects' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(
      `DELETE  FROM procesoautoconsciencia 
      WHERE pa_id = '${id}'`,
      function (err, result) {
        if (err) throw err;
      }
    );
  }

  public getUser_procesos_reflexive_id(
    userID: string,
    id: string,
    func: Function
  ): void {
    var sql = `SELECT  pa.pa_id as id, 
    pa.pa_nombre as nombre,
    pa.pa_descripcion as descripcion,
    DATE_FORMAT(pa.pa_inicio_periodo_ejecucion,"%Y-%m-%d") as inicio,
    DATE_FORMAT(pa.pa_fin_periodo_ejecucion,"%Y-%m-%d") as fin,
    asp.aa_nombre as aspecto_nombre,
    asp.aa_id as aspecto_id,
    obj.obj_nombre as objeto_nombre,
    obj.obj_id as objeto_id,
    obj.obj_tipo as objeto_tipo,
    pa.suj_id as sujeto,
    pa.pa_activo as activo,
    objetivo.obj_nombre as objetivo_nombre,
	objetivo.obj_id as objetivo_id,
    model.ma_tipo_recurso as recurso,
    crt.cd_id as criterio_id,
crt.cd_nombre as criterio,
mtc.mc_tipo_recurso as recursoMetodo,
DATE_FORMAT(mtc.mc_inicio_periodo_calculo,"%Y-%m-%d") as inicio_metodo_calculo,
DATE_FORMAT(mtc.mc_fin_periodo_calculo,"%Y-%m-%d") as fin_metodo_calculo,
met.met_nombre as indicador,
met.met_id as indircador_id,
met2.met_nombre as indirecta,
met2.met_id as indirecta_id
FROM    procesoautoconsciencia pa,
	aspectoautoconsciencia asp,
    objeto obj,
    modeloanalisis model,
    metodoaprendizajerazonamiento apren2,
    metodoaprendizajerazonamiento apren,
    criteriodecision crt,
    objetivo objetivo,
    metodocalculo mtc,
    metrica met,
    metrica met2
WHERE   pa.pa_id=${id} AND
    pa.aa_id=asp.aa_id AND
    obj.obj_id=asp.obj_id AND
    model.mea_id=apren2.mea_id AND
    crt.cd_id=model.cd_id AND
    objetivo.obj_id =pa.obj_id AND
    mtc.mea_id=apren.mea_id AND
    apren2.met_id=met.met_id AND
    apren.met_id =met2.met_id`;
    console.log(sql);
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var act;
      if (result[0]["activo"] == 1) {
        act = "true";
      } else {
        act = "false";
      }
      var procesos = result[0];
      /*  {
          id: result[0]["id"],
          nombre: result[0]["nombre"],
          descripcion: result[0]["descripcion"],
          inicio: result[0]["inicio"],
          fin: result[0]["fin"],
          aspecto: result[0]["aspecto_nombre"],
          sujeto: result[0]["sujeto"],
          activo: act,
        }; */

      func(procesos);
    });
  }

  public getUser_properties(
    id: string,
    func: Function
  ): void {
    var sql = `SELECT pro_id as id, pro_nombre as nombre FROM propiedad WHERE obj_id=${id}`;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      func(result);
    });
  }

  public add_metodo_modelo(
    data: metodo_modelo_proceso,
    func: Function
  ): void {
    var idSup1;
    var idSup2;
    var sql = `INSERT INTO metodoaprendizajerazonamiento (pa_id,mea_tipo,met_id) VALUES ('${data.proceso_id}','${21}','${data.m_recoleccion.met_id}')`;
    console.log(sql);
    this.connector.query(sql, function (error, results) {
      if (error) throw error;
      var db = new mysql_connector();
      idSup1 = results.insertId;
      sql = `INSERT INTO metodoaprendizajerazonamiento (pa_id,mea_tipo,met_id) VALUES ('${data.proceso_id}','${22}','${data.m_modelo.met_id}')`;
      console.log(sql);
      db.connector.query(sql, function (error, results) {
        if (error) throw error;
        idSup2 = results.insertId;
        func([idSup1, idSup2])
        console.log(data.m_recoleccion);
        var sql4 = `INSERT INTO modeloanalisis (ma_tipo_recurso,cd_id,mea_id) VALUES ('${data.m_modelo.ma_tipo}','${data.m_modelo.criterio_id}','${idSup2}')`
        console.log(sql4);
        var db = new mysql_connector();
        db.connector.query(sql4, function (error, results) {
          if (error) throw error;
        });
      });

      console.log(data.m_recoleccion);
      var sql2 = `INSERT INTO metodorecoleccion (mr_tipo_comunicacion,pro_id,mr_alcance_recoleccion,mea_id) VALUES ('${data.m_recoleccion.mr_tipo}',${data.m_recoleccion.pro_id == undefined ? "NULL" : "'" + data.m_recoleccion.pro_id + "'"},'${data.m_recoleccion.pro_alcance}','${idSup1}')`;
      console.log(sql2);

      db.connector.query(sql2, function (error, results) {
        if (error) throw error;
      });
    })
  }

  public mod_process_pre_reflexive(
    id: string, nombre: string, descripcion: string, inicio: string, fin: string,
  ): void {
    var sql = `UPDATE procesoautoconsciencia 
    SET pa_nombre = '${nombre}', pa_descripcion = '${descripcion}', pa_inicio_periodo_ejecucion = '${inicio}', pa_fin_periodo_ejecucion = '${fin}'
    WHERE pa_id = '${id}'`;
    console.log(sql);
    this.connector.query(sql, function (error, results) {
      if (error) throw error;
    });
  }

  public add_mapeo_parametros(
    data: [mapeo_parametros],
  ): void {

    var stryaux = "";
    data.forEach(element => {
      console.log(element);
      stryaux += `('${element.par_ordinal}', '${element.mea_id}','${element.mp_tipo_entrada}','${element.met_id}',${element.vs_id == undefined ? "NULL" : "'" + element.vs_id + "'"},${element.md_id == undefined ? "NULL" : "'" + element.md_id + "'"}),`;
    });
    var sql = `INSERT INTO mapeoparametros (par_ordinal, mea_id, mp_tipo_entrada,met_id,vs_id,md_id) 
    VALUES `+ stryaux.substring(0, stryaux.length - 1);
    console.log(sql);
    this.connector.query(sql, function (error, results) {
      if (error) throw error;
    });
  }


  public getUser_procesos_reflexive(
    userID: string,
    func: Function
  ): void {
    var sql = `SELECT pro.pa_id as id, pro.pa_nombre as nombre,pro.pa_descripcion as descripcion,pro.pa_inicio_periodo_ejecucion as inicio,pro.pa_fin_periodo_ejecucion as fin,pro.pa_activo as activo, asp.aa_nombre as aspecto ,su.suj_nombre as sujeto FROM procesoautoconsciencia pro, aspectoautoconsciencia asp,sujeto su WHERE asp.aa_id=pro.aa_id AND su.suj_id =pro.suj_id AND pro.pa_tipo=18 ORDER BY pro.pa_id`;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaProcesos: { procesos: Array<object> } = {
        procesos: [],
      };
      var act;
      for (const i in result) {
        if (result[i]["activo"] == 1) {
          act = "true";
        } else {
          act = "false";
        }
        var auxmedicion = {
          id: result[i]["id"],
          nombre: result[i]["nombre"],
          descripcion: result[i]["descripcion"],
          inicio: result[i]["inicio"],
          fin: result[i]["fin"],
          aspecto: result[i]["aspecto"],
          sujeto: result[i]["sujeto"],
          objeto: result[i]["objeto"],
          activo: act,
        };
        listaProcesos.procesos.push(auxmedicion);
      }
      func(listaProcesos);
    });
  }

  public add_metodo_modelo_reflexivos(
    data: metodo_modelo_proceso_reflexivos,
    func: Function
  ): void {
    var idSup1;
    var idSup2;
    var sql = `INSERT INTO metodoaprendizajerazonamiento (pa_id,mea_tipo,met_id) VALUES ('${data.proceso_id}','${23}','${data.m_calculo.met_id}')`;
    console.log(sql);
    this.connector.query(sql, function (error, results) {
      if (error) throw error;
      var db = new mysql_connector();
      idSup1 = results.insertId;
      sql = `INSERT INTO metodoaprendizajerazonamiento (pa_id,mea_tipo,met_id) VALUES ('${data.proceso_id}','${22}','${data.modelo.met_id}')`;
      console.log(sql);
      db.connector.query(sql, function (error, results) {
        if (error) throw error;
        idSup2 = results.insertId;
        func([idSup1, idSup2])
        var sql4 = `INSERT INTO modeloanalisis (ma_tipo_recurso,cd_id,mea_id) VALUES ('${data.modelo.modeloTipo}','${data.modelo.criterio_id}','${idSup2}')`
        console.log(sql4);
        var db = new mysql_connector();
        db.connector.query(sql4, function (error, results) {
          if (error) throw error;
        });
      });
      console.log(data.m_calculo);
      var sql2 = `INSERT INTO metodocalculo (mc_tipo_recurso,mc_inicio_periodo_calculo,mc_fin_periodo_calculo,mea_id) VALUES ('${data.m_calculo.tipo_recurso}',${data.m_calculo.inicio == undefined ? "NULL" : "'" + data.m_calculo.inicio + "'"},${data.m_calculo.fin == undefined ? "NULL" : "'" + data.m_calculo.fin + "'"},'${idSup1}')`;
      console.log(sql2);
      db.connector.query(sql2, function (error, results) {
        if (error) throw error;
      });
    })
  }

  public objetivos_sujetos(
    id: string,
    func: Function
  ): void {
    var sql = `SELECT obj_id, obj_nombre
    FROM objetivo WHERE suj_id=${id} AND obj_padre IS NULL`;
    console.log(sql);
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaUmedicion: Array<object> = [];
      for (const i in result) {
        var auxmedicion = {
          id: result[i]["obj_id"],
          nombre: result[i]["obj_nombre"],
        };
        listaUmedicion.push(auxmedicion);
      }
      func(listaUmedicion);
    });
  }
  public get_metodo_aprendizaje(
    id: string,
    metodoId: string,
    func: Function,
  ): void {
    var sql = `SELECT MAX(mea_id) as id
    FROM metodoaprendizajerazonamiento WHERE mea_tipo=${metodoId} `;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var id = result[0];
      func(id);
    });
  }
  public add_escenario_simulacion(
    id: string,
    nombre: string,
    descripcion: string,
    mea_id: string,
    func: Function,
  ): void {
    var sql = `INSERT INTO escenariosimulacion (es_nombre,es_descripcion,mea_id,es_activo) VALUES ('${nombre}','${descripcion}',${mea_id},'1')`;
    console.log(sql);
    this.connector.query(sql,
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  }
  public escenario_simulacion(
    userID: string,
    func: Function
  ): void {
    var sql = `SELECT es_id as id, es_nombre as nombre,es_descripcion as descripcion,es_activo as activo FROM escenariosimulacion`;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaProcesos: { procesos: Array<object> } = {
        procesos: [],
      };
      var act;
      for (const i in result) {
        if (result[i]["activo"] == 1) {
          act = "true";
        } else {
          act = "false";
        }
        var auxmedicion = {
          id: result[i]["id"],
          nombre: result[i]["nombre"],
          descripcion: result[i]["descripcion"],
          activo: act,
        };
        listaProcesos.procesos.push(auxmedicion);
      }
      func(listaProcesos);
    });
  }
  public del_escenario_simulacion(
    id: string,
    idE: string,
    func: Function,
  ): void {
    var sql = `DELETE FROM escenariosimulacion WHERE es_id=${idE} `;
    console.log(sql);
    this.connector.query(sql,
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  }
  public upd_escenario_simulacion(
    id: string,
    idE: string,
    nombre: string,
    descripcion: string,
    activo: string,
    func: Function,
  ): void {
    if (activo == "true") {
      var act = "1";
    } else {
      var act = "0"
    }
    var sql = `UPDATE escenariosimulacion 
    SET es_nombre = '${nombre}', es_descripcion = '${descripcion}', es_activo = '${act}'
    WHERE es_id = '${idE}'`;
    console.log(sql);
    this.connector.query(sql,
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  }
  public get_variables_valor(
    userID: string,
    id: string,
    func: Function
  ): void {
    var sql = `SELECT vas.vs_id as id_variable, vas.vs_nombre as nombre_variable,vs.vs_id as valor_id,vs.vas_valor as valor FROM valorsimulacion vs, variablesimulacion vas WHERE vs.es_id=${id} AND vas.vs_id=vs.vs_id`;
    console.log(sql);
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaProcesos: { procesos: Array<object> } = {
        procesos: [],
      };
      for (const i in result) {
        var auxmedicion = {
          id: result[i]["id_variable"],
          nombre: result[i]["nombre_variable"],
          valor: result[i]["valor"],
        };
        listaProcesos.procesos.push(auxmedicion);
      }
      func(listaProcesos);
    });
  }
  public get_variable_simulacion(
    userID: string,
    func: Function
  ): void {
    var sql = `SELECT vs_id as id, vs_nombre as nombre,vs_activo as activo FROM variablesimulacion`;
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaProcesos: { procesos: Array<object> } = {
        procesos: [],
      };
      var act;
      for (const i in result) {
        if (result[i]["activo"] == 1) {
          act = "true";
        } else {
          act = "false";
        }
        var auxmedicion = {
          id: result[i]["id"],
          nombre: result[i]["nombre"],
          activo: act,
        };
        listaProcesos.procesos.push(auxmedicion);
      }
      func(listaProcesos);
    });
  }
  public get_variable_simulacion_id(
    userID: string,
    id: string,
    func: Function
  ): void {
    var sql = `SELECT vs_id as id, vs_nombre as nombre,vs_activo as activo FROM variablesimulacion WHERE mea_id=${id}`;
    console.log(sql);
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaProcesos: { procesos: Array<object> } = {
        procesos: [],
      };
      var act;
      for (const i in result) {
        if (result[i]["activo"] == 1) {
          act = "true";
        } else {
          act = "false";
        }
        var auxmedicion = {
          id: result[i]["id"],
          nombre: result[i]["nombre"],
          activo: act,
        };
        listaProcesos.procesos.push(auxmedicion);
      }
      func(listaProcesos);
    });
  }
  public add_variable_simulacion(
    id: string,
    nombre: string,
    mea_id: string,
    func: Function,
  ): void {
    var sql = `INSERT INTO variablesimulacion (vs_nombre,mea_id,vs_activo) VALUES ('${nombre}',${mea_id},'1')`;
    console.log(sql);
    this.connector.query(sql,
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  }

  public del_variable_simulacion(
    id: string,
    idE: string,
    func: Function,
  ): void {
    var sql = `DELETE FROM variablesimulacion WHERE vs_id=${idE} `;
    console.log(sql);
    this.connector.query(sql,
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  }
  public upd_variable_simulacion(
    id: string,
    idE: string,
    nombre: string,
    activo: string,
    func: Function,
  ): void {
    if (activo == "true") {
      var act = "1";
    } else {
      var act = "0"
    }
    var sql = `UPDATE variablesimulacion 
    SET vs_nombre = '${nombre}', vs_activo = '${act}'
    WHERE vs_id = '${idE}'`;
    console.log(sql);
    this.connector.query(sql,
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  }

  public add_variables_valor(
    id: string,
    es_id: string,
    vs_id: string,
    vas_valor: string,
    func: Function,
  ): void {
    var sql = `INSERT INTO valorsimulacion (es_id,vs_id,vas_valor) VALUES (${es_id},${vs_id},${vas_valor})`;
    console.log(sql);
    this.connector.query(sql,
      function (err, result, fields) {
        if (err) func({ error: "El dato ya existe" });
      }
    );
  }

  public del_variables_valor(
    id: string,
    idE: string,
    func: Function,
  ): void {
    var sql = `DELETE FROM valorsimulacion WHERE vas_valor=${idE} `;
    console.log(sql);
    this.connector.query(sql,
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  }
  public upd_variables_valor(
    id: string,
    vas_valor: string,
    vs_id: string,
    vas_valor_viejo: string,
    func: Function,
  ): void {
    var sql = `UPDATE valorsimulacion 
    SET vs_id = '${vs_id}', vas_valor = '${vas_valor}'
    WHERE vs_id = '${vas_valor_viejo}'`;
    console.log(sql);
    this.connector.query(sql,
      function (err, result, fields) {
        if (err) throw err;
      }
    );
  }

  public generar_modelo(ModeloId: string, fun: Function): void {
    var sql = `SELECT 
    mo.ma_id as id,
    mo.ma_nombre as nombre,
    mo.ma_descripcion as descripcion,
    mo.ma_autor as autor,
    mo.ma_activo as activo
    FROM
    modeloautoconsciencia mo
    WHERE
    mo.ma_id=${ModeloId}`;
    var modelo: generar_modelo;
    this.connector.query(sql,
      function (err, result) {
        if (err) throw err;
        modelo = { $: { id: result[0]["id"], nombre: result[0]["nombre"], descripcion: result[0]["descripcion"], autor: result[0]["autor"], activo: result[0]["activo"] } };
        var db = new mysql_connector();
        db.generar_sujetos(modelo, fun);
      }
    );
  }
  public generar_sujetos(modelo: generar_modelo, fun: Function): void {
    var sql = `SELECT 
    su.suj_id as id,
    su.suj_nombre as nombre,
    su.suj_activo as activo,
    su.suj_padre as padre
    FROM
    sujeto su
    WHERE
    su.ma_id=${modelo.$.id}`;
    this.connector.query(sql, function (err, results) {
      if (err) throw err;
      modelo.sujeto = [];
      results.forEach(sujetos => {
        var sujeto: sujeto = { $: { id: sujetos.id, nombre: sujetos.nombre, activo: sujetos.activo, suj_padre: sujetos.padre } };
        modelo.sujeto?.push(sujeto);
      });
      var db = new mysql_connector();
      db.generar_objetivos(modelo, fun);
      db.generar_procesoAutocon(modelo, fun);

    });
  }
  public generar_objetivos(modelo: generar_modelo, fun: Function) {
    var value: string = "(";
    modelo.sujeto?.forEach(element => {
      value += `${element?.$.id},`;
    });
    value = value.substr(0, value.length - 1) + ")";
    var sql = `SELECT 
  obj.obj_id as id,
  obj.obj_nombre as nombre,
  obj.obj_descripcion as descripcion,
  obj.obj_peso as peso,
  obj.obj_operacion_agregacion as operador,
  obj.obj_activo as activo,
  obj.suj_id as sujeto_id
  FROM
  objetivo obj
  WHERE
  obj.suj_id in ${value}`;
    var db = new mysql_connector();
    this.connector.query(sql, function (err, results) {
      if (err) throw err;
      results.forEach(obj => {
        var objetivo: objetivos = { $: { id: obj.id, nombre: obj.nombre, descripcion: obj.descripcion, peso: obj.peso, operacion_agregacion: obj.operacion_agregacion, activo: obj.activo } };
        var cont = 0;
        modelo.sujeto?.forEach(element => {
          if (element?.$.id == obj.sujeto_id) {
            if (element?.objetivos) {
              element!.objetivos.push(objetivo);
            } else {
              element!.objetivos = [];
              element!.objetivos.push(objetivo);
            }
            return;
          }
          cont++;
        });
      });
      // var db = new mysql_connector();
      //db.generar_objetivos(modelo,fun);
    });
  }
  public generar_procesoAutocon(modelo: generar_modelo, fun: Function) {
    var value: string = "(";
    modelo.sujeto?.forEach(element => {
      value += `${element?.$.id},`;
    });
    value = value.substr(0, value.length - 1) + ")";
    var sql = `SELECT 
   pro.pa_id as id,
   pro.pa_nombre as nombre,
   pro.pa_descripcion as descripcion,
   pro.pa_inicio_periodo_ejecucion as inicio_periodo,
   pro.pa_fin_periodo_ejecucion as fin_periodo,
   pro.pa_tipo as tipo,
   pro.pa_activo as activo,
   pro.aa_id as aspecto_id,
   pro.suj_id as sujeto_id,
   pro.obj_id as objeto_id
   FROM
   procesoautoconsciencia pro
   WHERE
   pro.suj_id in ${value}`;
    var db = new mysql_connector();
    this.connector.query(sql, function (err, results) {
      if (err) throw err;
      results.forEach(pro => {
        var proceso: procesoAutoconsciencia = {
          $: {
            id: pro.id,
            nombre: pro.nombre,
            descripcion: pro.descripcion,
            inicio: pro.pa_inicio_periodo_ejecucion,
            fin: pro.pa_fin_periodo_ejecucion,
            tipo: pro.tipo,
            activo: pro.activo
          }
        };
        var cont = 0;
        modelo.sujeto?.forEach(element => {
          if (element?.$.id == pro.sujeto_id) {
            if (element?.procesoAutocon) {
              element!.procesoAutocon.push(proceso);
            } else {
              element!.procesoAutocon = [];
              element!.procesoAutocon.push(proceso);
            }
            return;
          }
          cont++;
        });
      });
      // var db = new mysql_connector();
      //db.generar_objetivos(modelo,fun);
      db.generar_metodo_aprendizaje(modelo, fun);
    });
  }

  public generar_metodo_aprendizaje(modelo: generar_modelo, fun: Function) {
    var value: string = "(";
    modelo.sujeto?.forEach(element => {
      element?.procesoAutocon?.forEach(element2 => {
        value += `${element2?.$.id},`;
      });

    });
    value = value.substr(0, value.length - 1) + ")";
    var sql = `SELECT 
   mea.mea_id as id,
   enu.enu_nombre_valor as tipo,
   mea.pa_id as proceso_id
   FROM
   metodoaprendizajerazonamiento mea,
   enumeracion enu
   WHERE
   enu.enu_id=mea.mea_tipo AND
   mea.pa_id in ${value}`;
    var db = new mysql_connector();
    this.connector.query(sql, function (err, results) {
      if (err) throw err;
      results.forEach(mea => {
        var metodo: metodoAprendizaje = { $: { id: mea.id, tipo: mea.tipo } };
        var cont = 0;
        if (modelo.metodo_aprendizaje) {
          modelo.metodo_aprendizaje.push(metodo);
        } else {
          modelo.metodo_aprendizaje = [];
          modelo.metodo_aprendizaje?.push(metodo);
        }
        modelo.sujeto?.forEach(element => {
          element?.procesoAutocon?.forEach(element2 => {
            if (element2?.$.id == mea.proceso_id) {
              if (element2?.$.ruta_metodoAprendizaje) {
                element2.$.ruta_metodoAprendizaje.push(`metodo_aprendizaje.${modelo.metodo_aprendizaje!.length - 1}`);
              } else {
                element2!.$.ruta_metodoAprendizaje = [];
                element2!.$.ruta_metodoAprendizaje.push(`metodo_aprendizaje.${modelo.metodo_aprendizaje!.length - 1}`);
              }
              return;
            }
            cont++;
          });

        });
      });
      db.generar_metodo_recoleccion(modelo, fun);
    });

  }

  public generar_metodo_recoleccion(modelo: generar_modelo, fun: Function) {
    if (modelo.metodo_aprendizaje!.length > 0) {
      var value: string = "(";
      modelo.metodo_aprendizaje?.forEach(element => {
        value += `${element?.$.id},`;
      });
      value = value.substr(0, value.length - 1) + ")";
      var sql = `SELECT 
   enu.enu_nombre_valor as tipo_comunicacion,
   enu2.enu_nombre_valor as alcance_recoleccion,
   mr.mea_id as mea_id
   FROM
   metodorecoleccion mr,
   enumeracion enu,
   enumeracion enu2
   WHERE
   enu.enu_id=mr.mr_tipo_comunicacion AND
   mr.mea_id in ${value} AND
   enu2.enu_id=mr.mr_alcance_recoleccion` ;
      var db = new mysql_connector();
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        results.forEach(mr => {
          var metodo_recol: metodorecoleccion = { $: { tipo_comunicacion: mr.tipo_comunicacion, alcance: mr.alcance_recoleccion } };
          modelo.metodo_aprendizaje?.forEach(element => {
            if (element?.$.id == mr.mea_id) {
              element!.metodo_recoleccion = metodo_recol;
              return;
            }
          });
        });
        db.generar_modelo_analisis(modelo, fun);
      });
    } else {
      var db = new mysql_connector();
      console.log('         ######### No entro 1')
      db.generar_modelo_analisis(modelo, fun);
    }
  }
  public generar_modelo_analisis(modelo: generar_modelo, fun: Function) {
    if (modelo.metodo_aprendizaje!.length > 0) {
      var value: string = "(";
      modelo.metodo_aprendizaje?.forEach(element => {
        value += `${element?.$.id},`;
      });
      value = value.substr(0, value.length - 1) + ")";
      var sql = `SELECT 
   if(ma.ma_tipo_recurso=0,'Formula', IF(ma.ma_tipo_recurso=1,'Funcion','Servicio')) as tipo_recurso,
      ma.mea_id as mea_id
      FROM
      modeloanalisis ma
      WHERE
   ma.mea_id in ${value}`;
      var db = new mysql_connector();
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        results.forEach(ma => {
          var modelo_anali: modeloAnalis = { $: { tipo_recurso: ma.tipo_recurso } };
          modelo.metodo_aprendizaje?.forEach(element => {
            if (element?.$.id == ma.mea_id) {
              element!.modeloAnalis = modelo_anali;
              return;
            }
          });
        });
        db.generar_metodo_calculo(modelo, fun);
      });
    } else {
      var db = new mysql_connector();
      console.log('         ######### No entro 2')
      db.generar_metodo_calculo(modelo, fun);
    }
  }
  public generar_metodo_calculo(modelo: generar_modelo, fun: Function) {
    if (modelo.metodo_aprendizaje!.length > 0) {
      var value: string = "(";
      modelo.metodo_aprendizaje?.forEach(element => {
        value += `${element?.$.id},`;
      });
      value = value.substr(0, value.length - 1) + ")";
      var sql = `SELECT 
   if(mc.mc_tipo_recurso=0,'Formula', IF(mc.mc_tipo_recurso=1,'Funcion','Servicio')) as tipo_recurso,
   mc_inicio_periodo_calculo inicio_periodo,
   mc_fin_periodo_calculo fin_periodo,
      mc.mea_id as mea_id
      FROM
      metodocalculo mc
      WHERE
   mc.mea_id in ${value}`;
      var db = new mysql_connector();
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        results.forEach(mc => {
          var metodo_calcul: metodoCalculo = { $: { tipo_recurso: mc.tipo_recurso, inicio: mc.inicio_periodo, fin: mc.fin_periodo } };
          modelo.metodo_aprendizaje?.forEach(element => {
            if (element?.$.id == mc.mea_id) {
              element!.metodoCalculo = metodo_calcul;
              return;
            }
          });
        });
        db.generar_escenario_simulacion(modelo, fun);
      });
    } else {
      var db = new mysql_connector();
      console.log('         ######### No entro 3')
      db.generar_escenario_simulacion(modelo, fun);
    }
  }
  public generar_escenario_simulacion(modelo: generar_modelo, fun: Function) {
    var value: string = "(";
    modelo.metodo_aprendizaje?.forEach(element => {
      value += `${element?.$.id},`;
    });
    if (value.length > 1) {
      value = value.substr(0, value.length - 1) + ")";
      var sql = `SELECT 
  es.es_id as id,
  es.es_nombre as nombre,
  es.es_descripcion as descripcion,
  es.mea_id,
  es.es_activo as activo
     FROM
     escenariosimulacion es
     WHERE
  es.mea_id in ${value}`;
      var db = new mysql_connector();
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        results.forEach(es => {
          var escenario: escenarioSimulacion = { $: { id: es.id, nombre: es.nombre, descripcion: es.descripcion, activo: es.activo } };
          var cont = 0;
          modelo.metodo_aprendizaje?.forEach(element => {
            if (element?.$.id == es.mea_id) {
              if (element?.metodoCalculo) {
                if (element?.metodoCalculo?.escenarioSimulacion) {
                  element?.metodoCalculo?.escenarioSimulacion?.push(escenario);
                } else {
                  element!.metodoCalculo!.escenarioSimulacion = [];
                  element?.metodoCalculo?.escenarioSimulacion?.push(escenario);
                }
              }
              return;
            }
            cont++;
          });
        });
        db.generar_variables_simulacion(modelo, fun);
      });
    } else {
      var db = new mysql_connector();
      db.generar_variables_simulacion(modelo, fun);
    }
  }
  public generar_variables_simulacion(modelo: generar_modelo, fun: Function) {
    var value: string = "(";
    modelo.metodo_aprendizaje?.forEach(element => {
      value += `${element?.$.id},`;
    });
    if (value.length > 1) {
      value = value.substr(0, value.length - 1) + ")";
      var sql = `SELECT 
   vs.vs_id as id,
   vs.vs_nombre as nombre,
   vs.mea_id as mea_id,
   vs.vs_activo as activo
      FROM
      variablesimulacion vs
      WHERE
   vs.mea_id in ${value}`;
      var db = new mysql_connector();
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        results.forEach(vs => {
          var variable_si: variableSimulacion = { $: { id: vs.id, nombre: vs.nombre, activo: vs.activo } };
          var cont = 0;
          modelo.metodo_aprendizaje?.forEach(element => {
            if (element?.$.id == vs.mea_id) {
              if (element?.metodoCalculo) {
                if (element?.metodoCalculo?.variableSimulacion) {
                  element?.metodoCalculo?.variableSimulacion?.push(variable_si);
                } else {
                  element!.metodoCalculo!.variableSimulacion = [];
                  element?.metodoCalculo?.variableSimulacion?.push(variable_si);
                }
                return;
              }
            }
            cont++;
          });
        });
        db.generar_valores_simulacion(modelo, fun);
      });
    } else {
      var db = new mysql_connector();
      db.generar_valores_simulacion(modelo, fun);
    }
  }

  public generar_valores_simulacion(modelo: generar_modelo, fun: Function) {
    var value: string = "(";
    modelo.metodo_aprendizaje?.forEach(element => {
      value += `${element?.$.id},`;
    });
    if (value.length > 1) {
      value = value.substr(0, value.length - 1) + ")";
      var sql = `SELECT
      vs.vas_valor as valor,
      vs.es_id as escenario_id,
      vs.vs_id as variable_id,
      es.mea_id
      FROM
      valorsimulacion vs,
      escenariosimulacion es
      WHERE
      es.es_id=vs.es_id AND
      es.mea_id IN ${value}`;
      var db = new mysql_connector();
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        results.forEach(vs => {
          // var valor_simu: valorSimulacion = { $:{vas_valor:vs.valor,} };
          var con_apren = 0
          modelo.metodo_aprendizaje?.forEach(element => {
            if (element?.$.id == vs.mea_id) {

              if (element?.metodoCalculo) {
                var cont = 0;
                var escenario_aux = -1;
                var variable_aux = -1;
                element.metodoCalculo.escenarioSimulacion?.forEach(escenario => {
                  if (escenario!.$.id = vs.escenario_id) {
                    escenario_aux = cont;
                    cont++;
                  }
                });
                cont = 0;
                element.metodoCalculo.variableSimulacion?.forEach(variable_sim => {
                  if (variable_sim!.$.id = vs.variable_id) {
                    variable_aux = cont;
                    cont++;
                  }
                });
                var valor_simu: valorSimulacion = {
                  $: {
                    vas_valor: vs.valor,
                    ruta_escenario: `metodo_aprendizaje.${con_apren}@metodoCalculo@escenarioSimulacion.${escenario_aux}`,
                    ruta_variable: `metodo_aprendizaje.${con_apren}@metodoCalculo@variableSimulacion.${variable_aux}`,

                  }
                };
                if (element?.metodoCalculo?.valorSimulacion) {
                  element?.metodoCalculo?.valorSimulacion?.push(valor_simu);
                } else {
                  element!.metodoCalculo!.valorSimulacion = [];
                  element?.metodoCalculo?.valorSimulacion?.push(valor_simu);
                }
                return;
              }
            }
            con_apren++;
          });
        });
        db.generar_objetos(modelo, fun);

      });
    } else {
      var db = new mysql_connector();
      db.generar_objetos(modelo, fun);
    }
  }
  public generar_objetos(modelo: generar_modelo, fun: Function): void {
    if (modelo.$.id) {
      var sql = `SELECT 
    obj.obj_id as id,
    obj.obj_nombre as nombre,
    obj.obj_tipo as tipo,
    obj.obj_padre as padre,
    obj.obj_activo as activo
    FROM
    objeto obj
    WHERE
    obj.ma_id=${modelo.$.id}`;
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        modelo.objetos = [];
        results.forEach(obj => {
          var objeto: objeto = {
            $: {
              id: obj.id,
              nombre: obj.nombre,
              tipo: obj.tipo,
              activo: obj.activo,
              obj_padre: obj.padre
            }
          };
          modelo.objetos?.push(objeto);
        });
        var db = new mysql_connector();
        db.generar_aspecto(modelo, fun);
      });
    } else {
      var db = new mysql_connector();
      db.generar_aspecto(modelo, fun);
    }
  }
  public generar_aspecto(modelo: generar_modelo, fun: Function): void {
    var value: string = "(";
    modelo.objetos?.forEach(element => {
      value += `${element?.$.id},`;
    });
    value = value.substr(0, value.length - 1) + ")";
    if (value.length > 1) {
      var sql = `SELECT 
    asp.aa_id as id,
    asp.aa_nombre as nombre,
    asp.aa_descripcion as descripcion,
    asp.aa_peso as peso,
    asp.aa_tipo as tipo,
    asp.aa_activo as activo,
    asp.obj_id 
    FROM
    aspectoautoconsciencia asp
    WHERE
    asp.obj_id IN ${value}`;
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        results.forEach(asp => {
          var aspecto: aspectosAutoconsciencia = {
            $: {
              id: asp.id,
              nombre: asp.nombre,
              descripcion: asp.descripcion,
              peso: asp.peso,
              tipo: asp.tipo,
              activo: asp.activo
            }
          };
          modelo.objetos?.forEach(element => {
            if (element?.$.id == asp.obj_id) {
              if (element?.aspectosAutoconsciencia) {
                element.aspectosAutoconsciencia.push(aspecto);
              } else {
                element!.aspectosAutoconsciencia = [aspecto];
              }
              return;
            }
          });
        });
        var db = new mysql_connector();
        db.generar_propiedad(modelo, fun);
      });
    } else {
      var db = new mysql_connector();
      db.generar_propiedad(modelo, fun);
    }
  }
  public generar_propiedad(modelo: generar_modelo, fun: Function): void {
    var value: string = "(";
    modelo.objetos?.forEach(element => {
      value += `${element?.$.id},`;
    });
    value = value.substr(0, value.length - 1) + ")";
    if (value.length > 1) {
      var sql = `SELECT 
    pro.pro_id as id,
    pro.pro_nombre as nombre,
    pro.obj_id 
    FROM
    propiedad pro
    WHERE
    pro.obj_id IN ${value}`;
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        results.forEach(pro => {
          var prop: propiedad = {
            $: {
              id: pro.id,
              nombre: pro.nombre,
            }
          };
          modelo.objetos?.forEach(element => {
            if (element?.$.id == pro.obj_id) {
              if (element?.propiedad) {
                element.propiedad.push(prop);
              } else {
                element!.propiedad = [prop];
              }
              return;
            }
          });
        });
        var db=new mysql_connector();
        db.generar_metricas(modelo,fun);
      });
    } else {
      var db=new mysql_connector();
      db.generar_metricas(modelo,fun);
    }
  }

  public generar_metricas(modelo: generar_modelo, fun: Function): void {
    var value: string = "(";
    modelo.objetos?.forEach(element => {
      element?.aspectosAutoconsciencia?.forEach(element2 => {
        value += `${element2?.$.id},`;
      });
    });
    value = value.substr(0, value.length - 1) + ")";
    if (value.length > 1) {
      var sql = `SELECT 
    met.met_id as metrica_id,
    met.met_nombre as metrica_nombre,
    met.met_descripcion as metrica_decripcion,
    met.met_abreviacion AS metrica_abreviacion,
    met.met_activo as metrica_activo,
    met.met_tipo as metrica_tipo,
    esc.esc_id as escala_id,
    esc.esc_nombre as escala_nombre,
    esc.esc_valores_validos as valor_valido,
    esc.esc_tipo as escala_tipo,
    esc.esc_activo as escala_activo,
    un.um_id as unidad_id,
    un.um_nombre as unidad_nombre,
    un.um_descripcion as unidad_descripcion,
    un.um_acronimo as unidad_acronimo,
    un.um_activo as unidad_activo
    FROM
    metrica met,
    escala esc,
    unidadmedicion un
    WHERE
    met.esc_id=esc.esc_id AND
    met.um_id=un.um_id AND
    met.aa_id IN ${value}`;
      console.log(sql);
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        results.forEach(metrica => {
          var unidad: unidadMedicion = {
            $: {
              id: metrica.unidad_id,
              nombre: metrica.unidad_nombre,
              descripcion: metrica.unidad_descripcion,
              acronimo: metrica.unidad_acronimo,
              activo: metrica.unidad_activo

            }
          };
          var escala: escala = {
            $: {
              id: metrica.escala_id,
              nombre: metrica.escala_nombre,
              valores_validos: metrica.valor_valido,
              tipo: metrica.escala_tipo,
              activo: metrica.escala_activo
            }
          }
          var metricas: metrica = {
            $: {
              id: metrica.metrica_id,
              nombre: metrica.metrica_nombre,
              descripcion: metrica.metrica_decripcion,
              abreviacion: metrica.metrica_abreviacion,
              tipo: metrica.metrica_tipo,
              activo: metrica.metrica_activo
            }, escala: escala, unidadMedicion: unidad
          }
          if (modelo.metrica) {
            modelo.metrica.push(metricas);
          } else {
            modelo.metrica = [metricas];
          }
        });
        fun(modelo);
      });
    } else {
      fun(modelo);
    }
  }

  public generar_criterios(modelo: generar_modelo, fun: Function): void {
    var value: string = "(";
    modelo.objetos?.forEach(element => {
      value += `${element?.$.id},`;
    });
    value = value.substr(0, value.length - 1) + ")";
    if (value.length > 1) {
      var sql = `SELECT 
    pro.pro_id as id,
    pro.pro_nombre as nombre,
    pro.obj_id 
    FROM
    propiedad pro
    WHERE
    pro.obj_id IN ${value}`;
      this.connector.query(sql, function (err, results) {
        if (err) throw err;
        results.forEach(pro => {
          var prop: propiedad = {
            $: {
              id: pro.id,
              nombre: pro.nombre,
            }
          };
          modelo.objetos?.forEach(element => {
            if (element?.$.id == pro.obj_id) {
              if (element?.propiedad) {
                element.propiedad.push(prop);
              } else {
                element!.propiedad = [prop];
              }
              return;
            }
          });
        });
        var db=new mysql_connector();
        db.generar_metricas(modelo,fun);
      });
    } else {
      var db=new mysql_connector();
      db.generar_metricas(modelo,fun);
    }
  }

  public get_flujo_datos(
    userID: string,
    comunicacion:string,
    propiedad:string,
    func: Function,
  ): void {
    var comu;
    if(comunicacion=="SÍNCRONA"){
      comu="Synchronous";
    }else if(comunicacion=="ASÍNCRONA"){
comu=undefined;
    }
    var sql = `SELECT flu.flu_id as id, flu.flu_descripcion as descripcion FROM flujodatos flu, propiedad_flujodatos pro_flu WHERE flu.flu_tipo_comunicacion='${comu}' AND pro_flu.pro_id=${propiedad} AND pro_flu.flu_id=flu.flu_id`;
    console.log(sql);
    this.connector.query(sql, (err, result, fields) => {
      if (err) err;
      var listaProcesos: { procesos: Array<object> } = {
        procesos: [],
      };
      for (const i in result) {
        var auxmedicion = {
          id: result[i]["id"],
          descripcion: result[i]["descripcion"],

        };
        listaProcesos.procesos.push(auxmedicion);
      }
      func(listaProcesos);
    });
  }
  // La atributo variable no existe, solo le pusimos para probar
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

interface systemObj {
  $: { id: string; name: string; descrption: string; domain: string };
  iotSubsystem?: [systemObj];
}
interface systemEnt {
  $: { 'xsi:type'?: string; id: string; name: string; };
  comput?: ([systemEnt] | undefined);
  Entity?: ([systemEnt] | undefined);
  has?: [flujos?];
  containsDataFlow?: [constainsDataFlow?];
  containsResource?: ([systemEnt] | undefined);
}

interface constainsDataFlow {
  id: string;
  descripcion: string;
  communicationType: string;
}
interface flujos {
  $: { id: string, name: string },
  dataFlow?: [dataFlow?]
}
interface dataFlow {
  id: string,
  description: string,
  communicationType: string
}
interface resource {
  nombre: string;
  descripcion: string;
  tipoRecurso: string;
  EspecificoTipo: {
    formula?: string;
    instrucciones?: string;
    endPoint?: string;
    datoSalida: string;
    nombre_datoSalida?: string;
    formatoSalida?: string;
    preExistent?: Boolean;
  };
  arregloParametros: [
    parametros?
  ];
}
interface parametros {
  ordinal: string;
  nombre: string;
  tipo: string;
  opcional: string;
  activo: string;
  tipoNombre?: string;

}
interface metodo_modelo_proceso {
  proceso_id: string;
  m_recoleccion: {
    mr_tipo: string;
    pro_id: string;
    pro_alcance: string;
    met_id: string;
  };
  m_modelo: {
    ma_tipo: string;
    criterio_id: string;
    met_id: string;
  }
}
interface metodo_modelo_proceso_reflexivos {
  proceso_id: string;
  m_calculo: {
    inicio: string;
    fin: string;
    tipo_recurso: string;
    met_id: string;
  };
  modelo: {
    modeloTipo: string;
    criterio_id: string;
    met_id: string;
  }
}

interface mapeo_parametros {
  par_ordinal: string;
  mea_id: string;
  mp_tipo_entrada: string;
  met_id: string;
  vs_id: string;
  md_id: string;
}

interface generar_modelo {
  $: {
    id: string,
    nombre: string,
    descripcion: string,
    autor: string,
    activo: string,
  },
  sujeto?: [sujeto?],
  objetos?: [objeto?],
  metodo_aprendizaje?: [metodoAprendizaje?],
  mapeoParametros?: [mapeoParametros?],
  metrica?: [metrica?],
  flujo_datos?: [flujo_datos?],
}
interface sujeto {
  $: {
    id: string,
    nombre: string,
    activo: string,
    suj_padre: string,
  },
  procesoAutocon?: [procesoAutoconsciencia?],
  objetivos?: [objetivos?],
}
interface objeto {
  $: {
    id: string,
    tipo: string,
    nombre: string,
    activo: string,
    obj_padre: string,
  }
  propiedad?: [propiedad?],
  aspectosAutoconsciencia?: [aspectosAutoconsciencia?],
}

interface procesoAutoconsciencia {
  $: {
    id: string,
    nombre: string,
    descripcion: string,
    tipo: string,
    inicio: string,
    fin: string,
    activo: string,
    ruta_metodoAprendizaje?: [string?],
  },
  aspectosAutoconsciencia?: [aspectosAutoconsciencia?],

}
interface metodoAprendizaje {
  $: {
    id: string,
    tipo: string,
  },
  metrica_route?: [string?],
  metodo_recoleccion?: metodorecoleccion,
  modeloAnalis?: modeloAnalis,
  metodoCalculo?: metodoCalculo,
}
interface metodorecoleccion {
  $: {
    tipo_comunicacion: string,
    alcance: string,
  }
}
interface modeloAnalis {
  $: {
    tipo_recurso: string,
    ruta_criterios?: [string],
  }
}
interface metodoCalculo {
  $: {
    tipo_recurso: string,
    inicio: string,
    fin: string,
  },
  escenarioSimulacion?: [escenarioSimulacion?],
  variableSimulacion?: [variableSimulacion?],
  valorSimulacion?: [valorSimulacion?],
}

interface escenarioSimulacion {
  $: {
    id: string,
    nombre: string,
    descripcion: string,
    activo: string,
  }
}
interface variableSimulacion {
  $: {
    id: string,
    nombre: string,
    activo: string,
  }
}
interface mapeoParametros {
  $: {
    tipo_entrada: string,
  }
  metrica_route?: [string?],
}
interface parametros_traer {
  $: {
    vas_valor: string,
    variable_ruta?: [string],
    escenario_ruta?: [string],
  }
}
interface valorSimulacion {
  $: {
    vas_valor: string,
    ruta_escenario?: string
    ruta_variable?: string
  }
}
interface recursoimplementacion {
  $: {
    id: string,
    nombre: string,
    descripcion: string,
    tipo_recurso: string,
    tipo_salida: string,
    activo: string,
  }
  servicio?: [servicio?],
  funcion?: [funcion?],
  formula?: [formula?],
}
interface servicio {
  $: {
    punto_final: string,
    instrucciones: string,
    pre_existente: string,
    tipo_formato: string,
  }
}
interface funcion {
  $: {
    path: string,
    instrucciones: string,

  }
}
interface formula {
  $: {
    for_expresion: string,
  }
}
interface metrica {
  $: {
    id: string,
    nombre: string,
    descripcion: string,
    abreviacion: string,
    tipo: string,
    activo: string,
  }
  escala?: escala,
  unidadMedicion?: unidadMedicion,
}
interface objetivos {
  $: {
    id: string,
    nombre: string,
    descripcion: string,
    peso: string,
    operacion_agregacion: string,
    activo: string,
  }
}

interface criterios {
  $: {
    id: string,
    nombre: string,
    descripcion: string,
    activo: string,
  }
  umbral?: [umbral?],
}
interface umbral {
  $: {
    id: string,
    nombre: string,
    interpretacion: string,
    inferior: string,
    superior: string,
    activo: string,
  }
}


interface accion {
  $: {
    id: string,
    nombre: string,
    descripcion: string,
    activo: string,
    ruta_umbral?: [string],
    ruta_modelo?: [string],
  }
}

interface escala {
  $: {
    id: string,
    nombre: string,
    valores_validos: string,
    tipo: string,
    activo: string,
  }
}
interface unidadMedicion {
  $: {
    id: string,
    nombre: string,
    descripcion: string,
    acronimo: string,
    activo: string,
  }
}
interface aspectosAutoconsciencia {
  $: {
    id: string,
    nombre: string,
    descripcion: string,
    peso: string,
    tipo: string,
    activo: string,
  },
}

interface flujo_datos {
  $: {
    descripcion: string,
    tipo_comunicacion: string,
  }
}
interface propiedad {
  $: {
    id: string,
    nombre: string,
  }
}
