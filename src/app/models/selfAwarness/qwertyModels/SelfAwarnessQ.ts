import { SelfAwarness } from "../SelfAwarness";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class SelfAwarnessQ extends SelfAwarness implements SQL_Qwerty {
  toSqlInsert(): string {
    return `INSERT INTO modeloautoconsciencia (ma_nombre, ma_descripcion, ma_autor, ma_modelo_arquitectura , usr_id) VALUES ('${this.name}','${this.description}','${this.author}','${this.architectureModel}', /@/USER/@/)`;
  }

  toSqlSelect(): string {
    return `SELECT 
    		ma_id as id, 
		ma_nombre as name, 
		ma_descripcion as description, 
		ma_autor as author, 
		CONVERT(ma_modelo_arquitectura USING utf8) as architectureModel,
		ma_activo as active
            FROM 
	    	modeloautoconsciencia
            WHERE 
	  	usr_id = /@/USER/@/`;
  }

  toSqlDelete(): string {
    return ``;
  }

  toObjectArray(rows): SQL_Qwerty[] {
    var results: SelfAwarnessQ[] = [];
    rows.forEach((element) => {
      var aux = new SelfAwarnessQ(
        element.id,
        element.name,
        element.description,
        element.author,
        element.architectureModel
      );
      aux.active = element.active;
      results.push(aux);
    });
    return results;
  }
}
