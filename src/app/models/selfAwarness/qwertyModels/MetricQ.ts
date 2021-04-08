import { Metric } from "../Metric";
import { SQL_Qwerty } from "../../SQL_Qwerty";
export class MetricQ extends Metric implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO
            metrica (
                met_nombre,
                met_descripcion,
                met_abreviacion,
                met_tipo,
                met_perspectivaindicador,
                met_activo,
                esc_id,
                um_id
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.abbreviation}',
                '${value[tag.indexOf("/@/TYPE/@/")]}',
                '${this.perspective}',
                '${this.active ? 1 : 0}',
                '${value[tag.indexOf("/@/ESCALE/@/")]}',
                '${value[tag.indexOf("/@/UNIT/@/")]}'

            )`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
	  if (
      tag.indexOf("/@/ASPECTID/@/") != -1 &&
      tag.indexOf("/@/TYPE/@/") != -1
    ) {
      var sql = `SELECT 
    met.met_id as id, 
    met.met_nombre as name
  FROM 
    metrica met,
aspectoautoconsciencia_metrica asp_met
  WHERE 
     asp_met.aa_id=${
      value[tag.indexOf("/@/ASPECTID/@/")]
    } AND asp_met.met_id=met.met_id AND met.met_tipo=${
        value[tag.indexOf("/@/TYPE/@/")]
      }`;
      return sql;
    } else {
      var sql = `SELECT 
    met.met_id as id, 
    met.met_nombre as name,
    met.met_descripcion as description,
    met.met_abreviacion as abbreviation,
    met.met_perspectivaindicador as perspectiva,
    met.met_tipo as tipo_id,
    enu.enu_nombre_valor as met_type,
    met.esc_id as scale,
    met.um_id as unit,
    met.met_activo as active
    `;
      if (tag.indexOf("/@/ASPECTID/@/") != -1) {
        sql += `,IF((SELECT COUNT(asp_me.met_id) FROM aspectoautoconsciencia_metrica as asp_me WHERE asp_me.aa_id=${
          value[tag.indexOf("/@/ASPECTID/@/")]
        } && asp_me.met_id=met.met_id )>0, True,false) as existe`;
      } else if (
        tag.indexOf("/@/ASPECTID/@/") != -1 &&
        tag.indexOf("/@/TYPE/@/") != -1
      ) {
        sql += ``;
      }
      sql += `
  FROM 
    metrica met,
    enumeracion enu
  WHERE 
    enu.enu_id=met.met_tipo`;
      return sql;
    }
  }
  toSqlDelete(value: string[]): string {
    var sql = `DELETE FROM metrica WHERE met_id=${this.id} `;
    return sql;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    var activo;

    var sql = `UPDATE 
    metrica
    SET
    met_nombre='${this.name}', 
    met_descripcion='${this.description}',
    met_abreviacion='${this.abbreviation}',
    met_perspectivaindicador='${this.perspective}',
    met_tipo='${value[tag.indexOf("/@/TYPE/@/")]}',
    esc_id='${value[tag.indexOf("/@/ESCALE/@/")]}',
    um_id='${value[tag.indexOf("/@/UNIT/@/")]}',
    met_activo=${this.active ? 1 : 0}
  WHERE 
    met_id=${this.id}`;
    return sql;
  }
  toObjectArray(rows: any): any[] {
    throw new Error("Method not implemented.");
  }
}
