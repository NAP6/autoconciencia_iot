import { randomInt } from "crypto";
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

  //seleccionar Enumeracion
  public getEnumeracion(tipo: string, func: Function): void {
    
    var sql = `SELECT enu_nombre_valor, enu_valor
      FROM enumeracion
      WHERE enu_nombre_enumeracion = '${tipo}'`;
    this.connector.query(sql,
      (err, result, fields) => {
        if (err) err;
        var listaEnumeracion: Array<object> = [];
        for (const i in result) {
          var aux = {
            nombre: result[i]["ma_id"],
            valor: result[i]["ma_nombre"],
          }
          listaEnumeracion.push(aux);
        }
        func(listaEnumeracion);
      }
    );
  }

  //Guarda un nuevo modelo
  public save_newModel(
    nombre: string,
    descripcion: string,
    autor: string,
    modelo: object,
    user_id:string,
    func:Function
  ): void {
    var sql = `INSERT INTO modeloautoconsciencia (ma_nombre, ma_descripcion, ma_autor, ma_activo, ma_modelo_arquitectura, usr_id) 
    VALUES ('${nombre}', '${descripcion}', '${autor}', '1', '${JSON.stringify(modelo).replace("'", '$/COMILLA_SIMPLE/')}','${user_id}')`;
    this.connector.query(sql, function (error, results) {
      if (error) throw error;
      console.log("Esto es en save new model")
      console.log(results);
      func(results.insertId);
    });
  }

  public update_modal(id: string, nombre: string, descripcion: string, activo: string) {
    console.log(
      `########## Envio a la funcion de actualizar modelo ID: ${id}, Nombre: ${nombre}, descripcion: ${descripcion},activo:${activo}`
    );
    if (activo = 'true'){
      var activ = '1';
    }else{
      activ = '2';
    }
    this.connector.query(`UPDATE modeloautoconsciencia 
      SET ma_nombre = '${nombre}', ma_descripcion = '${descripcion}', ma_activo = '${activ}'
      WHERE ma_id = '${id}'`, function (err, result) {
      if (err) throw err;
    }
    );
  }
  //Eliminar modelo
  public delete_modal(id: string) {
    console.log(
      `########## Envio a la funcion de eliminar modelo ID: ${id}`
    );
    this.connector.query(`DELETE FROM modeloautoconsciencia 
      WHERE ma_id = '${id}'`, function (err, result) {
      if (err) throw err;

    }
    );
  }

  public get_subjectsObjects(modelID: string): object {
    return [
      {
        id: "EmergencySystem",
        name: "EmergencySystem",
        tiene_subsistemas: true,
        activo: true,
        inactivo: true,
        objects: { raiz_0: { id: "raiz_0", nombre: "raiz", objetos: {} } },
        subSystem: [
          {
            id: "EnvironmentalControlSubsystem",
            name: "EnvironmentalControlSubsystem",
            activo: false,
            objects: {
              raiz_0: {
                id: "raiz_0",
                nombre: "raiz",
                objetos: {
                  "1": {
                    id: "1",
                    nombre: "Objeto EnvironmentalControlSubsystem",
                    descripcion: "descripcion de EnvironmentalControlSubsystem",
                    unidadMedida: "1",
                    activo: false,
                    objetos: {},
                  },
                },
              },
            },
          },
          {
            id: "HealthSubsystem",
            name: "HealthSubsystem",
            activo: true,
            objects: {
              raiz_0: {
                id: "raiz_0",
                nombre: "raiz",
                objetos: {
                  "2": {
                    id: "2",
                    nombre: "Objeto HealthSubsystem",
                    descripcion: "Descripcion del objeto de HealthSubsystem",
                    unidadMedida: "1",
                    activo: true,
                    objetos: {},
                  },
                },
              },
            },
          },
        ],
      },
    ];
  }

  public get_entitys(modelID: string): object {
    return [
      {
        id: "Entidades Fisicas",
        name: "Entidades Fisicas",
        tiene_entidades: true,
        activo: true,
        inactivo: true,
        entitys: { raiz_0: { id: "raiz_0", nombre: "raiz", entidades: {} } },
        entity: [
          {
            id: "Casa",
            name: "Casa",

            activo: false,
            entitys: {
              raiz_0: {
                id: "raiz_0",
                nombre: "raiz",
                entidades: {
                  "1": {
                    id: "1",
                    nombre: "Entidad Casa",
                    descripcion: "descripcion de Casa",
                    peso: "1",
                    activo: false,
                    entidades: {},
                  },
                },
              },
            },
          },
          {
            id: "Hospital",
            name: "Hospital",

            activo: true,
            entitys: {
              raiz_0: {
                id: "raiz_0",
                nombre: "raiz",
                entidades: {
                  "2": {
                    id: "2",
                    nombre: "Entidad Hospital",
                    descripcion: "Descripcion del objeto del Hospital",
                    peso: "1",
                    activo: true,
                    entidades: {},
                  },
                },
              },
            },
          },
        ],
      },
      {
        id: "Entidades Digitales",
        name: "Entidades Digitales",
        tiene_entidades: true,
        activo: false,
        inactivo: true,
        entitys: { raiz_0: { id: "raiz_1", nombre: "raiz", entidades: {} } },
        entity: [
          {
            id: "Nodos Computacion",
            name: "Nodos Computacion",
            activo: false,

            entitys: {
              raiz_0: {
                id: "raiz_1",
                nombre: "raiz",
                objetos: {
                  "1": {
                    id: "1",
                    nombre: "Entidad Nodo Computacion",
                    descripcion: "descripcion de la entidad Nodo de Computacion",
                    peso: "1",
                    activo: false,
                    objetos: {},
                  },
                },
              },
            },
          },
          {
            id: "Nodos Edge",
            name: "Nodos Edge",
            activo: false,

            entitys: {
              raiz_0: {
                id: "raiz_1",
                nombre: "raiz",
                entidades: {
                  "2": {
                    id: "2",
                    nombre: "Entidad Nodos Edge",
                    descripcion: "Descripcion del la entidad Nodos Edge",
                    peso: "1",
                    activo: true,
                    entidades: {},
                  },
                },
              },
            },
          },
        ],
      },
      {
        id: "Dispositivos Iot",
        name: "Dispositivos Iot",
        tiene_entidades: true,
        activo: false,
        inactivo: true,
        entitys: { raiz_0: { id: "raiz_2", nombre: "raiz", entidades: {} } },
        entity: [
          {
            id: "Sensor",
            name: "Sensor",
            activo: false,
            tiene_entidades: true,
            entitys: {
              raiz_0: {
                id: "raiz_2",
                nombre: "raiz",
                entidades: {
                  "1": {
                    id: "1",
                    nombre: "Entidad Sensor",
                    descripcion: "descripcion de la entidad Sensor",
                    peso: "1",
                    activo: false,
                    entidades: {},
                  },
                },
              },
            },
          },
          {
            id: "Actuador",
            name: "Actuador",
            activo: true,

            entitys: {
              raiz_0: {
                id: "raiz_2",
                nombre: "raiz",
                entidades: {
                  "2": {
                    id: "2",
                    nombre: "Entidad Actuador",
                    descripcion: "Descripcion del la entidad Actuador",
                    peso: "1",
                    activo: true,
                    entidades: {},
                  },
                },
              },
            },
          },
          {
            id: "Tag",
            name: "Tag",
            activo: false,

            entitys: {
              raiz_0: {
                id: "raiz_2",
                nombre: "raiz",
                entidades: {
                  "2": {
                    id: "2",
                    nombre: "Entidad Tag",
                    descripcion: "Descripcion del la entidad Tag",
                    peso: "1",
                    activo: true,
                    entidades: {},
                  },
                },
              },
            },
          },

        ],
      },
      {
        id: "Redes",
        name: "Redes",

        activo: false,
        inactivo: true,
        entitys: { raiz_0: { id: "raiz_3", nombre: "raiz", entidades: {} } },
      },

    ];
  }

  public save_subjectsObjects(modelID: string, json: object): void {
    console.log(
      `########## Envio a la funcion de guardar objetos del sujeto, modelo: ${modelID} \n ${JSON.stringify(
        json
      )}`
    );
  }
  public save_entity(modelID: string, json: object): void {
    console.log(
      `########## Envio a la funcion de guardar objetos del sujeto, modelo: ${modelID} \n ${JSON.stringify(
        json
      )}`
    );
  }
  public getfisicalModel(modelID: string): object {
    console.log(
      `############# Envio a la funcion 'getfisicalModel' el id de usuario '${modelID}`
    );
    return this.modelo;
  }
  //Valida el usuario ingresado
  public validateUser(emailUser: string, passwoedUser: string, func: Function): void {
    var sql = `SELECT count(usr_id) as count FROM usuario WHERE usr_correo = '${emailUser}' and usr_password = '${passwoedUser}' `;
    this.connector.query(
      sql,
      (err, result) => {
        if (err) { err; }
        console.log(sql);
        func(result[0].count);
      }
    );
  }
  //Obtiene el usuario para validarlo
  public getUser(userEmail: string, passwoedUser: string, func: Function): void {
    this.connector.query(`SELECT usr_id, usr_nombre, usr_correo FROM usuario WHERE usr_correo = '${userEmail}' `, function (error, results, fields) {
      if (error) throw error;
      func({ userID: results[0].usr_id, userName: results[0]!.usr_nombre, email: results[0]!.usr_correo });
      console.log('The solution is: ', results[0]);
    });
  }

  public getUserModels(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUserModels' el id de usuario '${userID}'`
    );
      var sql = `SELECT ma_id, ma_nombre, ma_descripcion, ma_autor, CONVERT(ma_modelo_arquitectura USING utf8) as ma_modelo_arquitectura,ma_activo
      FROM modeloautoconsciencia
      WHERE usr_id = '${userID}'`;
     
      
    this.connector.query(sql,
      (err, result, fields) => {
        if (err) err;
        var listaModelo: Array<object> = [];
        var act;
        for (const i in result) {
          if (result[i]["ma_activo"] == 1) {
            act = 'true'
          } else if (result[i]["ma_activo"] == 2) {
            act = 'false'
          }
          var auxmodel = {
            id: result[i]["ma_id"],
            nombre: result[i]["ma_nombre"],
            descripcion: result[i]["ma_descripcion"],
            autor: result[i]["ma_autor"],
            json: result[i]["ma_modelo_arquitectura"].replace('$/COMILLA_SIMPLE/',"'"),
            activo:act,
          }
          listaModelo.push(auxmodel);
        }
        func(listaModelo);
      }
    );
  }
  public async getModel(modelID: string, func: Function): Promise<void> {
    console.log(
      `############# Envio a la funcion 'getModel' el id de usuario '${modelID}`
    );
    var sql = `SELECT ma_id,ma_nombre,ma_descripcion,ma_autor,ma_activo
    FROM modeloautoconsciencia
    WHERE ma_id = '${modelID}'`;
  await this.connector.query(sql,
    (err, result) => {
      if (err) err;
      console.log('Esto es en get model')
      console.log(result)
      func({
        nombre: result[0].ma_nombre,
        descripcion: result[0].ma_descripcion,
        modelID: result[0].ma_id,
      })
    });
  }

  public getUser_measurementUnit(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_measurementUnit' el id de usuario '${userID}`
    );

    this.connector.query(`SELECT um_id, um_nombre, um_descripcion, um_acronimo, um_activo
      FROM unidadmedicion`,
      (err, result, fields) => {
        if (err) err;
        var listaUmedicion: Array<object> = [];
        var act;
        for (const i in result) {
          //console.log(result[i]);

          if (result[i]["um_activo"] == 1) {
            act = 'true'
          } else if (result[i]["um_activo"] == 2) {
            act = 'false'
          }
          var auxmedicion = {
            id: result[i]["um_id"],
            nombre: result[i]["um_nombre"],
            descripcion: result[i]["um_descripcion"],
            acronimo: result[i]["um_acronimo"],
            activo: act,
          }
          listaUmedicion.push(auxmedicion);
        }
        func(listaUmedicion);
      });
  }
  public getUser_enumeracion(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_measurementUnit' el id de usuario '${userID}`
    );

    this.connector.query(`SELECT enu_id, enu_nombre_enumeracion
      FROM enumeracion`,
      (err, result, fields) => {
        if (err) err;
        var listaUmedicion: Array<object> = [];
        var act;
        for (const i in result) {
          //console.log(result[i]);
          var auxmedicion = {
            id: result[i]["enu_id"],
            nombre: result[i]["enu_nombre_enumeracion"],
            
          }
          listaUmedicion.push(auxmedicion);
        }
        func(listaUmedicion);
      });
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
    this.connector.query(`INSERT INTO unidadmedicion (um_nombre, um_descripcion, um_acronimo, um_activo) 
      VALUES ('${name}', '${descripcion}','${acronym}', '1')`, function (error, results) {
      if (error) throw error;
      //console.log('The solution is: ', results[0].solution);
    });
  }

  public delUser_measurementUnit(
    idUser: string,
    id: string,
  ): void {
    /* console.log(
      `############# Envio a la funcion 'delUser_measurementUnit' el id de usuario '${idUser}, id: ${id}`
    ); */
    this.connector.query(`DELETE  FROM unidadmedicion 
      WHERE um_id = '${id}'`, function (err, result) {
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
    if (activo == 'true') {
      act = 1;
    } else if (activo == 'false') {
      act = 2;
      console.log("Entra false");
    }
    this.connector.query(`UPDATE unidadmedicion 
      SET um_nombre = '${name}', um_descripcion = '${descripcion}', um_acronimo = '${acronym}', um_activo = '${act}'
      WHERE um_id = '${id}'`, function (err, result) {
      if (err) throw err;
    }
    );
  }
  public getUser_escales(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_escales' el id de usuario '${userID}`
    );
    this.connector.query(`SELECT esc_id, esc_nombre, esc_valor_valido, esc_tipo, esc_activo
      FROM escala`,
      (err, result, fields) => {
        if (err) err;
        var listaEscala: Array<object> = [];
        var tip;
        var act;
        for (const i in result) {
          //console.log(result[i]);
          if (result[i]["esc_tipo"] == 1) {
            tip = 'Ordinal';
          } else if (result[i]["esc_tipo"] == 2) {
            tip = 'Nominal';
          } else if (result[i]["esc_tipo"] == 3) {
            tip = 'Rango';
          } else if (result[i]["esc_tipo"] == 4) {
            tip = 'Ratio';
          }

          if (result[i]["esc_activo"] == 1) {
            act = 'true'
          } else if (result[i]["esc_activo"] == 2) {
            act = 'false'
          }
          var auxescala = {
            id: result[i]["esc_id"],
            nombre: result[i]["esc_nombre"],
            valor_valido: result[i]["esc_valor_valido"],
            tipo: tip,
            activo: act,
          }
          listaEscala.push(auxescala);
        }
        func(listaEscala);
      });
  }
  public addUser_escales(
    idUser: string,
    name: string,
    valor_valido: string,
    tipo: string
  ): void {
    var tip;
    if (tipo == 'Ordinal') {
      tip = 1;
    } else if (tipo == 'Nominal') {
      tip = 2;
    } else if (tipo == 'Rango') {
      tip = 3;
    } else if (tipo == 'Ratio') {
      tip = 4;
    }
    this.connector.query(`INSERT INTO escala (esc_nombre, esc_valor_valido, esc_tipo, esc_activo) 
      VALUES ('${name}', '${valor_valido}','${tip}', '1')`, function (error, results) {
      if (error) throw error;
      //console.log('The solution is: ', results[0].solution);
    });
  }

  public delUser_escales(
    idUser: string,
    id: string,
  ): void {
    console.log(
      `############# Envio a la funcion 'delUser_escales' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(`DELETE  FROM escala 
      WHERE esc_id = '${id}'`, function (err, result) {
      if (err) throw err;
    }
    );
  }
  public updUser_escales(
    idUser: string,
    id: string,
    name: string,
    valor_valido: string,
    activo: string,
    tipo: string,
  ): void {
    /* console.log(
      `############# Envio a la funcion 'updUser_escales' el id de usuario '${idUser}, id: ${id}, nombre: ${name}, valor_valido: ${valor_valido},activo: ${activo},tipo: ${tipo}`
    ); */
    var tip;
    var act;
    if (tipo == 'Ordinal') {
      tip = 1;
    } else if (tipo == 'Nominal') {
      tip = 2;
    } else if (tipo == 'Rango') {
      tip = 3;
    } else if (tipo == 'Ratio') {
      tip = 4;
    }

    if (activo == 'true') {
      act = 1;
    } else if (activo == 'false') {
      act = 2;
    }
    this.connector.query(`UPDATE escala 
      SET esc_nombre = '${name}', esc_valor_valido = '${valor_valido}', esc_tipo = '${tip}', esc_activo = '${act}'
      WHERE esc_id = '${id}'`, function (err, result) {
      if (err) throw err;
    }
    );
  }

  public getUser_decision_criteria(userID: string, func: Function): void {
    console.log(
      `############# Envio a la funcion 'getUser_escales' el id de usuario '${userID}`
    );
    this.connector.query(`SELECT cd_id, cd_nombre, cd_descripcion, cd_activo
      FROM criteriodecision`,
      (err, result, fields) => {
        if (err) err;
        var lista: Array<object> = [];
        var act;
        for (const i in result) {
          //console.log(result[i]);

          if (result[i]["cd_activo"] == 1) {
            act = 'true'
          } else if (result[i]["cd_activo"] == 2) {
            act = 'false'
          }
          var aux = {
            id: result[i]["cd_id"],
            nombre: result[i]["cd_nombre"],
            descripcion: result[i]["cd_descripcion"],
            activo: act,
          }
          lista.push(aux);
        }
        func(lista);
      });
  }
  public addUser_criteriaDecision(
    idUser: string,
    name: string,
    descripcion: string,
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

  public delUser_criteriaDecision(
    idUser: string,
    id: string,
  ): void {
    console.log(
      `############# Envio a la funcion 'delUser_criteriaDecision' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(`DELETE  FROM criteriodecision 
      WHERE cd_id = '${id}'`, function (err, result) {
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
    if (activo == 'true') {
      act = 1;
    } else if (activo == 'false') {
      act = 2;
    }
    this.connector.query(`UPDATE criteriodecision 
      SET cd_nombre = '${name}', cd_descripcion = '${descripcion}', cd_activo = '${act}'
      WHERE cd_id = '${id}'`, function (err, result) {
      if (err) throw err;
    }
    );
  }
  public getUser_umbral(userID: string,id_decicion:string, func: Function): void {
    this.connector.query(`SELECT umb_id, umb_nombre, umb_interpretacion, umb_inferior, umb_superior,umb_activo
    FROM umbral WHERE cd_id=${id_decicion}`,
      (err, result, fields) => {
        if (err) err;
        var listaumb: {id_decicion:string, umbrales:Array<object>} = {id_decicion:id_decicion,umbrales:[]};
        var act;
        for (const i in result) {
          //console.log(result[i]);
          if (result[i]["umb_activo"] == 1) {
            act = 'true'
          } else if (result[i]["umb_activo"] == 2) {
            act = 'false'
          }
          var auxmedicion = {
            id: result[i]["umb_id"],
            nombre: result[i]["umb_nombre"],
            interpretacion: result[i]["umb_interpretacion"],
            inferior: result[i]["umb_inferior"],
            superior: result[i]["umb_superior"],
            activo: act,
          }
          listaumb.umbrales.push(auxmedicion);
        }
        func(listaumb);
      });
    
   

  }
  public addUser_umbral(
    idUser: string,
    name: string,
    interpretacion: string,
    inferior: string,
    superior: string,
    id_decision:string,
  
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

  public delUser_umbral(
    idUser: string,
    id: string,
  ): void {
    console.log(
      `############# Envio a la funcion 'delUser_umb' el id de usuario '${idUser}, id: ${id}`
    );
    this.connector.query(`DELETE  FROM umbral 
      WHERE umb_id = '${id}'`, function (err, result) {
      if (err) throw err;
    }
    );
  }
  public updUser_umbral(
    idUser: string,
    id: string,
    name: string,
    interpretacion: string,
    inferior:string,
    superior:string,
    activo: string
  ): void {
    console.log(
      `############# Envio a la funcion 'updUser_criteriaDecision' el id de usuario '${idUser}, id: ${id}, nombre: ${name}, interpretacion: ${interpretacion},inferior:${inferior},superior:${superior},activo:${activo}`
    );
    var act;
    if (activo == 'on') {
      act = 1;
    } else if (activo == 'off') {
      act = 2;
    }
    this.connector.query(`UPDATE umbral 
      SET umb_nombre = '${name}', umb_interpretacion = '${interpretacion}', umb_inferior = '${inferior}', umb_superior = '${superior}', umb_activo = '${act}'
      WHERE umb_id = '${id}'`, function (err, result) {
      if (err) throw err;
    }
    );
  }

  public getUser_Aspects(userID: string): object {
    console.log(
      `############# Envio a la funcion 'getUser_measurementUnit' el id de usuario '${userID}`
    );
    return [
      {
        id: "1",
        descripcion: "Carga actual de la bateria del sensor DHT11",
      },
      {
        id: "2",
        descripcion: "Eficencia en el consumo de energia de la bateria del sensor DHT11",
      },
    ];
  }

  public addUser_aspects(
    idUser: string,
    descripcion: string,
  ): void {
    console.log(
      `############# Envio a la funcion 'addUser_aspects' el id de usuario '${idUser},descripcion: ${descripcion}`
    );
  }

  public delUser_aspects(
    idUser: string,
    id: string,
  ): void {
    console.log(
      `############# Envio a la funcion 'delUser_aspects' el id de usuario '${idUser}, id: ${id}`
    );
  }
  public updUser_aspects(
    idUser: string,
    id: string,
    descripcion: string,
  ): void {
    console.log(
      `############# Envio a la funcion 'updUser_aspects' el id de usuario '${idUser}, id: ${id}, descripcion: ${descripcion}`
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
