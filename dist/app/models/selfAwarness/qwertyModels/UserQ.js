"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQ = void 0;
const User_1 = require("../User");
class UserQ extends User_1.User {
    toSqlInsert(tag, value) {
        var sql = `INSERT INTO usuario(
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
    toSqlSelect(tag, value) {
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
    toSqlDelete(tag, value) {
        return ``;
    }
    toSqlUpdate(tag, value) {
        return ``;
    }
    toObjectArray(rows) {
        var results = [];
        rows.forEach((element) => {
            var aux = new UserQ(element.id, element.name, element.description, element.mail, element.password);
            results.push(aux);
        });
        return results;
    }
}
exports.UserQ = UserQ;
