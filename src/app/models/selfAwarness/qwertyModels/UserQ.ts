import { User } from "../User";
import { SQL_Qwerty } from "../../SQL_Qwerty";

export class UserQ extends User implements SQL_Qwerty {
  toSqlInsert(tag: string[], value: string[]): string {
    var sql: string = `INSERT INTO usuario(
				usr_nombre,
				usr_descripcion,
				usr_correo,
				usr_password
	    		) values (
				'${this.name}',
				'${this.description}',
				'${this.mail}',
				'${this.password}'
	    		)`;
    return sql;
  }

  toSqlSelect(tag: string[], value: string[]): string {
    var tagList = {
      "/@/MAIL/@/": "usr_correo = ",
      "/@/PASSWRD/@/": "usr_password = ",
    };
    var sql = `SELECT 
	usr_id as id,
    usr_nombre as name,
    usr_descripcion as description,
    usr_correo as mail,
    usr_password as password
FROM 
	usuario 
WHERE `;
    for (var i = 0; i < tag.length; i++) {
      sql += tagList[tag[i]] + "'" + value[i] + "'";
      if (i < tag.length - 1) {
        sql += " AND ";
      }
    }
    return sql;
  }

  toSqlDelete(tag: string[], value: string[]): string {
    return ``;
  }

  toSqlUpdate(tag: string[], value: string[]): string {
    return ``;
  }

  toObjectArray(rows): UserQ[] {
    var results: UserQ[] = [];
    rows.forEach((element) => {
      var aux = new UserQ(
        element.id,
        element.name,
        element.description,
        element.mail,
        element.password
      );
      results.push(aux);
    });
    return results;
  }
}
