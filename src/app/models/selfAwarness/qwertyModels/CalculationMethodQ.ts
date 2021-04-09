import { CalculationMethod } from "../CalculationMethod";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class CalculationMethodQ
  extends CalculationMethod
  implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `call MetodoCalculo(
	      	${value[tag.indexOf("/@/PROCES/@/")]},
		${this.produces?.id},
		${this.implementationResourceType},
		${
      this.calculationPeriodStart == undefined
        ? "NULL"
        : "'" + this.calculationPeriodStart + "'"
    },
		${
      this.calculationPeriodEnd == undefined
        ? "NULL"
        : "'" + this.calculationPeriodEnd + "'"
    },
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
