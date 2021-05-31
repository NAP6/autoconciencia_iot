import { MeasurementUnit } from "../MeasurementUnit";
import { SQL_Qwerty } from "../../SQL_Qwerty";
export class MeasurementUnitQ extends MeasurementUnit implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO
        unidadmedicion (
                um_nombre,
                um_descripcion,
                um_acronimo,
                um_activo
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.acronym}',
                '${this.active ? 1 : 0}'

            )`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = "";
    if (tag.indexOf("/@/METRIC/@/")) {
      sql = `SELECT
		un.um_id as id,
		un.um_nombre as name,
		un.um_descripcion as descripcion,
		un.um_acronimo as acronimo
	   	FROM
		unidadmedicion un,
		metrica met
	   	WHERE
	   	met.met_id=${value[tag.indexOf("/@/METRIC/@/")]} AND
	   	met.um_id=un.um_id`;
    } else {
      var sql = `SELECT 
    um_id as id,
    um_nombre as name,
    um_descripcion as description,
    um_acronimo as acronym,
    um_activo as active
         FROM 
         unidadmedicion`;
    }

    return sql;
  }
  toSqlDelete(value: string[]): string {
    var sql = `DELETE FROM unidadmedicion WHERE um_id=${this.id} `;
    return sql;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE 
    unidadmedicion
    SET
    um_nombre='${this.name}', 
    um_descripcion='${this.description}',
    um_acronimo='${this.acronym}',
    um_activo=${this.active ? 1 : 0}
  WHERE 
    um_id=${this.id}`;
    return sql;
  }
  toObjectArray(rows: any): any[] {
    var unidad: MeasurementUnitQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var aux: MeasurementUnitQ = new MeasurementUnitQ(
        rows[i].id,
        rows[i].name,
        rows[i].descripcion,
        rows[i].acronimo
      );
      unidad.push(aux);
    }
    return unidad;
  }
}
