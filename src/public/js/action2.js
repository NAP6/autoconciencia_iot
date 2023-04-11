// VARIABLES GLOBALES
var modelo_fisico_selecionado;
var modelo_sujetos_seleccionados_EXTRA; // El extra del final esta solo porque hay que revisar que no se crucen los nombres por ahi
var modelo_proceso_selecionado;

/* 
    SECCION CREACION

        Descripción:
            En este fragmento se encuentran las funciones que dan vida a la parte
            de creacion de los modelos de autoconciencia.

        Incluye:
            comenzar_creacion
            validar_formulario_creacion
            cargar_posibles_sujetos_modelo
            error_cargar_posibles_sujetos_modelo
            consultar_api
*/
function comenzar_creacion() {
  var creacion_valida = validar_formulario_creacion();
  if (creacion_valida) {
    document.getElementById("nombre_modelo").readOnly = true;
    document.getElementById("descripcion_esenario").readOnly = true;
    document.getElementById("autor_modelo").readOnly = true;
    var select_model = document.getElementById("arquitectura_seleccion");
    modelo_fisico_selecionado = select_model.value;
    select_model.innerHTML =
      "<option>" + modelo_fisico_selecionado + "</option>";
    consultar_api(
      protocolo +
        "://" +
        direccion +
        ":" +
        puerto +
        "/api/" +
        modelo_fisico_selecionado +
        "/system"
    );
    document.getElementById("btn_crear_modelo").style.display = "none";
    var section = document.getElementById("seleccion_sujetos_section");
    section.style.display = "block";
  }
}

function validar_formulario_creacion() {
  var Nombre_M = document.getElementById("nombre_modelo");
  var Descripcion_M = document.getElementById("descripcion_esenario");
  var Autor = document.getElementById("autor_modelo");
  var datos_validos = true;

  if (Nombre_M.value.length == 0 || /^\s+$/.test(Nombre_M.value)) {
    Nombre_M.placeholder = "Llenar el Formulario";
    Nombre_M.classList.add("placeholder_error");
    datos_validos = false;
  }
  if (Descripcion_M.value.length == 0 || /^\s+$/.test(Descripcion_M.value)) {
    Descripcion_M.placeholder = "Llenar el Formulario";
    Descripcion_M.classList.add("placeholder_error");
    datos_validos = false;
  }
  if (Autor.value.length == 0 || /^\s+$/.test(Autor.value)) {
    Autor.placeholder = "Llenar el Formulario";
    Autor.classList.add("placeholder_error");
    datos_validos = false;
  }

  return datos_validos;
}

function cargar_posibles_sujetos_modelo(json) {
  var para_cargar = document.getElementById("lista_sujetos_para_cargar");
  var seleccionados = document.getElementById("lista_sujetos_seleccionados");
  var contenido_carga = "";
  var contenido_seleccion = "";
  json.forEach((element) => {
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
      element["$"]["name"] +
      "</label></div>";
    if (element["iotSubsystem"]) {
      contenido_carga += "<ul>";
      contenido_seleccion += "<ul>";
      element["iotSubsystem"].forEach((subSystem) => {
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
          subSystem["$"]["name"] +
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

function consultar_api(url = "") {
  fetch(url)
    .then((response) => response.json())
    .then((json) => cargar_posibles_sujetos_modelo(json))
    .catch((error) => error_cargar_posibles_sujetos_modelo(error));
}

// Fin "SECCION CREACION"

/* 
    SECCION SELECCION SUJETOS

        Descripción:
            En este fragmento se encuentran las funciones que hacen posible el dinamismo
            de la seccion de seleccion de sujetos, haciendoma mas interactiva.

        Incluye:
            seleccionar_sujetos_modal
            verificar_seleccion_hijo_pagre
            agregar_sujeto_seleccionado
            remover_sujeto_seleccionado
            extraer_datos_sujeto_e_hijos_lista_check
            actualizar_sujetos
            extraer_datos_sujeto
            finalizar_seccion_sujetos
*/
if (document.getElementById("lista_sujetos_para_cargar"))
  consultar_api("http://localhost:3000/api/system");
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
  document.getElementById("sujetos_seleccion").value =
    JSON.stringify(seleccion);
  $("#modal_seleccion_sujeto").modal("hide");
}

function extraer_datos_sujeto() {
  var padres = document.querySelectorAll(
    "#lista_sujetos_seleccionados > li > div > input"
  );
  var contenido = "";
  var new_obj = [];
  Array.from(padres).forEach((pad) => {
    if (pad.dataset.oculto == "false") {
      var id = pad.dataset.puro_id;
      var name = pad.dataset.puro_name;
      var aux_hijos = "";
      var aux_obj;
      var list_obj_h = [];
      var hijos = document.getElementsByName(pad.id);
      Array.from(hijos).forEach((hj) => {
        if (hj.dataset.oculto == "false") {
          var id_h = pad.dataset.puro_id;
          var name_h = pad.dataset.puro_name;
          aux_hijos +=
            '<li data-puro_id="' +
            id_h +
            '" data-puro_name="' +
            name_h +
            '">' +
            name_h +
            "</li>";
          var obj_hijos = {
            id: id_h,
            name: name_h,
          };
          list_obj_h.push(obj_hijos);
        }
      });
      if (aux_hijos != "") {
        aux_hijos = "<ul>" + aux_hijos + "</ul>";
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
      contenido +=
        '<li data-puro_id="' +
        id +
        '" data-puro_name="' +
        name +
        '">' +
        name +
        aux_hijos +
        "</li>";
    }
  });
  if (contenido != "") {
    contenido =
      '<div class="col-6 col-md-4"><hr><h4>Systema</h4><ul>' +
      contenido +
      "</ul></div>";
    document.getElementById("btn_fin_seleccion_sujetos").style.display =
      "inline-block";
  } else {
    document.getElementById("btn_fin_seleccion_sujetos").style.display = "none";
  }
  document.getElementById("lista_sujetos_seleccionados_oficial").innerHTML =
    contenido;
  return new_obj;
}

function finalizar_seccion_sujetos() {
  document.getElementById("btn_seleccionar_sujetos_modal").style.display =
    "none";
  document.getElementById("btn_fin_seleccion_sujetos").style.display = "none";
  document.getElementById("crear_procesos_section").style.display = "block";
}

// Fin "SECCION SELECCION SUJETOS"

/* 
    SECCION SELECCION PROCESOS

        Descripción:
            En esta seccion se realizara las funciones que nos permitiran crear los 
            diferentes objetos
        Incluye:
            crear_proceso
*/

/* Aqui debes colocar tu codigo Diego */
function crear_proceso() {
  var creacion_valida = validar_formulario_proceso();
  if (creacion_valida) {
    document.getElementById("id_proceso").readOnly = true;
    document.getElementById("unidad_tiempo").readOnly = true;
    document.getElementById("int_tiempo").readOnly = true;
    document.getElementById("hora_ejecucion").readOnly = true;
    var select_model = document.getElementById("sujeto_seleccion");
    modelo_proceso_selecionado = select_model.value;
    select_model.innerHTML =
      "<option>" + modelo_proceso_selecionado + "</option>";
    consultar_api(
      protocolo +
        "://" +
        direccion +
        ":" +
        puerto +
        "/api/" +
        modelo_proceso_selecionado +
        "/system"
    );
    document.getElementById("btn_crear_modelo").style.display = "none";
    var section = document.getElementById("seleccion_objetos_section");
    section.style.display = "block";
  }
}

function seleccion_activo() {
  var i;
  for (i = 0; i < document.activo.r_activo.length; i++) {
    if (document.activo.r_activo[i].checked) break;
  }
  document.value = document.activo.r_activo[i].value;
}

function validar_formulario_proceso() {
  var Id_proceso = document.getElementById("id_proceso");
  var Und_tiempo = document.getElementById("unidad_tiempo");
  var Int_tiempo = document.getElementById("int_tiempo");
  var H_ejecucion = document.getElementById("hora_ejecucion");
  var datos_validos = true;

  if (Id_proceso.value.length == 0 || /^\s+$/.test(Id_proceso.value)) {
    Id_proceso.placeholder = "Llenar el Formulario";
    Id_proceso.classList.add("placeholder_error");
    datos_validos = false;
  }
  if (Und_tiempo.value.length == 0 || /^\s+$/.test(Und_tiempo.value)) {
    Und_tiempo.placeholder = "Llenar el Formulario";
    Und_tiempo.classList.add("placeholder_error");
    datos_validos = false;
  }
  if (Int_tiempo.value.length == 0 || /^\s+$/.test(Int_tiempo.value)) {
    Int_tiempo.placeholder = "Llenar el Formulario";
    Int_tiempo.classList.add("placeholder_error");
    datos_validos = false;
  }
  if (H_ejecucion.value.length == 0 || /^\s+$/.test(H_ejecucion.value)) {
    H_ejecucion.placeholder = "Llenar el Formulario";
    H_ejecucion.classList.add("placeholder_error");
    datos_validos = false;
  }

  return datos_validos;
}

function cargar_posibles_objetos_modelo(json) {
  var para_cargar = document.getElementById("lista_objetos_para_cargar");
  var seleccionados = document.getElementById("lista_objetos_seleccionados");
  var contenido_carga = "";
  var contenido_seleccion = "";
  json.forEach((element) => {
    contenido_carga +=
      '<li id="visivilidad_obetos_para_seleccion_' +
      element["$"]["id"] +
      '"><div class="form-check"><input type="checkbox" class="form-check-input objeto_para_seleccion_padre" id="objetos_para_seleccion_' +
      element["$"]["id"] +
      '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
      element["$"]["id"] +
      '" data-puro_name="' +
      element["$"]["name"] +
      '" data-oculto="false"><label class="form-check-label" for="objetos_para_seleccion_' +
      element["$"]["id"] +
      '">' +
      element["$"]["name"] +
      "</label></div>";
    contenido_seleccion +=
      '<li style="display: none;" id="visivilidad_objetos_seleccionado_' +
      element["$"]["id"] +
      '"><div class="form-check"><input type="checkbox" class="form-check-input objeto_seleccionado_padre" id="objetos_seleccionado_' +
      element["$"]["id"] +
      '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
      element["$"]["id"] +
      '" data-puro_name="' +
      element["$"]["name"] +
      '" data-oculto="true"><label class="form-check-label" for="objetos_seleccionado_' +
      element["$"]["id"] +
      '">' +
      element["$"]["name"] +
      "</label></div>";
    if (element["iotSubsystem"]) {
      contenido_carga += "<ul>";
      contenido_seleccion += "<ul>";
      element["iotSubsystem"].forEach((subSystem) => {
        contenido_carga +=
          '<li id="visivilidad_objetos_para_seleccion_' +
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
          ubSystem["$"]["id"] +
          '" data-puro_name="' +
          subSystem["$"]["name"] +
          '" data-oculto="true"><label class="form-check-label" for="sujetos_seleccionado_' +
          subSystem["$"]["id"] +
          '">' +
          subSystem["$"]["name"] +
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

// Fin "SECCION SELECCION PROCESOS"

/* 
    SECCION SELECCION OBJETOS

        Descripción:
            Se encuentra las funciones que nos permitira la seleccion de objetos

        Incluye:
            seleccionar_objetos_modal
*/

function seleccionar_objetos_modal() {
  $("#modal_crear_proceso").modal("show");
}

/*Intento para llenar la tabla  */
