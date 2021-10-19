import { SelfAwarenessAspect } from "../SelfAwarenessAspect";
import { SQL_Qwerty } from "../../SQL_Qwerty";
export class SelfAwarenessAspectQ
  extends SelfAwarenessAspect
  implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO
aspectoautoconsciencia (
                aa_nombre,
                aa_descripcion,
                aa_peso,
                aa_tipo,
                aa_activo,
		aa_alcance,
                suj_id,
                ma_id
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.weight}',
                '${this.aspectType}',
                '${this.active ? 1 : 0}',
		'${value[tag.indexOf("/@/ALCANCE/@/")]}',
                '${value[tag.indexOf("/@/SUBJECT/@/")]}',
                '${value[tag.indexOf("/@/MODEL/@/")]}'
            )`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    if (tag.indexOf("/@/SYSTEM/@/") != -1) {
      var sql = ` SELECT
	      asp.aa_id as id,
	      asp.aa_nombre as name,
              asp.aa_descripcion as description,
	      asp.aa_peso as weigth,
              asp.aa_tipo as tipo_id,
	      enu.enu_nombre_valor as tipo,
	      asp.aa_alcance as alcance,
	      asp.aa_operador as operador_id,
	      enu2.enu_nombre_valor as operador,
              asp.suj_id as suj,
              suj.suj_nombre as sujeto,
              asp.ma_id as model,
              asp.aa_activo as active
	         FROM
	      aspectoautoconsciencia asp,
              enumeracion enu,
	      enumeracion enu2,
              sujeto suj,
	      procesoautoconsciencia pro
	         WHERE
	      enu.enu_id=asp.aa_tipo AND
	      enu2.enu_id=asp.aa_operador AND
		asp.suj_id= suj.suj_id AND
	        suj.ma_id = ${value[tag.indexOf("/@/MODEL/@/")]} AND
	        asp.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
		asp.aa_alcance=53`;
      return sql;
    } else if (tag.indexOf("/@/PROCESS/@/") != -1) {
      var sql = ` SELECT
	      asp.aa_id as id,
	      asp.aa_nombre as name,
              asp.aa_descripcion as description,
	      asp.aa_peso as weigth,
              asp.aa_tipo as tipo_id,
	      enu.enu_nombre_valor as tipo,
	      asp.aa_alcance as alcance_id,
	      enu3.enu_nombre_valor as alcance,
	      asp.aa_operador as operador_id,
	      enu2.enu_nombre_valor as operador,
              asp.suj_id as suj,
              asp.ma_id as model,
              asp.aa_activo as active
	         FROM
	      aspectoautoconsciencia asp,
              enumeracion enu,
	      enumeracion enu2,
	      enumeracion enu3,
	      procesoautoconsciencia pro
	         WHERE
	      enu.enu_id=asp.aa_tipo AND
	      enu2.enu_id=asp.aa_operador AND
	      enu3.enu_id=asp.aa_alcance AND
	        asp.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
		pro.pa_id=${value[tag.indexOf("/@/PROCESS/@/")]} AND
	    	pro.aa_id=asp.aa_id`;
      return sql;
    } else {
      var sql = ` SELECT
	      asp.aa_id as id,
	      asp.aa_nombre as name,
              asp.aa_descripcion as description,
	      asp.aa_peso as weigth,
              asp.aa_tipo as tipo_id,
	      enu.enu_nombre_valor as tipo,
	      asp.aa_alcance as alcance,
              asp.suj_id as suj,
              asp.ma_id as model,
              asp.aa_activo as active
	         FROM
	      aspectoautoconsciencia asp,
              enumeracion enu
	         WHERE
	      enu.enu_id=asp.aa_tipo AND
	        asp.ma_id=${value[tag.indexOf("/@/MODEL/@/")]} AND
		asp.aa_alcance=53`;
      return sql;
    }
  }
  toSqlDelete(value: string[]): string {
    var sql = `DELETE FROM aspectoautoconsciencia WHERE aa_id=${this.id} `;
    return sql;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE 
    aspectoautoconsciencia
    SET
    aa_nombre='${this.name}', 
    aa_descripcion='${this.description}',
    aa_peso='${this.weight}',
    aa_tipo='${this.aspectType}',
    ma_id='${value[tag.indexOf("/@/MODEL/@/")]}',
    aa_activo=${this.active ? 1 : 0}
  WHERE 
    aa_id=${this.id}`;
    return sql;
  }

  sql_childs(): string {
    return ` SELECT
 	      asp.aa_id as id,
	      asp.aa_nombre as name,
              asp.aa_descripcion as description,
	      asp.aa_peso as weigth,
              asp.aa_tipo as tipo_id,
	      enu.enu_nombre_valor as tipo,
	      asp.aa_alcance as alcance,
              asp.suj_id as suj,
              asp.ma_id as model,
              asp.aa_activo as active
	  	FROM
		aspectoautoconsciencia_derivado dev,
		aspectoautoconsciencia asp,
		enumeracion enu
	  	WHERE
		asp.aa_id=dev.aad_hijo AND
		dev.aad_padre=${this.id} AND
		enu.enu_id=asp.aa_tipo`;
  }

  toObjectArray(rows: any): any[] {
    rows = rows;
    var res: SelfAwarenessAspectQ[];
    res = [];
    for (var i = 0; i < rows.length; i++) {
      var aux = new SelfAwarenessAspectQ(
        rows[i].id,
        rows[i].name,
        rows[i].description,
        rows[i].weigth,
        rows[i].tipo,
        rows[i].operador,
        rows[i].alcance
      );
      res.push(aux);
    }
    return res;
  }
}
