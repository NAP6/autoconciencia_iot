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
      if(element.has){
        data["has"]=element.has;
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
      if(element.has){
        data["has"]=element.has;
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
}

interface systemObj {
  $: { id: string; name: string; descrption: string; domain: string };
  iotSubsystem?: [systemObj];
}
interface systemEnt {
  $: { 'xsi:type'?: string; id: string; name: string; };
  comput?: ([systemEnt] | undefined);
  Entity?: ([systemEnt] | undefined);
  has?:[{$:{id?:string,name?:string}}|undefined];
  containsResource?: ([systemEnt] | undefined);
}

