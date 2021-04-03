import { WebService } from "../WebService";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class WebServiceQ extends WebService implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `call servicio(
	  		'${this.name}',
	  		'${this.description}',
	  		${this.returnDataType},
	  		1,
	  		'${this.endPoint}',
	  		'${this.instrucctions}',
	  		'${value[tag.indexOf("/@/P_EXIST/@/")]}',
	  		'${this.DataFormatType}',
			@id
		  )`;
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
    var services: WebServiceQ[] = [];
    rows = rows[0];
    for (var i = 0; i < rows.length; i++) {
      var service: WebServiceQ = new WebServiceQ(
        rows[i].id,
        rows[i].nombre,
        rows[i].descripcion,
        [rows[i].dato_salida, rows[i].dato_salida_id],
        rows[i].punto_final,
        rows[i].instrucciones,
        rows[i].tipo_formato_dato_salida
      );
      service.preexisting = rows[i].pre_existente;
      services.push(service);
    }
    return services;
  }
}
