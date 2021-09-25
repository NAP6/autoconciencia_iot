import * as fs from "fs";
import { parseString } from "xml2js";

export class json {
  private json: { [key: string]: any };
  constructor() {
    this.json = [];
  }

  public setJSON(json: object): void {
    this.json = json;
  }
  public getJSON(): object {
    return this.json;
  }
  public xml_file2json(xml_file: string): object {
    var json: object = [];
    try {
      const xml = fs.readFileSync(xml_file);
      parseString(xml, function (err: Error, result: Object) {
        if (err) throw err;
        json = result;
      });
      fs.unlink(xml_file, (err) => {
        if (err) throw err;
      });
    } catch (error) {
      console.log("No se ha ingresado ningun valor");
    }
    this.json = json;
    return json;
  }
  public getSystem(): [systemObj] {
    var nameModel: string = Object.keys(this.json)[0];
    const ob = this.json[nameModel]["represents"];
    return ob;
  }
  /*public getEntity(): [systemEnt] {
    var nameModel: string = Object.keys(this.json)[0];
    const ob = this.json[nameModel]["containsEntity"];
    return ob;
  }*/
  public getEntity(): ([systemEnt] | undefined) {
    var nameM = Object.keys(this.json)[0];
    var entidades = this.json[nameM]["containsEntity"];
    var obj: ([systemEnt] | undefined);
    entidades.forEach(element => {
      element.$["xsi:type"] = element.$["xsi:type"].split(':')[1];
      var auxComputing: ([systemEnt] | undefined);
      var auxEntity: ([systemEnt] | undefined);
      var auxcontain: ([systemEnt] | undefined);
      if (element.containsResource) {
        auxcontain = this.extraerItems(element.containsResource);
      }
      if (element.containsComputingNode) {
        auxComputing = this.extraerItems(element.containsComputingNode);
      }
      if (element.subPhysicalEntity) {
        auxEntity = this.extraerItems(element.subPhysicalEntity, true);
      }
      var data: systemEnt = { $: element.$ };
      if (element.has) {
        var hasAux:[flujos?] = [];
        //data["has"] = element.has;
        element.has.forEach(element2 => {
          var aux2: flujos={$:element2.$}
          if (element2.$.hasRulePropertyToDataColumn) {
            var nameModel: string = Object.keys(this.json)[0];
            var ob = this.json[nameModel]["containsDataFlow"];
            var dataF = this.extracDataFlow(element2.$.hasRulePropertyToDataColumn, ob);
            aux2.dataFlow = dataF;
          }
          hasAux.push(aux2);
        });
        data["has"] = hasAux;
      }
      if (auxComputing)
        data["comput"] = auxComputing;
      if (auxEntity)
        data["Entity"] = auxEntity;
      if (auxcontain)
        data["containsResource"] = auxcontain;
      if (obj)
        obj.push(data);
      else
        obj = [data]
    });
    return obj;
  }
  private extraerItems(item, isSubEntity = false): ([systemEnt] | undefined) {
    var obj: ([systemEnt] | undefined);
    item.forEach(element => {
      if (isSubEntity) {
        element.$["xsi:type"] = "PhysicalEntity";
      } else if (element.$["xsi:type"]) {
        element.$["xsi:type"] = element.$["xsi:type"].split(':')[1];
      }
      var auxComputing: ([systemEnt] | undefined);
      var auxEntity: ([systemEnt] | undefined);
      var auxcontain: ([systemEnt] | undefined);
      if (element.containsResource) {
        auxcontain = this.extraerItems(element.containsResource);
      }
      if (element.containsComputingNode) {
        auxComputing = this.extraerItems(element.containsComputingNode);
      }
      if (element.subPhysicalEntity) {
        auxEntity = this.extraerItems(element.subPhysicalEntity, true);
      }

      var data: systemEnt = { $: element.$ };
      if (element.has) {
        var hasAux:[flujos?] = [];
        //data["has"] = element.has;
        element.has.forEach(element2 => {
          var aux2: flujos={$:element2.$}
          if (element2.$.hasRulePropertyToDataColumn) {
            var nameModel: string = Object.keys(this.json)[0];
            var ob = this.json[nameModel]["containsDataFlow"];
            var dataF = this.extracDataFlow(element2.$.hasRulePropertyToDataColumn, ob);
            aux2.dataFlow = dataF;
          }
          hasAux.push(aux2);
        });
        data["has"] = hasAux;
      }
      if (auxComputing)
        data["comput"] = auxComputing;
      if (auxEntity)
        data["Entity"] = auxEntity;
      if (auxcontain)
        data["containsResource"] = auxcontain;
      if (obj)
        obj.push(data);
      else
        obj = [data]

    });
    return obj;
  }

  private extracDataFlow(listDataFlow: string, listJson: Array<Object>): [dataFlow?] {
    var lista = listDataFlow.split(" ");
    var obj: [dataFlow?] = [];
    lista.forEach(element => {
      var aux = element.split("/").join("");
      var aux2 = aux.split("@");
      var indice = aux2[1].split(".");
      var elem:any = (listJson[parseInt(indice[1])]);
      var flu:dataFlow = {id: elem.$.id, description: elem.$.description,communicationType: elem.$.communicationType};
      obj.push(flu);
    });
    return obj;
  }
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