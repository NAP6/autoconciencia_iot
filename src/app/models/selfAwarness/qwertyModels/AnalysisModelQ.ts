import { AnalysisModel } from "../AnalysisModel";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class AnalysisModelQ extends AnalysisModel implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `call ModeloAnalisis(
	         ${value[tag.indexOf('/@/PROCES/@/')]},
		 ${this.produces?.id},
                 ${this.implementationResourceType},
	         ${value[tag.indexOf('/@/CRITERIA/@/')]},
                  @id)`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlDelete(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toSqlUpdate(tag: string[], value: string[]): string {
    throw new Error("Method not implemented.");
  }
  toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
  }
}
