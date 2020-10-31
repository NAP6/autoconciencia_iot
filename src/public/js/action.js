function consultar_api(url = "", fun1, fun2) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => fun1(json))
    .catch((error) => fun2(error));
}

/* 
    SECCION SELECCION SUJETOS CUADROS DINAMICOS SE SELECCION

        Descripcion:
            En este fragmento se encuentran las funciones que hacen posible el dinamismo
            de la seccion de seleccion de sujetos, haciendola mas interactiva. Ademas cuenta
	    con las funciones que consultan la api para cargar los sujetos.

        Incluye:
	    cargar_posibles_sujetos_modelo
	    error_cargar_posibles_sujetos_modelo
	    verificar_seleccion_hijo_pagre
            agregar_sujeto_seleccionado
            remover_sujeto_seleccionado
            extraer_datos_sujeto_e_hijos_lista_check
            actualizar_sujetos
            extraer_datos_sujeto
*/

if (document.getElementById("lista_sujetos_para_cargar"))
  consultar_api(
    "http://localhost:3000/api/system",
    cargar_posibles_sujetos_modelo,
    error_cargar_posibles_sujetos_modelo
  );

function cargar_posibles_sujetos_modelo(json) {
  var para_cargar = document.getElementById("lista_sujetos_para_cargar");
  var seleccionados = document.getElementById("lista_sujetos_seleccionados");
  var oblejetosSujetos = [];
  var contenido_carga = "";
  var contenido_seleccion = "";
  json.forEach((element) => {
    oblejetosSujetos.push({
      id: element["$"]["id"],
      name: element["$"]["name"],
      objetos: [],
    });
    contenido_carga +=
      '<li id="visivilidad_sujetos_para_seleccion_' +
      element["$"]["id"] +
      '"><div class="form-check"><input type="checkbox" class="form-check-input sujeto_para_seleccion_padre" id="sujetos_para_seleccion_' +
      element["$"]["id"] +
      '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
      element["$"]["id"] +
      '" data-puro_name="' +
      element["$"]["name"] +
      '" data-oculto="false"><label class="form-check-label" for="sujetos_para_seleccion_' +
      element["$"]["id"] +
      '">' +
      element["$"]["name"] +
      "</label></div>";
    contenido_seleccion +=
      '<li style="display: none;" id="visivilidad_sujetos_seleccionado_' +
      element["$"]["id"] +
      '"><div class="form-check"><input type="checkbox" class="form-check-input sujeto_seleccionado_padre" id="sujetos_seleccionado_' +
      element["$"]["id"] +
      '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
      element["$"]["id"] +
      '" data-puro_name="' +
      element["$"]["name"] +
      '" data-oculto="true"><label class="form-check-label" for="sujetos_seleccionado_' +
      element["$"]["id"] +
      '">' +
      "<button class='btn-sujetoLinkObjetivos' onclick='abrirModalObjetosSujetos(\"" +
      element["$"]["id"] +
      "\")'>" +
      element["$"]["name"] +
      "</button>" +
      "</label></div>";
    if (element["iotSubsystem"]) {
      contenido_carga += "<ul>";
      contenido_seleccion += "<ul>";
      element["iotSubsystem"].forEach((subSystem) => {
        oblejetosSujetos.push({
          id: subSystem["$"]["id"],
          name: subSystem["$"]["name"],
          objetos: [],
        });
        contenido_carga +=
          '<li id="visivilidad_sujetos_para_seleccion_' +
          subSystem["$"]["id"] +
          '"><div class="form-check"><input type="checkbox" class="form-check-input sujeto_para_seleccion_hijo" name="sujetos_para_seleccion_' +
          element["$"]["id"] +
          '" id="sujetos_para_seleccion_' +
          subSystem["$"]["id"] +
          '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
          subSystem["$"]["id"] +
          '" data-puro_name="' +
          subSystem["$"]["name"] +
          '" data-oculto="false"><label class="form-check-label" for="sujetos_para_seleccion_' +
          subSystem["$"]["id"] +
          '">' +
          subSystem["$"]["name"] +
          "</label></div></li>";
        contenido_seleccion +=
          '<li style="display: none;" id="visivilidad_sujetos_seleccionado_' +
          subSystem["$"]["id"] +
          '"><div class="form-check"><input type="checkbox" class="form-check-input sujeto_seleccionado_hijo" name="sujetos_seleccionado_' +
          element["$"]["id"] +
          '" id="sujetos_seleccionado_' +
          subSystem["$"]["id"] +
          '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
          subSystem["$"]["id"] +
          '" data-puro_name="' +
          subSystem["$"]["name"] +
          '" data-oculto="true"><label class="form-check-label" for="sujetos_seleccionado_' +
          subSystem["$"]["id"] +
          '">' +
          "<button class='btn-sujetoLinkObjetivos' onclick='abrirModalObjetosSujetos(\"" +
          subSystem["$"]["id"] +
          "\")'>" +
          subSystem["$"]["name"] +
          "</button>" +
          "</label></div></li>";
      });
      contenido_carga += "</ul>";
      contenido_seleccion += "</ul>";
    }
    contenido_carga += "</li>";
    contenido_seleccion += "</li>";
  });

  para_cargar.innerHTML = contenido_carga;
  seleccionados.innerHTML = contenido_seleccion;
}

function error_cargar_posibles_sujetos_modelo(error) {
  alert("Error al cargar los datos del modelo: " + error);
}

function verificar_seleccion_hijo_pagre(elemento) {
  if (elemento.name) {
    // Si es hijo
    if (document.getElementById(elemento.id).checked) {
      var x = document.getElementById(elemento.name);
      if (x.type == "checkbox") {
        x.checked = true;
      }
    } else {
      var hijos = document.getElementsByName(elemento.name);
      var padre = document.getElementById(elemento.name);
      padre.checked = false;
      Array.from(hijos).forEach((x) => {
        if (x.type == "checkbox") {
          padre.checked = padre.checked || x.checked;
        }
      });
    }
  } else {
    // Si es padre
    if (document.getElementById(elemento.id).checked) {
      var hijos = document.getElementsByName(elemento.id);
      Array.from(hijos).forEach((x) => {
        if (x.type == "checkbox") {
          x.checked = true;
        }
      });
    } else {
      var hijos = document.getElementsByName(elemento.id);
      Array.from(hijos).forEach((x) => {
        if (x.type == "checkbox") {
          x.checked = false;
        }
      });
    }
  }
}

function agregar_sujeto_seleccionado() {
  extraer_datos_sujeto_e_hijos_lista_check("para_seleccion", "seleccionado");
}

function remover_sujeto_seleccionado() {
  extraer_datos_sujeto_e_hijos_lista_check("seleccionado", "para_seleccion");
}

function extraer_datos_sujeto_e_hijos_lista_check(principal, contraria) {
  var elementos = document.getElementsByClassName(
    "sujeto_" + principal + "_padre"
  );
  Array.from(elementos).forEach((check) => {
    if (check.type == "checkbox" && check.checked) {
      var hijos = document.getElementsByName(check.id);
      var id_puro_padre = check.dataset.puro_id;
      var ocultar_padre_principal = true;
      Array.from(hijos).forEach((x) => {
        if (x.type == "checkbox" && x.checked) {
          var id_puro_hijo = x.dataset.puro_id;
          document.getElementById(
            "visivilidad_sujetos_" + principal + "_" + id_puro_hijo
          ).style.display = "none";
          document.getElementById(
            "visivilidad_sujetos_" + contraria + "_" + id_puro_hijo
          ).style.display = "list-item";
          x.checked = false;
          x.dataset.oculto = true;
          document.getElementById(
            "sujetos_" + contraria + "_" + id_puro_hijo
          ).dataset.oculto = false;
        }
        ocultar_padre_principal =
          ocultar_padre_principal && x.dataset.oculto == "true";
      });
      if (ocultar_padre_principal) {
        document.getElementById("visivilidad_" + check.id).style.display =
          "none";
        check.dataset.oculto = true;
      }
      check.checked = false;
      document.getElementById(
        "sujetos_" + contraria + "_" + id_puro_padre
      ).dataset.oculto = false;
      document.getElementById(
        "visivilidad_sujetos_" + contraria + "_" + id_puro_padre
      ).style.display = "list-item";
    }
  });
}

function actualizar_sujetos() {
  var seleccion = extraer_datos_sujeto();
  modelo_sujetos_seleccionados_EXTRA = seleccion;
  document.getElementById("sujetos_seleccion").value = JSON.stringify(
    seleccion
  );
  $("#modal_seleccion_sujeto").modal("hide");
}

function extraer_datos_sujeto() {
  var padres = document.querySelectorAll(
    "#lista_sujetos_seleccionados > li > div > input"
  );
  var new_obj = [];
  Array.from(padres).forEach((pad) => {
    if (pad.dataset.oculto == "false") {
      var id = pad.dataset.puro_id;
      var name = pad.dataset.puro_name;
      var aux_obj;
      var list_obj_h = [];
      var hijos = document.getElementsByName(pad.id);
      Array.from(hijos).forEach((hj) => {
        if (hj.dataset.oculto == "false") {
          var id_h = hj.dataset.puro_id;
          var name_h = hj.dataset.puro_name;
          var obj_hijos = {
            id: id_h,
            name: name_h,
          };
          list_obj_h.push(obj_hijos);
        }
      });
      if (list_obj_h.length > 0) {
        aux_obj = {
          id: id,
          name: name,
          tiene_subsistemas: true,
          subSystem: list_obj_h,
        };
      } else {
        aux_obj = {
          id: id,
          name: name,
          tiene_subsistemas: false,
        };
      }
      new_obj.push(aux_obj);
    }
  });
  return new_obj;
}

/* 
    SECCION CREACION DE OBJETOS DE SUJETOS, ARBOL Y FORMULARIO

        Descripcion:
		En este fragmeto se pretende crear las funciones que llamen a la ventana modal
		y todas las funciones que impliquen la creacion de los objetos que tienen los sujetos

        Incluye:
*/

function abrirModalObjetosSujetos(id) {
  alert(id);
}

/* 
    SECCION SELECCION ENTIDADES CUADROS DINAMICOS SE SELECCION

        Descripcion:
            En este fragmento se encuentran las funciones que hacen posible el dinamismo
            de la seccion de seleccion de enntidadess, haciendola mas interactiva. Ademas cuenta
	    con las funciones que consultan la api para cargar las entidades disponibles.

        Incluye:
	    cargar_posibles_entidades_modelo
	    error_cargar_posibles_entidades_modelo
	    verificar_seleccion_hijo_pagre
            agregar_entidades_seleccionado
            remover_entidades_seleccionado
            extraer_datos_entidades_e_hijos_lista_check
            actualizar_entidades
            extraer_datos_entidades
*/
//JAIMEEE

/* 
    SECCION SELECCION SUJETOS CARGAR LAS UNIDADES DE MEDIDA

        Descripcion:
		Esta seccion contiene las funciones de que carga las unidades de medida
		en la pagina de seleccionar sujetos.

        Incluye:
		cargar_unidades_de_medida_select
		error_cargar_unidades_de_medida_select
*/

if (document.getElementById("unidades_medida_seccion_sujetos"))
  consultar_api(
    "http://localhost:3000/api/measurement_units",
    cargar_unidades_de_medida_select,
    error_cargar_unidades_de_medida_select
  );

function cargar_unidades_de_medida_select(json) {
  res = "";
  json.forEach((um) => {
    res += `<option value='${um.id}'>${um.nombre}</option>`;
  });
  document.getElementById("unidades_medida_seccion_sujetos").innerHTML = res;
}

function error_cargar_unidades_de_medida_select(err) {
  alert("Error al cargar los datos del modelo: " + err);
}

/* 
    SECCION CARGAR LAS UNIDADES DE MEDIDA

        Descripcion:
		Esta seccion contiene las funciones de que carga las unidades de medida
		en la pagina de seleccionar sujetos.

        Incluye:
		cargar_unidades_de_medida_table
		error_cargar_unidades_de_medida_table
*/

if (document.getElementById("tabla_unidades_de_medida"))
  consultar_api(
    "http://localhost:3000/api/measurement_units",
    cargar_unidades_de_medida_table,
    error_cargar_unidades_de_medida_table
  );

function cargar_unidades_de_medida_table(json) {
  res = "";
  json.forEach((um) => {
    res += "<tr>";
    res += `<td><input type="radio" name="unidad_seleccionada" value="${um.id}"></td>`;
    res += `<td>${um.id}</td>`;
    res += `<td>${um.nombre}</td>`;
    res += `<td>${um.descripcion}</td>`;
    res += `<td>${um.acronimo}</td>`;
    if (um.activo == "true")
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_unidades_de_medida").innerHTML = res;
}

function error_cargar_unidades_de_medida_table(err) {
  alert("Error al cargar los datos del modelo: " + err);
}
/* 
    SECCION CARGAR LAS ESCALAS

        Descripcion:
		Esta seccion contiene las funciones de que carga las escalas
		en la pagina

        Incluye:
		cargar_escalas_table
		error_cargar_escalas_table
*/

if (document.getElementById("tabla_escalas"))
  consultar_api(
    "http://localhost:3000/api/escales",
    cargar_escales_table,
    error_cargar_escales_table
  );

function cargar_escales_table(json) {
  res = "";
  json.forEach((es) => {
    res += "<tr>";
    res += `<td><input type="radio" name="unidad_seleccionada" value="${es.id}"></td>`;
    res += `<td>${es.id}</td>`;
    res += `<td>${es.nombre}</td>`;
    res += `<td>${es.valor_valido}</td>`;
    res += `<td>${es.tipo}</td>`;
    if (es.activo == "true")
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_escalas").innerHTML = res;
}

function error_cargar_escales_table(err) {
  alert("Error al cargar los datos del modelo: " + err);
}

/* 
    SECCION CARGAR CRITERIOS DECISION

        Descripcion:
		Esta seccion contiene las funciones de que carga los criterios de decision

        Incluye:
		cargar_criterios_table
		error_cargar_criterios_table
*/

if (document.getElementById("tabla_criterios_decision"))
  consultar_api(
    "http://localhost:3000/api/decision_criteria",
    cargar_criterios_table,
    error_cargar_criterios_table
  );

function cargar_criterios_table(json) {
  res = "";
  json.forEach((cd) => {
    res += "<tr>";
    res += `<td><input type="radio" name="unidad_seleccionada" value="${cd.id}"></td>`;
    res += `<td>${cd.id}</td>`;
    res += `<td>${cd.nombre}</td>`;
    res += `<td>${cd.descripcion}</td>`;
    if (cd.activo == "true")
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_criterios_decision").innerHTML = res;
}

function error_cargar_criterios_table(err) {
  alert("Error al cargar los datos del modelo: " + err);
}

/* 
    SECCION LISTAR MODELOS

        Descripcion:
		En esta seccion se cargan los modelos de autoconciencia guardados
		en una tabla para visualizar y seleccionar

        Incluye:
		cargar_modelos_table
		error_cargar_models_table
*/

if (document.getElementById("tabla_modelos_autoconciencia"))
  consultar_api(
    "http://localhost:3000/api/user_models",
    cargar_modelos_table,
    error_cargar_models_table
  );

function cargar_modelos_table(json) {
  res = "";
  json.forEach((md) => {
    res += "<tr>";
    res += `<td><input type="radio" name="modelo_seleccionado_tabla" value="${md.id}"></td>`;
    res += `<td>${md.id}</td>`;
    res += `<td>${md.nombre}</td>`;
    res += `<td>${md.descripcion}</td>`;
    res += `<td><a href="\#">JSON</a></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_modelos_autoconciencia").innerHTML = res;
}

function error_cargar_models_table(err) {
  alert("Error al cargar los datos del modelo: " + err);
}

/* 
    SECCION LISTAR MODELOS PARA TRABAJO ACTUAL

        Descripcion:
		En esta seccion se encuentran las funciones que cargan el select 
		de modelo de trabajo actual.

        Incluye:
		cargar_modelos_trabajo_actual
		error_cargar_models_trabajo_actual
*/

if (document.getElementById("select_modelo_para_activar_trabajo"))
  consultar_api(
    "http://localhost:3000/api/user_models",
    cargar_modelos_trabajo_actual,
    error_cargar_models_trabajo_actual
  );

function cargar_modelos_trabajo_actual(json) {
  res = "<option value=''>Seleccione un modelo para trabajar</option>";
  json.forEach((md) => {
    res += `<option value="${md.id}">${md.nombre}</option>`;
  });
  document.getElementById("select_modelo_para_activar_trabajo").innerHTML = res;
}

function error_cargar_models_trabajo_actual(err) {
  alert("Error al cargar los datos del modelo: " + err);
}

