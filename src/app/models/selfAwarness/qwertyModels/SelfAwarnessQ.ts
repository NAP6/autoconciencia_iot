import { SelfAwarness } from "../SelfAwarness";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class SelfAwarnessQ extends SelfAwarness implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql: string = `INSERT INTO modeloautoconsciencia(ma_nombre, ma_descripcion, ma_autor, ma_modelo_arquitectura, usr_id) VALUES ('${this.name}','${this.description}','${this.author}','${this.architectureModel.split("'").join("`")}', /@/USER/@/)`;

    for (var i = 0; i < tag.length; i++) {
      sql = sql.replace(tag[i], value[i]);
    }
    return sql;
  }

  toSqlSelect(tag: string[], value: string[]): string {
    var tagList = {
      "/@/USER/@/": "usr_id = ",
      "/@/MODEL/@/": "ma_id = ",
    };
    var sql = `SELECT 
    		ma_id as id, 
		ma_nombre as name, 
		ma_descripcion as description, 
		ma_autor as author, 
		CONVERT(ma_modelo_arquitectura USING utf8) as architectureModel,
		ma_activo as active
            FROM 
	    	modeloautoconsciencia
            WHERE `;
    for (var i = 0; i < tag.length; i++) {
      sql += tagList[tag[i]] + value[i];
      if (i < tag.length - 1) {
        sql += " AND ";
      }
    }
    return sql;
  }

  toSqlDelete(tag: string[], value: string[]): string {
    return ``;
  }

  toObjectArray(rows): SelfAwarnessQ[] {
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
