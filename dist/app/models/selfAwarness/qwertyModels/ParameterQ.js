"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterQ = void 0;
const Parameter_1 = require("../Parameter");
class ParameterQ extends Parameter_1.Parameter {
    constructor() {
        super(...arguments);
        this._active = false;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get id() {
        return this.ordinal;
    }
    set id(value) {
        this.ordinal = value;
    }
    toSqlInsert(tag, value) {
        if (this.id != undefined) {
            var sql = `INSERT INTO 
	  		parametro (
			        par_id,
	  			par_ordinal, 
		  		par_nombre, 
		  		par_opcional, 
		  		par_activo, 
		  		par_tipo_dato, 
		  		ri_id
  			) VALUES (
			        '${this.ordinal}',
	  			'${this.ordinal}', 
		  		'${this.name}', 
		  		'${this.optional ? 1 : 0}', 
				'${value[tag.indexOf("/@/ACTIVE/@/")]}',
		  		'${this.dataType}', 
				'${value[tag.indexOf("/@/ID/@/")]}'
  			)`;
            console.log(sql);
            return sql;
        }
        else {
            var sql = `INSERT INTO 
	  		parametro (
	  			par_ordinal, 
		  		par_nombre, 
		  		par_opcional, 
		  		par_activo, 
		  		par_tipo_dato, 
		  		ri_id
  			) VALUES (
	  			'${this.ordinal}', 
		  		'${this.name}', 
		  		'${this.optional ? 1 : 0}', 
				'${value[tag.indexOf("/@/ACTIVE/@/")]}',
		  		'${this.dataType}', 
				'${value[tag.indexOf("/@/ID/@/")]}'
  			)`;
            console.log(sql);
            return sql;
        }
    }
    toSqlSelect(tag, value) {
        var sql = "";
        if (tag.indexOf("/@/MAPPING/@/") != -1) {
            sql = `SELECT 
      			pa.par_id as id,
	  		pa.par_ordinal as ordinal,
		  	pa.par_nombre as nombre, 
		  	pa.par_opcional as opcional, 
		  	pa.par_activo as activo,
		  	pa.par_tipo_dato as tipo,
		  	enu.enu_nombre_valor as nombre_salida 
	  	FROM 	
			parametro pa, 
			enumeracion enu,
			mapeoparametros map
		WHERE 
	  		map.md_id=${value[tag.indexOf("/@/MAPPING/@/")]} AND 
			map.par_ordinal=pa.par_id AND
			pa.par_tipo_dato=enu.enu_id`;
        }
        else {
            sql = `SELECT 
      			pa.par_id as id,
	  		pa.par_ordinal as ordinal,
		  	pa.par_nombre as nombre, 
		  	pa.par_opcional as opcional, 
		  	pa.par_activo as activo,
		  	pa.par_tipo_dato as tipo,
		  	enu.enu_nombre_valor as nombre_salida 
	  	FROM 	
			parametro pa, 
			enumeracion enu
		WHERE 
	  		ri_id = '${value[tag.indexOf("/@/RI_ID/@/")]}' AND 
			pa.par_tipo_dato=enu.enu_id`;
        }
        console.log(sql);
        return sql;
    }
    toSqlDelete(tag, value) {
        throw new Error("Method not implemented.");
    }
    toSqlUpdate(tag, value) {
        throw new Error("Method not implemented.");
    }
    toObjectArray(rows) {
        var parameters = [];
        for (var i = 0; i < rows.length; i++) {
            var par = new ParameterQ(rows[i].ordinal, rows[i].id, rows[i].nombre, [rows[i].tipo, rows[i].nombre_salida], rows[i].opcional == 1 ? true : false);
            par.active = rows[i].activo == 1 ? true : false;
            parameters.push(par);
        }
        return parameters;
    }
}
exports.ParameterQ = ParameterQ;
