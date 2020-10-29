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
  public getSystem(): object {
    var nameModel: string = Object.keys(this.json)[0];
    const ob = this.json[nameModel]["represents"];
    return ob;
  }
  public getEntity(): object {
    var nameModel: string = Object.keys(this.json)[0];
    const ob = this.json[nameModel]["containsEntity"];
    return ob;
  }
}
