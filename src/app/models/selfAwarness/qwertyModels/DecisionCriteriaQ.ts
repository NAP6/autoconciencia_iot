import { DecisionCriteria } from "../DecisionCriteria";
import { SQL_Qwerty } from "../../SQL_Qwerty";
export class DecisionCriteriaQ extends DecisionCriteria implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql = `INSERT INTO
            criteriodecision (
                cd_nombre,
                cd_descripcion,
                cd_activo
            ) VALUES (
                '${this.name}',
                '${this.description}',
                '${this.active ? 1 : 0}'

            )`;
    return sql;
  }
  toSqlSelect(tag: string[], value: string[]): string {
    var sql = "";
    if (tag.indexOf("/@/OBJECT/@/") != -1) {
      sql = `SELECT 
	    	cri.cd_id as id,
		cri.cd_nombre as name,
		cri.cd_descripcion as description,
		cri.cd_activo as active
	     FROM 
		criteriodecision cri,
		objetivo obj 
	     WHERE  
	    	obj.cd_id=cri.cd_id AND
	    	obj.obj_id = ${value[tag.indexOf("/@/OBJECT/@/")]}`;
      return sql;
    }else if(tag.indexOf("/@/METHOD/@/")!=-1){
      sql = `SELECT 
	    	cri.cd_id as id,
		cri.cd_nombre as name,
		cri.cd_descripcion as description,
		cri.cd_activo as active
	     FROM 
		criteriodecision cri,
		modeloanalisis modelo 
	     WHERE  
	    	modelo.cd_id=cri.cd_id AND
	    	modelo.mea_id = ${value[tag.indexOf("/@/METHOD/@/")]}`;
      return sql;

    }

    sql = `SELECT 
    cd_id as id,
    cd_nombre as name,
    cd_descripcion as description,
    cd_activo as active
         FROM 
         criteriodecision`;
    return sql;
  }
  toSqlDelete(value: string[]): string {
    var sql = `DELETE FROM criteriodecision WHERE cd_id=${this.id} `;
    return sql;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    var sql = `UPDATE 
    criteriodecision
    SET
    cd_nombre='${this.name}', 
    cd_descripcion='${this.description}',
    cd_activo=${this.active ? 1 : 0}
  WHERE 
    cd_id=${this.id}`;
    return sql;
  }
  toObjectArray(rows: any): any[] {
    var criteria: DecisionCriteriaQ[] = [];
    for (var i = 0; i < rows.length; i++) {
      var aux: DecisionCriteriaQ = new DecisionCriteriaQ(
        rows[i].id,
        rows[i].name,
        rows[i].description
      );
      criteria.push(aux);
    }
    return criteria;
  }
}
