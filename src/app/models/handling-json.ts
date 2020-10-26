import * as fs from "fs";
import { parseString } from "xml2js";

export class json {
  private json: object;
  constructor(){
    this.json=[];
  }

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
    return json;
  }
  public getSystem(): object {
    return [];
  }
  public getEntity(): object {
    return [];
  }
}
