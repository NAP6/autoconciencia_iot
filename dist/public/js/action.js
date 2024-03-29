const SERVER_PATH = window.location.origin;

function consultar_api(url = "", fun1, fun2) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => fun1(json))
    .catch((error) => fun2(error));
}

function post_api(url = "", data, fun1, fun2) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => fun1(json))
    .catch((error) => fun2(error));
}

/*function alert(txt) {
	  div = document.createElement("div");
	  div.classList.add("alert", "alert-danger");
	  div.setAttribute("role", "alert");
	  div.innerHTML =
	    txt +
	    `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`;
	  document.getElementById("alert-zone").appendChild(div);
	}*/

/* 
	    SECCION RECURSOS DE IMPLEMENTACION
		Descripción:
	  
	    Define:
	  
		Incluye:
	*/
if (document.getElementById("table_deployment_resources")) {
  cargar_recursos_de_implementacion();
  cargar_tipo_dato_select();
  cargar_formato_select();
}

function cargar_tipo_dato_select() {
  var tipo = "TIPO_DATO_SALIDA";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_select_tipo_dato_salida,
    (err) => {
      alert(err);
    }
  );
}

function cargar_formato_select() {
  var tipo = "TIPO_FORMATO";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_select_formato,
    (err) => {
      alert(err);
    }
  );
}

function cargar_select_tipo_dato_salida(json) {
  var ope = document.createElement("select");

  ope.innerHTML = "";
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
  document.getElementById("selectTipoSalidaFormulaRecursoAdd").innerHTML =
    ope.innerHTML;
  document.getElementById("selectTipoSalidaFuncionesRecursoAdd").innerHTML =
    ope.innerHTML;
  document.getElementById("selectTipoSalidaServiciosRecursoAdd").innerHTML =
    ope.innerHTML;
  document.querySelector("#parametro_formula #tipo_dato_parametro").innerHTML =
    ope.innerHTML;
  document.querySelector(
    "#parametro_funciones #tipo_dato_parametro"
  ).innerHTML = ope.innerHTML;
  document.querySelector(
    "#parametro_servicios #tipo_dato_parametro"
  ).innerHTML = ope.innerHTML;
}

function cargar_select_formato(json) {
  var ope = document.createElement("select");
  ope.innerHTML = "";
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
  document.getElementById("selectFormatodeSalida").innerHTML = ope.innerHTML;
}

function cargar_recursos_de_implementacion() {
  consultar_api(
    (url = SERVER_PATH + "/api/deployment_resources"),
    cargar_recursos_de_implementacion_tabla,
    (err) => {
      alert(err);
    }
  );
}

function cargar_recursos_de_implementacion_tabla(json) {
  var table = document.getElementById("tabla_recursos");
  table.innerHTML = "";
  var temp = document.getElementsByTagName("template")[0];
  var recurso = ["Formula", "Función", "Servicio"];
  json.forEach((elem) => {
    var clon = temp.content.cloneNode(true);
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "radio_recurso_implementacion";
    radio.dataset.id = elem.id;
    radio.dataset.nombre = elem.nombre;
    radio.dataset.descripcion = elem.descripcion;
    radio.dataset.tipo_salida = elem.tipo_salida;
    radio.dataset.activo = elem.activo;
    radio.dataset.tipo_recurso = elem.tipo_recurso;
    clon.getElementById("x").appendChild(radio);
    clon.getElementById("id").innerHTML = elem.id;
    clon.getElementById("name").innerHTML = elem.nombre;
    if (elem.descripcion.length > 20) {
      //clon.getElementById("description").innerHTML =
      //elem.descripcion.substring(0, 20) + " ...";
      clon.getElementById("description").innerHTML = elem.descripcion;
    } else {
      clon.getElementById("description").innerHTML = elem.descripcion;
    }
    clon.getElementById("type").innerHTML = recurso[elem.tipo_recurso];
    table.appendChild(clon);
  });
}

function agregar_recurso() {
  var guardarButton = document.getElementById("GuardarRecurso_btn");
  var modificarButton = document.getElementById("ModificarRecurso_btn");
  guardarButton.classList.replace("d-none", "inline-block");
  modificarButton.classList.replace("inline-block", "d-none");
  document.getElementById("titulo_recursos").innerHTML =
    "Agregar Recursos de Implementación";
  limpiar_add_recusos();
  terminar_creacion_parametro("parametro_formula");
  terminar_creacion_parametro("parametro_funciones");
  terminar_creacion_parametro("parametro_servicios");
  guardarParametro = false;
  $("#modal_resource_add").modal("show");
}
var id_recurso_implementacion = undefined;
function modificar_recurso() {
  var guardarButton = document.getElementById("GuardarRecurso_btn");
  var modificarButton = document.getElementById("ModificarRecurso_btn");
  modificarButton.classList.replace("d-none", "inline-block");
  document.getElementById("titulo_recursos").innerHTML =
    "Modificar Recursos de Implementación";
  guardarButton.classList.replace("inline-block", "d-none");
  limpiar_add_recusos();
  terminar_creacion_parametro("parametro_formula");
  terminar_creacion_parametro("parametro_funciones");
  terminar_creacion_parametro("parametro_servicios");
  var radios = document.getElementsByName("radio_recurso_implementacion");
  id_recurso_implementacion = undefined;
  Array.from(radios).forEach((rad) => {
    if (rad.checked) {
      id_recurso_implementacion = rad.dataset.id;
      return;
    }
  });
  console.log(id_recurso_implementacion);
  if (id_recurso_implementacion != null && id_recurso_implementacion != "") {
    console.log("Entra");
    document.getElementById("input-id-resource-mod").value = id;
    post_api(
      SERVER_PATH + "/api/ask_deployment_resources/",
      {
        id: id_recurso_implementacion,
      },
      cargar_recurso_para_modificar,
      (res) => {
        console.log(res);
      }
    );
    $("#modal_resource_add").modal("show");
  } else {
    alert("No se ha seleccionado ningun recurso");
  }
}

function cargar_recurso_para_modificar(json) {
  console.log(json);
  var nombre = document.getElementById("input-name-resource-add");
  var descripcion = document.getElementById("input-descripton-resource-add");
  var tipoRecursoSel = document.getElementById("select_tipo_recurso");
  nombre.value = json._name;
  descripcion.value = json._description;
  var tipoRecurso = -1;
  if (json._expression) {
    tipoRecurso = 0;
  } else if (json._endPoint) {
    tipoRecurso = 2;
  } else {
    tipoRecurso = 1;
  }
  tipoRecursoSel.value = tipoRecurso;
  visivilidad_tipo_recurso_form_add(tipoRecurso);
  tipoRecursoSel.disabled = true;
  cargar_parametros_recursos_para_modificar(
    tipoRecurso,
    json._containsParameter
  );
  cargar_datos_recursos_modificar(tipoRecurso, json);
}

function modificarRecursoImplementacion() {
  var nombre = document.getElementById("input-name-resource-add").value;
  var descripcion = document.getElementById(
    "input-descripton-resource-add"
  ).value;
  var tipoRecurso = document.getElementById("select_tipo_recurso").value;
  if (tipoRecurso) {
    var EspecificoTipo;
    var arregloParametros;
    if (tipoRecurso == 0) {
      EspecificoTipo = recuperarRecursoFormula();
      arregloParametros = getParametrosRecursosImple("parametro_formula");
    } else if (tipoRecurso == 1) {
      EspecificoTipo = recuperarRecursoFuncion();
      arregloParametros = getParametrosRecursosImple("parametro_funciones");
    } else if (tipoRecurso == 2) {
      EspecificoTipo = recuperarRecursoServicio();
      arregloParametros = getParametrosRecursosImple("parametro_servicios");
    }
    var data = {
      nombre: nombre,
      descripcion: descripcion,
      tipoRecurso: tipoRecurso,
      EspecificoTipo: EspecificoTipo,
      arregloParametros: arregloParametros,
      id_recurso: id_recurso_implementacion,
    };
    if (
      !!data.nombre &&
      !!data.descripcion &&
      !!data.tipoRecurso &&
      !!data.EspecificoTipo &&
      !!data.arregloParametros
    ) {
      post_api(
        SERVER_PATH + "/api/mod_deployment_resources/",
        data,
        cargar_recursos_de_implementacion(),
        console.log("Modificacion Erronea")
      );
      cargar_recursos_de_implementacion();
      $("#modal_resource_add").modal("hide");
    } else alert("Debe debe completar todos los campos");
  }
}
function cargar_parametros_recursos_para_modificar(t, parametros) {
  idParametroCont = 0;
  var tipo = "";
  if (t == 0) {
    tipo = "parametro_formula";
  } else if (t == 1) {
    tipo = "parametro_funciones";
  } else {
    tipo = "parametro_servicios";
  }
  parametros.forEach((par) => {
    var seccion = document.createElement("li");
    seccion.classList.add("list-group-item", "li_parametros");
    seccion.dataset.ordinal = par._id;
    seccion.dataset.id = par._ordinal;
    seccion.dataset.nombre = par._name;
    seccion.dataset.activo = par._active;
    seccion.dataset.opcional = par._optional;
    seccion.dataset.tipo = par._dataType[0];
    seccion.dataset.tipoIndex = indexOfValueinSelect(
      "#tipo_dato_parametro",
      par._dataType
    );
    seccion.id = `parameto_num_${idParametroCont++}`;
    seccion.innerHTML = par._name;
    if (tipo === "parametro_formula") {
      seccion.setAttribute("ondblclick", `agregar_a_formula(this);`);
    }
    seccion.setAttribute(
      "onclick",
      `pintar_parametro('${seccion.id}','${tipo}');`
    );
    document
      .querySelector(`#${tipo} #lista_parametros_recursos`)
      .appendChild(seccion);
  });
}

function cargar_datos_recursos_modificar(tipo, datos_especificos) {
  if (tipo == "0") {
    document.getElementById("area_de_nueva_formula").value =
      datos_especificos._expression;
    document.getElementById("selectTipoSalidaFormulaRecursoAdd").value =
      datos_especificos._returnDataType[1];
  } else if (tipo == "1") {
    document.getElementById("area_de_nueva_istruccion_funcion").value =
      datos_especificos._instrucctions;
    document.getElementById("selectTipoSalidaFuncionesRecursoAdd").value =
      datos_especificos._returnDataType[1];
    document.getElementById("pre_existente_funciones").checked =
      datos_especificos._preexisting;
    if (datos_especificos._preexisting) {
      document.getElementById(
        "area_de_nueva_istruccion_funcion"
      ).disabled = true;
    }
  } else {
    document.getElementById("input_endpoint_resource").value =
      datos_especificos._endPoint;
    document.getElementById("area_de_nueva_istruccion_servicios").value =
      datos_especificos._instrucctions;
    document.getElementById("selectTipoSalidaServiciosRecursoAdd").value =
      datos_especificos._returnDataType[1];
    document.getElementById("selectFormatodeSalida").value =
      datos_especificos._DataFormatType;
    document.getElementById("pre_existente_servicios").checked =
      datos_especificos._preexisting;
    if (datos_especificos._preexisting) {
      document.getElementById(
        "area_de_nueva_istruccion_servicios"
      ).disabled = true;
    }
  }
}

function indexOfValueinSelect(query, value) {
  var conAux = 0;
  var respuesta = -1;
  Array.from(document.querySelector(query).options).forEach((element) => {
    if (element.value == value) {
      respuesta = conAux;
      return;
    }
    conAux++;
  });
  return respuesta;
}

function eliminar_recurso() {
  var radios = document.getElementsByName("radio_recurso_implementacion");
  var id = undefined;
  Array.from(radios).forEach((rad) => {
    if (rad.checked) {
      id = rad.dataset.id;
      return;
    }
  });
  if (id) {
    if (confirm("Esta seguro de que desea eliminar el recurso")) {
      post_api(
        SERVER_PATH + "/api/del_deployment_resources/",
        {
          id: id,
        },
        (res) => {
          cargar_recursos_de_implementacion();
        },
        (res) => {
          console.log(res);
        }
      );
    }
  } else {
    alert("No se ha seleccionado ningun recurso");
  }
}

function visivilidad_tipo_recurso_form_add(elem) {
  document
    .getElementById("funciones_form_add")
    .classList.replace("d-block", "d-none");
  document
    .getElementById("services_form_add")
    .classList.replace("d-block", "d-none");
  document
    .getElementById("formula_form_add")
    .classList.replace("d-block", "d-none");
  if (elem == "0")
    document
      .getElementById("formula_form_add")
      .classList.replace("d-none", "d-block");
  else if (elem == "1")
    document
      .getElementById("funciones_form_add")
      .classList.replace("d-none", "d-block");
  else if (elem == "2")
    document
      .getElementById("services_form_add")
      .classList.replace("d-none", "d-block");
}

function agregar_parametro(tipo) {
  console.log(`#${tipo} #btn-modificarParametro`);
  var botonAgregar = document.querySelector(`#${tipo} #btn-agregarParametro`);
  var botonModificar = document.querySelector(
    `#${tipo} #btn-modificarParametro`
  );
  botonModificar.classList.replace("inline-block", "d-none");
  botonAgregar.classList.replace("d-none", "inline-block");
  var listaP = document.querySelector(`#${tipo} #parametros #lista_parametros`);
  var formularioP = document.querySelector(
    `#${tipo} #parametros #formulario_parametros`
  );
  listaP.classList.replace("d-block", "d-none");
  formularioP.classList.replace("d-none", "d-block");
  document.querySelector(`#${tipo} #bt_add_parametros`).disabled = true;
  document.querySelector(`#${tipo} #bd_mod_parametros`).disabled = true;
  document.querySelector(`#${tipo} #bd_del_parametros`).disabled = true;
}
var idParametroCont;
var guardarParametro = false;
function guardar_parametro(tipo) {
  guardarParametro = true;
  var seccion = document.createElement("li");
  seccion.classList.add("list-group-item", "li_parametros");
  var ordinal = document.querySelector(`#${tipo} #ordinalParametro`).value;
  var nombre = document.querySelector(`#${tipo} #nombreParametro`).value;
  var activo = document.querySelector(`#${tipo} #activo_parametro`).checked;
  var opcional = document.querySelector(`#${tipo} #opcional_parametro`).checked;
  var tipoSe = document.querySelector(`#${tipo} #tipo_dato_parametro`).value;
  var tipoIndex = document.querySelector(
    `#${tipo} #tipo_dato_parametro`
  ).selectedIndex;

  seccion.dataset.ordinal = ordinal;
  seccion.dataset.nombre = nombre;
  seccion.dataset.activo = activo;
  seccion.dataset.opcional = opcional;
  seccion.dataset.tipo = tipoSe;
  seccion.dataset.tipoIndex = tipoIndex;
  seccion.id = `parameto_num_${idParametroCont++}`;
  seccion.innerHTML = nombre;
  if (tipo === "parametro_formula") {
    seccion.setAttribute("ondblclick", `agregar_a_formula(this);`);
  }
  seccion.setAttribute(
    "onclick",
    `pintar_parametro('${seccion.id}','${tipo}');`
  );
  document
    .querySelector(`#${tipo} #lista_parametros_recursos`)
    .appendChild(seccion);
  terminar_creacion_parametro(tipo);
}

function terminar_creacion_parametro(tipo) {
  document.querySelector(`#${tipo} #ordinalParametro`).value = "";
  document.querySelector(`#${tipo} #nombreParametro`).value = "";
  document.querySelector(`#${tipo} #bt_add_parametros`).disabled = false;
  document.querySelector(`#${tipo} #bd_mod_parametros`).disabled = false;
  document.querySelector(`#${tipo} #bd_del_parametros`).disabled = false;
  document.querySelector(`#${tipo} #activo_parametro`).checked = true;
  document.querySelector(`#${tipo} #opcional_parametro`).checked = false;
  document.querySelector(`#${tipo} #tipo_dato_parametro`).selectedIndex = "0";
  var listaP = document.querySelector(`#${tipo} #parametros #lista_parametros`);
  var formularioP = document.querySelector(
    `#${tipo} #parametros #formulario_parametros`
  );
  formularioP.classList.replace("d-block", "d-none");
  listaP.classList.replace("d-none", "d-block");
}
var parametro_seleccionado;

function pintar_parametro(id, tipo) {
  if (parametro_seleccionado) {
    document.querySelector(
      `#${tipo} #${parametro_seleccionado.id}`
    ).style.color = "";
  }
  if (!parametro_seleccionado || parametro_seleccionado.id != id) {
    parametro_seleccionado = {
      id: id,
    };
    var botton = document.querySelector(`#${tipo} #${id}`);
    botton.style.color = "red";
  } else {
    parametro_seleccionado = undefined;
    var botton = document.querySelector(`#${tipo} #${id}`);
    botton.style.color = "";
  }
}

function modificar_parametro(tipo) {
  if (parametro_seleccionado) {
    var elegido = document.querySelector(
      `#${tipo} #${parametro_seleccionado.id}`
    );
    document.querySelector(`#${tipo} #ordinalParametro`).value =
      elegido.dataset.ordinal;
    document.querySelector(`#${tipo} #nombreParametro`).value =
      elegido.dataset.nombre;
    document.querySelector(`#${tipo} #opcional_parametro`).checked =
      elegido.dataset.opcional == "true";
    document.querySelector(`#${tipo} #activo_parametro`).checked =
      elegido.dataset.activo == "true";
    console.log("#######################################");
    console.log(elegido);
    console.log(document.querySelector(`#${tipo} #tipo_dato_parametro`));
    console.log(elegido.dataset.tipo);
    document.querySelector(`#${tipo} #tipo_dato_parametro`).value =
      elegido.dataset.tipo;
    agregar_parametro(tipo);
    var botonAgregar = document.querySelector(`#${tipo} #btn-agregarParametro`);
    var botonModificar = document.querySelector(
      `#${tipo} #btn-modificarParametro`
    );
    botonAgregar.classList.replace("inline-block", "d-none");
    botonModificar.classList.replace("d-none", "inline-block");
  } else {
    alert("Seleccione un parametro para Modificar");
  }
}

function guardar_modificar_parametro(tipo) {
  var elegido = document.querySelector(
    `#${tipo} #${parametro_seleccionado.id}`
  );
  elegido.dataset.ordinal = document.querySelector(
    `#${tipo} #ordinalParametro`
  ).value;
  elegido.dataset.nombre = document.querySelector(
    `#${tipo} #nombreParametro`
  ).value;
  elegido.dataset.tipo = document.querySelector(
    `#${tipo} #tipo_dato_parametro`
  ).value;
  elegido.dataset.opcional = document.querySelector(
    `#${tipo} #opcional_parametro`
  ).checked;
  elegido.dataset.activo = document.querySelector(
    `#${tipo} #activo_parametro`
  ).checked;
  elegido.innerHTML = elegido.dataset.nombre;
  terminar_creacion_parametro(tipo);
}
var parametroEliminar = [];
function eliminar_parametro(tipo) {
  if (parametro_seleccionado) {
    if (confirm("Esta seguro de eliminar el parametro")) {
      parametroEliminar.push(parametro_seleccionado.id);
      var elemento = document.querySelector(
        `#${tipo} #${parametro_seleccionado.id}`
      );
      var padre = elemento.parentNode;
      padre.removeChild(elemento);
      parametro_seleccionado = undefined;
    }
  } else {
    alert("Debe seleccionar un parametro");
  }
}

function agregar_a_formula(nuevo, parametro = true) {
  nuevo = nuevo.dataset.nombre;
  var text = document.getElementById("area_de_nueva_formula");
  if (parametro) text.value += "[" + nuevo + "]";
  else text.value += nuevo;
  text.focus();
}

function limpiar_add_recusos() {
  document.getElementById("input-name-resource-add").value = "";
  document.getElementById("input-descripton-resource-add").value = "";
  document.getElementById("area_de_nueva_formula").value = "";
  document.getElementById("area_de_nueva_istruccion_funcion").value = "";
  document.getElementById("area_de_nueva_istruccion_servicios").value = "";
  document.getElementById("select_tipo_recurso").selectedIndex = "0";
  document.getElementById("select_tipo_recurso").disabled = false;
  document.getElementById("selectTipoSalidaFuncionesRecursoAdd").selectedIndex =
    "0";
  document.getElementById("selectTipoSalidaServiciosRecursoAdd").selectedIndex =
    "0";
  document.getElementById("selectTipoSalidaFormulaRecursoAdd").selectedIndex =
    "0";
  document.getElementById("selectFormatodeSalida").selectedIndex = "0";
  document.getElementById("input_endpoint_resource").value = "";
  document.getElementById("pre_existente_servicios").checked = false;
  document.getElementById("pre_existente_funciones").checked = false;
  document.getElementById("area_de_nueva_istruccion_funcion").disabled = false;
  document.getElementById(
    "area_de_nueva_istruccion_servicios"
  ).disabled = false;
  document.querySelector(
    "#parametro_formula #lista_parametros_recursos"
  ).innerHTML = "";
  document.querySelector(
    "#parametro_funciones #lista_parametros_recursos"
  ).innerHTML = "";
  document.querySelector(
    "#parametro_servicios #lista_parametros_recursos"
  ).innerHTML = "";
  visivilidad_tipo_recurso_form_add(undefined);
  idParametroCont = 0;
}

function recuperarRecursoFormula() {
  var formula = document.getElementById("area_de_nueva_formula").value;
  var datoSalida = document.getElementById(
    "selectTipoSalidaFormulaRecursoAdd"
  ).value;
  var data = {
    formula: formula,
    datoSalida: datoSalida,
  };
  return data;
}

function recuperarRecursoFuncion() {
  var instrucciones = document.getElementById(
    "area_de_nueva_istruccion_funcion"
  ).value;
  var datoSalida = document.getElementById(
    "selectTipoSalidaFuncionesRecursoAdd"
  ).value;
  var Pre_existente = document.getElementById(
    "pre_existente_funciones"
  ).checked;
  var data = {
    instrucciones: instrucciones,
    datoSalida: datoSalida,
    preExistent: Pre_existente,
  };
  return data;
}

function recuperarRecursoServicio() {
  var endPoint = document.getElementById("input_endpoint_resource").value;
  var instrucciones = document.getElementById(
    "area_de_nueva_istruccion_servicios"
  ).value;
  var datoSalida = document.getElementById(
    "selectTipoSalidaServiciosRecursoAdd"
  ).value;
  var formatoSalida = document.getElementById("selectFormatodeSalida").value;
  var Pre_existente = document.getElementById(
    "pre_existente_servicios"
  ).checked;
  var data = {
    endPoint: endPoint,
    instrucciones: instrucciones,
    datoSalida: datoSalida,
    formatoSalida: formatoSalida,
    preExistent: Pre_existente,
  };
  return data;
}

function verificar_pre_existente_servicios(activo) {
  if (activo.checked) {
    if (activo.id == "pre_existente_funciones") {
      document.getElementById(
        "area_de_nueva_istruccion_funcion"
      ).disabled = true;
    } else {
      document.getElementById(
        "area_de_nueva_istruccion_servicios"
      ).disabled = true;
    }
  } else {
    if (activo.id == "pre_existente_funciones") {
      document.getElementById(
        "area_de_nueva_istruccion_funcion"
      ).disabled = false;
    } else {
      document.getElementById(
        "area_de_nueva_istruccion_servicios"
      ).disabled = false;
    }
  }
}

function getParametrosRecursosImple(id) {
  var parametros = document.querySelectorAll(
    `#${id} #lista_parametros_recursos li`
  );
  var arregloParametros = [];
  Array.from(parametros).forEach((element) => {
    var datos = {
      id: element.dataset.id,
      ordinal: element.dataset.ordinal,
      nombre: element.dataset.nombre,
      tipo: element.dataset.tipo,
      opcional: element.dataset.opcional,
      activo: element.dataset.activo,
      parametroEliminar: parametroEliminar,
    };
    arregloParametros.push(datos);
  });
  return arregloParametros;
}

function guardarRecursoImplementacion() {
  if (guardarParametro == false) {
    alert("Debe guardar los Parámetros");
  } else {
    var nombre = document.getElementById("input-name-resource-add").value;
    var descripcion = document.getElementById(
      "input-descripton-resource-add"
    ).value;
    nombre = nombre.trim();
    descripcion = descripcion.trim();
    var tipoRecurso = document.getElementById("select_tipo_recurso").value;
    if (tipoRecurso) {
      var EspecificoTipo;
      var arregloParametros;
      if (tipoRecurso == 0) {
        EspecificoTipo = recuperarRecursoFormula();
        arregloParametros = getParametrosRecursosImple("parametro_formula");
      } else if (tipoRecurso == 1) {
        EspecificoTipo = recuperarRecursoFuncion();
        arregloParametros = getParametrosRecursosImple("parametro_funciones");
      } else if (tipoRecurso == 2) {
        EspecificoTipo = recuperarRecursoServicio();
        arregloParametros = getParametrosRecursosImple("parametro_servicios");
      }
      var data = {
        nombre: nombre,
        descripcion: descripcion,
        tipoRecurso: tipoRecurso,
        EspecificoTipo: EspecificoTipo,
        arregloParametros: arregloParametros,
      };
      post_api(
        SERVER_PATH + "/api/add_deployment_resources/",
        data,
        (res) => {
          cargar_recursos_de_implementacion();
        },
        (res) => {
          console.log(res);
        }
      );

      $("#modal_resource_add").modal("hide");
    } else {
      alert("No se selecciono un tipo de recurso");
    }
  }
}

/* 
	    SECCION SELECCION SUJETOS CUADROS DINAMICOS SE SELECCION
	  
		Descripción:
		    En este fragmento se encuentran las funciones que hacen posible el dinamismo
		    de la seccion de seleccion de sujetos, haciendola mas interactiva. Ademas cuenta
		con las funciones que consultan la api para cargar los sujetos.
	  
	    Define:
		bjetosde_Sujetos
	  
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
    SERVER_PATH + "/api/subjects",
    cargar_posibles_sujetos_modelo,
    error_cargar_posibles_sujetos_modelo
  );

function cargar_posibles_sujetos_modelo(json) {
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.father && elemento.active == 1) {
      aux_visible_activo.add(elemento.father);
    } else if (!!elemento.father && elemento.active == 0) {
      aux_visible_inactivo.add(elemento.father);
    }
  });

  json.forEach((elemento) => {
    var insertar;
    if (!elemento.father) {
      insertar = document.getElementById("lista_sujetos_para_cargar");
    } else {
      insertar = document.createElement("ul");
      document
        .getElementById(`li_entidad_para_seleccion_${elemento.father}`)
        .appendChild(insertar);
    }
    var li = document.createElement("li");
    li.id = `li_entidad_para_seleccion_${elemento.id}`;
    if (elemento.active == 0 || aux_visible_inactivo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    var divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_de_${elemento.father}_para_seleccion` /*, "sujeto_para_seleccion_padre"*/,
      "checkbox_para_seleccion"
    );
    checkbox.id = `sujeto_para_seleccion_${elemento.id}`;
    checkbox.dataset.padre_id = elemento.father;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.setAttribute(
      "onclick",
      "verificar_seleccion_hijo_padre(this, 'para_seleccion');"
    );
    var labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    labelChek.innerHTML = elemento.name;
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);

    // ===========================================================================================

    if (!elemento.father) {
      insertar = document.getElementById("lista_sujetos_seleccionados");
    } else {
      insertar = document.createElement("ul");
      document
        .getElementById(`li_entidad_seleccionado_${elemento.father}`)
        .appendChild(insertar);
    }
    li = document.createElement("li");
    li.id = `li_entidad_seleccionado_${elemento.id}`;
    if (elemento.active == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_de_${elemento.father}_seleccionado`,
      "checkbox_seleccionado"
    );
    checkbox.id = `sujeto_seleccionado_${elemento.id}`;
    checkbox.dataset.padre_id = elemento.father;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.name;
    checkbox.setAttribute(
      "onclick",
      "verificar_seleccion_hijo_padre(this, 'seleccionado');"
    );
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    /*
	      button.setAttribute(
	      "onclick",
	      `abrirModalObjetosSujetosColor('${elemento.id}', '${elemento.name}');`
	    );
	    */
    button.innerHTML = elemento.name;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function error_cargar_posibles_sujetos_modelo(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}
var sujeto_selecciona_seccion_sujeto_modal = undefined;

function abrirModalObjetosSujetosColor(id, nombre) {
  if (sujeto_selecciona_seccion_sujeto_modal) {
    var botton = document
      .getElementById(
        `li_entidad_seleccionado_${sujeto_selecciona_seccion_sujeto_modal.id}`
      )
      .getElementsByTagName("button")[0];
    botton.style.color = "";
  }
  if (
    !sujeto_selecciona_seccion_sujeto_modal ||
    sujeto_selecciona_seccion_sujeto_modal.id != id
  ) {
    sujeto_selecciona_seccion_sujeto_modal = {
      id: id,
      nombre: nombre,
    };
    var botton = document
      .getElementById(`li_entidad_seleccionado_${id}`)
      .getElementsByTagName("button")[0];
    botton.style.color = "red";
  } else {
    sujeto_selecciona_seccion_sujeto_modal = undefined;
    var botton = document
      .getElementById(`li_entidad_seleccionado_${id}`)
      .getElementsByTagName("button")[0];
    botton.style.color = "";
  }
}

function verificar_seleccion_hijo_padre(elemento, lado) {
  var padre_id = elemento.dataset.padre_id;
  if (padre_id != "null" && elemento.checked) {
    // Si es hijo y esta seleccionado
    document.getElementById(`sujeto_${lado}_${padre_id}`).checked = true;
  } else if (padre_id == "null") {
    // Si es padre
    var hijos = document.getElementsByClassName(
      `hijo_de_${elemento.dataset.puro_id}_${lado}`
    );
    Array.from(hijos).forEach((e) => {
      if (
        document.getElementById(`li_entidad_${lado}_${e.dataset.puro_id}`).style
          .display == "list-item"
      )
        e.checked = elemento.checked;
    });
  } else {
    // De otra forma
    var deseleccion = true;
    var hijos = document.getElementsByClassName(`hijo_de_${padre_id}_${lado}`);
    Array.from(hijos).forEach((e) => {
      deseleccion = deseleccion && !e.checked;
    });
    document.getElementById(`sujeto_${lado}_${padre_id}`).checked =
      !deseleccion;
  }
}

function agregar_sujeto_seleccionado() {
  var checkbox = document.getElementsByClassName(`checkbox_para_seleccion`);
  var padres_visibles = new Set();
  Array.from(checkbox).forEach((e) => {
    var para_seleccion = document.getElementById(
      `li_entidad_para_seleccion_${e.dataset.puro_id}`
    );
    if (
      e.dataset.padre_id != "null" &&
      para_seleccion.style.display != "none" &&
      !e.checked
    ) {
      padres_visibles.add(e.dataset.padre_id);
    }
    if (e.checked) {
      para_seleccion.style.display = "none";
      document.getElementById(
        `li_entidad_seleccionado_${e.dataset.puro_id}`
      ).style.display = "list-item";
    }
    e.checked = false;
  });
  padres_visibles.forEach((e) => {
    document.getElementById(`li_entidad_para_seleccion_${e}`).style.display =
      "list-item";
  });
  actualizar_activos();
}

function remover_sujeto_seleccionado() {
  var checkbox = document.getElementsByClassName(`checkbox_seleccionado`);
  var padres_visibles = new Set();
  Array.from(checkbox).forEach((e) => {
    var para_seleccion = document.getElementById(
      `li_entidad_seleccionado_${e.dataset.puro_id}`
    );
    if (
      e.dataset.padre_id != "null" &&
      para_seleccion.style.display != "none" &&
      !e.checked
    ) {
      padres_visibles.add(e.dataset.padre_id);
    }
    if (e.checked) {
      para_seleccion.style.display = "none";
      document.getElementById(
        `li_entidad_para_seleccion_${e.dataset.puro_id}`
      ).style.display = "list-item";
    }
    e.checked = false;
  });
  padres_visibles.forEach((e) => {
    document.getElementById(`li_entidad_seleccionado_${e}`).style.display =
      "list-item";
  });
  actualizar_activos();
}

function actualizar_activos() {
  var check = document.getElementsByClassName(`checkbox_seleccionado`);
  var actualizacion = [];
  Array.from(check).forEach((e) => {
    var elem = {
      id: e.dataset.puro_id,
      activo:
        document.getElementById(`li_entidad_seleccionado_${e.dataset.puro_id}`)
          .style.display == "list-item",
    };
    actualizacion.push(elem);
  });
  post_api(
    (url = SERVER_PATH + "/api/update_subjects"),
    actualizacion,
    (json) => {
      console.log(json);
    },
    (error) => {
      console.log(error);
    }
  );
}

function actualizar_sujetos() {
  if (sujeto_selecciona_seccion_sujeto_modal) {
    abrirModalObjetosSujetos(
      sujeto_selecciona_seccion_sujeto_modal.id,
      sujeto_selecciona_seccion_sujeto_modal.nombre
    );
  } else {
    alert("No selecciono ningun sujeto de Autoconc");
  }
  /*if (selec && actualizacion.length == 0)
			    abrirModalObjetosSujetos(selec.id, selec.nombre);
			else if (selec) {
			    alert("Se seleccionara el ulimo elemento marcado de arriba hacia abajo");
			    abrirModalObjetosSujetos(selec.id, selec.nombre);
			} else alert("No se a seleccionado un elemento");*/
}

/* 
	    SECCION CREACION DE OBJETOS DE SUJETOS, ARBOL Y FORMULARIO
	  
		Descripción:
		En este fragmeto se pretende crear las funciones que llamen a la ventana modal
		y todas las funciones que impliquen la creacion de los objetos que tienen los sujetos
	  
		Incluye:
	*/

function cargar_select_criterios_decision() {
  consultar_api(
    SERVER_PATH + "/api/decision_criteria",
    cargar_select_criterios_objetivos,
    error_cargar_select_criterios_objetivos
  );
}

function cargar_select_criterios_objetivos(json) {
  var ope = document.getElementById("criterios_objetivos");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_select_criterios_objetivos() {
  alert("No se cargo el select criterio de decicison");
}

function cargar_select_operador_agregacion() {
  var nombre = "TIPO_OPERADOR_ASIGNACION";
  var data = {
    tipo: nombre,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_operador_asignacion_select,
    error_cargar_operador_asignacion_select
  );
}

function cargar_operador_asignacion_select(json) {
  var ope = document.getElementById("operadorAsigObjetos");
  ope.innerHTML = "";
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_operador_asignacion_select() {
  alert("No se cargo el operador de asignacion para el modal sujetos");
}
var idSujetoObjetoActual;

function abrirModalObjetosSujetos(id, nombre) {
  $("#objetosde_sujetoModal").modal("show");
  var nom = document.getElementById("nombreSujetoObjetoActivo");
  nom.innerHTML = nombre;
  idSujetoObjetoActual = id;
  cargar_arbol(id);
  cargar_select_operador_agregacion();
  cargar_select_criterios_decision();
}

function cargar_arbol(id) {
  post_api(
    (url = SERVER_PATH + "/api/subjects_objects"),
    {
      id: id,
    },
    (json) => {
      document.getElementById(`arbol_objetivos_del_sujeto`).innerHTML = "";
      json.forEach((e) => {
        var ul = generar_elemento_arbol_obejetosde_sujeto(e);
        if (e.padre) {
          document.getElementById(`arbol_li_${e.padre}`).appendChild(ul);
        } else {
          ul.getElementsByTagName("input")[0].checked = true;
          document.getElementById(`arbol_objetivos_del_sujeto`).appendChild(ul);
        }
      });
    },
    (error) => {
      console.log(error);
    }
  );
  desactivarFormularioAgregarObjeto();
}

function generar_elemento_arbol_obejetosde_sujeto(elem) {
  var ul = document.createElement("ul");
  var li = document.createElement("li");
  var radio = document.createElement("input");
  var lable = document.createElement("label");
  var div = document.createElement("div");

  li.id = `arbol_li_${elem.id}`;
  radio.type = "radio";
  div.classList.add("form-check");
  lable.classList.add("form-check-label");
  radio.classList.add("form-check-input");

  radio.id = `arbol_radio_${elem.id}`;
  radio.name = "item_arbol_objetos";
  radio.dataset.id = elem.id;
  lable.htmlFor = radio.id;
  lable.innerHTML = elem.nombre;

  ul.appendChild(li);
  li.appendChild(div);
  div.appendChild(radio);
  div.appendChild(lable);
  return ul;
}

function activarFormularioAgregarObjeto() {
  var arbol = document.getElementsByName("objetosde_Sujetos_imputSelect");
  document.getElementById("nombreObjeto").disabled = false;
  document.getElementById("descripcionObjeto").disabled = false;
  document.getElementById("pesoObjeto").disabled = false;
  document.getElementById("operadorAsigObjetos").disabled = false;
  document.getElementById("criterios_objetivos").disabled = false;
  document.getElementById("btn-agregarObjetoLista").disabled = false;
  var arbol = document.getElementsByName("item_arbol_objetos");
  var idSelected = null;
  arbol.forEach((elem) => {
    if (elem.checked) idSelected = elem.dataset.id;
    elem.disabled = true;
  });
  document.getElementById("idPadreObjeto").value = idSelected;
}

function desactivarFormularioAgregarObjeto() {
  document.getElementById("nombreObjeto").disabled = true;
  document.getElementById("descripcionObjeto").disabled = true;
  document.getElementById("pesoObjeto").disabled = true;
  document.getElementById("operadorAsigObjetos").disabled = true;
  document.getElementById("criterios_objetivos").disabled = true;
  document.getElementById("activoObjeto").disabled = true;
  document.getElementById("btn-agregarObjetoLista").disabled = true;

  document.getElementById("idPadreObjeto").value = "";
  document.getElementById("nombreObjeto").value = "";
  document.getElementById("descripcionObjeto").value = "";
  document.getElementById("pesoObjeto").value = "";
  document.getElementById("operadorAsigObjetos").value = "";
  document.getElementById("criterios_objetivos").value = "-6";
}

function agregarObjeto() {
  var id_padre = document.getElementById("idPadreObjeto").value;
  var nombre = document.getElementById("nombreObjeto").value;
  var descripcion = document.getElementById("descripcionObjeto").value;
  var peso = document.getElementById("pesoObjeto").value;
  var operador = document.getElementById("operadorAsigObjetos").value;
  var criterio = document.getElementById("criterios_objetivos").value;
  var activo = document.getElementById("activoObjeto").checked;
  if ((!!id_padre, !!nombre, !!descripcion, !!peso, !!operador)) {
    //Aqui falta agregar el criterio
    post_api(
      (url = SERVER_PATH + "/api/save_subjects_objects"),
      {
        father: id_padre,
        name: nombre,
        description: descripcion,
        weigth: peso,
        agregationOperator: operador,
        active: activo,
        system: idSujetoObjetoActual,
        criteria: criterio,
      },
      (json) => {
        console.log(json);
        cargar_arbol(idSujetoObjetoActual);
        desactivarFormularioAgregarObjeto();
      },
      (error) => {
        alert(error);
      }
    );
  } else {
    alert("Debe completar todos los campos para enviar");
  }
}

function eliminarObjeto() {
  var arbol = document.getElementsByName("item_arbol_objetos");
  var id = null;
  arbol.forEach((elem) => {
    if (elem.checked) {
      id = elem.dataset.id;
      return;
    }
  });
  post_api(
    (url = SERVER_PATH + "/api/delete_subjects_objects"),
    {
      id: id,
    },
    (json) => {
      alert(json.Mensaje);
      cargar_arbol(idSujetoObjetoActual);
      desactivarFormularioAgregarObjeto();
    },
    (error) => {
      alert(error.error);
    }
  );
}

/* 
	    SECCION SELECCION SUJETOS CARGAR LAS UNIDADES DE MEDIDA
	  
		Descripción:
		Esta seccion contiene las funciones de que carga las unidades de medida
		en la pagina de seleccionar sujetos.
	  
		Incluye:
		cargar_unidades_de_medida_select
		error_cargar_unidades_de_medida_select
	*/
/*CARGAR TIPO PARA LA SECCION DE ESCALAS*/

function get_tipo_escalas_select() {
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    { tipo: "TIPO_ESCALA" },
    cargar_select_tipo_escala,
    (err) => {
      alert(err);
    }
  );
}
function cargar_select_tipo_escala(json) {
  var ope = document.getElementById("tipo_escalas");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_enumeracion_select(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

if (document.getElementById("tipo_escalas2")) {
  get_tipo_escalas_modificar_select();
}

function get_tipo_escalas_modificar_select() {
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    { tipo: "TIPO_ESCALA" },
    cargar_select_tipo_escala_modificar,
    (err) => {
      alert(err);
    }
  );
}

function cargar_select_tipo_escala_modificar(json) {
  var ope = document.getElementById("tipo_escalas2");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}
/* 
	    SECCION GENERALES PARTE: UNIDADES DE MEDIDA
		Descripción:
		Esta seccion incluye el envio de datos para las unidades de medida
	*/
if (document.getElementById("tabla_unidades_de_medida")) {
  consultar_get_unidades_medida();
}

function consultar_get_unidades_medida() {
  consultar_api(
    SERVER_PATH + "/api/get_measurement_units",
    cargar_unidades_de_medida_table,
    error_cargar_unidades_de_medida_table
  );
}

function cargar_unidades_de_medida_table(json) {
  var res = "";
  json.forEach((um) => {
    res += "<tr>";
    res += `<td><input type="radio" name="unidad_seleccionada" value="${
      um.id
    }" data-name="${um.name}" data-descripcion="${
      um.description
    }" data-acronym="${um.acronym}" data-activo="${um.active == 1}"></td>`;
    res += `<td>${um.id}</td>`;
    res += `<td>${um.name}</td>`;
    res += `<td>${um.description}</td>`;
    res += `<td>${um.acronym}</td>`;
    if (um.active == 1)
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;

    res += "</tr>";
  });
  document.getElementById("tabla_unidades_de_medida").innerHTML = res;
}

function error_cargar_unidades_de_medida_table(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

function agregarUnidadMedida() {
  document.getElementById("input-name-add").value = "";
  document.getElementById("input-descripton-add").value = "";
  document.getElementById("input-weight-add").value = "";
  $("#modal_units_add").modal("show");
}

function guardarNuevaUnidadMedida() {
  var data = {
    name: document.getElementById("input-name-add").value,
    description: document.getElementById("input-descripton-add").value,
    acronym: document.getElementById("input-weight-add").value,
    active: 1,
  };
  if (!!data.name && !!data.description && !!data.acronym) {
    post_api(
      SERVER_PATH + "/api/add_measurement_units/",
      data,
      mensaje_exitoEnvioUnidadesMedida,
      mensaje_errorEnvioUnidadesMedida
    );
    $("#modal_units_add").modal("hide");
  } else alert("Ingrese todos los campos del formulario");
}

function GuardarEliminarUnidadMedida() {
  var radio = document.getElementsByName("unidad_seleccionada");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  console.log(id);
  if (!!id) {
    if (confirm("Esta seguro que desea eliminar la unidad de Medida")) {
      post_api(
        SERVER_PATH + "/api/del_measurement_units/",
        { id: id },
        mensaje_exitoEnvioUnidadesMedida,
        mensaje_errorEnvioUnidadesMedida
      );
    }
  } else alert("Debe seleccionar un elemento para eliminar");
}

function modificarUnidadMedida() {
  try {
    var radio = document.getElementsByName("unidad_seleccionada");
    var id;
    var name;
    var description;
    var acronym;
    var active;
    radio.forEach((elem) => {
      if (elem.checked) {
        id = elem.value;
        name = elem.dataset.name;
        description = elem.dataset.descripcion;
        acronym = elem.dataset.acronym;
        active = elem.dataset.activo == "true";
        return;
      }
    });
    if (!!id && !!name && !!description && !!acronym) {
      document.getElementById("input-id-update").value = id;
      document.getElementById("input-name-update").value = name;
      document.getElementById("input-descripton-update").value = description;
      document.getElementById("input-acronym-update").value = acronym;
      document.getElementById("ActivoUnits").checked = active;
      $("#modal_modificar_unidadMedida").modal("show");
    } else alert("Debe seleccionar un elemento para modificar");
  } catch (error) {
    alert(error);
  }
}

function guardarModificacionMedida() {
  var data = {
    id: document.getElementById("input-id-update").value,
    name: document.getElementById("input-name-update").value,
    description: document.getElementById("input-descripton-update").value,
    acronym: document.getElementById("input-acronym-update").value,
    active: document.getElementById("ActivoUnits").checked,
  };
  if (!!data.id && !!data.name && !!data.description && !!data.acronym) {
    post_api(
      SERVER_PATH + "/api/upd_measurement_units/",
      data,
      mensaje_exitoEnvioUnidadesMedida,
      mensaje_errorEnvioUnidadesMedida
    );

    $("#modal_modificar_unidadMedida").modal("hide");
  } else alert("Debe debe completar todos los campos");
}

function mensaje_exitoEnvioUnidadesMedida(json) {
  consultar_get_unidades_medida();
  console.log("Se guardo las unidades de medida");
}

function mensaje_errorEnvioUnidadesMedida(err) {
  alert(err);
}
/* 
	    SECCION CARGAR LAS ESCALAS
	  
		Descripción:
		Esta seccion contiene las funciones de que carga las escalas
		en la pagina
	*/
function consultar_get_escalas() {
  consultar_api(
    SERVER_PATH + "/api/get_scales",
    cargar_escales_table,
    error_cargar_escales_table
  );
}
if (document.getElementById("tabla_escalas")) {
  consultar_get_escalas();
}

function cargar_escales_table(json) {
  res = "";
  json.forEach((es) => {
    res += "<tr>";
    res += `<td><input type="radio" name="escala_seleccionada" value="${
      es.id
    }" data-name="${es.name}" data-valor_valido="${
      es.valid_values
    }" data-tipo="${es.type_id}" data-activo="${es.active == 1}"></td>`;
    res += `<td>${es.id}</td>`;
    res += `<td>${es.name}</td>`;
    res += `<td>${es.valid_values}</td>`;
    res += `<td>${es.type}</td>`;
    if (es.active == 1)
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_escalas").innerHTML = res;
}

function error_cargar_escales_table(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}
/* 
	    SECCION SELECCION SUJETOS CARGAR LAS ESCALAS
	  
		Descripción:
		Esta seccion incluye el envio de datos para las Escalas
	  
		Incluye:
	*/

function agregar_escala() {
  $("#modal_scales_add").modal("show");
  get_tipo_escalas_select();
  document.getElementById("input-name-scale-add").value = "";
  document.getElementById("input-valor-add").value = "";
  document.getElementById("tipo_escalas").valie = "-6";
}

function guardarNuevaEscala() {
  try {
    var escala = document.getElementById("tipo_escalas").value;
    var data = {
      name: document.getElementById("input-name-scale-add").value,
      valid_values: document.getElementById("input-valor-add").value,
      type: escala,
      active: document.getElementById("activoEscalas").value,
    };
    if (!!data.name && !!data.valid_values && !!data.type) {
      post_api(
        SERVER_PATH + "/api/add_scales/",
        data,
        mensaje_exitoEnvioEscalas,
        mensaje_errorEnvioEscalas
      );
      consultar_get_escalas();
      $("#modal_scales_add").modal("hide");
    } else alert("Ingrese todos los campos del formulario");
  } catch (error) {
    alert(error);
  }
}

function eliminarEscala() {
  var radio = document.getElementsByName("escala_seleccionada");
  var id;
  var name;
  var valid_values;
  var active;
  var type;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      name = elem.dataset.name;
      valid_values = elem.dataset.valor_valido;
      type = elem.dataset.tipo;
      active = elem.dataset.activo == "true";
      return;
    }
  });

  if (!!id && !!name && !!valid_values && !!type) {
    $("#modal_escalas_del").modal("show");
  } else alert("Debe seleccionar un elemento para modificar");
}

function GuardareliminarEscala() {
  var radio = document.getElementsByName("escala_seleccionada");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro de que desea eliminar la escala")) {
      post_api(
        SERVER_PATH + "/api/del_scales/",
        { id: id },
        mensaje_exitoEnvioEscalas,
        mensaje_errorEnvioEscalas
      );
    }
    consultar_get_escalas();
  } else alert("Debe seleccionar un elemento para eliminar");
}

function modificarEscalas() {
  var radio = document.getElementsByName("escala_seleccionada");
  var id;
  var name;
  var valid_values;
  var active;
  var type;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      name = elem.dataset.name;
      valid_values = elem.dataset.valor_valido;
      type = elem.dataset.tipo;
      active = elem.dataset.activo == "true";
      return;
    }
  });

  if (!!id && !!name && !!valid_values && !!type) {
    document.getElementById("input-escale-id-update").value = id;
    document.getElementById("input-escale-name-update").value = name;
    document.getElementById("input-escale-valor-update").value = valid_values;
    document.getElementById("tipo_escalas2").value = type;
    document.getElementById("activoEscalas").checked = active;
    $("#modal_escalas_mod").modal("show");
  } else alert("Debe seleccionar un elemento para modificar");
}

function guardarModificacionEscala() {
  var data = {
    id: document.getElementById("input-escale-id-update").value,
    name: document.getElementById("input-escale-name-update").value,
    valid_values: document.getElementById("input-escale-valor-update").value,
    type: document.getElementById("tipo_escalas2").value,
    active: document.getElementById("activoEscalas").checked ? 1 : 0,
  };
  if (!!data.id && !!data.name && !!data.valid_values && !!data.type) {
    post_api(
      SERVER_PATH + "/api/upd_scales/",
      data,
      mensaje_exitoEnvioEscalas,
      mensaje_errorEnvioEscalas
    );
    consultar_get_escalas();

    $("#modal_escalas_mod").modal("hide");
  } else alert("Debe debe completar todos los campos");
}

function mensaje_exitoEnvioEscalas(json) {
  console.log("Se guardo correctamente la escala");
}

function mensaje_errorEnvioEscalas(err) {
  alert(err);
}

/* 
	    SECCION SELECCION SUJETOS CARGAR LOS CRITERIOS DE DECISION
	  
		Descripción:
		Esta seccion incluye el envio de datos para los criterios de decision
	  
		Incluye:
	*/
//
if (document.getElementById("tabla_criterios_decision")) {
  get_criterios_table();
}

function get_criterios_table() {
  consultar_api(
    SERVER_PATH + "/api/get_criteria",
    cargar_criterios_table,
    error_cargar_criterios_table
  );
}

function cargar_criterios_table(json) {
  res = "";
  document.getElementById("seccion_umbrales").innerHTML = "";
  json.forEach((cd) => {
    res += `<tr onClick="visibilidad_umbral('${cd.id}')" id='tr_umbral_${cd.id}' name='tr_umbral'>`;
    res += `<td><input type="radio" name="criterio_seleccionado" value="${
      cd.id
    }" data-name="${cd.name}" data-descripcion="${
      cd.description
    }" data-activo="${cd.active == 1}"></td>`;
    res += `<td>${cd.id}</td>`;
    res += `<td>${cd.name}</td>`;
    res += `<td>${cd.description}</td>`;
    if (cd.active == 1)
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
    post_api(
      SERVER_PATH + "/api/get_umbral",
      {
        criterio: cd.id,
      },
      cargar_umbral_table,
      () => {
        console.log("Error Al cargar el Umbral");
      }
    );
  });
  document.getElementById("tabla_criterios_decision").innerHTML = res;
}
var criterio_select = undefined;

function error_cargar_criterios_table(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

function agregar_criterio_decision() {
  $("#modal_criteria_add").modal("show");
  document.getElementById("input-name-criteria-add").value = "";
  document.getElementById("input-descripton-criteria-add").value = "";
}

function guardarNuevoCriterio() {
  var data = {
    name: document.getElementById("input-name-criteria-add").value,
    description: document.getElementById("input-descripton-criteria-add").value,
  };
  if (!!data.name && !!data.description) {
    post_api(
      SERVER_PATH + "/api/add_criteria/",
      data,
      mensaje_exitoEnvioDecisionCriteria,
      mensaje_errorEnvioDecisionCriteria
    );
    document.getElementById("input-name-criteria-add").value = "";
    document.getElementById("input-descripton-criteria-add").value = "";
    $("#modal_criteria_add").modal("hide");
  } else alert("Ingrese todos los campos del formulario");
}

function eliminar_criterio_decision() {
  try {
    var radio = document.getElementsByName("criterio_seleccionado");
    var id;
    var name;
    var descripcion;
    var activo;
    radio.forEach((elem) => {
      if (elem.checked) {
        id = elem.value;
        name = elem.dataset.name;
        descripcion = elem.dataset.descripcion;
        activo = elem.dataset.activo == "true";
        return;
      }
    });
    if (!!id && !!name && !!descripcion) {
      $("#modal_eliminar_criterios").modal("show");
    } else alert("Seleccione el Elemento");
  } catch (error) {
    alert(error);
  }
}

function guardar_eliminar_criterio_decision() {
  try {
    var radio = document.getElementsByName("criterio_seleccionado");
    var id;
    radio.forEach((elem) => {
      if (elem.checked) {
        id = elem.value;
        return;
      }
    });
    if (!!id) {
      if (confirm("Esta seguro que desea eliminar el criterio de decision")) {
        data = {
          id: id,
        };
        if ((id = criterio_select)) {
          criterio_select = undefined;
        }
        post_api(
          SERVER_PATH + "/api/del_criteria/",
          data,
          mensaje_exitoEnvioDecisionCriteria,
          mensaje_errorEnvioDecisionCriteria
        );
      }
    } else alert("Debe seleccionar un elemento para eliminar");
  } catch (error) {
    alert(error);
  }
}

function modificar_criterio_decision() {
  try {
    var radio = document.getElementsByName("criterio_seleccionado");
    var id;
    var name;
    var description;
    var active;
    radio.forEach((elem) => {
      if (elem.checked) {
        id = elem.value;
        name = elem.dataset.name;
        description = elem.dataset.descripcion;
        active = elem.dataset.activo == "true";
        return;
      }
    });
    if (!!id && !!name && !!description) {
      document.getElementById("input-id-criteria-update").value = id;
      document.getElementById("input-name-criteria-update").value = name;
      document.getElementById("input-descripton-criteria-update").value =
        description;
      document.getElementById("activoCriteria").checked = active;
      $("#modal_modificar_criterios").modal("show");
    } else alert("Seleccione el Elemento");
  } catch (error) {
    alert(error);
  }
}

function guardarModificacionCriterios() {
  try {
    var data = {
      id: document.getElementById("input-id-criteria-update").value,
      name: document.getElementById("input-name-criteria-update").value,
      description: document.getElementById("input-descripton-criteria-update")
        .value,
      activo: document.getElementById("activoCriteria").checked,
    };
    if (!!data.id && !!data.name && !!data.description) {
      post_api(
        SERVER_PATH + "/api/upd_criteria/",
        data,
        mensaje_exitoEnvioDecisionCriteria,
        mensaje_errorEnvioDecisionCriteria
      );
      $("#modal_modificar_criterios").modal("hide");
    } else alert("Debe debe completar todos los campos");
  } catch (error) {
    alert(error);
  }
}

function mensaje_exitoEnvioDecisionCriteria(json) {
  console.log("Criterio Guardado");
  get_criterios_table();
}

function mensaje_errorEnvioDecisionCriteria(err) {
  alert(err);
}

/* Relizar mantenimeinto de la tabla Umbrales partiendo del ID de los criterios de decision*/

function visibilidad_umbral(id) {
  var tabla = document.getElementsByName("tr_umbral");
  tabla.forEach((tr) => {
    tr.style.backgroundColor = "rgba(0,0,0,0)";
  });
  document.getElementById(`tr_umbral_${id}`).style.backgroundColor =
    "rgba(0,0,0,0.15)";

  document.getElementById("bt_addUmbral").style = "block";
  document.getElementById("bd_modUmbral").style = "block";
  document.getElementById("bd_delUmbral").style = "block";
  var dato = document.getElementById("umbral_" + id);
  if (dato && criterio_select != id) {
    dato.style.display = "table";
    if (criterio_select) {
      dato = document.getElementById("umbral_" + criterio_select);
      dato.style.display = "none";
    }
  }
  criterio_select = id;
}

function cargar_umbral_table(json) {
  console.log(json);
  var templeate = document
    .getElementById("templeta_tabla_umbral")
    .content.cloneNode(true);
  var seccion = document.getElementById("seccion_umbrales");
  var body = templeate.querySelector("tbody");
  json.umbrales.forEach((um) => {
    var fila = document.createElement("tr");
    var dato = document.createElement("td");
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "umbral_seleccionado";
    input.dataset.id = um.id;
    input.dataset.nombre = um.name;
    input.dataset.interpretacion = um.interpretacion;
    input.dataset.inferior = um.inferior;
    input.dataset.superior = um.superior;
    input.dataset.activo = um.active;
    input.dataset.id_crite = json.id_descicion;
    dato.appendChild(input);
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.id;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.name;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.interpretacion;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.inferior;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.superior;
    fila.appendChild(dato);
    input = document.createElement("input");
    input.type = "checkbox";
    input.disabled = true;
    input.checked = um.active == 1;
    dato = document.createElement("td");
    dato.appendChild(input);
    fila.appendChild(dato);
    body.appendChild(fila);
  });
  body.id += "_" + json.id_decicion;
  var tabla = templeate.querySelector(".table");
  tabla.id = "umbral_" + json.id_descicion;
  tabla.style.display = "none";
  seccion.appendChild(templeate);
}
function cargar_umbral_table_modificar(json) {
  console.log(json);
  var templeate = document
    .getElementById("templeta_tabla_umbral")
    .content.cloneNode(true);
  var seccion = document.getElementById("seccion_umbrales");
  var body = templeate.querySelector("tbody");
  json.umbrales.forEach((um) => {
    var fila = document.createElement("tr");
    var dato = document.createElement("td");
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "umbral_seleccionado";
    input.dataset.id = um.id;
    input.dataset.nombre = um.name;
    input.dataset.interpretacion = um.interpretacion;
    input.dataset.inferior = um.inferior;
    input.dataset.superior = um.superior;
    input.dataset.activo = um.active;
    input.dataset.id_crite = json.id_descicion;
    dato.appendChild(input);
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.id;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.name;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.interpretacion;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.inferior;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.superior;
    fila.appendChild(dato);
    input = document.createElement("input");
    input.type = "checkbox";
    input.disabled = true;
    input.checked = um.active == 1;
    dato = document.createElement("td");
    dato.appendChild(input);
    fila.appendChild(dato);
    body.appendChild(fila);
  });
  body.id += "_" + json.id_decicion;
  var tabla = templeate.querySelector(".table");
  tabla.id = "umbral_" + json.id_descicion;
  var tablaMod = document.getElementById(tabla.id);
  if (tablaMod) {
    seccion.replaceChild(tabla, tablaMod);
  } else {
    tabla.style.display = "none";
    seccion.appendChild(templeate);
  }
}
function agregar_umbral() {
  $("#modal_umbral_add").modal("show");
  document.getElementById("input-name-umbral-add").value = "";
  document.getElementById("input-interpretacion-umbral-add").value = "";
  document.getElementById("input-inferior-umbral-add").value = "";
  document.getElementById("input-superior-umbral-add").value = "";
}

function guardarNuevoUmbral() {
  try {
    var data2 = {
      criterio: criterio_select,
    };
    var data = {
      name: document.getElementById("input-name-umbral-add").value,
      interpretacion: document.getElementById("input-interpretacion-umbral-add")
        .value,
      inferior: document.getElementById("input-inferior-umbral-add").value,
      superior: document.getElementById("input-superior-umbral-add").value,
      criterio: criterio_select,
    };
    if (!!data.name && !!data.interpretacion) {
      post_api(
        SERVER_PATH + "/api/add_umbral/",
        data,
        mensaje_exitoEnvioUmbral,
        mensaje_errorEnvioUmbral
      );
      $("#modal_umbral_add").modal("hide");
    } else alert("Ingrese todos los campos del formulario");
  } catch (error) {
    alert(error);
  }
}

function guardar_eliminar_umbral() {
  var radio = document.getElementsByName("umbral_seleccionado");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.dataset.id;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro que desea eliminar este Umbral")) {
      post_api(
        SERVER_PATH + "/api/del_umbral/",
        { id: id },
        mensaje_exitoEnvioUmbral,
        mensaje_errorEnvioUmbral
      );
      var data2 = {
        criterio: criterio_select,
      };
      post_api(
        SERVER_PATH + "/api/get_umbral/",
        data2,
        cargar_umbral_table,
        (err) => {
          console.log("Error");
        }
      );
    }
  } else alert("Debe seleccionar un elemento para eliminar");
}

function modificar_umbral() {
  var radio = document.getElementsByName("umbral_seleccionado");
  var id;
  var name;
  var interpretacion;
  var inferior;
  var superior;
  var activo;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.dataset.id;
      name = elem.dataset.nombre;
      interpretacion = elem.dataset.interpretacion;
      inferior = elem.dataset.inferior;
      superior = elem.dataset.superior;
      activo = elem.dataset.activo == "1";
      return;
    }
  });
  if (!!id && !!name && !!interpretacion && !!superior && !!inferior) {
    document.getElementById("input-id-umbral-update").value = id;
    document.getElementById("input-name-umbral-update").value = name;
    document.getElementById("input-interpretacion-umbral-update").value =
      interpretacion;
    document.getElementById("input-superior-umbral-update").value = superior;
    document.getElementById("input-inferior-umbral-update").value = inferior;
    document.getElementById("activoUmbral").checked = activo;
    $("#modal_modificar_umbral").modal("show");
  } else alert("Seleccione el Elemento");
}

function guardarModificacionUmbral() {
  var data = {
    id: document.getElementById("input-id-umbral-update").value,
    name: document.getElementById("input-name-umbral-update").value,
    interpretacion: document.getElementById(
      "input-interpretacion-umbral-update"
    ).value,
    inferior: document.getElementById("input-inferior-umbral-update").value,
    superior: document.getElementById("input-superior-umbral-update").value,
    active: document.getElementById("activoUmbral").checked,
  };
  if (
    !!data.id &&
    !!data.name &&
    !!data.interpretacion &&
    !!data.inferior &&
    !!data.superior
  ) {
    post_api(
      SERVER_PATH + "/api/upd_umbral/",
      data,
      mensaje_exitoEnvioUmbral,
      mensaje_errorEnvioUmbral
    );

    $("#modal_modificar_umbral").modal("hide");
  } else alert("Debe debe completar todos los campos");
}

function mensaje_exitoEnvioUmbral(json) {
  var data = {
    criterio: criterio_select,
  };
  post_api(
    SERVER_PATH + "/api/get_umbral/",
    data,
    cargar_umbral_table_modificar,
    (err) => {
      console.log("Error");
    }
  );
}

function mensaje_errorEnvioUmbral(err) {
  alert(err);
}

//=========================================================================
function agregar_aspecto() {
  $("#modal_aspecto_add").modal("show");
}

function guardarNuevoAspecto() {
  var data = {
    descripcion: document.getElementById("input-descripton-aspect-add").value,
  };
  if (!!data.descripcion) {
    post_api(
      SERVER_PATH + "/api/add_aspects/",
      data,
      mensaje_exitoEnvioAspects,
      mensaje_errorEnvioAspects
    );
    consultar_api(
      SERVER_PATH + "/api/aspects",
      cargar_aspectos_table,
      error_cargar_aspectos_table
    );
    $("#modal_aspecto_add").modal("hide");
  } else alert("Ingrese todos los campos del formulario");
}
var AspectoId;

function Administrar_Metricas() {
  try {
    var radio = document.getElementsByName("aspecto_seleccionado");
    var id;
    var name;
    radio.forEach((elem) => {
      if (elem.checked) {
        id = elem.value;
        name = elem.dataset.name;
        return;
      }
    });
    if (!!id && !!name) {
      var nomA = document.getElementById("nombreAspecto");
      nomA.innerHTML = name;
      AspectoId = id;
      var busca = "TIPO_METRICA";
      data = {
        id: AspectoId,
      };
      data2 = {
        tipo: busca,
      };
      post_api(
        SERVER_PATH + "/api/get_enumeracion",
        data2,
        cargar_tipo_metrica_select,
        error_cargar_tipo_metrica_select
      );

      $("#modal_agregar_metrica").modal("show");
    } else alert("Debe seleccionar un Aspecto");
  } catch (error) {
    alert(error);
  }
}

function mensaje_exitoEnvioAspects(json) {
  post_api(
    SERVER_PATH + "/api/aspects",
    data,
    cargar_aspectos_table,
    error_cargar_aspectos_table
  );
  alert(json.mensaje);
}

function mensaje_errorEnvioAspects(err) {
  alert(err);
}

/* 
	    SECCION CARGAR ASPECTOS AUTOCONSCIENCIA
	  
		Descripción:
		Esta seccion contiene las funciones de que carga los criterios de decision
	  
		Incluye:
		cargar_criterios_table
		error_cargar_criterios_table
	*/

function cargar_aspectos_table(json) {
  res = "";
  json.forEach((as) => {
    res += "<tr>";
    res += `<td><input type="radio" name="aspecto_seleccionado" value="${
      as.id
    }" data-name="${as.nombre}" data-tipo="${as.tipo}" data-activo="${
      as.activo == "true"
    }"></td>`;
    res += `<td>${as.id}</td>`;
    res += `<td>${as.nombre}</td>`;
    res += `<td>${as.tipo}</td>`;
    if (as.activo == "true")
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_aspectos").innerHTML = res;
}

function error_cargar_aspectos_table(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

/* 
	    SECCION LISTAR MODELOS
	  
		Descripción:
		En esta seccion se cargan los modelos de autoconciencia guardados
		en una tabla para visualizar y seleccionar
	  
		Incluye:
		cargar_modelos_table
		error_cargar_models_table
	*/
var modelo_fisico_json;
if (document.getElementById("tabla_modelos_autoconciencia"))
  consultar_api(
    SERVER_PATH + "/api/user_models",
    cargar_modelos_table,
    error_cargar_models_table
  );
var cosa;
function cargar_modelos_table(json) {
  res = "";
  var tabla = document.getElementById("tabla_modelos_autoconciencia");
  json.forEach((md) => {
    modelo_fisico_json = JSON.parse(
      md._architectureModel.replace(/ 0+(?![\. }])/g, "")
    );

    var tr = document.createElement("tr");

    tr.id = `modelo-${md._id}-tabla`;
    var td1 = document.createElement("td");
    td1.name = `modelo-${md._id}`;
    tr.appendChild(td1);
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `modelo_seleccionado_tabla`;
    radio.value = `${md._id}`;
    radio.dataset.name = `${md._name}`;
    radio.dataset.autor = `${md._author}`;
    radio.dataset.descripcion = `${md._description}`;
    radio.dataset.activo = `${md._active == 1}`;
    td1.appendChild(radio);

    var td2 = document.createElement("td");
    td2.name = `modelo-${md._id}`;
    td2.innerHTML = `${md._id}`;
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    td3.name = `modelo-${md._name}`;
    td3.innerHTML = `${md._name}`;
    tr.appendChild(td3);

    var td4 = document.createElement("td");
    td4.name = `modelo-${md._author}`;
    td4.innerHTML = `${md._author}`;
    tr.appendChild(td4);

    var td5 = document.createElement("td");
    td5.name = `modelo-${md._description}`;
    td5.innerHTML = `${md._description}`;
    tr.appendChild(td5);

    var td6 = document.createElement("td");
    td6.name = `modelo-${md._id}`;
    td6.innerHTML = `<buttom class="btn btn-link" onclick="mostrar_modal_json()">
			  ${Object.keys(modelo_fisico_json)[0]}
	      </buttom>`;
    tr.appendChild(td6);

    var td7 = document.createElement("td");
    var input2 = document.createElement("input");
    input2.type = "checkbox";
    input2.disabled = true;
    td7.appendChild(input2);
    tr.appendChild(td7);
    if (md._active == 1) input2.checked = true;

    tabla.appendChild(tr);

    /*
	    res += `<tr id='modelo-${md._id}-tabla'>`;
	    res += `<td name="modelo-${
	      md._id
	    }"><input type="radio" name="modelo_seleccionado_tabla" value="${
	      md._id
	    }" data-name="${md._name}" data-autor="${md._author}" data-descripcion="${
	      md._description
	    }" data-activo="${md._active == "true"}"></td>`;

	    res += `<td name="modelo-${md._id}">${md._id}</td>`;
	    res += `<td name="modelo-${md._id}">${md._name}</td>`;
	    res += `<td name="modelo-${md._id}">${md._author}</td>`;
	    res += `<td name="modelo-${md._id}">${md._description}</td>`;
	    res += `<td name="modelo-${
	      md._id
	    }"><buttom class="btn btn-link" onclick="mostrar_modal_json()">${
	      Object.keys(modelo_fisico_json)[0]
	    }
	      </buttom></td>`;
	      */
    /*res += `<td><input type="checkbox" disabled checked></td>`;
	    else res += `<td><input type="checkbox" disabled></td>`;
	    res += "</tr>";
	    */
  });

  //document.getElementById("tabla_modelos_autoconciencia").innerHTML = res;
}

function error_cargar_models_table(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

function mostrar_modal_json() {
  $("#modal_json").modal("show");
  document.getElementById("modal_json_title").innerHTML =
    Object.keys(modelo_fisico_json)[0];
  document.getElementById("contenido_json").innerHTML = JSON.stringify(
    modelo_fisico_json,
    null,
    2
  );
}
/* 
	    SECCION LISTAR MODELOS
	  
		Descripción:
		En esta seccion se incluyen las funciones que permiten cargar los
		datos del modelo seleccionado al formularionde actualizacion.
	  
		Incluye:
	*/

function modal_modificar_modelo() {
  var radios = document.getElementsByName("modelo_seleccionado_tabla");
  var id;
  var name;
  var descripcion;
  var autor;
  var active;
  var select = false;
  radios.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      name = elem.dataset.name;
      descripcion = elem.dataset.descripcion;
      autor = elem.dataset.autor;
      active = elem.dataset.activo == "true";
      select = true;
      return;
    }
  });
  document.getElementById("id_modelo_update").value = id;
  document.getElementById("nombre_modelo_update").value = name;
  document.getElementById("descripcion_esenario_update").value = descripcion;
  document.getElementById("autor_esenario_update").value = autor;
  document.getElementById("activoModelo").checked = active;
  if (select) $("#modificar_modelo_modal").modal("show");
  else alert("Seleccione un modelo para modificar");
}

/* 
	    SECCION LISTAR MODELOS PARA TRABAJO ACTUAL
	  
		Descripción:
		En esta seccion se encuentran las funciones que cargan el select 
		de modelo de trabajo actual.
	  
		Incluye:
		cargar_modelos_trabajo_actual
		error_cargar_models_trabajo_actual
	*/

if (document.getElementById("select_modelo_para_activar_trabajo"))
  consultar_api(
    SERVER_PATH + "/api/user_models",
    cargar_modelos_trabajo_actual,
    error_cargar_models_trabajo_actual
  );

function cargar_modelos_trabajo_actual(json) {
  console.log(json);
  res = "<option value=''>Seleccione un modelo para trabajar</option>";
  json.forEach((md) => {
    res += `<option value="${md._id}">${md._name}</option>`;
  });
  document.getElementById("select_modelo_para_activar_trabajo").innerHTML = res;
}

function error_cargar_models_trabajo_actual(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}
var entidades_list = [];
var entidades_aux = {};
var System = undefined;

function cargar_sujetos_activos(json) {
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.father && elemento.active == 1) {
      aux_visible_activo.add(elemento.father);
    } else if (!!elemento.father && elemento.active == 0) {
      aux_visible_inactivo.add(elemento.father);
    }
  });
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.father) {
      insertar = document.getElementById("lista_sujetos_activos");
    } else {
      insertar = document.createElement("ul");
      document
        .getElementById(`li_entidad_seleccionado_${elemento.father}`)
        .appendChild(insertar);
    }
    li = document.createElement("li");
    li.id = `li_entidad_seleccionado_${elemento.id}`;
    if (elemento.active == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_de_${elemento.father}_seleccionado`,
      "checkbox_seleccionado"
    );
    checkbox.id = `sujeto_seleccionado_${elemento.id}`;
    checkbox.name = "checkbox_sujetos_objetos";
    checkbox.dataset.padre_id = elemento.father;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.name;
    checkbox.setAttribute("onclick", "verificarSeleccion(this);");
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.name;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function error_cargar_sujetos_activos(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}

function verificarSeleccion(elemento) {
  var checkbox = document.getElementsByName("checkbox_sujetos_objetos");
  var auxChecked = elemento.checked;
  System = elemento.dataset.puro_id;
  Array.from(checkbox).forEach((element) => {
    element.checked = false;
  });
  elemento.checked = auxChecked;
  document.getElementById("CategoriaEntidades").disabled = false;
  var seleccion = document.getElementById("CategoriaEntidades");
  var tipo_valor = seleccion.options[seleccion.selectedIndex].text;
  verificar_seleccion_sujeto_categoria(tipo_valor, System);
}

$("#CategoriaEntidades").change(function () {
  entidad_selecciona_seccion_objetos_modal = undefined;
  var seleccion = document.getElementById("CategoriaEntidades");
  var tipo_valor = seleccion.options[seleccion.selectedIndex].text;
  data = {
    valorS: tipo_valor,
    systemID: System,
  };
  verificar_seleccion_sujeto_categoria(tipo_valor, System);
});

function cargar_posibles_entidades_modelo(json) {
  console.log(json);
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  var padreList = [];
  json.forEach((elemento) => {
    padreList.push(elemento.id);
    if (!!elemento.padre && elemento.activo == 1) {
      aux_visible_activo.add(elemento.padre);
    } else if (!!elemento.padre && elemento.activo == 0) {
      aux_visible_inactivo.add(elemento.padre);
    }
  });
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.padre || padreList.indexOf(elemento.padre) == -1) {
      insertar = document.getElementById("lista_entidades_para_cargar");
    } else {
      insertar = document.createElement("ul");
      var insertarAux = document.getElementById(
        `li_ent_para_seleccion_${elemento.padre}`
      );
      if (insertarAux) {
        insertarAux.appendChild(insertar);
      }
    }
    var li = document.createElement("li");
    li.id = `li_ent_para_seleccion_${elemento.id}`;
    if (elemento.activo == 0 || aux_visible_inactivo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    var divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_entidad_de_${elemento.padre}_para_seleccion`,
      "checkbox_para_seleccion_entidad"
    );
    checkbox.id = `sujeto_para_seleccion_${elemento.id}`;
    checkbox.dataset.padre_id = elemento.padre;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.setAttribute(
      "onclick",
      "verificar_seleccion_hijo_padre_entidades(this, 'para_seleccion');"
    );
    var labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    labelChek.innerHTML = elemento.nombre;
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);

    if (!elemento.padre || padreList.indexOf(elemento.padre) == -1) {
      insertar = document.getElementById("lista_entidades_seleccionados");
    } else {
      insertar = document.createElement("ul");
      var insertarAux = document.getElementById(
        `li_ent_seleccionado_${elemento.padre}`
      );
      if (insertarAux) {
        insertarAux.appendChild(insertar);
      }
    }
    li = document.createElement("li");
    li.id = `li_ent_seleccionado_${elemento.id}`;
    if (elemento.activo == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_entidad_de_${elemento.padre}_seleccionado`,
      "checkbox_seleccionado_entidad"
    );
    checkbox.id = `sujeto_seleccionado_${elemento.id}`;
    checkbox.dataset.padre_id = elemento.padre;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.nombre;
    checkbox.setAttribute(
      "onclick",
      "verificar_seleccion_hijo_padre_entidades(this, 'seleccionado');"
    );
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    labelChek.innerHTML = elemento.nombre;
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function error_cargar_posibles_entidades_modelo(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}
var entidad_selecciona_seccion_objetos_modal = undefined;

function abrirModalEntidadColor(id, nombre) {
  if (entidad_selecciona_seccion_objetos_modal) {
    var botton = document
      .getElementById(
        `li_ent_seleccionado_${entidad_selecciona_seccion_objetos_modal.id}`
      )
      .getElementsByTagName("button")[0];
    botton.style.color = "";
  }
  if (
    !entidad_selecciona_seccion_objetos_modal ||
    entidad_selecciona_seccion_objetos_modal.id != id
  ) {
    entidad_selecciona_seccion_objetos_modal = {
      id: id,
      nombre: nombre,
    };
    var botton = document
      .getElementById(`li_ent_seleccionado_${id}`)
      .getElementsByTagName("button")[0];
    botton.style.color = "red";
  } else {
    entidad_selecciona_seccion_objetos_modal = undefined;
    var botton = document
      .getElementById(`li_ent_seleccionado_${id}`)
      .getElementsByTagName("button")[0];
    botton.style.color = "";
  }
}

function verificar_seleccion_hijo_padre_entidades(elemento, lado) {
  var padre_id = elemento.dataset.padre_id;
  if (padre_id != "null" && elemento.checked) {
    // Si es hijo y esta seleccionado
    var padre = document.getElementById(`sujeto_${lado}_${padre_id}`);
    if (padre) {
      padre.checked = true;
      if (padre.dataset.padre_id != "null") {
        verificar_seleccion_hijo_padre_entidades(padre, lado);
      }
    }
  }
  var hijos = document.getElementsByClassName(
    `hijo_entidad_de_${elemento.dataset.puro_id}_${lado}`
  );
  if (hijos.length > 0) {
    // Si es padre
    Array.from(hijos).forEach((e) => {
      if (
        document.getElementById(`li_ent_${lado}_${e.dataset.puro_id}`).style
          .display == "list-item"
      )
        //e.checked = elemento.checked;
        var hijos2 = document.getElementsByClassName(
          `hijo_entidad_de_${e.dataset.puro_id}_${lado}`
        );
      if (hijos2.length > 0) {
        verificar_seleccion_hijo_padre_entidades(e, lado);
      }
    });
  } else {
    verificar_seleccion_hijo_padre_entidades_aux(elemento, lado);
  }
}

function verificar_seleccion_hijo_padre_entidades_aux(elemento, lado) {
  var deseleccion = true;
  var hijos3 = document.getElementsByClassName(
    `hijo_entidad_de_${elemento.dataset.padre_id}_${lado}`
  );
  Array.from(hijos3).forEach((e) => {
    deseleccion = deseleccion && !e.checked;
  });
  var elemen = document.getElementById(
    `sujeto_${lado}_${elemento.dataset.padre_id}`
  );
  if (elemen) {
    elemen.checked = !deseleccion;
    if (elemen.dataset.padre_id != "null") {
      verificar_seleccion_hijo_padre_entidades_aux(elemen, lado);
    }
  }
}

function agregar_entidad_seleccionado() {
  var checkbox = document.getElementsByClassName(
    `checkbox_para_seleccion_entidad`
  );
  var padres_visibles = new Set();
  Array.from(checkbox).forEach((e) => {
    var para_seleccion = document.getElementById(
      `li_ent_para_seleccion_${e.dataset.puro_id}`
    );
    if (
      e.dataset.padre_id != "null" &&
      para_seleccion.style.display != "none" &&
      !e.checked
    ) {
      if (document.getElementById(`li_ent_seleccionado_${e.dataset.padre_id}`))
        padres_visibles.add(e.dataset.padre_id);
    }
    if (e.checked) {
      para_seleccion.style.display = "none";
      document.getElementById(
        `li_ent_seleccionado_${e.dataset.puro_id}`
      ).style.display = "list-item";
    }
    e.checked = false;
  });
  padres_visibles.forEach((e) => {
    var li = document.getElementById(`li_ent_para_seleccion_${e}`);
    li.style.display = "list-item";
  });
  actualizar_activos_entidad();
}

function remover_entidad_seleccionado() {
  var checkbox = document.getElementsByClassName(
    `checkbox_seleccionado_entidad`
  );
  var padres_visibles = new Set();
  Array.from(checkbox).forEach((e) => {
    var para_seleccion = document.getElementById(
      `li_ent_seleccionado_${e.dataset.puro_id}`
    );
    if (
      e.dataset.padre_id != "null" &&
      para_seleccion.style.display != "none" &&
      !e.checked
    ) {
      if (document.getElementById(`li_ent_seleccionado_${e.dataset.padre_id}`))
        padres_visibles.add(e.dataset.padre_id);
    }
    if (e.checked) {
      para_seleccion.style.display = "none";
      document.getElementById(
        `li_ent_para_seleccion_${e.dataset.puro_id}`
      ).style.display = "list-item";
    }
    e.checked = false;
  });
  padres_visibles.forEach((e) => {
    document.getElementById(`li_ent_seleccionado_${e}`).style.display =
      "list-item";
  });
  actualizar_activos_entidad();
}

function extraer_datos_entidad_e_hijos_lista_check(principal, contraria) {
  var elementos = document.getElementsByClassName(
    "entidad_" + principal + "_padre"
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
            "visivilidad_entidad_" + principal + "_" + id_puro_hijo
          ).style.display = "none";
          document.getElementById(
            "visivilidad_entidad_" + contraria + "_" + id_puro_hijo
          ).style.display = "list-item";
          x.checked = false;
          x.dataset.oculto = true;
          document.getElementById(
            "entidad_" + contraria + "_" + id_puro_hijo
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
        "entidad_" + contraria + "_" + id_puro_padre
      ).dataset.oculto = false;
      document.getElementById(
        "visivilidad_entidad_" + contraria + "_" + id_puro_padre
      ).style.display = "list-item";
    }
  });
}

function actualizar_activos_entidad() {
  var check = document.getElementsByClassName(`checkbox_seleccionado_entidad`);
  var actualizacion = [];
  Array.from(check).forEach((e) => {
    var elem = {
      id: e.dataset.puro_id,
      activo:
        document.getElementById(`li_ent_seleccionado_${e.dataset.puro_id}`)
          .style.display == "list-item",
    };
    actualizacion.push(elem);
  });
  post_api(
    (url = SERVER_PATH + "/api/update_entity"),
    actualizacion,
    (json) => {
      console.log(json);
    },
    (error) => {
      console.log(error);
    }
  );
}

function actualizar_entidad() {
  if (entidad_selecciona_seccion_objetos_modal) {
    abrirModalEntidad(
      entidad_selecciona_seccion_objetos_modal.id,
      entidad_selecciona_seccion_objetos_modal.nombre
    );
  } else {
    alert("No selecciono ningun elemento");
  }
}

function extraer_datos_entidad() {
  var padres = document.querySelectorAll(
    "#lista_entidad_seleccionados > li > div > input"
  );
  var new_ent = [];
  Array.from(padres).forEach((pad) => {
    var id = pad.dataset.puro_id;
    var name = pad.dataset.puro_name;
    var aux_ent;
    var list_ent_h = [];
    var activo = pad.dataset.oculto == "false";
    var inactivo = false;
    var hijos = document.getElementsByName(pad.id);
    Array.from(hijos).forEach((hj) => {
      var id_h = hj.dataset.puro_id;
      var name_h = hj.dataset.puro_name;
      var activo_h = hj.dataset.oculto == "false";
      inactivo = inactivo || !activo_h;
      var ent_hijos = {
        id: id_h,
        name: name_h,
        activo: activo_h,
        entities: entidades_aux[id_h].entidades,
      };
      list_ent_h.push(obj_hijos);
    });

    if (list_ent_h.length > 0) {
      aux_ent = {
        id: id,
        name: name,
        activo: activo,
        inactivo: inactivo,
        tiene_entidades: true,
        entities: entidades_aux[id].entidades,
        entity: list_ent_h,
      };
    } else {
      aux_ent = {
        id: id,
        name: name,
        activo: activo,
        inactivo: inactivo,
        tiene_entidades: false,
        entities: entidades_aux[id].entidades,
      };
    }
    new_ent.push(aux_ent);
  });
  return new_ent;
}
/* 
	    SECCION CREACION DE ENTIDADES ARBOL Y FORMULARIO
		Descripción:
		En este fragmeto se pretende crear las funciones que llamen a la ventana modal
		y todas las funciones que impliquen la creacion de las entidades que tienen los sujetos
	    
	*/
var idSeleccion;

function abrirModalEntidad(id, nombre) {
  try {
    $("#modal_agregar_entidad").modal("show");
    var nom2 = document.getElementById("nombreEntidadActiva2");
    var nom = document.getElementById("nombreEntidadActiva");
    idSeleccion = id;
    nom.innerHTML = nombre;
    nom2.innerHTML = nombre;
    data = {
      id: idSeleccion,
    };
    post_api(
      SERVER_PATH + "/api/aspects",
      data,
      cargar_aspectos_table,
      error_cargar_aspectos_table
    );
  } catch (error) {
    alert(error);
  }
}

function activarFormularioAgregarEntidad() {
  try {
    document.getElementById("nombreEntidad").disabled = false;
    document.getElementById("descripcionEntidad").disabled = false;
    document.getElementById("PesoEntidad").disabled = false;
    document.getElementById("tipo_aspectos").disabled = false;
    document.getElementById("btn-agregarEntidadLista").disabled = false;
    document.getElementById("btn-agregarEntidadLista").disabled = false;
    document.getElementById("btn-CancelarEntidadLista").disabled = false;
  } catch (error) {
    alert(error);
  }
}

function desactivarFormularioAgregarEntidad() {
  document.getElementById("nombreEntidad").disabled = true;
  document.getElementById("descripcionEntidad").disabled = true;
  document.getElementById("PesoEntidad").disabled = true;
  document.getElementById("tipo_aspectos").disabled = true;
  document.getElementById("activoEntidad").disabled = true;
  document.getElementById("btn-agregarEntidadLista").disabled = true;
  document.getElementById("btn-CancelarEntidadLista").disabled = true;
  document.getElementById("nombreEntidad").value = "";
  document.getElementById("descripcionEntidad").value = "";
  document.getElementById("PesoEntidad").value = "";
}

function agregarAspecto() {
  var tipo = document.getElementById("tipo_aspectos");
  var tipo_valor = tipo.options[tipo.selectedIndex].text;
  var data = {
    nombre: document.getElementById("nombreEntidad").value,
    descripcion: document.getElementById("descripcionEntidad").value,
    peso: document.getElementById("PesoEntidad").value,
    tipoS: tipo_valor,
    activo: document.getElementById("activoEntidad").checked,
    id: idSeleccion,
  };
  if (!!data.nombre && !!data.descripcion && !!data.peso && !!data.tipoS) {
    desactivarFormularioAgregarEntidad(),
      post_api(
        SERVER_PATH + "/api/add_aspects/",
        data,
        mensaje_exitoEnvioAspects,
        mensaje_errorEnvioAspects
      );
  } else {
    alert("Debe llenar todos los campos");
  }
}

function EliminarAspecto() {
  var radio = document.getElementsByName("aspecto_seleccionado");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!!id) {
    data = {
      idD: id,
      id: idSeleccion,
    };
    post_api(
      SERVER_PATH + "/api/del_aspects/",
      data,
      mensaje_exitoEnvioAspects,
      mensaje_errorEnvioAspects
    );
    post_api(
      SERVER_PATH + "/api/aspects",
      data,
      cargar_aspectos_table,
      error_cargar_aspectos_table
    );
    $("#modal_eliminar_unidadMedida").modal("hide");
  } else alert("Debe seleccionar un elemento para eliminar");
}

/*Seccion de Metricas Botones Guardar Cancelar Agregar y Eliminar*/

function eliminar_metrica() {
  var radio = document.getElementsByName("metrica_seleccionado");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!!id) {
    data = {
      idD: id,
      id: AspectoId,
    };
    post_api(
      SERVER_PATH + "/api/del_metrica/",
      data,
      mensaje_exitoEnvioMetrica,
      mensaje_errorEnvioMetrica
    );
    $("#modal_eliminar_unidadMedida").modal("hide");
  } else alert("Debe seleccionar un elemento para eliminar");
}

/* 
	    SECCION SELECCION SUJETOS CARGAR LOS RECURSOS DE IMPLEMENTACION
	  
		Descripción:
		Esta seccion incluye el envio de datos para las Escalas
	  
		Incluye:
	*/

function agregar_recurso_implementacion() {
  $("#modal_recurso_implementacion_add").modal("show");
}

function guardarNuevaRecImpl() {
  var data = {
    nombre: document.getElementById("input-name-add").value,
    descripcion: document.getElementById("input-descripcion-add").value,
    tipo_dato_salida: document.getElementById("input-tipe-add").value,
    tipo_recurso: document.getElementById("select_tipo_recurso").value,
  };
  console.log(data);
  if (
    !!data.nombre &&
    !!data.descripcion &&
    !!data.tipo_dato_salida &&
    !!data.tipo_recurso
  ) {
    post_api(
      SERVER_PATH + "/api/add_ri/",
      data,
      mensaje_exitoEnvioRI,
      mensaje_errorEnvioRI
    );
    consultar_api(
      SERVER_PATH + "/api/add_ri/",
      cargar_ri_table,
      error_cargar_ri_table
    );
    $("#modal_recurso_implementacion_add").modal("hide");
  } else alert("Ingrese todos los campos del formulario");
}

function eliminar_recurso_implementacion() {
  var radio = document.getElementsByName("escala_seleccionada");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!!id) {
    data = {
      id: id,
    };
    console.log(data);
    post_api(
      SERVER_PATH + "/api/del_escales/",
      data,
      mensaje_exitoEnvioEscalas,
      mensaje_errorEnvioEscalas
    );
    consultar_api(
      SERVER_PATH + "/api/escales",
      cargar_escales_table,
      error_cargar_escales_table
    );
  } else alert("Debe seleccionar un elemento para eliminar");
}

function modificar_recurso_implementacion() {
  var radio = document.getElementsByName("ri_seleccionada");
  var id;
  var name;
  var descripcion;
  var tds; //tipo dato salida
  var tipo; //tipo recurso
  var activo;
  parametroEliminar = [];
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      name = elem.dataset.name;
      valor_valido = elem.dataset.valor_valido;
      tipo = elem.dataset.tipo;
      activo = elem.dataset.activo;
      return;
    }
  });

  if (!!id && !!name && !!valor_valido && !!tipo) {
    document.getElementById("input-escale-id-update").value = id;
    document.getElementById("input-escale-name-update").value = name;
    document.getElementById("input-escale-valor-update").value = valor_valido;
    document.getElementById("input-tipe-update").value = tipo;
    document.getElementById("activoEscalas").value = activo;
    $("#modal_escalas_mod").modal("show");
  } else alert("Debe seleccionar un elemento para modificar");
}

function guardarModificacionRI() {
  var data = {
    id: document.getElementById("input-escale-id-update").value,
    nombre: document.getElementById("input-escale-name-update").value,
    valor_valido: document.getElementById("input-escale-valor-update").value,
    tipo: document.getElementById("input-tipe-update").value,
    activo: document.getElementById("activoEscalas").value,
  };
  if (!!data.id && !!data.nombre && !!data.valor_valido && !!data.tipo) {
    post_api(
      SERVER_PATH + "/api/upd_escales/",
      data,
      mensaje_exitoEnvioEscalas,
      mensaje_errorEnvioEscalas
    );
    consultar_api(
      SERVER_PATH + "/api/escales",
      cargar_escales_table,
      error_cargar_escales_table
    );

    $("#modal_escalas_mod").modal("hide");
  } else alert("Debe debe completar todos los campos");
}

function mensaje_exitoEnvioRI(json) {
  alert(json.mensaje);
}

function mensaje_errorEnvioRI(err) {
  alert(err);
}

/* 
	    SECCION CARGAR LAS RECURSOS IMPLEMENTACION
	  
		Descripción:
		Esta seccion contiene las funciones 
		de que carga los recursos de implementacion
		en la pagina
	  
		Incluye:
		cargar_ri_table,
		error_cargar_ri_table
	*/

if (document.getElementById("tabla_recurso_implementacion"))
  consultar_api(
    SERVER_PATH + "/api/recurso_implementacion",
    cargar_ri_table,
    error_cargar_ri_table
  );

function cargar_ri_table(json) {
  res = "";
  json.forEach((es) => {
    res += "<tr>";
    res += `<td><input type="checkbox" name="ri_seleccionada" 
			  value="${es.id}" data-name="${es.nombre}" 
			  data-descripcion="${es.descripcion}" 
			  data-tipo_dato_salida="${es.tipo_dato_salida}" 
			  data-tipo_recurso="${es.tipo_recurso}" 
			  data-activo="${es.activo}"></td>`;
    res += `<td>${es.id}</td>`;
    res += `<td>${es.nombre}</td>`;
    res += `<td>${es.descripcion}</td>`;
    res += `<td>${es.tipo_dato_salida}</td>`;
    res += `<td>${es.tipo_recurso}</td>`;
    if (es.activo == "true")
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_recurso_implementacion").innerHTML = res;
}

function error_cargar_ri_table(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

function add_Tipo_Recurso() {
  var seleccion = document.getElementsByName("ri_seleccionada").value;
  var id;
  var tr; //tipo recurso

  seleccion.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      tr = elem.dataset.tr;
      return;
    }
  });

  if (tr == "Fórmula") {
    document.getElementById("input-tr-id").value = id;
    $("#modal_tipo_recurso_formula").modal("show");
  } else if (tr == "Función") {
    document.getElementById("input-tr-id").value = id;
    $("#modal_tipo_recurso_funcion").modal("show");
  } else if (tr == "Servicio") {
    document.getElementById("input-escale-id-update").value = id;
    $("#modal_tipo_recurso_servicio").modal("show");
  } else alert("No hay tipo de recurso");
}
if (document.getElementById("lista_sujetos_activos"))
  consultar_api(
    SERVER_PATH + "/api/subjects",
    cargar_sujetos_activos,
    error_cargar_sujetos_activos
  );

/*
	Procesos Pre Reflexivos
	*/

if (document.getElementById("pagina_proceso")) {
  agregarProcesoPreReflexivo();
}

function agregarProcesoPreReflexivo() {
  var tipoComunicacion = "TIPO_COMUNICACION";
  data = {
    tipo: tipoComunicacion,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_select_tipo_comunicacion,
    error_cargar_select_tipo_comunicacion
  );
  consultar_api(
    SERVER_PATH + "/api/decision_criteria",
    cargar_select_criterios_proceso,
    error_cargar_select_criterios_proceso
  );
  Abrir_limpiar_modal_proceso_pre_reflexivo();
}

function generar_flujo_datos_select() {
  var seleccione = document.getElementById("tipo_comunicacion");
  var comunicacion = seleccione.options[seleccione.selectedIndex].text;
  var porpiedadSeleccionada = document.getElementById(
    "proiedad_recoleccion"
  ).value;
  if (comunicacion == "SiNCRONA") {
    comunicacion = "SINCRONA";
  } else {
    comunicacion = undefined;
  }
  if (seleccione != "Seleccione.." && porpiedadSeleccionada != "-6") {
    post_api(
      SERVER_PATH + "/api/get_data_flow",
      {
        comunicacion: comunicacion,
        propiedad: porpiedadSeleccionada,
      },
      cargar_select_flujo_datos,
      (res) => {
        console.log(res);
      }
    );
  } else {
    var ope = document.getElementById("flujo_de_datos");
    ope.innerHTML = "";
    var seleccione = document.createElement("option");
    seleccione.innerHTML = "Seleccione..";
    seleccione.value = "-6";
    ope.appendChild(seleccione);
  }
}

function cargar_select_flujo_datos(json) {
  var ope = document.getElementById("flujo_de_datos");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.descripcion;
    ope.appendChild(option);
  });
}

function Abrir_limpiar_modal_proceso_pre_reflexivo() {
  document
    .getElementById("modal_metodo_add")
    .classList.replace("d-block", "d-none");
  document.getElementById(
    "input-descripcion-proceso-pre-reflexivo"
  ).disabled = false;
  document.getElementById("inicio_del_periodo").disabled = false;
  document.getElementById("fin_del_periodo").disabled = false;
  document.getElementById("sujetos_activos_proceso").disabled = false;
  document.getElementById("CategoriaEntidadesProcesos").disabled = true;
  document.getElementById(
    "entidades_seleccionados_area_procesos"
  ).disabled = false;
  document.getElementById("Aspectos_autoconsciencia").disabled = false;
  document.getElementById("input-descripcion-proceso-pre-reflexivo").value = "";
  document.getElementById("inicio_del_periodo").value = "";
  document.getElementById("fin_del_periodo").value = "";
  document.getElementById("CategoriaEntidadesProcesos").selectedIndex = "0";
  document.getElementById("Aspectos_autoconsciencia").selectedIndex = "0";
  document.getElementById("tipo_comunicacion").selectedIndex = "0";
  document.getElementById("metrica_directa").selectedIndex = "0";
  document.getElementById("tipo_recurso").selectedIndex = "0";
  document.getElementById("recurso").selectedIndex = "0";
  document.getElementById("indicador_modelo").selectedIndex = "0";
  document.getElementById("criterio_de_decision").selectedIndex = "0";
  document.getElementById("lista_entidades_seleccionadas_procesos").innerHTML =
    "";
  document.getElementById("tabla_umbrales_procesos").innerHTML = "";
  document.getElementById("Aspectos_autoconsciencia").disabled = true;
  document.getElementById("tipo_comunicacion").disabled = true;
  document.getElementById("proiedad_recoleccion").disabled = true;
  document.getElementById("metrica_directa").disabled = true;
  document.getElementById("tipo_recurso").disabled = true;
  document.getElementById("indicador_modelo").disabled = true;
  document.getElementById("criterio_de_decision").disabled = true;
  document.getElementById("recurso").disabled = true;
  document.getElementById("mapeo_parametros_btn").disabled = true;
}
if (document.getElementById("lista_sujetos_activos_proceso"))
  consultar_api(
    SERVER_PATH + "/api/subjects",
    cargar_sujetos_activos_procesos,
    error_cargar_sujetos_activos_procesos
  );

function cargar_sujetos_activos_procesos(json) {
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.father && elemento.active == 1) {
      aux_visible_activo.add(elemento.father);
    } else if (!!elemento.father && elemento.active == 0) {
      aux_visible_inactivo.add(elemento.father);
    }
  });
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.father) {
      insertar = document.getElementById("lista_sujetos_activos_proceso");
    } else {
      insertar = document.createElement("ul");
      document
        .getElementById(`li_entidad_seleccionado_${elemento.father}`)
        .appendChild(insertar);
    }
    li = document.createElement("li");
    li.id = `li_entidad_seleccionado_${elemento.id}`;
    if (elemento.active == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `sujeto_seleccionado_${elemento.id}`;
    checkbox.name = "checkbox_sujetos_procesos";
    checkbox.dataset.padre_id = elemento.father;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.name;
    checkbox.setAttribute("onclick", "verificarSeleccionProceso(this);");
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.name;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function error_cargar_sujetos_activos_procesos(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}
var SujetoGuardarProceso = undefined;

function verificar_seleccion_sujeto_categoria(categoria, IdSujeto) {
  var limpiar = document.getElementById("lista_entidades_para_cargar");
  limpiar.innerHTML = "";
  var limpiar2 = document.getElementById("lista_entidades_seleccionados");
  limpiar2.innerHTML = "";
  var seleccion = document.getElementById("CategoriaEntidades");
  var tipo_valor = seleccion.options[seleccion.selectedIndex].text;

  if (IdSujeto && categoria != "Seleccione..") {
    categoria = sin_tilde(categoria);
    data = {
      valorS: categoria,
      systemID: IdSujeto,
    };
    post_api(
      SERVER_PATH + "/api/entitys",
      data,
      cargar_posibles_entidades_modelo,
      error_cargar_posibles_entidades_modelo
    );
  }
}

function verificarSeleccionProceso(elemento) {
  var checkbox = document.getElementsByName("checkbox_sujetos_procesos");
  var auxChecked = elemento.checked;
  SujetoGuardarProceso = elemento.dataset.puro_id;
  Array.from(checkbox).forEach((element) => {
    element.checked = false;
    document.getElementById("CategoriaEntidadesProcesos").disabled = true;
  });
  elemento.checked = auxChecked;
  var seleccion = document.getElementById("Aspectos_autoconsciencia");
  seleccion.disabled = false;
  verificar_seleccion_sujeto_categoria_procesos(SujetoGuardarProceso);
}
$("#CategoriaEntidadesProcesos").change(function () {
  var limpiar = document.getElementById(
    "lista_entidades_seleccionadas_procesos"
  );

  var seccion = document.getElementById("CategoriaEntidadesProcesos");
  var categoria = seccion.options[seccion.selectedIndex].text;
  limpiar.innerHTML = "";
  data = {
    categoria: categoria,
    aspecto: document.getElementById("Aspectos_autoconsciencia").value,
    sujeto: SujetoGuardarProceso,
  };
  if (data.categoria != -6 && data.aspecto != -6 && !!data.sujeto) {
    post_api(
      SERVER_PATH + "/api/get_objects_aspects",
      data,
      cargar_objetos_proceso,
      (res) => {
        console.log(res);
      }
    );
  } else {
    alert("Falta seleccionar campos");
  }
});

function verificar_seleccion_sujeto_categoria_procesos(IdSujeto) {
  var limpiar = document.getElementById(
    "lista_entidades_seleccionadas_procesos"
  );
  limpiar.innerHTML = "";
  if (IdSujeto) {
    data = {
      systemID: IdSujeto,
      types: 53,
    };
    post_api(
      SERVER_PATH + "/api/get_aspects_objects_process",
      data,
      cargar_posibles_entidades_proceso,
      error_cargar_posibles_entidades_proceso
    );
  }
}

function cargar_posibles_entidades_proceso(json) {
  var select = document.getElementById("Aspectos_autoconsciencia");
  select.innerHTML = "";
  var opt = document.createElement("option");
  opt.value = -6;
  opt.innerHTML = "Seleccione ..";
  select.appendChild(opt);
  json.forEach((asp) => {
    var opt = document.createElement("option");
    opt.value = asp.idAspecto;
    opt.innerHTML = asp.nombreAspecto;
    select.appendChild(opt);
  });

  if (json.length > 0) {
    select.disabled = false;
  } else {
    select.disabled = true;
  }
}

function error_cargar_posibles_entidades_proceso(json) {
  console.log(json);
}

function agregar_aspectos_select(json) {
  var ope = document.getElementById("Aspectos_autoconsciencia");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
  document.getElementById("Aspectos_autoconsciencia").disabled = false;
}
function cargar_objetivos_sujetos_select(json) {
  console.log(json);
  var option = document.createElement("option");
  option.value = "-6";
  option.innerHTML = "Seleccione..";
  ope.innerHTML = "";
  ope.appendChild(option);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_objetivos_sujetos_select(error) {
  console.log(error);
}

function cargar_posibles_entidades_modelo_proceso(json) {
  var limpiar = document.getElementById("lista_entidades_para_cargar");
  limpiar.innerHTML = "";
  var limpiar2 = document.getElementById("lista_entidades_seleccionados");
  limpiar2.innerHTML = "";
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.padre && elemento.activo == 1) {
      aux_visible_activo.add(elemento.padre);
    } else if (!!elemento.padre && elemento.activo == 0) {
      aux_visible_inactivo.add(elemento.padre);
    }
  });
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.padre) {
      insertar = document.getElementById(
        "lista_entidades_seleccionadas_procesos"
      );
    } else {
      insertar = document.createElement("ul");
      var insertarAux = document.getElementById(
        `li_ent_seleccionado_${elemento.padre}`
      );
      if (insertarAux) {
        insertarAux.appendChild(insertar);
      }
    }
    li = document.createElement("li");
    li.id = `li_ent_seleccionado_${elemento.id}`;
    if (elemento.activo == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_entidad_de_${elemento.padre}_seleccionado`,
      "checkbox_seleccionado_entidad"
    );
    checkbox.id = `sujeto_seleccionado_procesos_${elemento.id}`;
    checkbox.name = "checkbox_entidades_procesos";
    checkbox.dataset.padre_id = elemento.padre;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.nombre;
    checkbox.setAttribute("onclick", "cargar_aspectos(this,'seleccionado');");
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.nombre;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function error_cargar_posibles_entidades_modelo_proceso(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}
var objIdProcesos = undefined;
var idObjeto = undefined;

function cargar_aspectos(elemento, lado) {
  document.getElementById("Aspectos_autoconsciencia").disabled = false;
  var checkbox = document.getElementsByName("checkbox_entidades_procesos");
  var auxChecked = elemento.checked;
  objIdProcesos = elemento.dataset.puro_id;
  Array.from(checkbox).forEach((element) => {
    element.checked = false;
  });
  elemento.checked = auxChecked;
  idObjeto = elemento.dataset.puro_id;
  var data = {
    id: idObjeto,
  };
  post_api(
    SERVER_PATH + "/api/aspects",
    data,
    cargar_aspectos_select,
    error_cargar_aspectos_select
  );
  post_api(
    SERVER_PATH + "/api/properties",
    {
      id: idObjeto,
    },
    cargar_propiedades_select,
    error_cargar_propiedades_select
  );
}

function cargar_propiedades_select(json) {
  var ope = document.getElementById("proiedad_recoleccion");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    option.dataset.obj = element.obj_id;
    ope.appendChild(option);
  });
}
function error_cargar_propiedades_select(error) {
  alert("No se cargo las propiedades" + error);
}

function error_cargar_aspectos_select(err) {
  console.log("Error al cargar los datos del modelo:" + err);
}
$("#Aspectos_autoconsciencia").change(function () {
  var limpiar = document.getElementById(
    "lista_entidades_seleccionadas_procesos"
  );
  limpiar.innerHTML = "";
  data = {
    aspecto: document.getElementById("Aspectos_autoconsciencia").value,
    sujeto: SujetoGuardarProceso,
  };
  if (data.aspecto != -6 && !!data.sujeto) {
    post_api(
      SERVER_PATH + "/api/get_objects_aspects",
      data,
      cargar_objetos_proceso,
      (res) => {
        console.log(res);
      }
    );
  } else {
    alert("Falta seleccionar campos");
  }
  document.getElementById("tipo_comunicacion").disabled = false;
  document.getElementById("proiedad_recoleccion").disabled = false;
  document.getElementById("metrica_directa").disabled = false;
  document.getElementById("tipo_recurso").disabled = false;
  document.getElementById("indicador_modelo").disabled = false;
  document.getElementById("criterio_de_decision").disabled = false;
  var limpiar = document.getElementById("metrica_directa");
  limpiar.innerHTML = "";
  var aspecto_select = document.getElementById(
    "Aspectos_autoconsciencia"
  ).value;
  tipoM = 10;
  data = {
    id: aspecto_select,
    tipo: tipoM,
  };
  post_api(
    SERVER_PATH + "/api/get_metrics_type",
    data,
    cargar_select_metrica_proceso,
    error_cargar_select_metrica_proceso
  );

  var limpiar3 = document.getElementById("indicador_modelo");
  limpiar3.innerHTML = "";
  var seleccion = document.getElementById("Aspectos_autoconsciencia").value;
  var tipoIndi = "12";
  data2 = {
    id: seleccion,
    tipo: tipoIndi,
  };
  post_api(
    SERVER_PATH + "/api/get_metrics_type",
    data2,
    cargar_select_indicador_proceso,
    error_cargar_select_indicador_proceso
  );
});
function cargar_objetos_proceso(json) {
  var ul = document.getElementById("lista_entidades_seleccionadas_procesos");
  ul.innerHTML = "";
  var op = document.createElement("option");
  var seleccion = json[0].tipo;
  if (seleccion == "PhysicalEntity") {
    op.innerHTML = "Entidades Físicas";
  } else if (seleccion == "CloudNode") {
    op.innerHTML = "Nodos Cloud";
  } else if (seleccion == "FogNode") {
    op.innerHTML = "Nodos Fog";
  } else if (seleccion == "IoTGateway") {
    op.innerHTML = "Gateway IoT";
  } else if (seleccion == "Sensor") {
    op.innerHTML = "Sensores";
  } else if (seleccion == "Tag") {
    op.innerHTML = "Tags";
  } else if (seleccion == "Actuator") {
    op.innerHTML = "Actuadores";
  } else if (seleccion == "Network") {
    op.innerHTML = "Red";
  }
  var sel = document.getElementById("CategoriaEntidadesProcesos");
  sel.innerHTML = "";
  sel.appendChild(op);
  json.forEach((element) => {
    var li = document.createElement("li");
    li.innerHTML = element.nombre;
    ul.appendChild(li);
  });
}
function cargar_select_metrica_proceso(json) {
  var ope = document.getElementById("metrica_directa");
  var option = document.createElement("option");
  option.value = "-6";
  option.innerHTML = "Seleccione..";
  ope.innerHTML = "";
  ope.appendChild(option);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    ope.appendChild(option);
  });
}

function error_cargar_select_metrica_proceso() {
  alert("No se cargo el select metrica en el modal procesos");
}

function cargar_select_indicador_proceso(json) {
  var ope = document.getElementById("indicador_modelo");
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione..";
  opcion.value = "-6";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    ope.appendChild(option);
  });
}

function error_cargar_select_indicador_proceso() {
  alert("No se cargo el indicar metrica en el modal procesos");
}

function cargar_select_criterios_proceso(json) {
  var ope = document.getElementById("criterio_de_decision");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_select_criterios_proceso() {
  alert("No se cargo el select criterio de decicison");
}

function cargar_select_tipo_comunicacion(json) {
  var ope = document.getElementById("tipo_comunicacion");
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione..";
  opcion.value = "-6";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_select_tipo_comunicacion() {
  alert("No se cargo el select tipo comunicacion");
}

function cargar_lista_umbrales_proceso(json) {
  document
    .getElementById("bt_add_activo")
    .classList.replace("inline-block", "d-none");
  document
    .getElementById("bd_mod_activo")
    .classList.replace("inline-block", "d-none");
  document
    .getElementById("bd_del_activo")
    .classList.replace("inline-block", "d-none");

  res = "";
  document.getElementById("seccion_acciones").innerHTML = "";
  json.umbrales.forEach((cd) => {
    res += `<tr onClick="visibilidad_acciones_umbral('${cd.id}')" id='tr_accion_${cd.id}' name='tr_accion_'>`;
    res += `<td>${cd.id}</td>`;
    res += `<td>${cd.name}</td>`;
    res += `<td>${cd.interpretacion}</td>`;
    res += `<td>${cd.inferior}</td>`;
    res += `<td>${cd.superior}</td>`;
    res += "</tr>";
    post_api(
      SERVER_PATH + "/api/get_action",
      {
        umbral: cd.id,
        mea_id: modelo_analisis_pre_reflexivos,
      },
      cargar_accion_table,
      (res) => {
        console.log("Error al cargar la tabla accion" + res);
      }
    );
  });
  document.getElementById("tabla_umbrales_procesos").innerHTML = res;
}

var UmbralId = undefined;

function visibilidad_acciones_umbral(id) {
  document
    .getElementById("bt_add_activo")
    .classList.replace("d-none", "inline-block");
  document
    .getElementById("bd_mod_activo")
    .classList.replace("d-none", "inline-block");
  document
    .getElementById("bd_del_activo")
    .classList.replace("d-none", "inline-block");
  document
    .getElementById("bd_del_activo")
    .classList.replace("d-none", "inline-block");
  var tabla = document.getElementsByName("tr_accion_");
  tabla.forEach((tr) => {
    tr.style.backgroundColor = "rgba(0,0,0,0)";
  });
  document.getElementById(`tr_accion_${id}`).style.backgroundColor =
    "rgba(0,0,0,0.15)";
  var dato = document.getElementById("umbral_" + id);
  if (dato && UmbralId != id) {
    dato.style.display = "table";
    if (UmbralId) {
      dato = document.getElementById("umbral_" + UmbralId);
      dato.style.display = "none";
    }
  }
  UmbralId = id;
}

function error_cargar_lista_umbrales_proceso(err) {
  alert("No se puede cargar los umbrales" + err);
}

function cargar_activos_umbrales() {
  var seleccionCriterio = document.getElementById("criterio_de_decision").value;
  post_api(
    SERVER_PATH + "/api/get_umbral",
    { criterio: seleccionCriterio },
    cargar_lista_umbrales_proceso,
    (res) => {
      console.log(res);
    }
  );
  $("#modal_activos_procesos").modal("show");
}

function cerrar_modal_activos() {
  $("#modal_activos_procesos").modal("hide");
}
function cerrar_modal_activos_reflexivos() {
  $("#modal_activos_procesos_reflexivos").modal("hide");
}

function guardarAccionUmbral() {
  recomendacionesPreReflexivos = true;
  var data = {
    description: document.getElementById("descripcion_accion_umbral").value,
    umbral: UmbralId,
    mea_id: modelo_analisis_pre_reflexivos,
  };
  if (!!data.description) {
    post_api(
      SERVER_PATH + "/api/add_action",
      data,
      mensajeExitosoAgregarAccionesUmbrales,
      mensajeErrorAgregarAccionesUmbrales
    );
    $("#modal_agregar_accion_proceso").modal("hide");
    $("#modal_activos_procesos").modal("show");
  }
}

function mensajeExitosoAgregarAccionesUmbrales(json) {
  post_api(
    SERVER_PATH + "/api/get_action",
    {
      umbral: UmbralId,
      mea_id: modelo_analisis_pre_reflexivos,
    },
    cargar_accion_table_modificar,
    () => {
      console.log("Error al cargar la tabla accion");
    }
  );
}

function cargar_accion_table_modificar(json) {
  console.log(json);
  var templeate = document
    .getElementById("templeate_tabla_accion")
    .content.cloneNode(true);
  var seccion = document.getElementById("seccion_acciones");
  var body = templeate.querySelector("tbody");
  json.acciones.forEach((um) => {
    var fila = document.createElement("tr");
    var dato = document.createElement("td");
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "accion_seleccionada";
    input.dataset.id = um.id;
    input.dataset.description = um.description;
    input.dataset.active = um.active;
    dato.appendChild(input);
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.id;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.description;
    fila.appendChild(dato);
    input = document.createElement("input");
    input.type = "checkbox";
    input.disabled = true;
    input.checked = um.active == 1;
    dato = document.createElement("td");
    dato.appendChild(input);
    fila.appendChild(dato);
    body.appendChild(fila);
  });
  body.id += "_" + json.umbral_id;
  var tabla = templeate.querySelector(".table");
  tabla.id = "umbral_" + json.umbral_id;
  var tablaMod = document.getElementById(tabla.id);
  if (tablaMod) {
    seccion.replaceChild(tabla, tablaMod);
  } else {
    tabla.style.display = "none";
    seccion.appendChild(templeate);
  }
}

function mensajeErrorAgregarAccionesUmbrales(error) {
  alert(error);
}

function errorenviarDatos_acciones_umbrales(error) {
  console.log(error);
}

function eliminarAccionesUmbrales() {
  var radio = document.getElementsByName("accion_seleccionada");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.dataset.id;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro que desea eliminar esta accion")) {
      data = {
        id: id,
      };
      post_api(
        SERVER_PATH + "/api/del_action/",
        data,
        mensajeExitosoAgregarAccionesUmbrales,
        (res) => {
          console.log(res);
        }
      );
    }
  } else alert("Debe seleccionar un elemento para eliminar");
}

function mensaje_exitosoEliminacionAcciones(json) {
  alert("Eliminacion realizada");
  cargarDespuesdeEliminarAcciones();
}

function cargarDespuesdeEliminarAcciones() {
  post_api(
    SERVER_PATH + "/api/get_accion/",
    {
      id: UmbralId,
    },
    cargar_accion_table,
    (res) => {
      console.log(res);
    }
  );
}

function modificarAccionesUmbrales() {
  var radio = document.getElementsByName("accion_seleccionada");
  var id;
  var descripcion;
  var activo;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.dataset.id;
      descripcion = elem.dataset.description;
      activo = elem.dataset.active == 1;
      return;
    }
  });
  if (!!id && !!descripcion) {
    $("#modal_activos_procesos").modal("hide");
    document.getElementById("id_accion_umbral_modificar").value = id;
    document.getElementById("descripcion_accion_umbral_modificar").value =
      descripcion;
    document.getElementById("activo_accion_umbral_modificar").checked = activo;
    $("#modal_modificar_accion_umbral").modal("show");
  } else alert("Debe seleccionar un elemento para modificar");
}

function guardarModificacionAccionesUmbrales() {
  var data = {
    id: document.getElementById("id_accion_umbral_modificar").value,
    description: document.getElementById("descripcion_accion_umbral_modificar")
      .value,
    active: document.getElementById("activo_accion_umbral_modificar").checked,
  };
  post_api(
    SERVER_PATH + "/api/upd_action/",
    data,
    mensajeExitosoAgregarAccionesUmbrales,
    (res) => {
      console.log(res);
    }
  );
  $("#modal_modificar_accion_umbral").modal("hide");
  $("#modal_activos_procesos").modal("show");
}
var mapeoGuardardado = false;
function abrirModalMapeoParametros() {
  if (mapeoGuardardado == true) {
    $("#modal_mapeo_parametros").modal("show");
    document.getElementById("guardar_mapeo_pre_reflexivos").disabled = true;
  } else {
    document.getElementById("guardar_mapeo_pre_reflexivos").disabled = false;
    document.getElementById("tabla_mapeo_parametros").innerHTML = "";
    var id = document.getElementById("recurso").value;
    if (id) {
      post_api(
        SERVER_PATH + "/api/ask_deployment_resources/",
        {
          id: id,
        },
        cargar_modal_mapeo_parametros,
        (res) => {
          console.log(res);
        }
      );
      $("#modal_mapeo_parametros").modal("show");
    } else {
      alert("Debe seleccionar un recurso");
    }
  }
}

function cargar_modal_mapeo_parametros(json) {
  console.log(json);
  document.getElementById("nombre_temporal_mapeo").innerHTML = json._name;
  document.getElementById("tipo_dato_salida_mapeo").innerHTML =
    json._returnDataType[0];
  document.getElementById("descripcion_mapeo").innerHTML = json._description;
  var tbody = document.getElementById("tabla_mapeo_parametros");
  json._containsParameter.forEach((element) => {
    if (element._active) {
      var tr = document.createElement("tr");
      tr.setAttribute("name", "tr_fila_parametros");
      var id = document.createElement("td");
      id.id = "id_fila_parametros";
      tr.appendChild(id);
      var nombre = document.createElement("td");
      nombre.id = "nombre_fila_parametros";
      tr.appendChild(nombre);
      var tipoDato = document.createElement("td");
      tipoDato.id = "tipo_dato_fila_parametros";
      tr.appendChild(tipoDato);
      var opcional = document.createElement("td");
      opcional.id = "opcional_fila_parametros";
      tr.appendChild(opcional);
      var tipoMapeo = document.createElement("td");
      tipoMapeo.id = "tipo_mapeo_fila_parametros";
      tr.appendChild(tipoMapeo);
      var argumentoEntrada = document.createElement("td");
      argumentoEntrada.id = "argumento_entrada_fila_parametros";
      tr.appendChild(argumentoEntrada);
      var proceso = document.createElement("td");
      proceso.id = "proceso_seleccion_mapeo";
      tr.appendChild(proceso);
      id.innerHTML = element._ordinal;
      nombre.innerHTML = element._name;
      tipoDato.innerHTML = element._dataType[1];
      tipoDato.dataset.id = element._dataType[0];
      opcional.innerHTML = element._optional;
      //

      var select = document.createElement("select");
      select.id = `tipo_mapeo_select_${element._id}`;
      select.name = `tipo_mapeo_select`;
      select.dataset.ordinal = element._ordinal;
      select.dataset.parid = element._id;
      select.style.border = "transparent";
      select.setAttribute("onChange", `cargar_metricas_procesos(this);`);
      var optionSeleccione = document.createElement("option");
      optionSeleccione.value = "-6";
      optionSeleccione.innerHTML = "Seleccione..";
      select.appendChild(optionSeleccione);
      var selectMetricas = document.createElement("select");
      selectMetricas.style.border = "transparent";
      selectMetricas.dataset.ordinal = element._ordinal;
      selectMetricas.dataset.parid = element._id;
      selectMetricas.id = `tipo_argumento_select_${element._id}`;
      selectMetricas.name = "metrica_select";
      selectMetricas.appendChild(optionSeleccione.cloneNode(true));
      argumentoEntrada.appendChild(selectMetricas);
      tipoMapeo.appendChild(select);
      selectMetricas.setAttribute(
        "onChange",
        `cargar_metricas_procesos(this);`
      );
      tbody.appendChild(tr);
      var selectProceso = document.createElement("select");
      selectProceso.name = `proceso_seleccion`;
      selectProceso.id = `proceso_seleccion_${element._id}`;
      selectProceso.dataset.parid = element._id;
      selectProceso.style.border = "transparent";
      var optionSeleccion = document.createElement("option");
      optionSeleccion.value = "-6";
      optionSeleccion.innerHTML = "Seleccione..";
      selectProceso.appendChild(optionSeleccion);
      proceso.appendChild(selectProceso);
    }
  });
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    {
      tipo: "TIPO_METRICA",
    },
    cargar_select_mapeo_tipo,
    (err) => {
      alert(err);
    }
  );
}

function cargar_select_mapeo_tipo(json) {
  var select = document.getElementsByName("tipo_mapeo_select");
  Array.from(select).forEach((element) => {
    json.forEach((ele) => {
      var option = document.createElement("option");
      option.value = ele.id;
      option.innerHTML = ele.nombre;
      element.appendChild(option);
    });
  });
}

function llenar_procesos_mapeo(json) {
  console.log(json);
  var select_process_id = `proceso_seleccion_${idGeneral}`;
  var select = document.getElementById(select_process_id);
  select.innerHTML = "";
  var optionSeleccion = document.createElement("option");
  optionSeleccion.value = "-6";
  optionSeleccion.innerHTML = "SELECCIONE..";
  select.appendChild(optionSeleccion);
  json.forEach((ele) => {
    var nombreF = ele.nombre + "-" + ele.descripcion;
    var option = document.createElement("option");
    option.value = ele.id;
    option.innerHTML = nombreF;
    select.appendChild(option);
  });
}
function cargar_metricas_procesos(elemento) {
  var selectProceso = document.getElementById(
    `proceso_seleccion_${elemento.dataset.parid}`
  );
  var selectTipo = document.getElementById(
    `tipo_mapeo_select_${elemento.dataset.parid}`
  );
  var selectMetricas = document.getElementById(
    `tipo_argumento_select_${elemento.dataset.parid}`
  );
  if (elemento.name == "metrica_select") {
    data = {
      aspectoId: document.getElementById("Aspectos_autoconsciencia").value,
      metricaId: elemento.value,
    };
    post_api(
      SERVER_PATH + "/api/ask_input_arguments",
      data,
      llenar_procesos_mapeo,
      (err) => {
        alert(err);
      }
    );
    OrdinalGeneral = elemento.dataset.ordinal;
    idGeneral = elemento.dataset.parid;
  } else {
    OrdinalGeneral = elemento.dataset.ordinal;
    idGeneral = elemento.dataset.parid;
    data = {
      tipo_metrica: elemento.value,
      aspectoId: document.getElementById("Aspectos_autoconsciencia").value,
    };
    post_api(
      SERVER_PATH + "/api/ask_input_arguments",
      data,
      cargar_select_argumento_entrada,
      (err) => {
        alert(err);
      }
    );
  }
}
var OrdinalGeneral = undefined;
var idGeneral = undefined;

function cargar_select_argumento_entrada(json) {
  var select = document.getElementById(`tipo_argumento_select_${idGeneral}`);
  select.innerHTML = "<option value='-6'>Seleccione</option>";
  json.forEach((ele) => {
    var option = document.createElement("option");
    option.value = ele.id;
    option.innerHTML = ele.nombre;
    select.appendChild(option);
  });
}

function agregarAccionesUmbrales() {
  $("#modal_agregar_accion_proceso").modal("show");
  $("#modal_activos_procesos").modal("hide");
  document.getElementById("descripcion_accion_umbral").value = "";
}
function cargar_accion_table(json) {
  var templeate = document
    .getElementById("templeate_tabla_accion")
    .content.cloneNode(true);
  var seccion = document.getElementById("seccion_acciones");
  var body = templeate.querySelector("tbody");
  json.acciones.forEach((um) => {
    var fila = document.createElement("tr");
    var dato = document.createElement("td");
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "accion_seleccionada";
    input.dataset.id = um.id;
    input.dataset.nombre = um.name;
    input.dataset.description = um.description;
    input.dataset.activo = um.active;
    input.dataset.id_umbra = json.umbral_id;
    dato.appendChild(input);
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.id;
    fila.appendChild(dato);
    dato = document.createElement("td");
    //dato.innerHTML = um.name;
    //fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.description;
    fila.appendChild(dato);
    input = document.createElement("input");
    input.type = "checkbox";
    input.disabled = true;
    input.checked = um.active == 1;
    dato = document.createElement("td");
    dato.appendChild(input);
    fila.appendChild(dato);
    body.appendChild(fila);
  });
  body.id += "_" + json.umbral_id;
  var tabla = templeate.querySelector(".table");
  tabla.id = "umbral_" + json.umbral_id;
  tabla.style.display = "none";
  seccion.appendChild(templeate);
}
/*function cargar_accion_table(json) {
	  console.log(json);
	  res = "";
	  json.forEach((as) => {
	    res += "<tr>";
	    res += `<td><input type="radio" name="accion_seleccionada" value="${
	      as.id
	    }" data-name="${as.nombre}" data-descripcion="${
	      as.descripcion
	    }" data-activo="${as.activo == "true"}"></td>`;
	    res += `<td>${as.id}</td>`;
	    res += `<td>${as.nombre}</td>`;
	    res += `<td>${as.descripcion}</td>`;
	    if (as.activo == "true")
	      res += `<td><input type="checkbox" disabled checked></td>`;
	    else res += `<td><input type="checkbox" disabled></td>`;
	    res += "</tr>";
	  });
	  document.getElementById("tabla_accion").innerHTML = res;
	}*/

function error_cargar_accion_table(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

function SeleccionaRecursoSelect(element) {
  document.getElementById("recurso").disabled = false;

  if (element.value) {
    post_api(
      SERVER_PATH + "/api/ask_deployment_resources_select/",
      {
        tipo: element.value,
      },
      cargar_select_recurso_proceso,
      (json) => {
        console.log(json);
      }
    );
  }
}

function cargar_select_recurso_proceso(json) {
  var ope = document.createElement("select");
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione ..";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
  document.getElementById("recurso").innerHTML = ope.innerHTML;
}

function guardar_procesos_pre_reflexivos() {
  var nombre = document.getElementById("nombre_proceso_pre_reflexivo").value;
  var descripcion = document.getElementById(
    "input-descripcion-proceso-pre-reflexivo"
  ).value;
  var inicioP = document.getElementById("inicio_del_periodo").value;
  var finP = document.getElementById("fin_del_periodo").value;
  var sujetoId = SujetoGuardarProceso;
  var aspId = document.getElementById("Aspectos_autoconsciencia").value;
  var unidad_tiempo = document.getElementById("unidad_tiempo").value;
  var intervalo_ejecucion = document.getElementById(
    "intervalo_ejecucion"
  ).value;
  var hora_ejecucion = document.getElementById("hora_ejecucion").value;
  var tipo_ejecucion = document.getElementById("tipo_ejecucion").value;
  if (!!descripcion && aspId != "-6") {
    data = {
      nombre: nombre,
      descripcion: descripcion,
      inicioP: inicioP,
      finP: finP,
      aspId: aspId,
      sujId: sujetoId,
      active: 1,
      paTipo: "17",
      unidadT: unidad_tiempo,
      intervaloE: intervalo_ejecucion,
      horaE: hora_ejecucion,
      tipoE: tipo_ejecucion,
    };
    post_api(
      SERVER_PATH + "/api/add_pre_reflective_process",
      data,
      procesos_pre_reflexivos_guardados_exito,
      (res) => {
        console.log(res);
      }
    );
    document.getElementById(
      "input-descripcion-proceso-pre-reflexivo"
    ).disabled = true;
    document.getElementById("inicio_del_periodo").disabled = true;
    document.getElementById("fin_del_periodo").disabled = true;
    document.getElementById("sujetos_activos_proceso").disabled = true;
    document.getElementById("CategoriaEntidadesProcesos").disabled = true;
    document.getElementById(
      "entidades_seleccionados_area_procesos"
    ).disabled = true;
    document.getElementById("Aspectos_autoconsciencia").disabled = true;
    var checkSujetos = document.getElementsByName("checkbox_sujetos_procesos");
    var checkObjetos = document.getElementsByName(
      "checkbox_entidades_procesos"
    );
    Array.from(checkSujetos).forEach((element) => {
      element.disabled = true;
    });
    Array.from(checkObjetos).forEach((element) => {
      element.disabled = true;
    });

    document
      .getElementById("modal_metodo_add")
      .classList.replace("d-none", "d-block");
    get_propiedades_procesos(aspId);
    return true;
  } else {
    return false;
  }
}
function get_propiedades_procesos(id) {
  post_api(
    SERVER_PATH + "/api/get_properties",
    {
      aspectoID: id,
    },
    cargar_propiedades_select,
    error_cargar_propiedades_select
  );
}
function procesos_pre_reflexivos_guardados_exito(json) {
  document.getElementById("id_proceso_pre_reflexivo").value = json.insertId;
  document.getElementById("nombre_proceso_pre_reflexivo").value =
    "PID" + json.insertId;
}
function procesos_reflexivos_guardados_exito(json) {
  document.getElementById("id_proceso_reflexivo").value = json.insertId;
  document.getElementById("nombre_proceso_reflexivo_id").value =
    "PID" + json.insertId;
}

function guardar_modelos_metodos() {
  var mr_tipo = document.getElementById("tipo_comunicacion").value;
  var pro_id = document.getElementById("proiedad_recoleccion").value;
  var met_id = document.getElementById("metrica_directa").value;
  var ma_tipo = document.getElementById("tipo_recurso").value;
  var criterio_id = document.getElementById("criterio_de_decision").value;
  var proceso_id = document.getElementById("id_proceso_pre_reflexivo").value;
  var indicador_id = document.getElementById("indicador_modelo").value;
  var flujo_id = document.getElementById("flujo_de_datos").value;
  var obj_id = $(
    "option:selected",
    document.getElementById("proiedad_recoleccion")
  ).attr("data-obj");
  if (
    mr_tipo != "-6" &&
    ma_tipo != "-6" &&
    criterio_id != "-6" &&
    !!proceso_id &&
    met_id != "-6" &&
    flujo_id != "-6" &&
    indicador_id != "-6"
  ) {
    var datos = {
      proceso_id: proceso_id,
      m_recoleccion: {
        mr_tipo: mr_tipo,
        pro_id: pro_id == "-6" ? undefined : pro_id,
        met_id: met_id == "-6" ? undefined : met_id,
        flu_id: flujo_id,
        obj_id: obj_id,
      },
      m_modelo: {
        ma_tipo: ma_tipo,
        criterio_id: criterio_id,
        met_id: indicador_id,
      },
    };
    post_api(
      SERVER_PATH + "/api/add_metodo_modelo",
      datos,
      mensajeCorrectoGuardarMetodos,
      errormensajeCorrectoGuardarMetodos
    );

    /*var metodo = document.getElementById("nav-recoleccion-tab");
	    var modelo = document.getElementById("nav-modelo-tab");
	    modelo.classList.remove("active");
	    metodo.classList.add("active");
	    modelo.setAttribute("aria-selected", "false");
	    metodo.setAttribute("aria-selected", "true");
	    var metodo_ventana = document.getElementById("nav-recoleccion");
	    var modelo_ventana = document.getElementById("nav-modelo");
	    metodo_ventana.classList.add("active");
	    metodo_ventana.classList.add("show");
	    modelo_ventana.classList.remove("active");
	    modelo_ventana.classList.remove("show");*/
    return true;
  } else {
    return false;
  }
}
var modelo_analisis_pre_reflexivos = undefined;
var metodo_recoleccion = undefined;
function mensajeCorrectoGuardarMetodos(json) {
  modelo_analisis_pre_reflexivos = json[1];
  metodo_recoleccion = json[0];
  document.getElementById("tipo_comunicacion").disabled = true;
  document.getElementById("proiedad_recoleccion").disabled = true;
  document.getElementById("flujo_de_datos").disabled = true;
  document.getElementById("metrica_directa").disabled = true;
  document.getElementById("tipo_recurso").disabled = true;
  document.getElementById("indicador_modelo").disabled = true;
  document.getElementById("criterio_de_decision").disabled = true;
  document.getElementById("id_proceso_pre_reflexivo").disabled = true;
  document.getElementById("mapeo_parametros_btn").disabled = false;
  document.getElementById("btn-recomendaciones_model").disabled = false;
  document.getElementById("recurso").disabled = true;
  document.getElementById("id_metodo_aprendizaje_directo").value =
    json.join("-");
}

function errormensajeCorrectoGuardarMetodos(error) {
  console.log(error);
}

if (document.getElementById("tabla_proceso_pre_reflexivo"))
  consultar_api(
    SERVER_PATH + "/api/get_pre_reflective_process",
    cargar_procesos_pre_reflexivos_table,
    error_procesos_pre_reflexivos_table
  );

function cargar_procesos_pre_reflexivos_table(json) {
  res = "";
  json.forEach((pro) => {
    res += "<tr>";
    res += `<td><input type="radio" form="modificar_proceso_form" name="proceso_seleccionado" value="${
      pro.id
    }" data-name="${pro.nombre}" data-sujeto="${pro.sujeto}" data-sujeto_id="${
      pro.sujeto_id
    }" data-aspecto="${pro.aspecto}" data-aspecto_id="${
      pro.aspecto_id
    }" data-inicio="${pro.inicio}" data-fin="${pro.fin}" data-activo="${
      pro.activo == "true"
    }"></td>`;
    res += `<td>${pro.nombre}</td>`;
    res += `<td>${pro.descripcion}</td>`;
    res += `<td>${pro.sujeto}</td>`;
    res += `<td>${pro.aspecto}</td>`;
    res += `<td>${pro.inicio}</td>`;
    res += `<td>${pro.fin}</td>`;
    if (pro.activo == 1)
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_proceso_pre_reflexivo").innerHTML = res;
}

function error_procesos_pre_reflexivos_table(error) {
  console.log(error);
}

function cancelar_mapeo_parametros() {
  $("#modal_mapeo_parametros").modal("hide");
}

if (document.getElementById("id_proceso_pre_reflexivo_modificar")) {
  modificarProcesoPreReflexivo();
}

function modificarProcesoPreReflexivo() {
  var radio = document.getElementsByName("proceso_seleccionado");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!!id) {
    post_api(
      SERVER_PATH + "/api/get_pre_reflective_process_mod/",
      {
        id: id,
      },
      cargar_modificar_procesos_pre,
      mensaje_error_cargar_modificar_procesos_pre
    );
  }
}

function cargar_modificar_procesos_pre(json) {}

function mensaje_error_cargar_modificar_procesos_pre(error) {
  alert(error);
}

function elminarProcesoPreReflexivo() {
  var radio = document.getElementsByName("proceso_seleccionado");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro de que desea eliminar el Proceso")) {
      post_api(
        SERVER_PATH + "/api/del_pre_reflective_process/",
        { id: id },
        mensaje_exitosBorrar_pre_reflexivo,
        mensaje_errorBorrar_pre_reflexivo
      );
    }
  } else alert("Debe seleccionar un proceso para eliminar");
}

function mensaje_exitosBorrar_pre_reflexivo(json) {
  consultar_api(
    SERVER_PATH + "/api/get_pre_reflective_process",
    cargar_procesos_pre_reflexivos_table,
    error_procesos_pre_reflexivos_table
  );
  //setTimeout(cargar_procesos_pre_reflexivos_table, 200);
}

function mensaje_errorBorrar_pre_reflexivo(error) {
  alert(err);
}

function mensaje_errorEnvioproceso_pre_reflexivo(error) {
  console.log(error);
}

function Guagar_nuevo_Mapeo() {
  var nombreP = document.getElementsByName("tr_fila_parametros");
  var aux = [];
  var mea_id_rec = document
    .getElementById("id_metodo_aprendizaje_directo")
    .value.split("-");
  Array.from(nombreP).forEach((element) => {
    var aux2 = {
      nombre: element.querySelector("td#nombre_fila_parametros").innerHTML,
      par_ordinal: element.querySelector("td#id_fila_parametros").innerHTML,
      mp_tipo_entrada: element.querySelector("td#tipo_dato_fila_parametros")
        .dataset.id,
      opcional: element.querySelector("td#opcional_fila_parametros").innerHTML,
      tipoMapeo: element.querySelector("td#tipo_mapeo_fila_parametros select")
        .value,
      proceso: element.querySelector("td#proceso_seleccion_mapeo select").value,
      met_id: element.querySelector(
        "td#argumento_entrada_fila_parametros select"
      ).value,
      mea_id: mea_id_rec[1],
    };
    element.querySelector(
      "td#tipo_mapeo_fila_parametros select"
    ).disabled = true;
    element.querySelector(
      "td#argumento_entrada_fila_parametros select"
    ).disabled = true;
    element.querySelector("td#proceso_seleccion_mapeo select").disabled = true;
    aux.push(aux2);
  });

  post_api(
    SERVER_PATH + "/api/add_mapeo_parametros/",
    aux,
    mensaje_correcto_envio_mapeo,
    mensaje_error_envio_mapeo
  );
}

function mensaje_correcto_envio_mapeo(json) {
  mapeoGuardardado = true;
  $("#modal_mapeo_parametros").modal("hide");
  mapeoPreReflexivos = true;
}

function mensaje_error_envio_mapeo(error) {
  alert("error mapeo" + error);
}

if (document.getElementById("pagina_proceso_reflexivo")) {
  agregarProcesoReflexivo();
}

function agregarProcesoReflexivo() {
  Abrir_limpiar_modal_proceso_reflexivo();
}

function Abrir_limpiar_modal_proceso_reflexivo() {
  document.getElementById("descripcion_proceso_reflexivo").value = "";
  document.getElementById("inicio_del_periodo_reflexivo").value = "";
  document.getElementById("fin_del_periodo_reflexivo").value = "";
  document.getElementById(
    "CategoriaEntidadesProcesos_reflexivos"
  ).selectedIndex = "0";
  document.getElementById("Aspectos_autoconsciencia_reflexivos").selectedIndex =
    "0";
  document.getElementById(
    "Aspectos_tipo_autoconsciencia_reflexivos"
  ).selectedIndex = "0";
  document.getElementById("inicio_metodos_reflexivos").value = "";
  document.getElementById("fin_metodos_reflexivos").value = "";
  document.getElementById("tipo_recurso_metodos_reflexivo").selectedIndex = "0";
  document.getElementById("recurso_reflexivos").selectedIndex = "0";
  document.getElementById("metrica_indirecta_reflexivos").selectedIndex = "0";
  document.getElementById("tipo_recurso_modelos_reflexivos").selectedIndex =
    "0";
  document.getElementById("descripcion_proceso_reflexivo").disabled = false;
  document.getElementById("inicio_del_periodo_reflexivo").disabled = false;
  document.getElementById("fin_del_periodo_reflexivo").disabled = false;
  document.getElementById(
    "sujetos_activos_proceso_reflexivos"
  ).disabled = false;
  document.getElementById(
    "CategoriaEntidadesProcesos_reflexivos"
  ).disabled = true;
  document.getElementById(
    "Aspectos_autoconsciencia_reflexivos"
  ).disabled = true;
  document.getElementById(
    "Aspectos_tipo_autoconsciencia_reflexivos"
  ).disabled = true;
  document.getElementById("recurso_reflexivos").disabled = true;
  document.getElementById("mapeo_parametros_btn_metodos").disabled = true;
  document.getElementById("escenario_simulacion").disabled = true;
  document.getElementById("recurso_modelos_reflexivos").disabled = true;
  document.getElementById("mapeo_parametros_modelo").disabled = true;
}
if (document.getElementById("lista_sujetos_activos_proceso_reflexivo")) {
  consultar_api(
    SERVER_PATH + "/api/subjects",
    cargar_sujetos_activos_procesos_reflexivos,
    error_cargar_sujetos_activos_procesos_reflexivos
  );
}

function seleccionar_tipo_reflexivo(select) {
  var tipo = select.value;
  var list = document.getElementsByClassName("display_type");
  if (tipo != "53") {
    console.log("Esta entrando en Colectivos");
    Array.from(list).forEach((elem) => {
      elem.classList.add("d-none");
    });
  } else {
    console.log("Esta entrando en Individuales");
    Array.from(list).forEach((elem) => {
      elem.classList.remove("d-none");
    });
  }
  cargar_aspectos_procesos_reflexivos(sujetoGuardarproceso_reflexivo, tipo);
}

function cargar_sujetos_activos_procesos_reflexivos(json) {
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.father && elemento.active == 1) {
      aux_visible_activo.add(elemento.father);
    } else if (!!elemento.father && elemento.active == 0) {
      aux_visible_inactivo.add(elemento.father);
    }
  });
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.father) {
      insertar = document.getElementById(
        "lista_sujetos_activos_proceso_reflexivo"
      );
    } else {
      insertar = document.createElement("ul");
      document
        .getElementById(`li_entidad_seleccionado_${elemento.father}`)
        .appendChild(insertar);
    }
    li = document.createElement("li");
    li.id = `li_entidad_seleccionado_${elemento.id}`;
    if (elemento.active == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `sujeto_seleccionado_${elemento.id}`;
    checkbox.name = "checkbox_sujetos_procesos_reflexivos";
    checkbox.dataset.padre_id = elemento.father;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.name;
    checkbox.setAttribute(
      "onclick",
      "verificarSeleccionProceso_reflexivo(this);"
    );
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.name;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function error_cargar_sujetos_activos_procesos_reflexivos(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}
var sujetoGuardarproceso_reflexivo = undefined;

function verificarSeleccionProceso_reflexivo(elemento) {
  var checkbox = document.getElementsByName(
    "checkbox_sujetos_procesos_reflexivos"
  );
  var auxChecked = elemento.checked;
  sujetoGuardarproceso_reflexivo = elemento.dataset.puro_id;
  Array.from(checkbox).forEach((element) => {
    element.checked = false;
    document.getElementById(
      "CategoriaEntidadesProcesos_reflexivos"
    ).disabled = true;
  });
  elemento.checked = auxChecked;
  var seleccion = document.getElementById(
    "Aspectos_autoconsciencia_reflexivos"
  );
  seleccion.disabled = false;
  var seleccion_tipo = document.getElementById(
    "Aspectos_tipo_autoconsciencia_reflexivos"
  );
  seleccion_tipo.disabled = false;
}

function cargar_aspectos_procesos_reflexivos(IdSujeto, tipo) {
  var limpiar = document.getElementById(
    "lista_entidades_seleccionadas_procesos_reflexivos"
  );
  limpiar.innerHTML = "";
  if (IdSujeto) {
    data = {
      systemID: IdSujeto,
      types: tipo,
    };
    post_api(
      SERVER_PATH + "/api/get_aspects_objects_process",
      data,
      cargar_posibles_entidades_proceso_reflexivo,
      (res) => {
        console.log(res);
      }
    );
  }
}

function cargar_posibles_entidades_proceso_reflexivo(json) {
  var select = document.getElementById("Aspectos_autoconsciencia_reflexivos");
  select.innerHTML = "";
  var opt = document.createElement("option");
  opt.value = -6;
  opt.innerHTML = "Seleccione ..";
  select.appendChild(opt);
  json.forEach((asp) => {
    var opt = document.createElement("option");
    opt.value = asp.idAspecto;
    opt.innerHTML = asp.nombreAspecto;
    select.appendChild(opt);
  });

  if (json.length > 0) {
    select.disabled = false;
  } else {
    select.disabled = true;
  }
}

function cargar_objetivos_sujetos_select_reflexivos(json) {
  var option = document.createElement("option");
  option.value = "-6";
  option.innerHTML = "Seleccione..";
  ope.innerHTML = "";
  ope.appendChild(option);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_objetivos_sujetos_select_reflexivos(error) {
  console.log(error);
}
$("#CategoriaEntidadesProcesos_reflexivos").change(function () {
  var limpiar2 = document.getElementById(
    "lista_entidades_seleccionadas_procesos_reflexivos"
  );
  limpiar2.innerHTML = "";
  var seleccion = document.getElementById(
    "CategoriaEntidadesProcesos_reflexivos"
  );
  var tipo_valor = seleccion.options[seleccion.selectedIndex].text;
  data = {
    categoria: tipo_valor,
    aspecto: document.getElementById("Aspectos_autoconsciencia_reflexivos")
      .value,
    sujeto: sujetoGuardarproceso_reflexivo,
  };
  if (data.categoria != -6 && data.aspeco != -6 && !!data.sujeto) {
    post_api(
      SERVER_PATH + "/api/get_objects_aspects",
      data,
      cargar_objetos_proceso_reflexivo,
      (res) => {
        console.log("ERROROS");
      }
    );
  }
});
function cargar_objetos_proceso_reflexivo(json) {
  var ul = document.getElementById(
    "lista_entidades_seleccionadas_procesos_reflexivos"
  );
  ul.innerHTML = "";
  var op = document.createElement("option");
  var seleccion = json[0].tipo;
  if (seleccion == "PhysicalEntity") {
    op.innerHTML = "Entidades Físicas";
  } else if (seleccion == "CloudNode") {
    op.innerHTML = "Nodos Cloud";
  } else if (seleccion == "FogNode") {
    op.innerHTML = "Nodos Fog";
  } else if (seleccion == "IoTGateway") {
    op.innerHTML = "Gateway IoT";
  } else if (seleccion == "Sensor") {
    op.innerHTML = "Sensores";
  } else if (seleccion == "Tag") {
    op.innerHTML = "Tags";
  } else if (seleccion == "Actuator") {
    op.innerHTML = "Actuadores";
  } else if (seleccion == "Network") {
    op.innerHTML = "Red";
  }
  var sel = document.getElementById("CategoriaEntidadesProcesos_reflexivos");
  sel.innerHTML = "";
  sel.appendChild(op);

  json.forEach((element) => {
    var li = document.createElement("li");
    li.innerHTML = element.nombre;
    ul.appendChild(li);
  });
}

function cargar_posibles_entidades_modelo_proceso_reflexivo(json) {
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.padre && elemento.activo == 1) {
      aux_visible_activo.add(elemento.padre);
    } else if (!!elemento.padre && elemento.activo == 0) {
      aux_visible_inactivo.add(elemento.padre);
    }
  });
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.padre) {
      insertar = document.getElementById(
        "lista_entidades_seleccionadas_procesos_reflexivos"
      );
    } else {
      insertar = document.createElement("ul");
      var insertarAux = document.getElementById(
        `li_ent_seleccionado_${elemento.padre}`
      );
      if (insertarAux) {
        insertarAux.appendChild(insertar);
      }
    }
    li = document.createElement("li");
    li.id = `li_ent_seleccionado_${elemento.id}`;
    if (elemento.activo == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_entidad_de_${elemento.padre}_seleccionado`,
      "checkbox_seleccionado_entidad"
    );
    checkbox.id = `sujeto_seleccionado_procesos_${elemento.id}`;
    checkbox.name = "checkbox_entidades_procesos_reflexivos";
    checkbox.dataset.padre_id = elemento.padre;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.nombre;
    checkbox.setAttribute(
      "onclick",
      "cargar_aspectos_reflexivos(this,'seleccionado');"
    );
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.nombre;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function error_cargar_posibles_entidades_modelo_proceso_reflexivo(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}
var obj_Id_reflexivos = undefined;

function cargar_aspectos_reflexivos(elemento, lado) {
  document.getElementById(
    "Aspectos_tipo_autoconsciencia_reflexivos"
  ).disabled = false;
  document.getElementById(
    "Aspectos_autoconsciencia_reflexivos"
  ).disabled = false;
  document.getElementById(
    "Aspectos_tipo_autoconsciencia_reflexivos"
  ).disabled = false;
  var checkbox = document.getElementsByName(
    "checkbox_entidades_procesos_reflexivos"
  );
  var auxChecked = elemento.checked;
  obj_Id_reflexivos = elemento.dataset.puro_id;
  Array.from(checkbox).forEach((element) => {
    element.checked = false;
  });
  elemento.checked = auxChecked;
  var idObjeto = elemento.dataset.puro_id;
  var data = {
    id: idObjeto,
  };
  post_api(
    SERVER_PATH + "/api/aspects",
    data,
    cargar_aspectos_select_reflexivos,
    error_cargar_aspectos_select_reflexivos
  );
}

function cargar_aspectos_select_reflexivos(json) {
  res = `<option value="-6">Seleccione..</option>`;

  json.forEach((as) => {
    res += `<option value='${as.id}'>${as.nombre}</option>`;
  });
  document.getElementById("Aspectos_autoconsciencia_reflexivos").innerHTML =
    res;
}

function error_cargar_aspectos_select_reflexivos(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

function guardar_procesos_reflexivos() {
  var nombre = document.getElementById("nombre_proceso_reflexivo_id").value;
  var descripcion = document.getElementById(
    "descripcion_proceso_reflexivo"
  ).value;
  var inicioP = document.getElementById("inicio_del_periodo_reflexivo").value;
  var finP = document.getElementById("fin_del_periodo_reflexivo").value;
  var sujetoId = sujetoGuardarproceso_reflexivo;
  var aspId = document.getElementById(
    "Aspectos_autoconsciencia_reflexivos"
  ).value;
  var unidad_tiempo = document.getElementById("unidad_tiempo_ref").value;
  var intervalo_ejecucion = document.getElementById(
    "intervalo_ejecucion_ref"
  ).value;
  var hora_ejecucion = document.getElementById("hora_ejecucion_ref").value;
  var tipo_ejecucion = document.getElementById("tipo_ejecucion_ref").value;
  if (!!descripcion && !!sujetoId && aspId != "-6") {
    data = {
      nombre: nombre,
      descripcion: descripcion,
      inicioP: inicioP,
      finP: finP,
      aspId: aspId,
      sujId: sujetoId,
      unidadT: unidad_tiempo,
      intervaloE: intervalo_ejecucion,
      horaE: hora_ejecucion,
      tipoE: tipo_ejecucion,
    };
    post_api(
      SERVER_PATH + "/api/add_reflective_process/",
      data,
      procesos_reflexivos_guardados_exito,
      (res) => {
        console.log(res);
      }
    );
    document.getElementById("descripcion_proceso_reflexivo").disabled = true;
    document.getElementById("inicio_del_periodo_reflexivo").disabled = true;
    document.getElementById("fin_del_periodo_reflexivo").disabled = true;
    document.getElementById(
      "lista_sujetos_activos_proceso_reflexivo"
    ).disabled = true;
    document.getElementById(
      "CategoriaEntidadesProcesos_reflexivos"
    ).disabled = true;
    document.getElementById(
      "lista_entidades_seleccionadas_procesos_reflexivos"
    ).disabled = true;
    document.getElementById(
      "Aspectos_autoconsciencia_reflexivos"
    ).disabled = true;
    document.getElementById(
      "Aspectos_tipo_autoconsciencia_reflexivos"
    ).disabled = true;

    var checkSujetos = document.getElementsByName(
      "checkbox_entidades_procesos_reflexivos"
    );
    var checkObjetos = document.getElementsByName(
      "checkbox_sujetos_procesos_reflexivos"
    );
    Array.from(checkSujetos).forEach((element) => {
      element.disabled = true;
    });
    Array.from(checkObjetos).forEach((element) => {
      element.disabled = true;
    });
    document
      .getElementById("modal_metodo_reflexivos_add")
      .classList.replace("d-none", "d-block");
    return true;
  } else {
    return false;
  }
}
function cargar_tabla_procesos_reflexivos() {
  consultar_api(
    SERVER_PATH + "/api/get_reflective_process",
    cargar_procesos_reflexivos_table,
    error_procesos_reflexivos_table
  );
}
if (document.getElementById("tabla_proceso_reflexivo")) {
  cargar_tabla_procesos_reflexivos();
}

function cargar_procesos_reflexivos_table(json) {
  res = "";
  json.forEach((pro) => {
    res += "<tr>";
    res += `<td><input type="radio" form="modificar_proceso_reflexivo_form" name="proceso_reflexivo_seleccionado" value="${
      pro.id
    }" data-name="${pro.nombre}" data-sujeto="${pro.sujeto}" data-aspecto="${
      pro.aspecto
    }" data-inicio="${pro.inicio}" data-fin="${pro.fin}" data-activo="${
      pro.activo == "true"
    }"></td>`;
    res += `<td>${pro.nombre}</td>`;
    res += `<td>${pro.descripcion}</td>`;
    res += `<td>${pro.sujeto}</td>`;
    res += `<td>${pro.aspecto}</td>`;
    res += `<td>${pro.inicio}</td>`;
    res += `<td>${pro.fin}</td>`;
    if (pro.activo == 1)
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_proceso_reflexivo").innerHTML = res;
}

function error_procesos_reflexivos_table(error) {
  console.log(error);
}

function guardar_informacion_boton(id) {
  var guardar = $("#guardar_informacion_general");
  var navegador = $("#navegador_metodos_modelos");
  if (id == "navegador_metodos_modelos") {
    navegador.collapse("show");
    guardar.collapse("hide");
  } else {
    guardar.collapse("show");
    navegador.collapse("hide");
  }
}
cont_paso = 1;
var mapeoPreReflexivos = undefined;
var recomendacionesPreReflexivos = undefined;

function guardar_proceso_pre_reflexivo_boton() {
  if (cont_paso == 1) {
    if (guardar_procesos_pre_reflexivos()) {
      alert(
        "Acciones siguientes:\n\n1)Configurar método de recolección.\n2)Configurar modelo de análisis."
      );
      document
        .getElementById("informacion_general_btn")
        .classList.replace("btn-secondary", "btn-link");
      var btn = document.getElementById("btn-section-2");
      btn.classList.replace("d-none", "d-inline");
      document.getElementById(
        "btn-guardar"
      ).innerHTML = `Guardar (Métodos de aprendizaje y razonamiento)`;
      $("#guardar_informacion_general.collapse").collapse("hide");
      $("#navegador_metodos_modelos.collapse").collapse("show");
      cont_paso++;
    } else {
      alert("No se ha podido guardar, verifique todos los campos");
    }
  } else if (cont_paso == 2) {
    if (guardar_modelos_metodos()) {
      alert(
        "Acciones siguientes:\n\n1)Mapear parámetros del recurso de implementación del modelo de análisis.\n2)Ingresar recomendaciones prescriptivas del modelo análisis."
      );
      document
        .getElementById("metodos_modelos_btn")
        .classList.replace("btn-secondary", "btn-link");
      var btn = document.getElementById("btn-section-3");
      btn.classList.replace("d-none", "d-inline");
      document.getElementById(
        "btn-guardar"
      ).innerHTML = `Terminar ingreso de proceso de autoconsciencia`;
      cont_paso++;
    } else {
      alert("No se ha podido guardar, verifique todos los campos");
    }
  } else if (cont_paso == 3) {
    console.log(mapeoPreReflexivos);
    console.log(recomendacionesPreReflexivos);
    if (mapeoPreReflexivos && recomendacionesPreReflexivos) {
      consultar_api(
        SERVER_PATH + "/api/get_pre_reflective_process",
        cargar_procesos_pre_reflexivos_table,
        error_procesos_pre_reflexivos_table
      );
      history.back();
    } else {
      var opcion = confirm(
        "La información del proceso de autoconsciencia esta incompleto. \nFalta ingresar el mapeo de parámetros o las recomendaciones prescriptivas\nDesea salir de igual manera?"
      );

      if (opcion != true) {
      } else {
        consultar_api(
          SERVER_PATH + "/api/get_pre_reflective_process",
          cargar_procesos_pre_reflexivos_table,
          error_procesos_pre_reflexivos_table
        );
        history.back();
      }
    }
  }
}

function guardar_informacion_reflexivos_boton(id) {
  var guardar = $("#guardar_informacion_general_reflexivos");
  var navegador = $("#navegador_metodos_modelos_reflexivos");
  if (id == "navegador_metodos_modelos_reflexivos") {
    navegador.collapse("show");
    guardar.collapse("hide");
  } else {
    guardar.collapse("show");
    navegador.collapse("hide");
  }
}
cont_paso_reflexivos = 1;
var mapeoReflexivo1 = undefined;
var mapoeoReflexivo2 = undefined;
var recomendacionesReflexivo = undefined;
function guardar_proceso_reflexivo_boton() {
  if (cont_paso_reflexivos == 1) {
    if (guardar_procesos_reflexivos()) {
      alert(
        "Acciones siguientes:\n\n1)Configurar método de cálculo.\n2)Configurar modelo de análisis."
      );
      document
        .getElementById("btn_informacion_general")
        .classList.replace("btn-secondary", "btn-link");
      var btn = document.getElementById("btn-section-reflexivos");
      btn.classList.replace("d-none", "d-inline");
      consultar_api(
        SERVER_PATH + "/api/decision_criteria",
        cargar_select_criterios_metodos_reflexivos,
        error_cargar_select_metodos_reflexivos
      );
      document.getElementById(
        "btn-guardar-reflexivos"
      ).innerHTML = `Guardar (Métodos de aprendizaje y razonamiento)`;
      $("#guardar_informacion_general_reflexivos.collapse").collapse("hide");
      $("#navegador_metodos_modelos_reflexivos.collapse").collapse("show");
      cont_paso_reflexivos++;
    } else {
      alert("No se ha podido guardar, verifique todos los campos");
    }
  } else if (cont_paso_reflexivos == 2) {
    if (guardar_modelos_metodos_reflexivos()) {
      alert(
        "Acciones siguientes:\n\n1)Mapear parámetros del recurso de implementación del método de cálculo y modelo de análisis.\n2)Ingresar recomendaciones prescriptivas del modelo análisis."
      );
      document
        .getElementById("btn_metodos_modelos")
        .classList.replace("btn-secondary", "btn-link");
      var btn = document.getElementById("btn-guardar-metodo");
      btn.classList.replace("d-none", "d-inline");
      document.getElementById(
        "btn-guardar-reflexivos"
      ).innerHTML = `Terminar ingreso de proceso de autoconsciencia`;
      cont_paso_reflexivos++;
    } else {
      alert("No se ha podido guardar, verifique todos los campos");
    }
  } else if (cont_paso_reflexivos == 3) {
    if (mapeoReflexivo1 && mapoeoReflexivo2 && recomendacionesReflexivo) {
      cargar_tabla_procesos_reflexivos();
      history.back();
    } else {
      var opcion = confirm(
        "La información del proceso de autoconsciencia esta incompleto. \nFalta ingresar el mapeo de parámetros o las recomendaciones prescriptivas\n Desea salir de igual manera?"
      );
      if (opcion) {
        cargar_tabla_procesos_reflexivos();
        history.back();
      } else {
      }
    }
  }
}

function guardar_modelos_metodos_reflexivos() {
  var tipo_recurso_metodo = document.getElementById(
    "tipo_recurso_metodos_reflexivo"
  ).value;
  var inicio_periodo = document.getElementById(
    "inicio_metodos_reflexivos"
  ).value;
  var fin_periodo = document.getElementById("fin_metodos_reflexivos").value;
  var unidad_t = document.getElementById("unidad_tiempo_ref2").value;
  var intervalo = document.getElementById("intervalos_metodos_modelos").value;
  var criterioD = document.getElementById("criterio_de_decision_modelo").value;
  var metricaIndirecta = document.getElementById(
    "metrica_indirecta_reflexivos"
  ).value;
  var metricaIndicador = document.getElementById("indicador_modelo_pre").value;
  var tipo_recurso_modelos = document.getElementById(
    "tipo_recurso_modelos_reflexivos"
  ).value;
  var proceso_id = document.getElementById("id_proceso_reflexivo").value;
  if (
    tipo_recurso_metodo != "-6" &&
    criterioD != "-6" &&
    metricaIndirecta != "-6" &&
    metricaIndicador != "-6" &&
    tipo_recurso_modelos != "-6" &&
    !!proceso_id &&
    unidad_t != "-6"
  ) {
    var datos = {
      proceso_id: proceso_id,
      m_calculo: {
        inicio: inicio_periodo,
        fin: fin_periodo,
        unidad: unidad_t,
        intervalo: intervalo,
        ma_tipo: tipo_recurso_metodo,
        met_id: metricaIndirecta,
      },
      modelo: {
        ma_tipo: tipo_recurso_modelos,
        criterio_id: criterioD,
        met_id: metricaIndicador,
      },
    };
    post_api(
      SERVER_PATH + "/api/add_metodo_modelo2",
      datos,
      mensajeCorrectoGuardarMetodosReflexivos,
      errormensajeCorrectoGuardarMetodosReflexivos
    );
    var metodo = document.getElementById("nav-recoleccion-tab");
    var modelo = document.getElementById("nav-modelo-tab");
    modelo.classList.remove("active");
    metodo.classList.add("active");
    modelo.setAttribute("aria-selected", "false");
    metodo.setAttribute("aria-selected", "true");

    var metodo_ventana = document.getElementById("nav-recoleccion");
    var modelo_ventana = document.getElementById("nav-modelo");
    metodo_ventana.classList.add("active");
    metodo_ventana.classList.add("show");
    modelo_ventana.classList.remove("active");
    modelo_ventana.classList.remove("show");

    return true;
  } else {
    return false;
  }
}
var metodo_calculo = undefined;
var modelo_analisis_reflexivos = undefined;
function mensajeCorrectoGuardarMetodosReflexivos(json) {
  metodo_calculo = json[0];
  modelo_analisis_reflexivos = json[1];
  document.getElementById("inicio_metodos_reflexivos").disabled = true;
  document.getElementById("fin_metodos_reflexivos").disabled = true;
  document.getElementById("unidad_tiempo_ref2").disabled = true;
  document.getElementById("intervalos_metodos_modelos").disabled = true;
  document.getElementById("tipo_recurso_metodos_reflexivo").disabled = true;
  document.getElementById("recurso_reflexivos").disabled = true;
  document.getElementById("metrica_indirecta_reflexivos").disabled = true;
  document.getElementById("tipo_recurso_modelos_reflexivos").disabled = true;
  document.getElementById("recurso_modelos_reflexivos").disabled = true;
  document.getElementById("indicador_modelo_pre").disabled = true;
  document.getElementById("criterio_de_decision_modelo").disabled = true;
  document.getElementById("escenario_simulacion").disabled = false;
  document.getElementById("mapeo_parametros_btn_metodos").disabled = false;
  document.getElementById("mapeo_parametros_modelo").disabled = false;
  document.getElementById("btn-recomendaciones_model").disabled = false;
  document.getElementById("variables_simulacion").disabled = false;
  document.getElementById("id_metodo_aprendizaje_modelos").value =
    json.join("-");
}

function errormensajeCorrectoGuardarMetodosReflexivos(error) {
  console.log(error);
}

function cargar_select_criterios_metodos_reflexivos(json) {
  var ope = document.getElementById("criterio_de_decision_modelo");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_select_metodos_reflexivos(error) {
  alert("Error cargadon select criterios reflexivos");
}
$("#Aspectos_autoconsciencia_reflexivos").change(function () {
  var limpiar_objetos = document.getElementById(
    "lista_entidades_seleccionadas_procesos_reflexivos"
  );
  limpiar_objetos.innerHTML = "";
  data = {
    aspecto: document.getElementById("Aspectos_autoconsciencia_reflexivos")
      .value,
    sujeto: sujetoGuardarproceso_reflexivo,
  };
  if (data.aspecto != -6 && !!data.sujeto) {
    post_api(
      SERVER_PATH + "/api/get_objects_aspects",
      data,
      cargar_objetos_proceso_reflexivo,
      (res) => {
        console.log(res);
      }
    );
  }

  var limpiar = document.getElementById("metrica_indirecta_reflexivos");
  limpiar.innerHTML = "";
  var selecci_Aspecto = document.getElementById(
    "Aspectos_autoconsciencia_reflexivos"
  ).value;
  tipoM = "11";
  data = {
    id: selecci_Aspecto,
    tipo: tipoM,
  };
  post_api(
    SERVER_PATH + "/api/get_metrics_type",
    data,
    cargar_select_metrica_proceso_reflexivo,
    error_cargar_select_metrica_proceso_reflexivo
  );

  var limpiar3 = document.getElementById("indicador_modelo_pre");
  limpiar3.innerHTML = "";
  var seleccion = document.getElementById(
    "Aspectos_autoconsciencia_reflexivos"
  ).value;
  var tipoIndi = 12;
  data2 = {
    id: seleccion,
    tipo: tipoIndi,
  };
  post_api(
    SERVER_PATH + "/api/get_metrics_type",
    data2,
    cargar_select_indicador_proceso_reflexivo,
    error_cargar_select_indicador_proceso_reflexivo
  );
});
function cargar_select_tipo_perspectiva(json) {
  var ope = document.getElementById("tipo_perspectiva_select");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}
function cargar_select_metrica_proceso_reflexivo(json) {
  var ope = document.getElementById("metrica_indirecta_reflexivos");
  var option = document.createElement("option");
  option.value = "-6";
  option.innerHTML = "Seleccione..";
  ope.innerHTML = "";
  ope.appendChild(option);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    ope.appendChild(option);
  });
}

function error_cargar_select_metrica_proceso_reflexivo() {
  alert("No se cargo el select metrica en el modal procesos reflexivo");
}

function error_cargar_select_metrica_proceso() {
  alert("No se cargo el select metrica en el modal procesos");
}

function cargar_select_indicador_proceso_reflexivo(json) {
  var ope = document.getElementById("indicador_modelo_pre");
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione..";
  opcion.value = "-6";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    ope.appendChild(option);
  });
}

function error_cargar_select_indicador_proceso_reflexivo() {
  alert("No se cargo el indicar metrica en el modal procesos");
}

function SeleccionaRecursoReflexivosMetodos(element) {
  document.getElementById("recurso_reflexivos").disabled = false;

  if (element.value) {
    post_api(
      SERVER_PATH + "/api/ask_deployment_resources_select/",
      {
        tipo: element.value,
      },
      cargar_select_recurso_proceso_metodos,
      (json) => {
        console.log(json);
      }
    );
  }
}

function cargar_select_recurso_proceso_metodos(json) {
  var ope = document.createElement("select");
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione ..";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
  document.getElementById("recurso_reflexivos").innerHTML = ope.innerHTML;
}

function SeleccionaRecursoReflexivosModelos(element) {
  document.getElementById("recurso_modelos_reflexivos").disabled = false;

  if (element.value) {
    post_api(
      SERVER_PATH + "/api/ask_deployment_resources_select/",
      {
        tipo: element.value,
      },
      cargar_select_recurso_proceso_modelos,
      (json) => {
        console.log(json);
      }
    );
  }
}

function cargar_select_recurso_proceso_modelos(json) {
  var ope = document.createElement("select");
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione ..";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
  document.getElementById("recurso_modelos_reflexivos").innerHTML =
    ope.innerHTML;
}
//MAPEO METODOS ABRE MODAL Y TODO
var guardarMapeoMetodos = false;
function abrirMapeoParametros_metodos() {
  if (guardarMapeoMetodos == true) {
    $("#modal_mapeo_parametros_metodos").modal("show");
    document.getElementById("guardaMapeo_metodosButton").disabled = true;
  } else {
    document.getElementById("tabla_mapeo_parametros_metodos").innerHTML = "";
    var id = document.getElementById("recurso_reflexivos").value;
    if (id) {
      post_api(
        SERVER_PATH + "/api/ask_deployment_resources/",
        {
          id: id,
        },
        cargar_modal_mapeo_parametros_metodos,
        (res) => {
          console.log(res);
        }
      );
      $("#modal_mapeo_parametros_metodos").modal("show");
    } else {
      alert("Debe seleccionar un recurso");
    }
  }
}

function cargar_modal_mapeo_parametros_metodos(json) {
  console.log(json);
  document.getElementById("nombre_temporal_mapeo_metodos").innerHTML =
    json._name;
  document.getElementById("tipo_dato_salida_mapeo_metodos").innerHTML =
    json._returnDataType[0];
  document.getElementById("descripcion_mapeo_metodos").innerHTML =
    json._description;
  var tbody = document.getElementById("tabla_mapeo_parametros_metodos");
  json._containsParameter.forEach((element) => {
    if (element._active) {
      console.log(element);
      var tr = document.createElement("tr");
      tr.setAttribute("name", "tr_fila_parametros");
      var id = document.createElement("td");
      id.id = "id_fila_parametros_metodos";
      tr.appendChild(id);
      var nombre = document.createElement("td");
      nombre.id = "nombre_fila_parametros_metodos";
      tr.appendChild(nombre);
      var tipoDato = document.createElement("td");
      tipoDato.id = "tipo_dato_fila_parametros_metodos";
      tr.appendChild(tipoDato);
      var opcional = document.createElement("td");
      opcional.id = "opcional_fila_parametros_metodos";
      tr.appendChild(opcional);
      var tipoMapeo = document.createElement("td");
      tipoMapeo.id = "tipo_mapeo_fila_parametros_metodos";
      tr.appendChild(tipoMapeo);
      var argumentoEntrada = document.createElement("td");
      argumentoEntrada.id = "argumento_entrada_fila_parametros_metodos";
      tr.appendChild(argumentoEntrada);
      var procesos = document.createElement("td");
      procesos.id = "procesos_select_mapeos";
      tr.appendChild(procesos);
      id.innerHTML = element._ordinal;
      nombre.innerHTML = element._name;
      tipoDato.innerHTML = element._dataType[1];
      tipoDato.dataset.id = element._dataType[0];
      opcional.innerHTML = element._optional;

      var selectProcesos = document.createElement("select");
      selectProcesos.name = `procesos_mapeo_select`;
      selectProcesos.id = `proceso_select_metodo_${element._ordinal}`;
      selectProcesos.dataset.ordinal = element._ordinal;
      selectProcesos.style.border = "transparent";
      selectProcesos.dataset.parid = element._id;
      selectProcesos.setAttribute(
        "onChange",
        "guardar_id_procesos_mapeo_metodos(this);"
      );
      var optionSeleccion = document.createElement("option");
      optionSeleccion.value = "-6";
      optionSeleccion.innerHTML = "SELECCIONE..";
      selectProcesos.appendChild(optionSeleccion);
      procesos.appendChild(selectProcesos);
      var select = document.createElement("select");
      select.id = `tipo_mapeo_select_${element._ordinal}`;
      select.name = `tipo_mapeo_select_metodos`;
      select.dataset.ordinal = element._ordinal;
      select.dataset.parid = element._id;
      select.style.border = "transparent";
      select.setAttribute(
        "onChange",
        `cargar_metricas_tipo_mapeo_metodo(this);`
      );
      var optionSeleccione = document.createElement("option");
      optionSeleccione.value = "-6";
      optionSeleccione.innerHTML = "SELECCIONE..";
      select.appendChild(optionSeleccione);
      var selectMetricas = document.createElement("select");
      selectMetricas.style.border = "transparent";
      selectMetricas.name = `metrica_select`;
      selectMetricas.dataset.ordinal = element._ordinal;
      selectMetricas.dataset.parid = element._id;
      selectMetricas.id = `tipo_argumento_select_metodo_${element._ordinal}`;
      selectMetricas.setAttribute(
        "onChange",
        `cargar_metricas_tipo_mapeo_metodo(this);`
      );
      selectMetricas.appendChild(optionSeleccione.cloneNode(true));
      argumentoEntrada.appendChild(selectMetricas);
      tipoMapeo.appendChild(select);
      tbody.appendChild(tr);
    }
  });
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    {
      tipo: "TIPO_METRICA",
    },
    cargar_select_mapeo_tipo_metodos,
    (err) => {
      alert(err);
    }
  );
}

var global_direct_metric = { ordinal: undefined, proces_id: undefined };
var idGeneralReflexivos2 = undefined;
function guardar_id_procesos_mapeo_metodos(element) {
  var METRICA_DIRECTA = 10;
  var ordinal = element.dataset.ordinal;
  var id = element.dataset.parid;
  idGeneralReflexivos2 = element.dataset.ordinal;
  var tipo_mapeo_id = `tipo_mapeo_select_${ordinal}`;
  if (document.getElementById(tipo_mapeo_id).value == METRICA_DIRECTA) {
    var proces_id = element.value;
    global_direct_metric.ordinal = ordinal;
    global_direct_metric.proces_id = proces_id;
  } else if (global_direct_metric.ordinal == ordinal) {
    global_direct_metric.ordinal = undefined;
    global_direct_metric.proces_id = undefined;
  }
}

function cargar_select_mapeo_tipo_metodos(json) {
  var select = document.getElementsByName("tipo_mapeo_select_metodos");
  Array.from(select).forEach((element) => {
    json.forEach((ele) => {
      var option = document.createElement("option");
      option.value = ele.id;
      option.innerHTML = ele.nombre;
      element.appendChild(option);
    });
  });
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    {
      tipo: "TIPO_METRICA_METODO",
    },
    cargar_select_mapeo_tipo_metodos_2,
    (err) => {
      alert(err);
    }
  );
}
function cargar_select_procesos_mapeo_metodos(json) {
  var select = document.getElementsByName("procesos_mapeo_select");
  Array.from(select).forEach((element) => {
    json.forEach((ele) => {
      var option = document.createElement("option");
      option.value = ele.id;
      option.innerHTML = ele.descripcion;
      element.appendChild(option);
    });
  });
}
function cargar_select_mapeo_tipo_metodos_2(json) {
  var select = document.getElementsByName("tipo_mapeo_select_metodos");
  Array.from(select).forEach((element) => {
    json.forEach((ele) => {
      var option = document.createElement("option");
      option.value = ele.id;
      option.innerHTML = ele.nombre;
      element.appendChild(option);
    });
  });
}

var ordinaGeneralMetodos = undefined;
var idGeneralMetodos = undefined;
function cargar_metricas_tipo_mapeo_metodo(elemento) {
  var VARIABLE_SIMULACION = 24;
  var METADATA = 25;
  ordinaGeneralMetodos = elemento.dataset.parid;
  idGeneralMetodos = elemento.dataset.ordinal;
  if (elemento.name == "metrica_select") {
    data = {
      metricaId: elemento.value,
    };
    post_api(
      SERVER_PATH + "/api/ask_input_arguments",
      data,
      llenar_procesos_metodo_reflexivo,
      (err) => {
        alert(err);
      }
    );
  } else {
    if (elemento.value == METADATA || elemento.value == VARIABLE_SIMULACION) {
      var select_prcess_id = `proceso_select_metodo_${idGeneralMetodos}`;
      var select = document.getElementById(select_prcess_id);
      select.innerHTML = "";
      var optionSeleccion = document.createElement("option");
      optionSeleccion.value = "-6";
      optionSeleccion.innerHTML = "SELECCIONE..";
      select.appendChild(optionSeleccion);
      select.disabled = true;
    } else {
      var select_prcess_id = `proceso_select_metodo_${idGeneralMetodos}`;
      var select = document.getElementById(select_prcess_id);
      select.innerHTML = "";
      var optionSeleccion = document.createElement("option");
      optionSeleccion.value = "-6";
      optionSeleccion.innerHTML = "SELECCIONE..";
      select.appendChild(optionSeleccion);
      select.disabled = false;
    }
    if (
      elemento.value == METADATA &&
      global_direct_metric.proces_id == undefined
    ) {
      alert('Debe seleccionar una metrica "Directa" en primera instancia');
      return;
    } // else if(global_direct_metric.ordinal) {
    //var tipo_mapeo_id = `tipo_mapeo_select_${global_direct_metric.ordinal}`;
    //document.getElementById(tipo_mapeo_id).disabled = true;
    //}

    var proceso_id = document.getElementById("id_proceso_reflexivo").value;
    data = {
      tipo_metrica: elemento.value,
      proceso: proceso_id,
      procces_of_direct_metric: global_direct_metric.proces_id,
    };
    post_api(
      SERVER_PATH + "/api/ask_input_arguments",
      data,
      cargar_select_argumento_entrada_metodos,
      (err) => {
        alert(err);
      }
    );
  }
}

function llenar_procesos_metodo_reflexivo(json) {
  var select_prcess_id = `proceso_select_metodo_${idGeneralMetodos}`;
  var select = document.getElementById(select_prcess_id);
  select.innerHTML = "";
  var optionSeleccion = document.createElement("option");
  optionSeleccion.value = "-6";
  optionSeleccion.innerHTML = "SELECCIONE..";
  select.appendChild(optionSeleccion);
  json.forEach((ele) => {
    var nombreF = ele.nombre + "-" + ele.descripcion;
    var option = document.createElement("option");
    option.value = ele.id;
    option.innerHTML = nombreF;
    select.appendChild(option);
  });
}
function cargar_select_argumento_entrada_metodos(json) {
  var select = document.getElementById(
    `tipo_argumento_select_metodo_${idGeneralMetodos}`
  );
  select.innerHTML = "<option value='-6'>Seleccione</option>";
  json.forEach((ele) => {
    var option = document.createElement("option");
    option.value = ele.id;
    option.innerHTML = ele.nombre;
    select.appendChild(option);
  });
}
function cargar_select_mapeo_variables_simulacion() {
  post_api(
    SERVER_PATH + "/api/get_simulation_variable",
    { mea_id: metodo_calculo },
    cargar_variables_simulacion_select_modal_mapeo,
    (res) => {
      console.log(res);
    }
  );
}

function cargar_variables_simulacion_select_modal_mapeo(json) {
  var select = document.getElementById(
    `tipo_argumento_select_metodo_${OrdinalGeneral}`
  );
  select.innerHTML = "<option value='-6'>Seleccione</option>";
  json.forEach((ele) => {
    var option = document.createElement("option");
    option.value = ele.id;
    option.innerHTML = ele.name;
    select.appendChild(option);
  });
}

function cargar_select_mapeo_metados() {
  post_api(
    SERVER_PATH + "/api/get_metadata",
    { mea_id: metodo_calculo },
    cargar_metadatos_select_modal_mapeo,
    (res) => {
      console.log(res);
    }
  );
}

function cargar_metadatos_select_modal_mapeo(json) {
  var select = document.getElementById(
    `tipo_argumento_select_metodo_${OrdinalGeneral}`
  );
  select.innerHTML = "<option value='-6'>Seleccione</option>";
  json.forEach((ele) => {
    var option = document.createElement("option");
    option.value = ele.id;
    option.innerHTML = ele.name;
    select.appendChild(option);
  });
}

function error_cargar_select_mapeo_variables_simulacion(error) {
  console.log(error);
}
function Guadar_nuevo_mapeo_metodos() {
  mapeoReflexivo1 = true;
  var nombreP = document.getElementsByName("tr_fila_parametros");
  var aux = [];
  var mea_id_rec = document
    .getElementById("id_metodo_aprendizaje_modelos")
    .value.split("-");
  Array.from(nombreP).forEach((element) => {
    var aux2 = {
      proceso: element.querySelector("td#procesos_select_mapeos select").value,
      nombre: element.querySelector("td#nombre_fila_parametros_metodos")
        .innerHTML,
      par_ordinal: element.querySelector("td#id_fila_parametros_metodos")
        .innerHTML,
      mp_tipo_entrada: element.querySelector(
        "td#tipo_dato_fila_parametros_metodos"
      ).dataset.id,
      opcional: element.querySelector("td#opcional_fila_parametros_metodos")
        .innerHTML,
      tipoMapeo: element.querySelector(
        "td#tipo_mapeo_fila_parametros_metodos select"
      ).value,
      met_id: element.querySelector(
        "td#argumento_entrada_fila_parametros_metodos select"
      ).value,
      mea_id: mea_id_rec[0],
      vs_id: undefined,
    };
    element.querySelector(
      "td#tipo_mapeo_fila_parametros_metodos select"
    ).disabled = true;
    element.querySelector(
      "td#argumento_entrada_fila_parametros_metodos select"
    ).disabled = true;
    element.querySelector("td#procesos_select_mapeos select").disabled = true;
    aux.push(aux2);
  });
  console.log(aux);
  for (var i = 0; i < aux.length; i++) {
    if (aux[i].tipoMapeo == 24) {
      aux[i].vs_id = aux[i].met_id;
      aux[i].met_id = undefined;
    } else if (aux[i].tipoMapeo == 25) {
      aux[i].data_id = aux[i].met_id;
      aux[i].met_id = undefined;
    }
  }

  post_api(
    SERVER_PATH + "/api/add_mapeo_parametros/",
    aux,
    mensaje_correcto_envio_mapeo_metodos,
    (res) => {
      console.log(res);
    }
  );
}
function cancelar_mapeo_parametros_metodos() {
  $("#modal_mapeo_parametros_metodos").modal("hide");
}
function mensaje_correcto_envio_mapeo_metodos() {
  guardarMapeoMetodos = true;
  document.getElementById("guardaMapeo_modelosButton").disabled = true;
  $("#modal_mapeo_parametros_metodos").modal("hide");
}
//Mapeo Parametros Modelos
var guardarMapeoModelos = false;
function abrirMapeoParametros_modelos() {
  if (guardarMapeoModelos == true) {
    $("#modal_mapeo_parametros_modelos").modal("show");
    document.getElementById("guardar_mapeo_buttom").disabled = true;
  } else {
    document.getElementById("tabla_mapeo_parametros_modelos").innerHTML = "";
    var id = document.getElementById("recurso_modelos_reflexivos").value;
    if (id) {
      post_api(
        SERVER_PATH + "/api/ask_deployment_resources/",
        {
          id: id,
        },
        cargar_modal_mapeo_parametros_modelos,
        (res) => {
          console.log(res);
        }
      );
      $("#modal_mapeo_parametros_modelos").modal("show");
    } else {
      alert("Debe seleccionar un recurso");
    }
  }
}

function cargar_modal_mapeo_parametros_modelos(json) {
  document.getElementById("nombre_temporal_mapeo_modelos").innerHTML =
    json._name;
  document.getElementById("tipo_dato_salida_mapeo_modelos").innerHTML =
    json._returnDataType[0];
  document.getElementById("descripcion_mapeo_modelos").innerHTML =
    json._description;
  var tbody = document.getElementById("tabla_mapeo_parametros_modelos");
  json._containsParameter.forEach((element) => {
    if (element._active) {
      var tr = document.createElement("tr");
      tr.classList.add("model");
      tr.setAttribute("name", "tr_fila_parametros");
      var id = document.createElement("td");
      id.id = "id_fila_parametros_modelos";
      tr.appendChild(id);
      var nombre = document.createElement("td");
      nombre.id = "nombre_fila_parametros_modelos";
      tr.appendChild(nombre);
      var tipoDato = document.createElement("td");
      tipoDato.id = "tipo_dato_fila_parametros_modelos";
      tr.appendChild(tipoDato);
      var opcional = document.createElement("td");
      opcional.id = "opcional_fila_parametros_modelos";
      tr.appendChild(opcional);
      var tipoMapeo = document.createElement("td");
      tipoMapeo.id = "tipo_mapeo_fila_parametros_modelos";
      tr.appendChild(tipoMapeo);
      var argumentoEntrada = document.createElement("td");
      argumentoEntrada.id = "argumento_entrada_fila_parametros_modelos";
      tr.appendChild(argumentoEntrada);
      var proceso = document.createElement("td");
      proceso.id = "opcional_proceso_mapeo";
      tr.appendChild(proceso);
      id.innerHTML = element._ordinal;
      nombre.innerHTML = element._name;
      tipoDato.innerHTML = element._dataType[1];
      tipoDato.dataset.id = element._dataType[0];
      opcional.innerHTML = element._optional;

      var select_procesos = document.createElement("select");
      select_procesos.name = `proceso_select_modelos`;
      select_procesos.id = `proceso_select_${element._id}`;
      select_procesos.dataset.ordinal = element._ordinal;
      select_procesos.dataset.parid = element._id;
      select_procesos.style.border = "transparent";
      var optionSeleccion = document.createElement("option");
      optionSeleccion.value = "-6";
      optionSeleccion.innerHTML = "SELECCIONE..";
      select_procesos.appendChild(optionSeleccion);
      proceso.appendChild(select_procesos);

      var select = document.createElement("select");
      select.id = `tipo_mapeo_select_${element._id}`;
      select.name = `tipo_mapeo_select_modelos`;
      select.dataset.ordinal = element._ordinal;
      select.dataset.parid = element._id;
      select.style.border = "transparent";
      select.setAttribute(
        "onChange",
        `cargar_metricas_tipo_mapeo_modelo(this);`
      );
      var optionSeleccione = document.createElement("option");
      optionSeleccione.value = "-6";
      optionSeleccione.innerHTML = "SELECCIONE..";
      select.appendChild(optionSeleccione);
      var selectMetricas = document.createElement("select");
      selectMetricas.style.border = "transparent";
      selectMetricas.id = `tipo_argumento_select_modelo_${element._id}`;
      selectMetricas.name = "metrica_select_reflexivos";
      selectMetricas.dataset.ordinal = element._ordinal;
      selectMetricas.dataset.parid = element._id;
      selectMetricas.appendChild(optionSeleccione.cloneNode(true));
      selectMetricas.setAttribute(
        "onChange",
        `cargar_metricas_tipo_mapeo_modelo(this);`
      );
      argumentoEntrada.appendChild(selectMetricas);
      tipoMapeo.appendChild(select);
      tbody.appendChild(tr);
    }
  });
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    {
      tipo: "TIPO_METRICA",
    },
    cargar_select_mapeo_tipo_modelos,
    (err) => {
      alert(err);
    }
  );
}

function cargar_select_mapeo_tipo_modelos(json) {
  var select = document.getElementsByName("tipo_mapeo_select_modelos");
  Array.from(select).forEach((element) => {
    json.forEach((ele) => {
      var option = document.createElement("option");
      option.value = ele.id;
      option.innerHTML = ele.nombre;
      element.appendChild(option);
    });
  });
}

var ordinalGeneralReflexivos = undefined;
var idGeneralReflexivos = undefined;
function cargar_metricas_tipo_mapeo_modelo(elemento) {
  ordinalGeneralReflexivos = elemento.dataset.ordinal;
  idGeneralReflexivos = elemento.dataset.parid;
  var selectMetricas = document.getElementById(
    `tipo_argumento_select_modelo_${elemento.dataset.parid}`
  );
  var selectTipo = document.getElementById(
    `tipo_mapeo_select_${elemento.dataset.parid}`
  );
  if (elemento.name == "metrica_select_reflexivos") {
    data = {
      metricaId: elemento.value,
    };
    post_api(
      SERVER_PATH + "/api/ask_input_arguments",
      data,
      cargar_select_procesos_mapeo_reflexivos,
      (err) => {
        alert(err);
      }
    );
  } else {
    data = { tipo_metrica: elemento.value };
    post_api(
      SERVER_PATH + "/api/ask_input_arguments",
      data,
      cargar_select_argumento_entrada_modelos,
      (err) => {
        alert(err);
      }
    );
  }
}
function cargar_select_procesos_mapeo_reflexivos(json) {
  var select_prcess_id = `proceso_select_${idGeneralReflexivos}`;
  var select = document.getElementById(select_prcess_id);
  select.innerHTML = "";
  var optionSeleccion = document.createElement("option");
  optionSeleccion.value = "-6";
  optionSeleccion.innerHTML = "SELECCIONE..";
  select.appendChild(optionSeleccion);
  json.forEach((ele) => {
    var nombreF = ele.nombre + "-" + ele.descripcion;
    var option = document.createElement("option");
    option.value = ele.id;
    option.innerHTML = nombreF;
    select.appendChild(option);
  });
}
function cargar_select_argumento_entrada_modelos(json) {
  console.log(json);
  var select = document.getElementById(
    `tipo_argumento_select_modelo_${idGeneralReflexivos}`
  );
  select.innerHTML = "<option value='-6'>Seleccione</option>";
  json.forEach((ele) => {
    var option = document.createElement("option");
    option.value = ele.id;
    option.innerHTML = ele.nombre;
    select.appendChild(option);
  });
}
function Guadar_nuevo_mapeo_modelos() {
  mapoeoReflexivo2 = true;
  var nombreP = document.querySelectorAll("[name=tr_fila_parametros].model");
  var aux = [];
  var mea_id_rec = document
    .getElementById("id_metodo_aprendizaje_modelos")
    .value.split("-");
  Array.from(nombreP).forEach((element) => {
    var aux2 = {
      proceso: element.querySelector("td#opcional_proceso_mapeo select").value,
      nombre: element.querySelector("td#nombre_fila_parametros_modelos")
        .innerHTML,
      par_ordinal: element.querySelector("td#id_fila_parametros_modelos")
        .innerHTML,
      mp_tipo_entrada: element.querySelector(
        "td#tipo_dato_fila_parametros_modelos"
      ).dataset.id,
      opcional: element.querySelector("td#opcional_fila_parametros_modelos")
        .innerHTML,
      tipoMapeo: element.querySelector(
        "td#tipo_mapeo_fila_parametros_modelos select"
      ).value,
      met_id: element.querySelector(
        "td#argumento_entrada_fila_parametros_modelos select"
      ).value,
      mea_id: mea_id_rec[1],
    };
    element.querySelector(
      "td#tipo_mapeo_fila_parametros_modelos select"
    ).disabled = true;
    element.querySelector(
      "td#argumento_entrada_fila_parametros_modelos select"
    ).disabled = true;
    element.querySelector("td#opcional_proceso_mapeo select").disabled = true;
    aux.push(aux2);
  });
  console.log(aux);

  post_api(
    SERVER_PATH + "/api/add_mapeo_parametros/",
    aux,
    mensaje_correcto_envio_mapeo_modelos,
    (res) => {
      console.log(res);
    }
  );
}
function cancelar_mapeo_parametros_modelos() {
  $("#modal_mapeo_parametros_modelos").modal("hide");
}
function mensaje_correcto_envio_mapeo_modelos(json) {
  guardarMapeoModelos = true;
  $("#modal_mapeo_parametros_modelos").modal("hide");
}
//Modificar procesos

function modificar_informacion_boton(id) {
  $("#modificar_informacion_general.collapse").collapse("hide");
  $("#modificar_metodos_modelos.collapse").collapse("hide");
  $(`#${id}.collapse`).collapse("show");
  if ("modificar_informacion_general" == id) {
    document
      .getElementById("informacion_general_modificar")
      .classList.replace("btn-link", "btn-secondary");
    document
      .getElementById("metodos_modificar")
      .classList.replace("btn-secondary", "btn-link");
  } else {
    document
      .getElementById("informacion_general_modificar")
      .classList.replace("btn-secondary", "btn-link");
    document
      .getElementById("metodos_modificar")
      .classList.replace("btn-link", "btn-secondary");
  }
}
cont_paso_modificar = 1;

function modificar_proceso_pre_reflexivo_boton() {
  if (cont_paso_modificar == 1) {
    if (modificar_proceso_pre_reflexivo()) {
      console.log("Llega");
      document
        .getElementById("btn-section-2-modificar")
        .classList.replace("d-none", "d-inline");
      document.getElementById(
        "btn-modificar"
      ).innerHTML = `Modificar (Metodos modelos)`;
      $("#modificar_informacion_general.collapse").collapse("hide");
      $("#modificar_metodos_modelos.collapse").collapse("show");
      cont_paso_modificar++;
      saltar_paso_pre++;
      //cargar_metodos_aprendizaje_razonamiento();
    } else {
      alert("No se ha podido guardar, verifique todos los campos");
    }
  } else if (cont_paso_modificar == 2) {
    if (modificar_modelos_metodos()) {
      document
        .getElementById("btn-section-3-modificar")
        .classList.replace("d-none", "d-inline");
      document.getElementById("btn-modificar").innerHTML = `Salir`;
      cont_paso_modificar++;
      saltar_paso_pre++;
    } else {
      alert("No se ha podido guardar, verifique todos los campos");
    }
  } else if (cont_paso_modificar == 3) {
    history.back();
    consultar_api(
      SERVER_PATH + "/api/procesos_pre_reflexive",
      cargar_procesos_pre_reflexivos_table,
      error_procesos_pre_reflexivos_table
    );
  }
}

function cargar_metodos_aprendizaje_razonamiento() {
  var pa_id = document.getElementById(
    "id_proceso_pre_reflexivo_modificar"
  ).value;
  var asp_id = document.getElementById("id_aspecto").value;
  post_api(
    SERVER_PATH + "/api/get_properties",
    { aspectoID: asp_id },
    llenar_select_propiedades_modificar,
    (res) => {
      console.log(res);
    }
  );
  post_api(
    SERVER_PATH + "/api/get_metrics_type",
    { id: asp_id, tipo: 10 },
    llenar_select_metricas_directas_modificar,
    (res) => {
      console.log(res);
    }
  );
  post_api(
    SERVER_PATH + "/api/get_metrics_type",
    { id: asp_id, tipo: 12 },
    llenar_select_metricas_indicador_modificar,
    (res) => {
      console.log(res);
    }
  );
  consultar_api(
    SERVER_PATH + "/api/decision_criteria",
    cargar_select_criterios_proceso_modificar,
    error_cargar_select_criterios_proceso
  );
  post_api(
    SERVER_PATH + "/api/get_metodos_recoleccion_analisis",
    { id: pa_id },
    cargar_selects_metodo_analisis_recoleccion,
    (res) => {
      console.log(res);
    }
  );
  cargar_select_tipo_comunicacion_modificar();
}
function llenar_select_propiedades_modificar(json) {
  var ope = document.getElementById("proiedad_recoleccion_modificar");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    option.dataset.obj = element.obj_id;
    ope.appendChild(option);
  });
}
function llenar_select_metricas_directas_modificar(json) {
  var ope = document.getElementById("metrica_directa_modificar");
  ope.disabled = false;
  var option = document.createElement("option");
  option.value = "-6";
  option.innerHTML = "Seleccione..";
  ope.innerHTML = "";
  ope.appendChild(option);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    ope.appendChild(option);
  });
}
function llenar_select_metricas_indicador_modificar(json) {
  var ope = document.getElementById("indicador_modelo_modificar");
  ope.disabled = false;
  var option = document.createElement("option");
  option.value = "-6";
  option.innerHTML = "Seleccione..";
  ope.innerHTML = "";
  ope.appendChild(option);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    ope.appendChild(option);
  });
}
function cargar_select_criterios_proceso_modificar(json) {
  var ope = document.getElementById("criterio_de_decision_modificar");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}
var metodo_recoleccion_modificar_id = undefined;
var modelo_analisis_modificar_id = undefined;
function cargar_selects_metodo_analisis_recoleccion(json) {
  metodo_recoleccion_modificar_id = json[0].metodo_id;
  modelo_analisis_modificar_id = json[1].metodo_id;
  document.getElementById("metrica_directa_modificar").value =
    json[0].metrica_id;
  document.getElementById("indicador_modelo_modificar").value =
    json[1].metrica_id;
  post_api(
    SERVER_PATH + "/api/get_recoleccion_datos",
    { mea_id: json[0].metodo_id },
    get_select_recoleccion_datos,
    (res) => {
      console.log(res);
    }
  );
  post_api(
    SERVER_PATH + "/api/get_model_analisis",
    { mea_id: json[1].metodo_id },
    get_select_modelo_analisis,
    (res) => {
      console.log(res);
    }
  );
  cargar_nombre_recurso_select(json[1].metodo_id);
}
function cargar_nombre_recurso_select(mea_id) {
  post_api(
    SERVER_PATH + "/api/get_select_cargar_recurso",
    { mea_id: mea_id },
    llenar_select_nombre_recurso,
    (res) => {
      console.log(res);
    }
  );
}
function llenar_select_nombre_recurso(json) {
  if (json.length == 0) {
    var recurso = document.getElementById("tipo_recurso_modificar").value;
    post_api(
      SERVER_PATH + "/api/ask_deployment_resources_select/",
      {
        tipo: recurso,
      },
      cargar_select_recurso_modificar,
      (json) => {
        console.log(json);
      }
    );
  } else {
    console.log(json[0].name);
    añadir_select_recurso_modificar(json);
  }
}
function cargar_select_recurso_modificar(json) {
  var ope = document.createElement("select");
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione ..";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
  document.getElementById("recurso_modificar").disabled = false;
  document.getElementById("recurso_modificar").innerHTML = ope.innerHTML;
}
function añadir_select_recurso_modificar(json) {
  var ope = document.createElement("select");
  var opcion = document.createElement("option");
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    ope.appendChild(option);
  });
  document.getElementById("recurso_modificar").innerHTML = ope.innerHTML;
}
var flujo = undefined;
function get_select_recoleccion_datos(json) {
  document.getElementById("tipo_comunicacion_modificar").value =
    json[0].comunicacion;
  document.getElementById("proiedad_recoleccion_modificar").value =
    json[0].propiedad;
  flujo = json[0].flujo;
  cargar_flujo_datos_modificar();
}
function get_select_modelo_analisis(json) {
  console.log(json);
  document.getElementById("criterio_de_decision_modificar").value =
    json[0].criterio;
}
function cargar_flujo_datos_modificar() {
  document.getElementById("flujo_de_datos_modificar").disabled = false;
  var pro = document.getElementById("proiedad_recoleccion_modificar").value;
  var comunicacion = document.getElementById("tipo_comunicacion_modificar");
  var seleccion = comunicacion.options[comunicacion.selectedIndex].text;
  if (seleccion == "SÍNCRONA") {
    seleccion = "SINCRONA";
  }
  if (seleccion != "Seleccione.." && pro != "-6") {
    post_api(
      SERVER_PATH + "/api/get_data_flow/",
      {
        comunicacion: seleccion,
        propiedad: pro,
      },
      cargar_select_flujo_datos_modificar,
      (res) => {
        console.log(res);
      }
    );
  } else {
    var ope = document.getElementById("flujo_de_datos_modificar");
    ope.innerHTML = "";
    var seleccione = document.createElement("option");
    seleccione.innerHTML = "Seleccione..";
    seleccione.value = "-6";
    ope.appendChild(seleccione);
  }
}
function cargar_select_flujo_datos_modificar(json) {
  var ope = document.getElementById("flujo_de_datos_modificar");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.descripcion;
    ope.appendChild(option);
  });
  if (flujo == undefined) {
    ope.value = -6;
  } else {
    ope.value = flujo;
  }
}
var saltar_paso_pre = 1;

function saltar_proceso_pre_reflexivo_boton() {
  if (saltar_paso_pre == 1) {
    document
      .getElementById("btn-section-2-modificar")
      .classList.replace("d-none", "d-inline");
    $("#modificar_informacion_general.collapse").collapse("hide");
    $("#modificar_metodos_modelos.collapse").collapse("show");
    saltar_paso_pre++;
    cont_paso_modificar_reflexivos++;
    document
      .getElementById("modal_metodo_mod")
      .classList.replace("d-none", "d-block");
    document.getElementById(
      "btn-saltar-modificar__pre_reflexivos"
    ).innerHTML = `Saltar (Información General)`;
    document
      .getElementById("informacion_general_modificar")
      .classList.replace("btn-secondary", "btn-link");
    document
      .getElementById("metodos_modificar")
      .classList.replace("btn-link", "btn-secondary");
  } else if (saltar_paso_pre == 2) {
    document
      .getElementById("btn-section-2-modificar")
      .classList.replace("d-inline", "d-none");
    $("#modificar_informacion_general.collapse").collapse("show");
    $("#modificar_metodos_modelos.collapse").collapse("hide");
    saltar_paso_pre--;
    document
      .getElementById("modal_metodo_mod")
      .classList.replace("d-block", "d-none");
    document.getElementById(
      "btn-saltar-modificar__pre_reflexivos"
    ).innerHTML = `Saltar (Método de aprendizaje y razonamiento)`;
    document
      .getElementById("informacion_general_modificar")
      .classList.replace("btn-link", "btn-secondary");
    document
      .getElementById("metodos_modificar")
      .classList.replace("btn-secondary", "btn-link");
  }
}

if (document.getElementById("lista_sujetos_activos_proceso_modificar"))
  consultar_api(
    SERVER_PATH + "/api/subjects",
    cargar_sujetos_activos_procesos_modificar,
    error_cargar_sujetos_activos_procesos_modificar
  );

function cargar_sujetos_activos_procesos_modificar(json) {
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.padre && elemento.activo == 1) {
      aux_visible_activo.add(elemento.padre);
    } else if (!!elemento.padre && elemento.activo == 0) {
      aux_visible_inactivo.add(elemento.padre);
    }
  });
  var idModificar = document.getElementById("id_sujeto").value;
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.padre) {
      insertar = document.getElementById(
        "lista_sujetos_activos_proceso_modificar"
      );
    } else {
      insertar = document.createElement("ul");
      document
        .getElementById(`li_entidad_seleccionado_${elemento.padre}`)
        .appendChild(insertar);
    }
    li = document.createElement("li");
    li.id = `li_entidad_seleccionado_${elemento.id}`;
    if (elemento.activo == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `sujeto_seleccionado_${elemento.id}`;
    checkbox.disabled = true;
    checkbox.name = "checkbox_sujetos_procesos_modificar";
    checkbox.dataset.padre_id = elemento.padre;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.nombre;
    checkbox.setAttribute("onclick", "");
    if (checkbox.dataset.puro_id == idModificar) {
      checkbox.checked = true;
    }
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.nombre;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function error_cargar_sujetos_activos_procesos_modificar(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}

function validarSeleccion() {
  var radio = document.getElementsByName("proceso_seleccionado");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!id) {
    alert("Debe seleccionar un proceso para modificar");
    return false;
  }
}

function modificar_proceso_pre_reflexivo() {
  /* var nombre = document.getElementById(
    "input-name-proceso-pre-reflexivo_modificar"
  ).value;
  var descripcion = document.getElementById(
    "input-descripcion-proceso-pre-reflexivo_modificar"
  ).value;
  var inicio = document.getElementById("inicio_del_periodo_modificar").value;
  var fin = document.getElementById("fin_del_periodo_modificar").value;
  var id = document.getElementById("id_proceso_pre_reflexivo_modificar").value;
  if (!!nombre && !!descripcion) {
    data = {
      name: nombre,
      description: descripcion,
      inicioP: inicio,
      finP: fin,
      id: id,
      type: 17,
    };
    post_api(
      SERVER_PATH + "/api/mod_pre_reflective_process/",
      data,
      mensaje_exitoModificarproceso_pre_reflexivo,
      mensaje_errorModificarproceso_pre_reflexivo
    );
    document.getElementById(
      "input-name-proceso-pre-reflexivo_modificar"
    ).disabled = true;
    document.getElementById(
      "input-descripcion-proceso-pre-reflexivo_modificar"
    ).disabled = true;
    document.getElementById("inicio_del_periodo_modificar").disabled = true;
    document.getElementById("fin_del_periodo_modificar").disabled = true;
    document
      .getElementById("modal_metodo_mod")
      .classList.replace("d-none", "d-block");
    return true;
  } else {
    return false;
  }*/
  return true;
}

function mensaje_exitoModificarproceso_pre_reflexivo(json) {
  console.log(json);
}

function mensaje_errorModificarproceso_pre_reflexivo(error) {
  alert(error);
}

function modificar_modelos_metodos() {
  var comunicacion = document.getElementById(
    "tipo_comunicacion_modificar"
  ).value;
  var propiedad = document.getElementById(
    "proiedad_recoleccion_modificar"
  ).value;
  var flujo_datos = document.getElementById("flujo_de_datos_modificar").value;
  var metrica_directa = document.getElementById(
    "metrica_directa_modificar"
  ).value;
  var indicador = document.getElementById("indicador_modelo_modificar").value;
  var recurso = document.getElementById("recurso_modificar").value;
  if (
    comunicacion != -6 &&
    propiedad != -6 &&
    flujo_datos != -6 &&
    metrica_directa != -6 &&
    indicador != -6 &&
    recurso != -6
  ) {
    var data = {
      comunicacion: comunicacion,
      propiedad: propiedad,
      flujo_datos: flujo_datos,
      metrica_directa: metrica_directa,
      indicador: indicador,
      recurso: recurso,
      mea_id_reco: metodo_recoleccion_modificar_id,
      mea_id_anali: modelo_analisis_modificar_id,
    };
    post_api(
      SERVER_PATH + "/api/mod_metodos_modelos",
      data,
      metodos_modelos_modificados_exito,
      (res) => {
        console.log(res);
      }
    );
    return true;
  } else {
    alert("Debe seleccionar todos los campos");
    return false;
  }
}

function metodos_modelos_modificados_exito(json) {
  document.getElementById("tipo_comunicacion_modificar").disabled = true;
  document.getElementById("proiedad_recoleccion_modificar").disabled = true;
  document.getElementById("flujo_de_datos_modificar").disabled = true;
  document.getElementById("metrica_directa_modificar").disabled = true;
  document.getElementById("indicador_modelo_modificar").disabled = true;
  document.getElementById("recurso_modificar").disabled = true;
  document.getElementById("mapeo_parametros_btn_modificar").disabled = false;
  document.getElementById(
    "btn-recomendaciones_model_modificar"
  ).disabled = false;
}
function abrirModalMapeoParametros_modificar() {
  $("#modal_modificar_mapeo_parametros").modal("show");
  /*
  document.getElementById("tabla_mapeo_parametros").innerHTML = "";
  var id = document.getElementById("recurso_modificar").value;
  if (id) {
    post_api(
      SERVER_PATH + "/api/ask_deployment_resources/",
      {
        id: id,
      },
      cargar_modal_mapeo_parametros,
      (res) => {
        console.log(res);
      }
    );
    $("#modal_modificar_mapeo_parametros").modal("show");
  } else {
    alert("Debe seleccionar un recurso");
  }
  */
}
function abrirModalRecomendaciones_modificar_reflexivos() {
  var seleccionCriterio = document.getElementById(
    "criterio_de_decision_modelo_modificar"
  ).value;
  post_api(
    SERVER_PATH + "/api/get_umbral",
    { criterio: seleccionCriterio },
    cargar_lista_umbrales_proceso_modificar,
    (res) => {
      console.log(res);
    }
  );
  $("#modal_recomendaciones_modificar").modal("show");
}
function abrirModalRecomendaciones_modificar() {
  var seleccionCriterio = document.getElementById(
    "criterio_de_decision_modificar"
  ).value;
  post_api(
    SERVER_PATH + "/api/get_umbral",
    { criterio: seleccionCriterio },
    cargar_lista_umbrales_proceso_modificar,
    (res) => {
      console.log(res);
    }
  );
  $("#modal_recomendaciones_modificar").modal("show");
}
function cerrar_modal_activos_modificar() {
  $("#modal_recomendaciones_modificar").modal("hide");
}
function cargar_lista_umbrales_proceso_modificar(json) {
  console.log(json);
  res = "";
  document.getElementById("seccion_acciones_modificar").innerHTML = "";
  json.umbrales.forEach((cd) => {
    res += `<tr onClick="visibilidad_acciones_umbral_modificar('${cd.id}')" id='tr_accion_modificar_${cd.id}' name='tr_accion_modificar_'>`;
    res += `<td>${cd.id}</td>`;
    res += `<td>${cd.name}</td>`;
    res += `<td>${cd.interpretacion}</td>`;
    res += `<td>${cd.inferior}</td>`;
    res += `<td>${cd.superior}</td>`;
    res += "</tr>";
    var mea_id_mod = document.getElementById(
      "id_metodo_aprendizaje_modificar"
    ).value;
    post_api(
      SERVER_PATH + "/api/get_action",
      {
        umbral: cd.id,
        mea_id: mea_id_mod,
      },
      cargar_accion_table_modificar_pre,
      (res) => {
        console.log("Error al cargar la tabla accion" + res);
      }
    );
  });
  document.getElementById("tabla_umbrales_procesos_modificar").innerHTML = res;
}

function visibilidad_acciones_umbral_modificar(id) {
  var tabla = document.getElementsByName("tr_accion_modificar_");
  tabla.forEach((tr) => {
    tr.style.backgroundColor = "rgba(0,0,0,0)";
  });
  document.getElementById(`tr_accion_modificar_${id}`).style.backgroundColor =
    "rgba(0,0,0,0.15)";
  var dato = document.getElementById("umbral_modificar_" + id);
  if (dato && UmbralId != id) {
    dato.style.display = "table";
    if (UmbralId) {
      dato = document.getElementById("umbral_modificar_" + UmbralId);
      dato.style.display = "none";
    }
  }
  UmbralId = id;
}

function cargar_accion_table_modificar_pre(json) {
  console.log(json);
  var templeate = document
    .getElementById("templeate_tabla_accion_modificar")
    .content.cloneNode(true);
  var seccion = document.getElementById("seccion_acciones_modificar");
  var body = templeate.querySelector("tbody");
  json.acciones.forEach((um) => {
    var fila = document.createElement("tr");
    var dato = document.createElement("td");
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "accion_seleccionada_modificar";
    input.dataset.id = um.id;
    input.dataset.nombre = um.name;
    input.dataset.description = um.description;
    input.dataset.activo = um.active;
    input.dataset.id_umbra = json.umbral_id;
    dato.appendChild(input);
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.id;
    fila.appendChild(dato);
    dato = document.createElement("td");
    //dato.innerHTML = um.name;
    //fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.description;
    fila.appendChild(dato);
    input = document.createElement("input");
    input.type = "checkbox";
    input.disabled = true;
    input.checked = um.active == 1;
    dato = document.createElement("td");
    dato.appendChild(input);
    fila.appendChild(dato);
    body.appendChild(fila);
  });
  body.id += "_" + json.umbral_id;
  var tabla = templeate.querySelector(".table");
  tabla.id = "umbral_modificar_" + json.umbral_id;
  tabla.style.display = "none";
  seccion.appendChild(templeate);
}
function cerrar_modal_recomendaciones_modificar() {
  $("#modal_recomendaciones_modificar").modal("hide");
}

function cargar_select_tipo_comunicacion_modificar() {
  var tipoComunicacion = "TIPO_COMUNICACION";
  data = {
    tipo: tipoComunicacion,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_select_tipo_comunicacion_modificar_pre_reflexivos,
    error_cargar_select_tipo_comunicacion_modificar_pre_reflexivos
  );
}

function cargar_select_tipo_comunicacion_modificar_pre_reflexivos(json) {
  var ope = document.getElementById("tipo_comunicacion_modificar");
  var seleccionTipo = document.getElementById(
    "tipo_comunicacion_modificar"
  ).value;
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione..";
  opcion.value = "-6";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    if (seleccionTipo == option.value) {
      option.selected = true;
    }
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_select_tipo_comunicacion_modificar_pre_reflexivos(error) {
  console.log(error);
}

function cargar_select_propiedades_pre_reflexivos() {
  objetoIdReco = document.getElementById("id_objeto_seleccionado").value;
  post_api(
    SERVER_PATH + "/api/properties",
    {
      id: objetoIdReco,
    },
    cargar_propiedades_select_modificar,
    error_cargar_propiedades_select_modificar
  );
}

function cargar_propiedades_select_modificar(json) {
  var ope = document.getElementById("proiedad_recoleccion_modificar");
  var opcion = document.createElement("option");
  var seleccionTipo = document.getElementById(
    "proiedad_recoleccion_modificar"
  ).value;
  opcion.innerHTML = "Seleccione..";
  opcion.value = "-6";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    if (seleccionTipo == option.value) {
      option.selected = true;
    }
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_propiedades_select_modificar(error) {
  alert(error);
}

function recuperar_ultimo_metodo_aprendizaje_escenario() {
  post_api(
    SERVER_PATH + "/api/get_metodo_aprendizaje",
    { id: 23 },
    consultar_tabla_escenarios,
    (res) => {
      console.log(res);
    }
  );
}

function abrirModalEscenarioSimulacion() {
  $("#modal_escenarios_simulacion").modal("show");
  consultar_tabla_escenarios();
}

function abrirModalEscenarioSimulacionModificar() {
  $("#modal_escenarios_simulacion").modal("show");
  consultar_tabla_escenarios_modificar();
}
function consultar_tabla_escenarios_modificar() {
  var mea = document.getElementById("id_modelo_reflexivo").value;
  metodo_calculo = mea;
  post_api(
    SERVER_PATH + "/api/get_simulation_scenario",
    { mea_id: mea },
    cargar_tabla_escenarios_simulacion,
    error_cargar_tabla_escenarios_simulacion
  );
}
function consultar_tabla_escenarios() {
  post_api(
    SERVER_PATH + "/api/get_simulation_scenario",
    { mea_id: metodo_calculo },
    cargar_tabla_escenarios_simulacion,
    error_cargar_tabla_escenarios_simulacion
  );
}

function cargar_tabla_escenarios_simulacion(json) {
  res = "";
  json.forEach((es) => {
    res += `<tr onClick="visibilidad_variables_valores('${es.id}');"> `;
    res += `<td><input type="radio" name="escenario_seleccionado" value="${
      es.id
    }" data-name="${es.name}" data-description="${
      es.description
    }" data-active="${es.active == 1}"></td>`;
    res += `<td>${es.id}</td>`;
    res += `<td>${es.name}</td>`;
    res += `<td>${es.description}</td>`;
    if (es.active == 1)
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_escenarios").innerHTML = res;
}

function error_cargar_tabla_escenarios_simulacion(error) {
  alert("error");
}

function cerrar_modal_escenarios_simulacion() {
  $("#modal_escenarios_simulacion").modal("hide");
}

function agregar_escenario_simulacion() {
  $("#modal_escenarios_simulacion").modal("hide");
  $("#modal_agregar_escenario_simulacion").modal("show");
}

function guardarEscenarioSimulacions() {
  var data = {
    name: document.getElementById("nombre_escenario_simulacion").value,
    description: document.getElementById("descripcion_escenario_simulacion")
      .value,
    mea_id: metodo_calculo,
  };
  post_api(
    SERVER_PATH + "/api/add_simulation_scenario",
    data,
    consultar_tabla_escenarios,

    error_guardar_escenarios_simulacion
  );
  document.getElementById("nombre_escenario_simulacion").value = "";
  document.getElementById("descripcion_escenario_simulacion").value = "";

  $("#modal_agregar_escenario_simulacion").modal("hide");
  setTimeout(consultar_tabla_escenarios, 100);
  $("#modal_escenarios_simulacion").modal("show");
}

function errorenviarDatos_escenarios_simulacion(error) {
  console.log(error);
}

function error_guardar_escenarios_simulacion(error) {
  alert(error);
}

function eliminar_escenario_simulacion() {
  var radio = document.getElementsByName("escenario_seleccionado");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro que desea eliminar el Escenario")) {
      post_api(
        SERVER_PATH + "/api/del_escenario_simulacion/",
        {
          id: id,
        },
        (res) => {
          console.log(res);
        },
        (res) => {
          console.log(res);
        }
      );
    }
    setTimeout(consultar_tabla_escenarios, 100);
  } else alert("Debe seleccionar un elemento para eliminar");
}

function modificar_escenario_simulacion() {
  var radio = document.getElementsByName("escenario_seleccionado");
  var id;
  var name;
  var descripcion;
  var activo;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      name = elem.dataset.name;
      descripcion = elem.dataset.description;
      activo = elem.dataset.active == "true";
      return;
    }
  });
  if (!!id && !!name && !!descripcion) {
    document.getElementById("id_escenario_simulacion").value = id;
    document.getElementById("nombre_escenario_simulacion_modificar").value =
      name;
    document.getElementById(
      "descripcion_escenario_simulacion_modificar"
    ).value = descripcion;
    document.getElementById("activoEscenarioSimulacion_modificar").checked =
      activo;
    $("#modal_escenarios_simulacion").modal("hide");
    $("#modal_modificar_escenario_simulacion").modal("show");
  } else alert("Debe seleccionar un elemento para modificar");
}

function ModificarEscenarioSimulacions() {
  var data = {
    id: document.getElementById("id_escenario_simulacion").value,
    name: document.getElementById("nombre_escenario_simulacion_modificar")
      .value,
    description: document.getElementById(
      "descripcion_escenario_simulacion_modificar"
    ).value,
    active: document.getElementById("activoEscenarioSimulacion_modificar")
      .checked,
  };
  post_api(
    SERVER_PATH + "/api/upd_simulation_scenario/",
    data,
    (res) => {
      console.log(res);
    },
    (res) => {
      console.log(res);
    }
  );
  setTimeout(consultar_tabla_escenarios, 100);
  $("#modal_modificar_escenario_simulacion").modal("hide");
  $("#modal_escenarios_simulacion").modal("show");
}
var escenarioSeleccionado = undefined;

function visibilidad_variables_valores(id) {
  document
    .getElementById("bt_add_variables_valor")
    .classList.replace("d-none", "inline-block");
  document
    .getElementById("bd_mod_variables_valor")
    .classList.replace("d-none", "inline-block");
  document
    .getElementById("bd_del_variables_valor")
    .classList.replace("d-none", "inline-block");
  document
    .getElementById("tabla_variables_valor_table")
    .classList.replace("d-none", "inline-block");
  consultar_tabla_valores_variables(id);
  escenarioSeleccionado = id;
}

function consultar_tabla_valores_variables(id) {
  post_api(
    SERVER_PATH + "/api/get_simulation_value/",
    {
      escenario: id,
      mea_id: metodo_calculo,
    },
    cargar_variables_valor_table,
    (res) => {
      console.log(res);
    }
  );
}

function cargar_variables_valor_table(json) {
  res = "";
  json.forEach((as) => {
    res += "<tr>";
    res += `<td><input type="radio" name="variable_valor_seleccionado" data-name="${as.nombre}"></td>`;
    res += `<td>${as.nombre_variable}</td>`;
    res += `<td>${as.valor}</td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_variables_valores").innerHTML = res;
}

function agregar_variables_valor() {
  $("#modal_escenarios_simulacion").modal("hide");
  $("#modal_agregar_variables_valores_simulacion").modal("show");
  consultar_variables_select(metodo_calculo);
}

function consultar_variables_select(mea_id) {
  post_api(
    SERVER_PATH + "/api/get_simulation_variable/",
    { mea_id: mea_id },
    cargar_variables_simulacion_select,
    (res) => {
      console.log(res);
    }
  );
}

function cerrar_modal_variables_valor() {
  $("#modal_escenarios_simulacion").modal("show");
  $("#modal_agregar_variables_valores_simulacion").modal("hide");
}

function validarSeleccionReflexivos() {
  var radio = document.getElementsByName("proceso_reflexivo_seleccionado");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!id) {
    alert("Debe seleccionar un proceso para modificar");
    return false;
  }
}
function abrirMapeoParametros_metodos_modificar() {
  $("#modal_modificar_mapeo_parametros_metodos").modal("show");
}
function modificar_informacion_boton_reflexivos(id) {
  $("#modificar_informacion_general_reflexivos.collapse").collapse("hide");
  $("#modificar_metodos_modelos_reflexivos.collapse").collapse("hide");
  $(`#${id}.collapse`).collapse("show");
  if (id == "modificar_informacion_general_reflexivos") {
    document
      .getElementById("informacion_general_modificar_btn")
      .classList.replace("btn-link", "btn-secondary");
    document
      .getElementById("metodos_modificar_btn")
      .classList.replace("btn-secondary", "btn-link");
  } else {
    document
      .getElementById("informacion_general_modificar_btn")
      .classList.replace("btn-secondary", "btn-link");
    document
      .getElementById("metodos_modificar_btn")
      .classList.replace("btn-link", "btn-secondary");
  }
}
cont_paso_modificar_reflexivos = 1;

function modificar_proceso_reflexivo_boton() {
  if (cont_paso_modificar_reflexivos == 1) {
    if (modificar_proceso_reflexivo()) {
      document
        .getElementById("btn-reflexivos-modificar")
        .classList.replace("d-none", "d-inline");
      document.getElementById(
        "btn-modificar_reflexivos"
      ).innerHTML = `Modificar (Metodos modelos)`;
      document.getElementById(
        "btn-saltar-modificar_reflexivos"
      ).innerHTML = `Saltar (Metodos modelos)`;
      saltar_paso++;
      $("#modificar_informacion_general_reflexivos.collapse").collapse("hide");
      $("#modificar_metodos_modelos_reflexivos.collapse").collapse("show");
      cont_paso_modificar_reflexivos++;
      cargar_select_metrica_indirecta_modificar_reflexivos();
    } else {
      alert("No se ha podido guardar, verifique todos los campos");
    }
  } else if (cont_paso_modificar_reflexivos == 2) {
    if (modificar_modelos_metodos_reflexivos()) {
      document
        .getElementById("btn-reflexivos-3-modificar")
        .classList.replace("d-none", "d-inline");
      document.getElementById("btn-modificar_reflexivos").innerHTML = `Salir`;
      document
        .getElementById("btn-modificar_reflexivos")
        .classList.replace("d-inline", "d-none");

      cont_paso_modificar_reflexivos++;
    } else {
      alert("No se ha podido guardar, verifique todos los campos metodos");
    }
  } else if (cont_paso_modificar_reflexivos == 3) {
    consultar_api(
      SERVER_PATH + "/api/procesos_pre_reflexive",
      cargar_procesos_pre_reflexivos_table,
      error_procesos_pre_reflexivos_table
    );
    history.back();
  }
}
var saltar_paso = 1;

function saltar_proceso_reflexivo_boton() {
  if (saltar_paso == 1) {
    document
      .getElementById("btn-reflexivos-modificar")
      .classList.replace("d-none", "d-inline");
    $("#modificar_informacion_general_reflexivos.collapse").collapse("hide");
    $("#modificar_metodos_modelos_reflexivos.collapse").collapse("show");
    saltar_paso++;
    cont_paso_modificar_reflexivos++;
    document
      .getElementById("modal_metodo_mod_reflexivos")
      .classList.replace("d-none", "d-block");
    document.getElementById(
      "btn-saltar-modificar_reflexivos"
    ).innerHTML = `Saltar (Información General)`;
    document
      .getElementById("informacion_general_modificar_btn")
      .classList.replace("btn-secondary", "btn-link");
    document
      .getElementById("metodos_modificar_btn")
      .classList.replace("btn-link", "btn-secondary");
  } else if (saltar_paso == 2) {
    document
      .getElementById("btn-reflexivos-modificar")
      .classList.replace("d-block", "d-none");
    $("#modificar_informacion_general_reflexivos.collapse").collapse("show");
    $("#modificar_metodos_modelos_reflexivos.collapse").collapse("hide");
    saltar_paso--;
    document.getElementById(
      "btn-saltar-modificar_reflexivos"
    ).innerHTML = `Saltar (Información General)`;
    document
      .getElementById("informacion_general_modificar_btn")
      .classList.replace("btn-link", "btn-secondary");
    document
      .getElementById("metodos_modificar_btn")
      .classList.replace("btn-secondary", "btn-link");
  }
}

function modificar_modelos_metodos_reflexivos() {
  document.getElementById(
    "inicio_metodos_reflexivos_modificar"
  ).disabled = true;
  document.getElementById("fin_metodos_reflexivos_modificar").disabled = true;
  document.getElementById(
    "metrica_indirecta_reflexivos_modificar"
  ).disabled = true;
  document.getElementById("indicador_modelo_modificar").disabled = true;
  document.getElementById(
    "mapeo_parametros_btn_modelo_modificar"
  ).disabled = false;
  document.getElementById("escenario_simulacion_modificar").disabled = false;
  document.getElementById(
    "btn-recomendaciones_model_modificar"
  ).disabled = false;
  document.getElementById("variables_simulacion_modificar").disabled = false;
  document.getElementById("escenario_simulacion_modificar").disabled = false;
  document.getElementById(
    "mapeo_parametros_btn_metodos_modificar"
  ).disabled = false;

  return true;
}

function cargar_select_metrica_indirecta_modificar_reflexivos() {
  var limpiar = document.getElementById(
    "metrica_indirecta_reflexivos_modificar"
  );

  var seleccionIndicador = document.getElementById(
    "Aspectos_autoconsciencia_modificar_reflexivos"
  );
  var tipo_valor =
    seleccionIndicador.options[seleccionIndicador.selectedIndex].text;
  tipoM = "INDIRECTA";
  data = {
    nombre: tipo_valor,
    tipo: tipoM,
  };
  post_api(
    SERVER_PATH + "/api/get_metrica_select",
    data,
    cargar_select_metrica_proceso_reflexivo_modificar,
    error_cargar_select_metrica_proceso_reflexivo_modificar
  );

  var limpiar3 = document.getElementById("indicador_modelo_modificar");
  var seleccion = document.getElementById(
    "Aspectos_autoconsciencia_modificar_reflexivos"
  );
  var tipo_valor_Indicador = seleccion.options[seleccion.selectedIndex].text;
  var tipoIndi = "INDICADOR";
  data2 = {
    nombre: tipo_valor_Indicador,
    tipo: tipoIndi,
  };
  post_api(
    SERVER_PATH + "/api/get_metrica_select",
    data2,
    cargar_select_indicador_proceso_reflexivo_modificar,
    error_cargar_select_indicador_proceso_reflexivo_modificar
  );
}

function cargar_select_metrica_proceso_reflexivo_modificar(json) {
  var ope = document.getElementById("metrica_indirecta_reflexivos_modificar");
  var seleccion = document.getElementById(
    "metrica_indirecta_reflexivos_modificar"
  ).value;
  console.log(seleccion);
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione..";
  opcion.value = "-6";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    if (seleccion == option.value) {
      option.selected = true;
    }
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_select_metrica_proceso_reflexivo_modificar() {
  alert("No se cargo el select metrica en el modal procesos reflexivo");
}

function cargar_select_indicador_proceso_reflexivo_modificar(json) {
  var ope = document.getElementById("indicador_modelo_modificar");
  var seleccion = document.getElementById("indicador_modelo_modificar").value;
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione..";
  opcion.value = "-6";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    if (seleccion == option.value) {
      option.selected = true;
    }
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_cargar_select_indicador_proceso_reflexivo_modificar() {
  alert("No se cargo el indicar metrica en el modal procesos");
}

function modificar_proceso_reflexivo() {
  var nombre = document.getElementById(
    "input-name-proceso-reflexivo_modificar"
  ).value;
  var descripcion = document.getElementById(
    "input-descripcion-proceso-reflexivo_modificar"
  ).value;
  var inicio = document.getElementById(
    "inicio_del_periodo_reflexivo_modificar"
  ).value;
  var fin = document.getElementById(
    "fin_del_periodo_reflexivo_modificar"
  ).value;
  var id = document.getElementById("id_proceso_reflexivo_modificar").value;
  if (!!nombre && !!descripcion) {
    data = {
      nombre: nombre,
      descripcion: descripcion,
      inicio: inicio,
      fin: fin,
      id: id,
    };
    post_api(
      SERVER_PATH + "/api/mod_process_pre_reflexive/",
      data,
      mensaje_exitoModificarproceso_reflexivo,
      mensaje_errorModificarproceso_reflexivo
    );
    document.getElementById(
      "input-name-proceso-reflexivo_modificar"
    ).disabled = true;
    document.getElementById(
      "input-descripcion-proceso-reflexivo_modificar"
    ).disabled = true;
    document.getElementById(
      "inicio_del_periodo_reflexivo_modificar"
    ).disabled = true;
    document.getElementById(
      "fin_del_periodo_reflexivo_modificar"
    ).disabled = true;
    document
      .getElementById("modal_metodo_mod_reflexivos")
      .classList.replace("d-none", "d-block");
    return true;
  } else {
    return false;
  }
}

function mensaje_exitoModificarproceso_reflexivo(json) {
  console.log(json);
}

function mensaje_errorModificarproceso_reflexivo(error) {
  alert(error);
}

/*if (
  document.getElementById("lista_sujetos_activos_proceso_reflexivo_modificar")
)
  consultar_api(
    SERVER_PATH + "/api/subjects",
    cargar_sujetos_activos_procesos_modificar_reflexivos,
    error_cargar_sujetos_activos_procesos_modificar_reflexivos
  );*/

function cargar_sujetos_activos_procesos_modificar_reflexivos(json) {
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.padre && elemento.activo == 1) {
      aux_visible_activo.add(elemento.padre);
    } else if (!!elemento.padre && elemento.activo == 0) {
      aux_visible_inactivo.add(elemento.padre);
    }
  });
  var idModificar = document.getElementById("id_sujeto").value;
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.padre) {
      insertar = document.getElementById(
        "lista_sujetos_activos_proceso_reflexivo_modificar"
      );
    } else {
      insertar = document.createElement("ul");
      document
        .getElementById(`li_entidad_seleccionado_${elemento.padre}`)
        .appendChild(insertar);
    }
    li = document.createElement("li");
    li.id = `li_entidad_seleccionado_${elemento.id}`;
    if (elemento.activo == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `sujeto_seleccionado_${elemento.id}`;
    checkbox.disabled = true;
    checkbox.name = "checkbox_sujetos_procesos_modificar_reflexivos";
    checkbox.dataset.padre_id = elemento.padre;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.nombre;
    checkbox.setAttribute("onclick", "");
    if (checkbox.dataset.puro_id == idModificar) {
      checkbox.checked = true;
    }
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.nombre;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function agregarAccionesUmbralesReflexivos() {
  $("#modal_agregar_accion_proceso_reflexivo").modal("show");
  $("#modal_activos_procesos_reflexivos").modal("hide");
  document.getElementById("descripcion_accion_umbral_reflexivo").value = "";
}

function guardarAccionUmbralReflexivos() {
  recomendacionesReflexivo = true;
  data = {
    description: document.getElementById("descripcion_accion_umbral_reflexivo")
      .value,
    umbral: UmbralId,
    mea_id: modelo_analisis_reflexivos,
  };
  if (!!data.description) {
    post_api(
      SERVER_PATH + "/api/add_action",
      data,
      mensajeExitosoAgregarAccionesUmbralesReflexivos,
      (res) => {
        console.log(res);
      }
    );
    $("#modal_agregar_accion_proceso_reflexivo").modal("hide");
    $("#modal_activos_procesos_reflexivos").modal("show");
  }
}

function modificarAccionesUmbralesReflexivos() {
  var radio = document.getElementsByName("accion_seleccionada_reflexivos");
  var id;
  var descripcion;
  var activo;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.dataset.id;
      descripcion = elem.dataset.description;
      activo = elem.dataset.active == 1;
      return;
    } else {
      console.log("No llega");
    }
  });
  if (!!id && !!descripcion) {
    $("#modal_activos_procesos_reflexivo").modal("hide");
    document.getElementById("id_accion_umbral_modificar_reflexivo").value = id;

    document.getElementById(
      "descripcion_accion_umbral_modificar_reflexivo"
    ).value = descripcion;
    document.getElementById(
      "activo_accion_umbral_modificar_reflexivo"
    ).checked = activo;

    $("#modal_modificar_accion_umbral_reflexivos").modal("show");
  } else alert("Debe seleccionar un elemento para modificar");
}

function guardarModificacionAccionesUmbralesReflexivos() {
  var data = {
    id: document.getElementById("id_accion_umbral_modificar_reflexivo").value,
    description: document.getElementById(
      "descripcion_accion_umbral_modificar_reflexivo"
    ).value,
    active: document.getElementById("activo_accion_umbral_modificar_reflexivo")
      .checked,
  };
  post_api(
    SERVER_PATH + "/api/upd_action/",
    data,
    mensajeExitosoAgregarAccionesUmbralesReflexivos,
    (res) => {
      console.log(res);
    }
  );
  $("#modal_modificar_accion_umbral_reflexivos").modal("hide");
  $("#modal_activos_procesos_reflexivos").modal("show");
}

function eliminarAccionesUmbralesReflexivos() {
  var radio = document.getElementsByName("accion_seleccionada_reflexivos");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.dataset.id;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro que desea eliminar esta accion")) {
      data = {
        id: id,
      };
      post_api(
        SERVER_PATH + "/api/del_action/",
        data,
        mensajeExitosoAgregarAccionesUmbralesReflexivos,
        (res) => {
          console.log(res);
        }
      );
    }
  } else alert("Debe seleccionar un elemento para eliminar");
}

function mensajeExitosoAgregarAccionesUmbralesReflexivos(json) {
  post_api(
    SERVER_PATH + "/api/get_action",
    {
      umbral: UmbralId,
      mea_id: modelo_analisis_reflexivos,
    },
    cargar_accion_table_reflexivos_modificar,
    (res) => {
      console.log(res);
    }
  );
}

function error_cargar_sujetos_activos_procesos_modificar_reflexivos(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}

function cargar_lista_umbrales_proceso_reflexivo(json) {
  document
    .getElementById("bt_add_activo_reflexivos")
    .classList.replace("inline-block", "d-none");
  document
    .getElementById("bd_mod_activo_reflexivos")
    .classList.replace("inline-block", "d-none");
  document
    .getElementById("bd_del_activo_reflexivos")
    .classList.replace("inline-block", "d-none");

  res = "";
  document.getElementById("seccion_acciones_reflexivos").innerHTML = "";
  json.umbrales.forEach((cd) => {
    res += `<tr onClick="visibilidad_acciones_umbral_reflexivo('${cd.id}')" id='tr_accion_reflexivo_${cd.id}' name='tr_accion_reflexivo_'>`;
    res += `<td>${cd.id}</td>`;
    res += `<td>${cd.name}</td>`;
    res += `<td>${cd.interpretacion}</td>`;
    res += `<td>${cd.inferior}</td>`;
    res += `<td>${cd.superior}</td>`;
    res += "</tr>";

    post_api(
      SERVER_PATH + "/api/get_action",
      {
        umbral: cd.id,
        mea_id: modelo_analisis_reflexivos,
      },
      cargar_accion_table_reflexivos,
      (res) => {
        console.log("Error al cargar la tabla accion" + res);
      }
    );
  });
  document.getElementById("tabla_umbrales_procesos_reflexivos").innerHTML = res;
}

var UmbralId = undefined;

function visibilidad_acciones_umbral_reflexivo(id) {
  document
    .getElementById("bt_add_activo_reflexivos")
    .classList.replace("d-none", "inline-block");
  document
    .getElementById("bd_mod_activo_reflexivos")
    .classList.replace("d-none", "inline-block");
  document
    .getElementById("bd_del_activo_reflexivos")
    .classList.replace("d-none", "inline-block");
  var tabla = document.getElementsByName("tr_accion_reflexivo_");
  tabla.forEach((tr) => {
    tr.style.backgroundColor = "rgba(0,0,0,0)";
  });
  document.getElementById(`tr_accion_reflexivo_${id}`).style.backgroundColor =
    "rgba(0,0,0,0.15)";
  var dato = document.getElementById("umbral_reflexivo_" + id);

  if (dato) {
    if (UmbralId) {
      dato_anterior = document.getElementById("umbral_reflexivo_" + UmbralId);
      dato_anterior.style.display = "none";
    }
    dato.style.display = "table";
  }
  UmbralId = id;
}

function error_cargar_lista_umbrales_proceso_reflexivo(err) {
  alert("No se puede cargar los umbrales" + err);
}

function cargar_accion_table_reflexivos(json) {
  console.log(json);
  var templeate = document
    .getElementById("templeate_tabla_accion_reflexivos")
    .content.cloneNode(true);
  var seccion = document.getElementById("seccion_acciones_reflexivos");
  var body = templeate.querySelector("tbody");
  json.acciones.forEach((um) => {
    var fila = document.createElement("tr");
    var dato = document.createElement("td");
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "accion_seleccionada_reflexivos";
    input.dataset.id = um.id;
    input.dataset.description = um.description;
    input.dataset.activo = um.active;
    input.dataset.id_umbra = json.umbral_id;
    dato.appendChild(input);
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.id;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.description;
    fila.appendChild(dato);
    input = document.createElement("input");
    input.type = "checkbox";
    input.disabled = true;
    input.checked = um.active == 1;
    dato = document.createElement("td");
    dato.appendChild(input);
    fila.appendChild(dato);
    body.appendChild(fila);
  });
  body.id += "_" + json.umbral_id;
  var tabla = templeate.querySelector(".table");
  tabla.id = "umbral_reflexivo_" + json.umbral_id;
  tabla.style.display = "none";
  seccion.appendChild(templeate);
}
function cargar_accion_table_reflexivos_modificar(json) {
  var templeate = document
    .getElementById("templeate_tabla_accion_reflexivos")
    .content.cloneNode(true);
  var seccion = document.getElementById("seccion_acciones_reflexivos");
  var body = templeate.querySelector("tbody");
  json.acciones.forEach((um) => {
    var fila = document.createElement("tr");
    var dato = document.createElement("td");
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "accion_seleccionada_reflexivos";
    input.dataset.id = um.id;
    input.dataset.description = um.description;
    input.dataset.active = um.active;
    dato.appendChild(input);
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.id;
    fila.appendChild(dato);
    dato = document.createElement("td");
    dato.innerHTML = um.description;
    fila.appendChild(dato);
    input = document.createElement("input");
    input.type = "checkbox";
    input.disabled = true;
    input.checked = um.active == 1;
    dato = document.createElement("td");
    dato.appendChild(input);
    fila.appendChild(dato);
    body.appendChild(fila);
  });
  body.id += "_" + json.umbral_id;
  var tabla = templeate.querySelector(".table");
  tabla.id = "umbral_reflexivo_" + json.umbral_id;
  var tablaMod = document.getElementById(tabla.id);
  if (tablaMod) {
    seccion.replaceChild(tabla, tablaMod);
  } else {
    tabla.style.display = "none";
    seccion.appendChild(templeate);
  }
}

function recomendaciones_procesos_reflexivos() {
  var criterio = document.getElementById("criterio_de_decision_modelo").value;
  post_api(
    SERVER_PATH + "/api/get_umbral",
    { criterio: criterio },
    cargar_lista_umbrales_proceso_reflexivo,
    (res) => {
      console.log(res);
    }
  );
  $("#modal_activos_procesos_reflexivos").modal("show");
}

function AbrirModalAgregarVariablesSimulacion() {
  $("#modal_variables_simulacion").modal("show");
  consultar_tabla_varibles();
}
function AbrirModalAgregarVariablesSimulacionModificar() {
  var guardarButton = document.getElementById("bt_add_escenario_simulacion");
  var modificarButton = document.getElementById("bd_mod_escenario_simulacion");
  guardarButton.classList.replace("d-inline-block", "d-none");
  modificarButton.classList.replace("d-inline-block", "d-none");
  $("#modal_variables_simulacion").modal("show");
  consultar_tabla_variables_modificar();
}

function consultar_tabla_variables_modificar() {
  var mea_id = document.getElementById("id_modelo_reflexivo").value;
  post_api(
    SERVER_PATH + "/api/get_simulation_variable/",
    { mea_id: mea_id },
    cargar_tabla_variables_simulacion,
    (res) => {
      console.log(res);
    }
  );
}
function consultar_tabla_varibles() {
  post_api(
    SERVER_PATH + "/api/get_simulation_variable/",
    { mea_id: metodo_calculo },
    cargar_tabla_variables_simulacion,
    (res) => {
      console.log(res);
    }
  );
}

function cerrar_modal_variables_simulacion() {
  $("#modal_variables_simulacion").modal("hide");
}

function cargar_tabla_variables_simulacion(json) {
  res = "";
  json.forEach((as) => {
    res += "<tr>";
    res += `<td><input type="radio" name="variable_simulacion_seleccionada" value="${
      as.id
    }" data-name="${as.name}" data-active="${as.active == 1}"></td>`;
    res += `<td>${as.id}</td>`;
    res += `<td>${as.name}</td>`;
    if (as.active == 1)
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tabla_variables_simulacion").innerHTML = res;
}

function agregar_variables_simulacion() {
  $("#modal_variables_simulacion").modal("hide");
  $("#modal_agregar_variables_simulacion").modal("show");
  document.getElementById("nombre_variable_simulacion").value = "";
}

function guardarVariableSimulacion() {
  var nombre = document.getElementById("nombre_variable_simulacion").value;
  post_api(
    SERVER_PATH + "/api/add_simulation_variable/",
    {
      name: nombre,
      mea_id: metodo_calculo,
    },
    variables_guardadas_correctamente,
    error_guardando_variables
  );
  variables_guardadas_correctamente();
}

function errorenviarDatos_variables_simulacion(error) {
  console.log(error);
}
function variables_guardadas_correctamente(json) {
  $("#modal_variables_simulacion").modal("show");
  $("#modal_agregar_variables_simulacion").modal("hide");
  setTimeout(consultar_tabla_varibles, 100);
}
function cerrar_agregar_variables_simulacion() {
  $("#modal_variables_simulacion").modal("show");
  $("#modal_agregar_variables_simulacion").modal("hide");
  setTimeout(consultar_tabla_varibles, 100);
}

function error_guardando_variables(error) {
  alert(error);
}

function eliminar_variables_simulacion() {
  var radio = document.getElementsByName("variable_simulacion_seleccionada");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro de que desea eliminar la variable")) {
      post_api(
        SERVER_PATH + "/api/del_simulation_variable/",
        {
          id: id,
        },
        (res) => {
          console.log(res);
        },
        (res) => {
          console.log(res);
        }
      );
    }
    setTimeout(consultar_tabla_varibles, 100);
  } else alert("Debe seleccionar un elemento para eliminar");
}

function modificar_variables_simulacion() {
  var radio = document.getElementsByName("variable_simulacion_seleccionada");
  var id;
  var name;
  var activo;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      name = elem.dataset.name;
      activo = elem.dataset.active == "true";
      return;
    }
  });
  if (!!id && !!name) {
    document.getElementById("id_variable_simulacion").value = id;
    document.getElementById("nombre_variable_simulacion_modificar").value =
      name;
    document.getElementById("activoVariableSimulacion_modificar").checked =
      activo;
    $("#modal_variables_simulacion").modal("hide");
    $("#modal_modificar_variable_simulacion").modal("show");
  } else alert("Debe seleccionar un elemento para modificar");
}

function ModificarVariableSimulacions() {
  var data = {
    id: document.getElementById("id_variable_simulacion").value,
    name: document.getElementById("nombre_variable_simulacion_modificar").value,
    active: document.getElementById("activoVariableSimulacion_modificar")
      .checked,
  };
  post_api(
    SERVER_PATH + "/api/upd_simulation_variable/",
    data,
    (res) => {
      console.log(res);
    },
    (res) => {
      console.log(res);
    }
  );
  setTimeout(consultar_tabla_varibles, 100);
  $("#modal_modificar_variable_simulacion").modal("hide");
  $("#modal_variables_simulacion").modal("show");
}

function cargar_variables_simulacion_select(json) {
  var ope = document.getElementById("seleccionar_variable_simulacion");
  var opcion = document.createElement("option");
  opcion.innerHTML = "Seleccione..";
  opcion.value = "-6";
  ope.innerHTML = "";
  ope.appendChild(opcion);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    ope.appendChild(option);
  });
}

function guardarvariables_valor() {
  var vs_id = document.getElementById("seleccionar_variable_simulacion").value;
  var data = {
    escenario: escenarioSeleccionado,
    variable: vs_id,
    valor: document.getElementById("agregar_valor_simulacion").value,
  };

  post_api(
    SERVER_PATH + "/api/add_simulation_value/",
    data,
    correcto_guardado_variables_valor,
    (res) => {
      alert("La variable de simulaciòn ya tiene asignado un valor");
    }
  );
  correcto_guardado_variables_valor();
}

function correcto_guardado_variables_valor(json) {
  document.getElementById("agregar_valor_simulacion").value = "";
  $("#modal_agregar_variables_valores_simulacion").modal("hide");
  $("#modal_escenarios_simulacion").modal("show");
  setTimeout(consultar_tabla_valores_variables(escenarioSeleccionado), 100);
}

function elminarProcesoReflexivo() {
  var radio = document.getElementsByName("proceso_reflexivo_seleccionado");
  var id;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro de que desea eliminar el Proceso")) {
      data = {
        id: id,
      };
      post_api(
        SERVER_PATH + "/api/del_reflective_process/",
        data,
        mensaje_exitosBorrar_reflexivo,
        mensaje_errorBorrar_pre_reflexivo
      );
      setTimeout(mensaje_exitosBorrar_reflexivo, 200);
    }
  } else alert("Debe seleccionar un proceso para eliminar");
}

function mensaje_exitosBorrar_reflexivo(json) {
  consultar_api(
    SERVER_PATH + "/api/get_reflective_process",
    cargar_procesos_reflexivos_table,
    mensaje_errorBorrar_reflexivo
  );
}

function mensaje_errorBorrar_reflexivo(error) {
  alert(err);
}

//Nuevas cosas que se aumentaron Aspectos y Metricas
//PARTE METRICAAAS ////////////////////////////////

if (document.getElementById("TableMetrics")) {
  cargar_tabla_metricas();
}

if (document.getElementById("escalas_seccion_entidad"))
  consultar_api(
    SERVER_PATH + "/api/get_scales",
    cargar_escalas_select,
    error_escalas_select
  );

function cargar_escalas_select(json) {
  var ope = document.getElementById("escalas_seccion_entidad");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    ope.appendChild(option);
  });
}

function error_escalas_select(err) {
  console.log("Error al cargar las escalas select: " + err);
}

if (document.getElementById("unidad_medida_metrica"))
  consultar_api(
    SERVER_PATH + "/api/get_measurement_units",
    cargar_unidades_de_medida_select,
    error_cargar_unidades_de_medida_select
  );

function cargar_unidades_de_medida_select(json) {
  var ope = document.getElementById("unidad_medida_metrica");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.name;
    ope.appendChild(option);
  });
}

function error_cargar_unidades_de_medida_select(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

function agregarMetrica() {
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    { tipo: "TIPO_PERSPECTIVA" },
    cargar_select_tipo_perspectiva,
    (err) => {
      alert(err);
    }
  );
  var guardarButton = document.getElementById("agregarMetricaButton");
  var modificarButton = document.getElementById("ModificarMetricaButton");
  document.getElementById("Titulos_metricas").innerHTML = "Agregar Métrica";
  guardarButton.classList.replace("d-none", "d-inline-block");
  modificarButton.classList.replace("d-inline-block", "d-none");
  document.getElementById("escalas_seccion_entidad").value = "-6";
  document.getElementById("unidad_medida_metrica").value = "-6";
  document.getElementById("select_metrica").value = "-6";
  document.getElementById("nombreMetrica").value = "";
  document.getElementById("descripcionMetrica").value = "";
  document.getElementById("abreviaturaMetrica").value = "";
  document.getElementById("tipo_perspectiva_select").value = "-6";
  $("#add_metrics").modal("show");
  get_tipo_metrica_select();
}

function get_tipo_metrica_select() {
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    { tipo: "TIPO_METRICA" },
    cargar_tipo_metrica_select,
    error_cargar_tipo_metrica_select
  );
}

function cargar_tipo_metrica_select(json) {
  console.log("ESTA CARGANDO LAS METRICAS");
  var ope = document.getElementById("select_metrica");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    option.id = `selected_metrica_${element.id}`;
    ope.appendChild(option);
  });
}

function error_cargar_tipo_metrica_select(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

function GuardarMetrica() {
  document.getElementById("Titulos_metricas").innerHTML = "Agregar Métrica";
  var escala = document.getElementById("escalas_seccion_entidad").value;
  var unidad = document.getElementById("unidad_medida_metrica").value;
  var tipo = document.getElementById("select_metrica").value;
  var perspective = document.getElementById("tipo_perspectiva_select").value;
  if (perspective == "-6") {
    perspective = 48;
  }
  var data = {
    name: document.getElementById("nombreMetrica").value,
    description: document.getElementById("descripcionMetrica").value,
    abbreviation: document.getElementById("abreviaturaMetrica").value,
    perspective: perspective,
    scale: escala,
    unit: unidad,
    type_metric: tipo,
    active: document.getElementById("activoMetrica").checked,
  };
  if (
    !!data.name &&
    !!data.description &&
    !!data.abbreviation &&
    data.scale != -6 &&
    data.unit != -6 &&
    data.type_metric != -6
  ) {
    post_api(
      SERVER_PATH + "/api/add_metrics/",
      data,
      mensaje_exitoEnvioMetrica,
      mensaje_errorEnvioMetrica
    );
    CancelarGuardarMetrica();
  } else {
    alert("Debe llenar todos los campos");
  }
}

function CancelarGuardarMetrica() {
  document.getElementById("escalas_seccion_entidad").value = "-6";
  document.getElementById("unidad_medida_metrica").value = "-6";
  document.getElementById("select_metrica").value = "-6";
  document.getElementById("nombreMetrica").value = "";
  document.getElementById("descripcionMetrica").value = "";
  document.getElementById("abreviaturaMetrica").value = "";
  $("#add_metrics").modal("hide");
}

function cargar_tabla_metricas() {
  consultar_api(
    SERVER_PATH + "/api/get_metrics",
    cargar_metrica_table,
    error_cargar_metrica_table
  );
}

function mensaje_exitoEnvioMetrica(json) {
  cargar_tabla_metricas();
}

function mensaje_errorEnvioMetrica(err) {
  alert(err);
}

function cargar_metrica_table(json) {
  res = "";
  json.forEach((met) => {
    if (met.perspectiva_nombre == "NULL") {
      met.perspectiva_nombre = " ";
    }
    res += "<tr>";
    res += `<td><input type="radio" name="metrica_seleccionado" value="${
      met.id
    }" data-name="${met.name}" data-description="${
      met.description
    }" data-perspective="${met.perspectiva}" data-tipo="${
      met.tipo_id
    }" data-abreviatura="${met.abbreviation}" data-activo="${
      met.active == 1
    }" data-scale="${met.scale}" data-unit="${met.unit}"></td>`;
    res += `<td>${met.id}</td>`;
    res += `<td>${met.name}</td>`;
    res += `<td>${met.description}</td>`;
    res += `<td>${met.abbreviation}</td>`;
    res += `<td>${met.perspectiva_nombre}</td>`;
    res += `<td>${met.met_type}</td>`;
    if (met.active == 1)
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("TableMetrics").innerHTML = res;
}

function error_cargar_metrica_table(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}
function get_tipo_perspectiva_select() {
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    { tipo: "TIPO_PERSPECTIVA" },
    cargar_select_tipo_perspectiva,
    (json) => {
      console.log(json);
    }
  );
}
function modificarMetrica() {
  var radio = document.getElementsByName("metrica_seleccionado");
  var id = false;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
    }
  });
  if (!!id) {
    get_tipo_perspectiva_select();
    var guardarButton = document.getElementById("agregarMetricaButton");
    var modificarButton = document.getElementById("ModificarMetricaButton");
    guardarButton.classList.replace("d-none", "d-inline-block");
    modificarButton.classList.replace("d-inline-block", "d-none");
    document.getElementById("escalas_seccion_entidad").value = "-6";
    document.getElementById("unidad_medida_metrica").value = "-6";
    document.getElementById("select_metrica").value = "-6";
    document.getElementById("nombreMetrica").value = "";
    document.getElementById("descripcionMetrica").value = "";
    document.getElementById("abreviaturaMetrica").value = "";
    $("#add_metrics").modal("show");
    post_api(
      SERVER_PATH + "/api/get_enumeracion",
      { tipo: "TIPO_METRICA" },
      cargar_tipo_metrica_select_modificar,
      error_cargar_tipo_metrica_select
    );
  } else {
    alert("Debe seleccionar una Métrica para modificar");
  }
}

function cargar_tipo_metrica_select_modificar(json) {
  var ope = document.getElementById("select_metrica");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    option.id = `selected_metrica_${element.id}`;
    ope.appendChild(option);
  });
  var radio = document.getElementsByName("metrica_seleccionado");
  var id;
  var name;
  var descripcion;
  var abbreviation;
  var perspective;
  var escale;
  var unidad;
  var tipo_metrica;
  var active;
  radio.forEach((elem) => {
    if (elem.checked) {
      id = elem.value;
      name = elem.dataset.name;
      descripcion = elem.dataset.description;
      abbreviation = elem.dataset.abreviatura;
      perspective = elem.dataset.perspective;
      escale = elem.dataset.scale;
      unidad = elem.dataset.unit;
      tipo_metrica = elem.dataset.tipo;
      active = elem.dataset.activo == "true";
      return;
    }
  });
  if (!!id && !!name && !!descripcion && !!abbreviation) {
    var guardarButton = document.getElementById("agregarMetricaButton");
    var modificarButton = document.getElementById("ModificarMetricaButton");
    guardarButton.classList.replace("d-inline-block", "d-none");
    modificarButton.classList.replace("d-none", "d-inline-block");
    document.getElementById("Titulos_metricas").innerHTML = "Modificar Métrica";
    document.getElementById("activoMetrica").disabled = false;
    document.getElementById("id_metrica_nueva").value = id;
    document.getElementById("nombreMetrica").value = name;
    document.getElementById("descripcionMetrica").value = descripcion;
    document.getElementById("abreviaturaMetrica").value = abbreviation;
    if (perspective == "48") {
      document.getElementById("tipo_perspectiva_select").disabled = true;
      document.getElementById("tipo_perspectiva_select").value = -6;
    } else {
      console.log(perspective);
      document.getElementById("tipo_perspectiva_select").value = perspective;
      document.getElementById("tipo_perspectiva_select").disabled = false;
    }
    document.getElementById("escalas_seccion_entidad").value = escale;
    document.getElementById("unidad_medida_metrica").value = unidad;
    document.getElementById("select_metrica").value = tipo_metrica;
    document.getElementById(`selected_metrica_${tipo_metrica}`).selected = true;
    document.getElementById("activoMetrica").checked = active;
    $("#add_metrics").modal("show");
  } else {
    alert("ebe seleccionar un elemento para modificar");
  }
}

function Guardar_Modificacion_Metrica() {
  var perspective = document.getElementById("tipo_perspectiva_select").value;
  if (perspective == -6) {
    perspective = 48;
  }
  var data = {
    id: document.getElementById("id_metrica_nueva").value,
    name: document.getElementById("nombreMetrica").value,
    description: document.getElementById("descripcionMetrica").value,
    abbreviation: document.getElementById("abreviaturaMetrica").value,
    perspective: perspective,
    scale: document.getElementById("escalas_seccion_entidad").value,
    unit: document.getElementById("unidad_medida_metrica").value,
    type_metric: document.getElementById("select_metrica").value,
    active: document.getElementById("activoMetrica").checked,
  };
  if (
    !!data.id &&
    !!data.name &&
    !!data.description &&
    !!data.abbreviation &&
    !!data.perspective &&
    data.scale != -6 &&
    data.unit != -6 &&
    data.type_metric != -6
  ) {
    post_api(
      SERVER_PATH + "/api/mod_metrics/",
      data,
      mensaje_exitoEnvioMetrica,
      mensaje_errorEnvioMetrica
    );
    CancelarGuardarMetrica();
  } else {
    alert("Debe completar todos los campos");
  }
}

function eliminarMetrica() {
  var radio = document.getElementsByName("metrica_seleccionado");
  var id;
  radio.forEach((rad) => {
    if (rad.checked) {
      id = rad.value;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro de que desea eliminar el recurso")) {
      post_api(
        SERVER_PATH + "/api/del_metrics/",
        {
          id: id,
        },
        (res) => {
          cargar_tabla_metricas();
          console.log(res);
        },
        (res) => {
          console.log(res);
        }
      );
    }
  } else {
    alert("No se ha seleccionado ningun recurso");
  }
}
//PARTE ASPECTOOOOOOOS

function cargar_sujetos_activos_aspectos(json) {
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.father && elemento.active == 1) {
      aux_visible_activo.add(elemento.father);
    } else if (!!elemento.father && elemento.active == 0) {
      aux_visible_inactivo.add(elemento.father);
    }
  });
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.father) {
      insertar = document.getElementById("lista_sujetos_activos_aspectos");
    } else {
      insertar = document.createElement("ul");
      document
        .getElementById(`li_entidad_seleccionado_${elemento.father}`)
        .appendChild(insertar);
    }
    li = document.createElement("li");
    li.id = `li_entidad_seleccionado_${elemento.id}`;
    if (elemento.active == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_de_${elemento.father}_seleccionado`,
      "checkbox_seleccionado"
    );
    checkbox.id = `sujeto_seleccionado_${elemento.id}`;
    checkbox.name = "checkbox_sujetos_aspectos";
    checkbox.dataset.padre_id = elemento.father;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.name;
    checkbox.setAttribute("onclick", "verificarSeleccionAspectos(this);");
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.name;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function error_cargar_sujetos_activos_aspectos(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}
var systemID = undefined;
var sujeto_aspecto_id = undefined;

function verificarSeleccionAspectos(elemento) {
  var checkbox = document.getElementsByName("checkbox_sujetos_aspectos");
  var auxChecked = elemento.checked;
  systemID = elemento.dataset.puro_id;
  sujeto_aspecto_id = elemento.dataset.puro_id;
  Array.from(checkbox).forEach((element) => {
    element.checked = false;
  });
  elemento.checked = auxChecked;
  document.getElementById("CategoriaEntidadesAspectos").disabled = false;
}

$("#CategoriaEntidadesAspectos").change(function () {
  var limpiar2 = document.getElementById(
    "lista_entidades_seleccionadas_aspectos"
  );
  limpiar2.innerHTML = "";
  var seleccion = document.getElementById("CategoriaEntidadesAspectos");
  var tipo_valor = seleccion.options[seleccion.selectedIndex].text;

  tipo_valor = sin_tilde(tipo_valor);
  data = {
    valorS: tipo_valor,
    systemID: systemID,
  };

  post_api(
    SERVER_PATH + "/api/entitys",
    data,
    cargar_posibles_entidades_modelo_aspecto,
    error_cargar_posibles_entidades_modelo_aspecto
  );
});

function cargar_posibles_entidades_modelo_aspecto(json) {
  console.log(json);
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.padre && elemento.activo == 1) {
      aux_visible_activo.add(elemento.padre);
    } else if (!!elemento.padre && elemento.activo == 0) {
      aux_visible_inactivo.add(elemento.padre);
    }
  });
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.padre) {
      insertar = document.getElementById(
        "lista_entidades_seleccionadas_aspectos"
      );
    } else {
      insertar = document.createElement("ul");
      var insertarAux = document.getElementById(
        `li_ent_seleccionado_${elemento.padre}`
      );
      if (insertarAux) {
        insertarAux.appendChild(insertar);
      } else {
        insertar = document.getElementById(
          "lista_entidades_seleccionadas_aspectos"
        );
      }
    }
    li = document.createElement("li");
    li.id = `li_ent_seleccionado_${elemento.id}`;
    if (elemento.activo == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_entidad_de_${elemento.padre}_seleccionado`,
      "checkbox_seleccionado_entidad"
    );
    checkbox.id = `sujeto_seleccionado_aspectos_${elemento.id}`;
    checkbox.name = "checkbox_entidades_aspectos";
    checkbox.dataset.padre_id = elemento.padre;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.nombre;
    checkbox.setAttribute("onclick", "activarFormularioAspecto(this);");
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.nombre;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}

function error_cargar_posibles_entidades_modelo_aspecto(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}
var objeto_aspecto_id = undefined;

function activarFormularioAspecto(elemento) {
  document.getElementById("nombreAspecto").disabled = false;
  document.getElementById("descripcionAspecto").disabled = false;
  document.getElementById("pesoAspecto").disabled = false;
  document.getElementById("select_aspecto").disabled = false;
  objeto_aspecto_id = elemento.dataset.puro_id;
}

if (document.getElementById("select_aspecto")) {
  cargar_select_tipo_as();
}

function agregarAspectos() {
  document.getElementById("lista_sujetos_activos_aspectos").innerHTML = "";
  consultar_api(
    SERVER_PATH + "/api/subjects",
    cargar_sujetos_activos_aspectos,
    error_cargar_sujetos_activos_aspectos
  );
  var guardarButton = document.getElementById("guardarAspectoButton");
  var modificarButton = document.getElementById("modificarAspectoButtom");
  guardarButton.classList.replace("d-none", "inline-block");
  modificarButton.classList.replace("inline-block", "d-none");
  limpiarFomulario();
  $("#add_aspects").modal("show");
}

function cargar_select_tipo_as() {
  var tipo = "TIPO_ASPECTO";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_select_tipo_aspecto,
    error_select_tipo_aspecto
  );
}

function cargar_select_tipo_aspecto(json) {
  var ope = document.getElementById("select_aspecto");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function cargar_select_tipo_as_mod() {
  var tipo = "TIPO_ASPECTO";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_select_tipo_aspecto_mod,
    error_select_tipo_aspecto
  );
}

function cargar_select_tipo_aspecto_mod(json) {
  var ope = document.getElementById("select_aspecto_mod");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function error_select_tipo_aspecto() {
  alert("No se logro cargar los datos en selec tipo del Modal Aspectos");
}

function guardarAspecto() {
  var entitys = document.getElementsByName("checkbox_entidades_aspectos");
  var selectedEntitys = [];
  for (var i = 0; i < entitys.length; i++) {
    if (entitys[i].checked) {
      selectedEntitys.push(entitys[i].dataset.puro_id);
    }
  }
  weigth = document.getElementById("pesoAspecto").value;
  if (parseFloat(weigth) > 1) {
    alert("Peso debe estar entre 0 y 1");
  } else {
    var data = {
      name: document.getElementById("nombreAspecto").value,
      description: document.getElementById("descripcionAspecto").value,
      weigth: document.getElementById("pesoAspecto").value,
      type: document.getElementById("select_aspecto").value,
      suj_id: sujeto_aspecto_id,
      arr_entity: selectedEntitys,
      aa_alcance: 53,
    };
  }
  if (
    !!data.name &&
    !!data.description &&
    !!data.weigth &&
    data.type != -6 &&
    !!data.suj_id &&
    selectedEntitys.length > 0
  ) {
    post_api(
      SERVER_PATH + "/api/add_aspects/",
      data,
      mensaje_exitoEnvioAspectos,
      mensaje_errorEnvioAspectos
    );
  } else {
    alert("Debe completar todos los campos");
  }
}

function limpiarFomulario() {
  document.getElementById("nombreAspecto").value = "";
  document.getElementById("descripcionAspecto").value = "";
  document.getElementById("pesoAspecto").value = "";
  document.getElementById("select_aspecto").value = -6;
  document.getElementById("CategoriaEntidadesAspectos").value = -6;
  document.getElementById("lista_entidades_seleccionadas_aspectos").innerHTML =
    "";
  document.getElementById("CategoriaEntidadesAspectos").disabled = true;
  $("#add_aspects").modal("hide");
}

function mensaje_exitoEnvioAspectos(json) {
  cargar_tabla_aspectos();
  limpiarFomulario();
}

function mensaje_errorEnvioAspectos(error) {
  alert("ERROR AL CARGAR LOS ASPECTOS");
}

if (document.getElementById("tableAspects")) {
  cargar_tabla_aspectos();
}

function cargar_tabla_aspectos() {
  consultar_api(
    SERVER_PATH + "/api/get_aspects_ind",
    cargar_aspectos_table,
    error_cargar_aspectos_table
  );
}

function cargar_aspectos_table(json) {
  res = "";
  json.forEach((met) => {
    res += "<tr>";
    res += `<td><input type="radio" name="aspecto_seleccionado" data-id="${
      met.id
    }" data-name="${met.name}" data-description="${
      met.description
    }" data-peso="${met.weigth}" data-tipo="${met.tipo_id}"
	      data-activo="${met.active == 1}" data-objetivo="${
      met.obj
    }" data-sujeto="${met.suj}" data-modelo="${
      met.model
    }" data-sujeto_nombre="${met.sujeto}"></td>`;
    res += `<td>${met.id}</td>`;
    res += `<td>${met.name}</td>`;
    res += `<td>${met.description}</td>`;
    res += `<td>${met.weigth}</td>`;
    res += `<td>${met.tipo}</td>`;
    if (met.active == 1)
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tableAspects").innerHTML = res;
}

function error_cargar_aspectos_table(err) {
  console.log("Error al cargar los datos del modelo: " + err);
}

function eliminarAspectos() {
  var radio = document.getElementsByName("aspecto_seleccionado");
  var id;
  radio.forEach((rad) => {
    if (rad.checked) {
      id = rad.dataset.id;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro de que desea eliminar el recurso")) {
      post_api(
        SERVER_PATH + "/api/del_aspects/",
        {
          id: id,
        },
        cargar_tabla_aspectos,
        (res) => {
          console.log(res);
        }
      );
      cargar_tabla_aspectos();
    }
  } else {
    alert("No se ha seleccionado ningun recurso");
  }
}
var aspectoSeleccionadoMetricas = undefined;

function administrarMetrics() {
  var radio = document.getElementsByName("aspecto_seleccionado");
  var id;
  var nombre;
  var descripcion;
  radio.forEach((rad) => {
    if (rad.checked) {
      id = rad.dataset.id;
      nombre = rad.dataset.name;
      descripcion = rad.dataset.description;
      return;
    }
  });
  aspectoSeleccionadoMetricas = id;
  if (!!id) {
    document.getElementById("nombreAspecto_admin_metricas").innerHTML = nombre;
    document.getElementById("descripcionAspecto_admin_metricas").innerHTML =
      descripcion;
    document.getElementById("lista_metricas_disponibles").innerHTML = "";
    document.getElementById("lista_metricas_seleccionadas").innerHTML = "";
    $("#admin_metrics").modal("show");
  } else {
    alert("No se ha seleccionado ningun recurso");
  }
  get_select_metricas_aspectos();
}
function get_select_metricas_aspectos() {
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    { tipo: "TIPO_METRICA" },
    cargar_select_metricas_aspectos,
    (json) => {
      console.log(json);
    }
  );
}
function cargar_select_metricas_aspectos(json) {
  var op = document.getElementById("tipo_metrica_aspectos_metrica");
  op.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  op.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    op.appendChild(option);
  });
}
function SalirAdministrarMetricas() {
  $("#admin_metrics").modal("hide");
}
function cargar_metricas_disponibles(json) {
  console.log(json);
  var lista = document.getElementById("lista_metricas_disponibles");
  var lista2 = document.getElementById("lista_metricas_seleccionadas");
  lista.innerHTML = "";
  lista2.innerHTML = "";
  json.forEach((element) => {
    var div = document.createElement("div");
    if (element.existe == 1) {
      div.classList.add("d-none");
    }
    var checkbox = document.createElement("input");
    checkbox.dataset.puro_existe = element.existe;
    div.classList.add("form-check");
    checkbox.type = "checkbox";
    checkbox.id = `metrica_seleccion_${element.id}`;
    checkbox.dataset.puro_id = element.id;
    checkbox.classList.add("form-check-input");
    checkbox.name = `checkbox_seleccion`;
    div.appendChild(checkbox);
    var label = document.createElement("label");
    label.classList.add("form-check-label");
    label.htmlfor = checkbox.id;
    label.innerHTML = `${element.name}`;
    div.appendChild(label);
    lista.appendChild(div);

    var div2 = document.createElement("div");
    if (element.existe == 0) {
      div2.classList.add("d-none");
    }
    var checkbox2 = document.createElement("input");
    checkbox2.dataset.puro_existe = element.existe;
    div2.classList.add("form-check");

    checkbox2.type = "checkbox";
    checkbox2.id = `metrica_seleccionada_${element.id}`;
    checkbox2.dataset.puro_id = element.id;
    checkbox2.name = `checkbox_seleccionado`;

    checkbox2.classList.add("form-check-input");
    div2.appendChild(checkbox2);
    var label2 = document.createElement("label");
    label2.classList.add("form-check-label");
    label2.htmlfor = checkbox2.id;
    label2.innerHTML = `${element.name}`;
    div2.appendChild(label2);
    lista2.appendChild(div2);
  });
}

function agregar_metrica_seleccionado() {
  var checkbox = document.getElementsByName("checkbox_seleccion");
  var metricasSeleccion = [];

  Array.from(checkbox).forEach((element) => {
    var aux = {};
    aux.aa_id = aspectoSeleccionadoMetricas;
    aux.met_id = element.dataset.puro_id;
    aux.existe = element.dataset.puro_existe;
    if (element.checked) {
      aux.existe = "1";
    }
    metricasSeleccion.push(aux);
  });
  post_api(
    SERVER_PATH + "/api/add_metrics_aspects",
    metricasSeleccion,
    cambiar_metrica_lado,
    error_cambiar_metrica_lado
  );
}

function remover_metrica_seleccionado() {
  var checkbox = document.getElementsByName("checkbox_seleccionado");
  var metricasSeleccion = [];
  Array.from(checkbox).forEach((element) => {
    var aux = {};
    aux.aa_id = aspectoSeleccionadoMetricas;
    aux.met_id = element.dataset.puro_id;
    aux.existe = element.dataset.puro_existe;
    if (element.checked) {
      aux.existe = "0";
    }
    metricasSeleccion.push(aux);
  });
  post_api(
    SERVER_PATH + "/api/add_metrics_aspects",
    metricasSeleccion,
    cambiar_metrica_lado,
    error_cambiar_metrica_lado
  );
}

function cambiar_metrica_lado() {
  tipo_metrica_change();
}

function error_cambiar_metrica_lado(error) {
  alert("Error al cambiar las metricas" + error);
}

if (document.getElementById("select_aspecto_mod")) {
  cargar_select_tipo_as_mod();
}

function limpiarFomularioMod() {
  document.getElementById("nombreAspectoMod").disabled = true;
  document.getElementById("descripcionAspectoMod").disabled = true;
  document.getElementById("pesoAspectoMod").disabled = true;
  document.getElementById("select_aspecto_mod").disabled = true;
  document.getElementById("nombreAspectoMod").value = "";
  document.getElementById("descripcionAspectoMod").value = "";
  document.getElementById("pesoAspectoMod").value = "";
  document.getElementById("select_aspecto_mod").value = -6;
  document.getElementById("CategoriaEntidadesAspectosMod").value = -6;
  document.getElementById(
    "lista_entidades_seleccionadas_aspectos_mod"
  ).innerHTML = "";
  $("#mod_aspects").modal("hide");
}
//OBJETIVOS_ASPECTOS
function get_aspectos_objetivos_modificar(suj_id) {
  post_api(
    SERVER_PATH + "/api/subjects_objects",
    { id: suj_id },
    cargar_select_aspectos_objetivos_modificar,
    (res) => {
      /*console.log(res);*/
      console.log("Eroooooorrrrrrr Aqui ???????? ");
    }
  );
}

function cargar_select_aspectos_objetivos_modificar(json) {
  console.log(json);
  var listaPadres = [];
  var listaId = [];
  json.forEach((element) => {
    if (element.padre != null) {
      listaPadres.push(element.padre);
    }
    listaId.push(element.id);
  });
  listaPadres = new Set(listaPadres);
  listaId = new Set(listaId);
  let eliminacionId = [...listaId].filter((x) => !listaPadres.has(x));
  /*var ope = document.getElementById("select_objetivo_mod");
	  ope.innerHTML = "";
	  var seleccione = document.createElement("option");
	  seleccione.innerHTML = "Seleccione..";
	  seleccione.value = "-6";
	  ope.appendChild(seleccione);
	  json.forEach((element) => {
	    if (eliminacionId.indexOf(element.id) != -1) {
	      var option = document.createElement("option");
	      option.value = element.id;
	      option.innerHTML = element.nombre;
	      ope.appendChild(option);
	    }
	  });*/

  // ------------------------------------------------------
  // No usa el JSON
}

function cargar_datos_del_modal_modificar_aspectos_individuales() {
  //obtener los datos del radio (aspecto seleccionado)
  try {
    document.getElementById("sujetos_Activos_aspectos_modificar").innerHTML =
      "";
    var radio = document.getElementsByName("aspecto_seleccionado");
    var aspect_id;
    var name;
    var descripcion;
    var peso;
    var active;
    var suj;
    var tipo;
    radio.forEach((elem) => {
      if (elem.checked) {
        aspect_id = elem.dataset.id;
        name = elem.dataset.name;
        descripcion = elem.dataset.description;
        peso = elem.dataset.peso;
        active = elem.dataset.activo == "true";
        suj = elem.dataset.sujeto_nombre;
        objetivo = elem.dataset.objetivo;
        tipo = elem.dataset.tipo;
        return;
      }
    });
    aspecto_seleccionado_mod = aspect_id;

    //Si los valores de {id, name, descripcion, peso} existen, carga los datos
    //	y permite la edicion
    if (!!aspect_id && !!name && !!descripcion && !!peso) {
      document.getElementById("nombreAspectoMod").disabled = false;
      document.getElementById("descripcionAspectoMod").disabled = false;
      document.getElementById("pesoAspectoMod").disabled = false;
      //document.getElementById("select_objetivo_mod").disabled = false;
      document.getElementById("select_aspecto_mod").disabled = false;
      document.getElementById("activoAspectosMod").disabled = false;
      document.getElementById("id_aspecto").value = aspect_id;
      document.getElementById("nombreAspectoMod").value = name;
      document.getElementById("descripcionAspectoMod").value = descripcion;
      document.getElementById("pesoAspectoMod").value = peso;
      document.getElementById("sujeto_id_aspecto").value = suj;
      document.getElementById("activoAspectosMod").checked = active;
      //document.getElementById("select_objetivo_mod").value = objetivo;
      document.getElementById("select_aspecto_mod").value = tipo;
      var divSujeto = document.getElementById(
        "sujetos_Activos_aspectos_modificar"
      );
      var hr = document.createElement("h6");
      hr.innerHTML = suj;
      divSujeto.appendChild(hr);
      post_api(
        SERVER_PATH + "/api/get_aspects_subjects",
        { systemID: aspect_id },
        cargar_objetos_seleccionados_aspectos,
        (res) => {
          console.log(res);
        }
      );
      $("#mod_aspects").modal("show");
    } else {
      alert("Debe seleccionar un elemento para modificar");
    }
  } catch (error) {
    console.log(error);
  }
  // ------------------------------------------------------
}

var aspecto_seleccionado_mod = undefined;
function modificarAspectos() {
  try {
    var radio = document.getElementsByName("aspecto_seleccionado");
    var no_existe_seleccion = true;
    radio.forEach((elem) => {
      if (elem.checked) {
        no_existe_seleccion = false;
        suj_id = elem.dataset.sujeto;
        systemID = elem.dataset.sujeto;
        //get_aspectos_objetivos_modificar(suj_id);
        cargar_datos_del_modal_modificar_aspectos_individuales();
        return;
      }
    });
    if (no_existe_seleccion) alert("Debe seleccionar un aspecto");
  } catch (error) {
    console.log(error);
  }
}

function GuardarmodificarAspecto() {
  var data = {
    id: aspecto_seleccionado_mod,
    name: document.getElementById("nombreAspectoMod").value,
    description: document.getElementById("descripcionAspectoMod").value,
    weigth: document.getElementById("pesoAspectoMod").value,
    //objetivo: document.getElementById("select_objetivo_mod").value,
    tipo: document.getElementById("select_aspecto_mod").value,
    active: document.getElementById("activoAspectosMod").checked,
  };
  if (
    !!data.name &&
    !!data.description &&
    !!data.weigth &&
    /* !!data.objetivo &&*/
    !!data.tipo
  ) {
    post_api(
      SERVER_PATH + "/api/mod_aspects",
      data,
      cargar_tabla_aspectos,
      (res) => {
        console.log(res);
      }
    );
    post_api(
      SERVER_PATH + "/api/del_aspects_objects",
      { aa_id: aspecto_seleccionado_mod },
      eliminar_relacion_aspectos,
      (res) => {
        console.log(res);
      }
    );
    $("#mod_aspects").modal("hide");
  } else {
    alert("Debe completar todos los campos");
  }
}
function eliminar_relacion_aspectos() {
  var entitys = document.getElementsByName("checkbox_entidades_aspectos_mod");
  var selectedEntitys = [];
  for (var i = 0; i < entitys.length; i++) {
    if (entitys[i].checked) {
      selectedEntitys.push(entitys[i].dataset.puro_id);
    }
  }
  data = { aa_id: aspecto_seleccionado_mod, arr_entity: selectedEntitys };
  post_api(
    SERVER_PATH + "/api/add_relation_objects_aspects",
    data,
    (res) => {
      console.log(res);
    },
    (res) => {
      console.log(res);
    }
  );
}
var seleccionadas = undefined;
function cargar_objetos_seleccionados_aspectos(json) {
  seleccionadas = json;
  var ul = document.getElementById(
    "lista_entidades_seleccionadas_aspectos_mod"
  );
  ul.innerHTML = "";
  var op = document.createElement("option");
  var seleccion = json[0].tipo;
  if (seleccion == "PhysicalEntity") {
    op.innerHTML = "Entidades Físicas";
  } else if (seleccion == "CloudNode") {
    op.innerHTML = "Nodos Cloud";
  } else if (seleccion == "FogNode") {
    op.innerHTML = "Nodos Fog";
  } else if (seleccion == "IoTGateway") {
    op.innerHTML = "Gateway IoT";
  } else if (seleccion == "Sensor") {
    op.innerHTML = "Sensores";
  } else if (seleccion == "Tag") {
    op.innerHTML = "Tags";
  } else if (seleccion == "Actuator") {
    op.innerHTML = "Actuadores";
  } else if (seleccion == "Network") {
    op.innerHTML = "Red";
  }
  var sel = document.getElementById("CategoriaEntidadesAspectosMod");
  sel.innerHTML = "";
  sel.appendChild(op);
  var seleccion = document.getElementById(
    "CategoriaEntidadesAspectosMod"
  ).value;
  seleccion = sin_tilde(seleccion);
  data = {
    valorS: seleccion,
    systemID: systemID,
  };
  post_api(
    SERVER_PATH + "/api/entitys",
    data,
    cargar_entidades_modelo_aspecto,
    (res) => {
      console.log(res);
    }
  );
}
function error_cargar_sujetos_activos_aspectos_modificar(error) {
  console.log("Error al cargar los datos del modelo: " + error);
}

function cargar_entidades_modelo_aspecto(json) {
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.padre && elemento.activo == 1) {
      aux_visible_activo.add(elemento.padre);
    } else if (!!elemento.padre && elemento.activo == 0) {
      aux_visible_inactivo.add(elemento.padre);
    }
  });
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.padre) {
      insertar = document.getElementById(
        "lista_entidades_seleccionadas_aspectos_mod"
      );
    } else {
      insertar = document.createElement("ul");
      var insertarAux = document.getElementById(
        `li_ent_seleccionado_mod_${elemento.padre}`
      );
      if (insertarAux) {
        insertarAux.appendChild(insertar);
      } else {
        insertar = document.getElementById(
          "lista_entidades_seleccionadas_aspectos_mod"
        );
      }
    }
    li = document.createElement("li");
    li.id = `li_ent_seleccionado_mod_${elemento.id}`;
    if (elemento.activo == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_entidad_de_${elemento.padre}_seleccionado`,
      "checkbox_seleccionado_entidad"
    );
    checkbox.id = `sujeto_seleccionado_aspectos_mod_${elemento.id}`;
    checkbox.name = "checkbox_entidades_aspectos_mod";
    checkbox.dataset.padre_id = elemento.padre;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.nombre;
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.nombre;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
  seleccionadas.forEach((elment) => {
    var check = document.getElementById(
      `sujeto_seleccionado_aspectos_mod_${elment.id}`
    );
    check.checked = true;
  });
}

//Colocar bien

function habilitar_perspectiva() {
  var tipo = document.getElementById("select_metrica").value;
  console.log(tipo);
  if (tipo == 12) {
    document.getElementById("tipo_perspectiva_select").disabled = false;
  } else {
    document.getElementById("tipo_perspectiva_select").disabled = true;

    document.getElementById("tipo_perspectiva_select").value = "-6";
  }
}

function tipo_metrica_change() {
  var metrica = document.getElementById("tipo_metrica_aspectos_metrica").value;
  post_api(
    SERVER_PATH + "/api/get_metrics_type_aspects",
    { id: aspectoSeleccionadoMetricas, tipo: metrica },
    cargar_metricas_disponibles,
    (json) => {
      console.log(json);
    }
  );
}

/*function cargar_ultimo_proceso {
	  consultar_api(
	    SERVER_PATH + "/api/get_last_insert_process",
	    get_nombre_proceso,
	    (json) => {
	      console.log(json);
	    }
	  );
	}
	function get_nombre_proceso(json) {
	  document.getElementById("nombre_proceso_pre_reflexivo").value =
	    "PID" + (parseInt(json[0].id) + 1);
	}*/
/*if (document.getElementById("nombre_proceso_reflexivo_id")) {
	  consultar_api(
	    SERVER_PATH + "/api/get_last_insert_process",
	    get_nombre_proceso_reflexivo,
	    (json) => {
	      console.log(json);
	    }
	  );
	}
	function get_nombre_proceso_reflexivo(json) {
	  console.log(json);
	  document.getElementById("nombre_proceso_reflexivo_id").value =
    "PID" + (parseInt(json[0].id) + 1);
}*/
if (document.getElementById("id_proceso_pre_reflexivo_modificar")) {
  var sujeto = document.getElementById("id_sujeto").value;
  console.log(sujeto);
  /* post_api(
    SERVER_PATH + "/api/get_aspects_objects_process",
    { systemID: sujeto },
    cargar_aspectos_procesos_modificar,
    (res) => {
      console.log(res);
    }
  );*/
}
function cargar_aspectos_procesos_modificar(json) {
  select.value = document.getElementById("id_aspecto").value;
  post_api(
    SERVER_PATH + "/api/get_objects_aspects",
    {
      aspecto: document.getElementById("id_aspecto").value,
      sujeto: document.getElementById("id_sujeto").value,
    },
    cargar_objetos_procesos_modificar,
    (res) => {
      console.log(res);
    }
  );
}
function cargar_objetos_procesos_modificar(json) {
  var ul = document.getElementById(
    "lista_entidades_seleccionadas_procesos_modificar"
  );
  ul.innerHTML = "";
  var op = document.createElement("option");
  var seleccion = json[0].tipo;
  if (seleccion == "PhysicalEntity") {
    op.innerHTML = "Entidades Físicas";
  } else if (seleccion == "CloudNode") {
    op.innerHTML = "Nodos Cloud";
  } else if (seleccion == "FogNode") {
    op.innerHTML = "Nodos Fog";
  } else if (seleccion == "IoTGateway") {
    op.innerHTML = "Gateway IoT";
  } else if (seleccion == "Sensor") {
    op.innerHTML = "Sensores";
  } else if (seleccion == "Tag") {
    op.innerHTML = "Tags";
  } else if (seleccion == "Actuator") {
    op.innerHTML = "Actuadores";
  } else if (seleccion == "Network") {
    op.innerHTML = "Red";
  }
  var sel = document.getElementById("CategoriaEntidadesProcesosModificar");
  sel.innerHTML = "";
  sel.appendChild(op);
  json.forEach((element) => {
    var li = document.createElement("li");
    li.innerHTML = element.nombre;
    ul.appendChild(li);
  });
}
if (document.getElementById("id_proceso_reflexivo_modificar")) {
  var sujeto = document.getElementById("id_sujeto_reflexivo").value;
  console.log(sujeto);
  post_api(
    SERVER_PATH + "/api/get_aspects_objects_process",
    { systemID: sujeto },
    cargar_aspectos_procesos_reflexivos_modificar,
    (res) => {
      console.log(res);
    }
  );
}
function cargar_aspectos_procesos_reflexivos_modificar(json) {
  console.log(json);
  var select = document.getElementById(
    "Aspectos_autoconsciencia_modificar_reflexivos"
  );
  select.innerHTML = "";
  var op = document.createElement("option");
  op.value = "-6";
  op.innerHTML = "Seleccione ..";
  select.appendChild(op);
  json.forEach((asp) => {
    var op = document.createElement("option");
    op.value = asp.idAspecto;
    op.innerHTML = asp.nombreAspecto;
    select.appendChild(op);
  });
  select.value = document.getElementById("id_aspecto_reflexivo").value;
  post_api(
    SERVER_PATH + "/api/get_objects_aspects",
    {
      aspecto: document.getElementById("id_aspecto_reflexivo").value,
      sujeto: document.getElementById("id_sujeto_reflexivo").value,
    },
    cargar_objetos_procesos_reflexivos_modificar,
    (res) => {
      console.log(res);
    }
  );
}
function cargar_objetos_procesos_reflexivos_modificar(json) {
  var ul = document.getElementById(
    "lista_objetos_procesos_reflexivos_modificar"
  );
  ul.innerHTML = "";
  var op = document.createElement("option");
  var seleccion = json[0].tipo;
  if (seleccion == "PhysicalEntity") {
    op.innerHTML = "Entidades Físicas";
  } else if (seleccion == "CloudNode") {
    op.innerHTML = "Nodos Cloud";
  } else if (seleccion == "FogNode") {
    op.innerHTML = "Nodos Fog";
  } else if (seleccion == "IoTGateway") {
    op.innerHTML = "Gateway IoT";
  } else if (seleccion == "Sensor") {
    op.innerHTML = "Sensores";
  } else if (seleccion == "Tag") {
    op.innerHTML = "Tags";
  } else if (seleccion == "Actuator") {
    op.innerHTML = "Actuadores";
  } else if (seleccion == "Network") {
    op.innerHTML = "Red";
  }
  var sel = document.getElementById(
    "CategoriaEntidadesProcesosReflexivosModificar"
  );
  sel.innerHTML = "";
  sel.appendChild(op);
  json.forEach((element) => {
    var li = document.createElement("li");
    li.innerHTML = element.nombre;
    ul.appendChild(li);
  });
}

function sin_tilde(texto) {
  texto = texto.replace("á", "a");
  texto = texto.replace("é", "e");
  texto = texto.replace("í", "i");
  texto = texto.replace("ó", "o");
  texto = texto.replace("ú", "u");
  return texto;
}

//Nuevos Cambiooooos
if (document.getElementById("tipo_ejecucion")) {
  var tipo = "TIPO_EJECUCION";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_tipos_ejecucion_select,
    (err) => {
      alert(err);
    }
  );
}
if (document.getElementById("nodo_ejecuta_proceso")) {
  console.log("aqui llega");
  consultar_api(
    SERVER_PATH + "/api/get_object_cloud_fog",
    cargar_nodo_ejecucion_select,
    (err) => {
      alert(err);
    }
  );
}
if (document.getElementById("nodo_ejecuta_proceso2")) {
  console.log("aqui llega");
  consultar_api(
    SERVER_PATH + "/api/get_object_cloud_fog",
    cargar_nodo_ejecucion_select2,
    (err) => {
      alert(err);
    }
  );
}
function cargar_nodo_ejecucion_select(json) {
  console.log(json);
  var ope = document.getElementById("nodo_ejecuta_proceso");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}
function cargar_nodo_ejecucion_select2(json) {
  console.log(json);
  var ope = document.getElementById("nodo_ejecuta_proceso2");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

if (document.getElementById("nodo_ejecuta_proceso3")) {
  console.log("aqui llega");
  consultar_api(
    SERVER_PATH + "/api/get_object_cloud_fog2",
    cargar_nodo_ejecucion_select3,
    (err) => {
      alert(err);
    }
  );
}
function cargar_nodo_ejecucion_select3(json) {
  console.log(json);
  var ope = document.getElementById("nodo_ejecuta_proceso3");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function cargar_tipos_ejecucion_select(json) {
  var ope = document.getElementById("tipo_ejecucion");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

if (document.getElementById("unidad_tiempo")) {
  var tipo = "TIPO_TIEMPO";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_unidad_tiempo_select,
    (err) => {
      alert(err);
    }
  );
}

function cargar_unidad_tiempo_select(json) {
  var ope = document.getElementById("unidad_tiempo");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}
if (document.getElementById("tipo_ejecucion_ref")) {
  var tipo = "TIPO_EJECUCION";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_tipos_ejecucion_select_ref,
    (err) => {
      alert(err);
    }
  );
}

function cargar_tipos_ejecucion_select_ref(json) {
  var ope = document.getElementById("tipo_ejecucion_ref");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

if (document.getElementById("unidad_tiempo_ref")) {
  var tipo = "TIPO_TIEMPO";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_unidad_tiempo_select_ref,
    (err) => {
      alert(err);
    }
  );
}

function cargar_unidad_tiempo_select_ref(json) {
  var ope = document.getElementById("unidad_tiempo_ref");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}
function seleccionIntervalopreReflexivo(valor) {
  if (valor.value == 60) {
    document.getElementById("intervalos_metodos_modelos").disabled = true;
  } else {
    document.getElementById("intervalos_metodos_modelos").disabled = false;
  }
}

if (document.getElementById("unidad_tiempo_ref2")) {
  var tipo = "TIPO_TIEMPO_2";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_unidad_tiempo_select_ref2,
    (err) => {
      alert(err);
    }
  );
}

function cargar_unidad_tiempo_select_ref2(json) {
  var ope = document.getElementById("unidad_tiempo_ref2");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}
//Funciones para Aspectos Colectivos
if (document.getElementById("lista_sujetos_aspectos_colectivos")) {
  agregar_sujetos_activos_aspectos();
}
function agregar_sujetos_activos_aspectos() {
  consultar_api(
    SERVER_PATH + "/api/subjects",
    cargar_sujetos_activos_aspectos_colectivos,
    (err) => {
      alert(err);
    }
  );
}
function cargar_sujetos_activos_aspectos_colectivos(json) {
  var aux_visible_activo = new Set();
  var aux_visible_inactivo = new Set();
  json.forEach((elemento) => {
    if (!!elemento.father && elemento.active == 1) {
      aux_visible_activo.add(elemento.father);
    } else if (!!elemento.father && elemento.active == 0) {
      aux_visible_inactivo.add(elemento.father);
    }
  });
  json.forEach((elemento) => {
    var insertar;
    if (!elemento.father) {
      insertar = document.getElementById("lista_sujetos_aspectos_colectivos");
    } else {
      insertar = document.createElement("ul");
      document
        .getElementById(`li_entidad_seleccionado_${elemento.father}`)
        .appendChild(insertar);
    }
    li = document.createElement("li");
    li.id = `li_entidad_seleccionado_${elemento.id}`;
    if (elemento.active == 1 || aux_visible_activo.has(elemento.id)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
    divFormCheck = document.createElement("div");
    divFormCheck.classList.add("form-check");
    checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(
      "form-check-input",
      `hijo_de_${elemento.father}_seleccionado`,
      "checkbox_seleccionado"
    );
    checkbox.id = `sujeto_seleccionado_${elemento.id}`;
    checkbox.name = "checkbox_sujetos_aspectos_colectivos";
    checkbox.dataset.padre_id = elemento.father;
    checkbox.dataset.puro_id = elemento.id;
    checkbox.dataset.nombre = elemento.name;
    checkbox.setAttribute(
      "onclick",
      "verificarSeleccionAspectosColectivos(this);"
    );
    labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    labelChek.htmlFor = checkbox.id;
    var button = document.createElement("button");
    button.classList.add("btn", "py-0", "px-0");
    button.innerHTML = elemento.name;
    labelChek.appendChild(button);
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    insertar.appendChild(li);
  });
}
function verificarSeleccionAspectosColectivos(elemento) {
  var checkbox = document.getElementsByName(
    "checkbox_sujetos_aspectos_colectivos"
  );
  var auxChecked = elemento.checked;
  systemID = elemento.dataset.puro_id;
  sujeto_aspecto_id = elemento.dataset.puro_id;
  Array.from(checkbox).forEach((element) => {
    element.checked = false;
  });
  elemento.checked = auxChecked;
  get_aspectos_individuales(elemento.dataset.puro_id);
}

function agregarAspectosColectivos() {
  document.getElementById("lista_sujetos_aspectos_colectivos").innerHTML = "";
  agregar_sujetos_activos_aspectos();
  ActivarFormularioAspectosColectivos();
  $("#add_aspects_colective").modal("show");
}

function limpiarFomularioColectivo() {
  document.getElementById("nombreAspectoColectivo").value = "";
  document.getElementById("descripcionAspectoColectivo").value = "";
  document.getElementById("pesoAspectoColectivo").value = "";
  document.getElementById("select_operadoreAgregacion").value = -6;
  document.getElementById("select_aspectoColectivo").value = -6;
  document.getElementById("lista_aspectos_individuales").innerHTML = "";
  $("#add_aspects_colective").modal("hide");
}
function get_aspectos_individuales(id) {
  glogal_is_modificar_aspectos = false;
  post_api(
    SERVER_PATH + "/api/get_aspects",
    { id: id },
    llenarAspectosIndividuales,
    (res) => {
      console.log(res);
    }
  );
}

var global_cont_aspect_lista_arbol = 0;
var glogal_is_modificar_aspectos = false;
function llenarAspectosIndividuales(json) {
  if (glogal_is_modificar_aspectos)
    var ul = document.getElementById("lista_aspectos_individuales_modificar");
  else var ul = document.getElementById("lista_aspectos_individuales");
  ul.innerHTML = "";
  json.forEach((aspect) => {
    var li = document.createElement("li");
    li.id = `li_aspect_${global_cont_aspect_lista_arbol}`;
    var divFormCheck = document.createElement("div");
    var icon = document.createElement("i");
    //radio.type = "radio";
    icon.dataset.puro_id = aspect.id;
    icon.dataset.max = "False";
    icon.dataset.li_id = `li_aspect_${global_cont_aspect_lista_arbol}`;
    icon.setAttribute("onclick", "cargar_aspectos_hijos_para_el_arbol(this)");
    icon.classList.add("fas", "fa-plus", "fa-xs", "mx-1");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    checkbox.name = "checkbox_aspectos_individuales";
    checkbox.dataset.puro_id = aspect.id;
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(icon);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    ul.appendChild(li);
    checkbox.dataset.id = aspect.id;
    labelChek.htmlFor = checkbox.id;
    labelChek.innerHTML = aspect.name;
    global_cont_aspect_lista_arbol++;
  });
  if (glogal_is_modificar_aspectos && json.length > 0) {
    post_api(
      SERVER_PATH + "/api/get_aspects_hijos_seleccionados",
      { id: aspecto_seleccionado_mod }, // no se de donde sacamos el aspecto padre aun
      cargar_aspectos_hijo_seleccionados,
      (res) => {
        console.log(res);
      }
    );
  }
}

var global_li_id_aspecto_del_arbol;
function cargar_aspectos_hijos_para_el_arbol(icon) {
  var aspect_id = icon.dataset.puro_id;
  global_li_id_aspecto_del_arbol = icon.dataset.li_id;
  if (icon.dataset.max == "True") {
    var li_item = document.getElementById(global_li_id_aspecto_del_arbol);
    var list_ul = li_item.getElementsByTagName("ul");
    if (list_ul.length > 0) {
      li_item.removeChild(list_ul[0]);
    }
    icon.dataset.max = "False";
    icon.max = false;
    icon.classList.replace("fa-minus", "fa-plus");
  } else {
    icon.dataset.max = "True";
    icon.classList.replace("fa-plus", "fa-minus");
    post_api(
      SERVER_PATH + "/api/get_aspects_hijos",
      { id: aspect_id },
      cargar_hijos_al_li,
      (res) => {
        console.log(res);
      }
    );
  }
}

function cargar_aspectos_hijo_seleccionados(json) {
  json = json.map((x) => x.hijos);
  var ul = document.getElementById("lista_aspectos_individuales_modificar");
  var li_list = ul.getElementsByTagName("li");
  Array.from(li_list).forEach((li) => {
    var checbox = li.querySelector('input[type="checkbox"]');
    var checbox_aspect_id = checbox.dataset.puro_id;
    if (json.indexOf(parseInt(checbox_aspect_id)) != -1) {
      checbox.checked = true;
    }
  });
}

function cargar_hijos_al_li(json) {
  var li_item = document.getElementById(global_li_id_aspecto_del_arbol);
  var list_ul = li_item.getElementsByTagName("ul");
  var ul;
  if (list_ul.length > 0) {
    ul = list_ul[0];
    ul.innerHTML = "";
  } else var ul = document.createElement("ul");
  li_item.appendChild(ul);
  json.forEach((aspect) => {
    var li = document.createElement("li");
    li.id = `li_aspect_${global_cont_aspect_lista_arbol}`;
    var divFormCheck = document.createElement("div");
    divFormCheck.classList.add("d-table");
    var icon = document.createElement("i");
    icon.dataset.puro_id = aspect.id;
    icon.dataset.max = "False";
    icon.classList.add("fas", "fa-plus", "fa-xs", "mx-1", "d-table-cell");
    icon.dataset.li_id = `li_aspect_${global_cont_aspect_lista_arbol}`;
    icon.setAttribute("onclick", "cargar_aspectos_hijos_para_el_arbol(this)");
    //var checkbox = document.createElement("input");
    //checkbox.type = "checkbox";
    var labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label", "d-table-cell");
    //checkbox.name = "checkbox_aspectos_individuales";
    //checkbox.dataset.puro_id = aspect.id;
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(icon);
    //divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    ul.appendChild(li);
    checkbox.dataset.id = aspect.id;
    labelChek.htmlFor = checkbox.id;
    labelChek.innerHTML = aspect.name;
    global_cont_aspect_lista_arbol++;
  });
}

function ActivarFormularioAspectosColectivos() {
  document.getElementById("nombreAspectoColectivo").disabled = false;
  document.getElementById("descripcionAspectoColectivo").disabled = false;
  document.getElementById("pesoAspectoColectivo").disabled = false;
  document.getElementById("select_operadoreAgregacion").disabled = false;
  document.getElementById("select_aspectoColectivo").disabled = false;
  cargar_select_operador_agregacion_colectivos();
  cargar_select_tipo_aspecto_colectivo();
}
function cargar_select_operador_agregacion_colectivos() {
  var nombre = "TIPO_OPERADOR_ASIGNACION";
  var data = {
    tipo: nombre,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_operador_asignacion_select_colectivos,
    (res) => {
      console.log(res);
    }
  );
}

function cargar_operador_asignacion_select_colectivos(json) {
  var ope = document.getElementById("select_operadoreAgregacion");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function cargar_select_tipo_aspecto_colectivo() {
  var tipo = "TIPO_ASPECTO";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_select_tipo_aspecto_col,
    (res) => {
      console.log(res);
    }
  );
}

function cargar_select_tipo_aspecto_col(json) {
  var ope = document.getElementById("select_aspectoColectivo");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function guardarAspectoColectivo() {
  var aspects = document.getElementsByName("checkbox_aspectos_individuales");
  var selectedAspects = [];
  for (var i = 0; i < aspects.length; i++) {
    if (aspects[i].checked) {
      selectedAspects.push(aspects[i].dataset.puro_id);
    }
  }
  weigth = document.getElementById("pesoAspectoColectivo").value;
  if (parseFloat(weigth) > 1) {
    alert("Peso debe estar entre 0 y 1");
  } else {
    var data = {
      name: document.getElementById("nombreAspectoColectivo").value,
      description: document.getElementById("descripcionAspectoColectivo").value,
      weigth: document.getElementById("pesoAspectoColectivo").value,
      type: document.getElementById("select_aspectoColectivo").value,
      operador: document.getElementById("select_operadoreAgregacion").value,
      suj_id: sujeto_aspecto_id,
      arr_aspects: selectedAspects,
      aa_alcance: 54,
      activo: 1,
    };
  }
  if (
    !!data.name &&
    !!data.description &&
    !!data.weigth &&
    data.type != -6 &&
    !!data.suj_id &&
    data.operador != -6 &&
    selectedAspects.length > 0
  ) {
    post_api(
      SERVER_PATH + "/api/add_aspects_colective/",
      data,
      mensaje_exitoEnvioAspectosColectivos,
      (res) => {
        console.log(res);
      }
    );
    console.log(data.name);
    console.log(data.arr_aspects);
  } else {
    alert("Debe completar todos los campos");
  }
}

function mensaje_exitoEnvioAspectosColectivos(json) {
  cargar_tabla_aspectos_colectivos();
  limpiarFomularioColectivo();
}
//CargarTablasAspectosColectivos

if (document.getElementById("tableAspectsCollective")) {
  cargar_tabla_aspectos_colectivos();
}

function cargar_tabla_aspectos_colectivos() {
  consultar_api(
    SERVER_PATH + "/api/get_aspects_colective",
    cargar_aspectos_colectivos_table,
    (res) => {
      console.log(res);
    }
  );
}

function cargar_aspectos_colectivos_table(json) {
  res = "";
  json.forEach((met) => {
    res += "<tr>";
    res += `<td><input type="radio" name="aspecto_colectivo_seleccionado" data-id="${
      met.id
    }" data-name="${met.name}" data-description="${
      met.description
    }" data-peso="${met.weigth}" data-tipo="${met.tipo_id}"
      data-activo="${met.active == 1}" data-operador="${
      met.operador
    }" data-sujeto="${met.suj}" data-modelo="${
      met.model
    }" data-sujeto_nombre="${met.sujeto}" data-operador="${
      met.operador
    }"></td>`;
    res += `<td>${met.id}</td>`;
    res += `<td>${met.name}</td>`;
    res += `<td>${met.description}</td>`;
    res += `<td>${met.weigth}</td>`;
    res += `<td>${met.met_aspect}</td>`;
    if (met.active == 1)
      res += `<td><input type="checkbox" disabled checked></td>`;
    else res += `<td><input type="checkbox" disabled></td>`;
    res += "</tr>";
  });
  document.getElementById("tableAspectsCollective").innerHTML = res;
}

//Funciones para modificar los aspectos Colectivos
//

function cargar_select_operador_agregacion_colectivos_Modificar() {
  var nombre = "TIPO_OPERADOR_ASIGNACION";
  var data = {
    tipo: nombre,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_operador_asignacion_select_colectivos_modificar,
    (res) => {
      console.log(res);
    }
  );
}

function cargar_operador_asignacion_select_colectivos_modificar(json) {
  var ope = document.getElementById("select_operadoreAgregacionModificar");
  ope.innerHTML = "";
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}

function cargar_select_tipo_aspecto_colectivo_modificar() {
  var tipo = "TIPO_ASPECTO";
  var data = {
    tipo: tipo,
  };
  post_api(
    SERVER_PATH + "/api/get_enumeracion",
    data,
    cargar_select_tipo_aspecto_col_mod,
    (res) => {
      console.log(res);
    }
  );
}

function cargar_select_tipo_aspecto_col_mod(json) {
  console.log(json);
  var ope = document.getElementById("select_aspectoColectivoModificar");
  ope.innerHTML = "";
  var seleccione = document.createElement("option");
  seleccione.innerHTML = "Seleccione..";
  seleccione.value = "-6";
  ope.appendChild(seleccione);
  json.forEach((element) => {
    var option = document.createElement("option");
    option.value = element.id;
    option.innerHTML = element.nombre;
    ope.appendChild(option);
  });
}
if (document.getElementById("select_aspectoColectivoModificar")) {
  cargar_select_tipo_aspecto_colectivo_modificar();
}

if (document.getElementById("select_operadoreAgregacionModificar")) {
  cargar_select_operador_agregacion_colectivos_Modificar();
}
function modificarAspectosColectivos() {
  try {
    var radio = document.getElementsByName("aspecto_colectivo_seleccionado");
    var no_existe_seleccion = true;
    radio.forEach((elem) => {
      if (elem.checked) {
        no_existe_seleccion = false;
        suj_id = elem.dataset.sujeto;
        systemID = elem.dataset.sujeto;
        //get_aspectos_objetivos_modificar(suj_id);
        cargar_datos_del_modal_modificar_aspectos_colectivos();
      }
    });
    if (no_existe_seleccion) alert("Debe seleccionar un aspecto colectivo");
  } catch (error) {
    console.log(error);
  }
}
var aspectoColectivoID = undefined;
function cargar_datos_del_modal_modificar_aspectos_colectivos() {
  var radio = document.getElementsByName("aspecto_colectivo_seleccionado");
  var aspect_id;
  var name;
  var descripcion;
  var peso;
  var active;
  var suj;
  var tipo;
  radio.forEach((elem) => {
    if (elem.checked) {
      aspect_id = elem.dataset.id;
      aspectoColectivoID = aspect_id;
      name = elem.dataset.name;
      descripcion = elem.dataset.description;
      peso = elem.dataset.peso;
      active = elem.dataset.activo == "true";
      suj = elem.dataset.sujeto_nombre;
      suj_id = elem.dataset.sujeto;
      objetivo = elem.dataset.objetivo;
      tipo = elem.dataset.tipo;
      operador = elem.dataset.operador;
      return;
    }
  });
  aspecto_seleccionado_mod = aspect_id;

  //Si los valores de {id, name, descripcion, peso} existen, carga los datos
  //	y permite la edicion
  if (!!aspect_id && !!name && !!descripcion && !!peso) {
    document.getElementById("nombreAspectoColectivoModificar").disabled = false;
    document.getElementById(
      "descripcionAspectoColectivoModificar"
    ).disabled = false;
    document.getElementById("pesoAspectoColectivoModificar").disabled = false;
    document.getElementById(
      "select_aspectoColectivoModificar"
    ).disabled = false;
    document.getElementById(
      "select_operadoreAgregacionModificar"
    ).disabled = false;
    document.getElementById(
      "activoAspectosColectivosModificar"
    ).disabled = false;
    //document.getElementById("id_aspecto").value = aspect_id;
    document.getElementById("nombreAspectoColectivoModificar").value = name;
    document.getElementById("descripcionAspectoColectivoModificar").value =
      descripcion;
    document.getElementById("pesoAspectoColectivoModificar").value = peso;
    //document.getElementById("sujeto_id_aspecto").value = suj;
    document.getElementById("activoAspectosColectivosModificar").checked =
      active;
    document.getElementById("select_aspectoColectivoModificar").value = tipo;
    var divSujeto = document.getElementById(
      "sujetos_aspectos_colectivos_modificar"
    );
    document.getElementById("select_operadoreAgregacionModificar").value =
      operador;
    divSujeto.innerHTML = "";
    var hr = document.createElement("h5");
    hr.innerHTML = suj;
    divSujeto.appendChild(hr);
    cargarSeleccionSujetosAspectosColectivos(suj_id);
    post_api(
      SERVER_PATH + "/api/get_aspects_padres",
      { systemID: aspect_id },
      cargar_padres_seleccionados_aspectos,
      (res) => {
        console.log(res);
      }
    );
  } else {
    alert("Debe seleccionar un elemento para modificar");
  }

  $("#mod_aspects_colective").modal("show");
}
function cargar_padres_seleccionados_aspectos(json) {
  var aspects = document.getElementsByName(
    "checkbox_aspectos_individuales_modificar"
  );
  json.forEach((element) => {
    for (var i = 0; i < aspects.length; i++) {
      if (aspects[i].dataset.puro_id == element.id_padre) {
        aspects[i].checked = true;
      }
    }
  });
}
function limpiarFomularioColectivoModificar() {
  document.getElementById("nombreAspectoColectivoModificar").disabled = true;
  document.getElementById(
    "descripcionAspectoColectivoModificar"
  ).disabled = true;
  document.getElementById("pesoAspectoColectivoModificar").disabled = true;
  document.getElementById(
    "select_operadoreAgregacionModificar"
  ).disabled = true;
  document.getElementById("select_aspectoColectivoModificar").disabled = true;
  document.getElementById("nombreAspectoColectivoModificar").value = "";
  document.getElementById("descripcionAspectoColectivoModificar").value = "";
  document.getElementById("pesoAspectoColectivoModificar").value = "";
  document.getElementById("select_operadoreAgregacionModificar").value = -6;
  document.getElementById("select_aspectoColectivoModificar").value = -6;
  document.getElementById("sujetos_aspectos_colectivos_modificar").innerHTML =
    "";
  $("#mod_aspects_colective").modal("hide");
}

function cargarSeleccionSujetosAspectosColectivos(suj_id) {
  glogal_is_modificar_aspectos = true;
  post_api(
    SERVER_PATH + "/api/get_aspects",
    { id: suj_id },
    llenarAspectosIndividuales,
    (res) => {
      console.log(res);
    }
  );
}
/*
function llenarAspectosIndividualesModificar(json) {
  console.log(json);
  var ul = document.getElementById("lista_aspectos_individuales_modificar");
  ul.innerHTML = "";
  json.forEach((aspect) => {
    var li = document.createElement("li");
    var divFormCheck = document.createElement("div");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var labelChek = document.createElement("label");
    labelChek.classList.add("form-check-label");
    checkbox.name = "checkbox_aspectos_individuales_modificar";
    checkbox.dataset.puro_id = aspect.id;
    li.appendChild(divFormCheck);
    divFormCheck.appendChild(checkbox);
    divFormCheck.appendChild(labelChek);
    ul.appendChild(li);
    checkbox.dataset.id = aspect.id;
    labelChek.htmlFor = checkbox.id;
    labelChek.innerHTML = aspect.name;
    checkbox.setAttribute("onclick", "");
  });
}
*/
function ModificarAspectoColectivo() {
  var aspects = document.getElementsByName(
    "checkbox_aspectos_individuales_modificar"
  );
  var selectedAspects = [];
  for (var i = 0; i < aspects.length; i++) {
    if (aspects[i].checked) {
      selectedAspects.push(aspects[i].dataset.puro_id);
    }
  }
  weigth = document.getElementById("pesoAspectoColectivoModificar").value;
  if (parseFloat(weigth) > 1) {
    alert("Peso debe estar entre 0 y 1");
  } else {
    var data = {
      id: aspectoColectivoID,
      name: document.getElementById("nombreAspectoColectivoModificar").value,
      description: document.getElementById(
        "descripcionAspectoColectivoModificar"
      ).value,
      weigth: document.getElementById("pesoAspectoColectivoModificar").value,
      type: document.getElementById("select_aspectoColectivoModificar").value,
      operador: document.getElementById("select_operadoreAgregacionModificar")
        .value,
      suj_id: 74,
      arr_aspects: selectedAspects,
      aa_alcance: 54,
    };
  }
  if (
    !!data.name &&
    !!data.description &&
    !!data.weigth &&
    data.type != -6 &&
    !!data.suj_id &&
    data.operador != -6
  ) {
    console.log("Llego hasta aqui");
    post_api(
      SERVER_PATH + "/api/mod_aspects_colective/",
      data,
      mensaje_exitoEnvioAspectosColectivosModificar,
      (res) => {
        console.log(res);
      }
    );
  } else {
    alert("Debe completar todos los campos");
  }
}
function mensaje_exitoEnvioAspectosColectivosModificar(json) {
  cargar_tabla_aspectos_colectivos();
  limpiarFomularioColectivoModificar();
}

function eliminarAspectosColectivos() {
  var radio = document.getElementsByName("aspecto_colectivo_seleccionado");
  var id;
  radio.forEach((rad) => {
    if (rad.checked) {
      id = rad.dataset.id;
      return;
    }
  });
  if (!!id) {
    if (confirm("Esta seguro de que desea eliminar el recurso")) {
      post_api(
        SERVER_PATH + "/api/del_aspects/",
        {
          id: id,
        },
        cargar_tabla_aspectos_colectivos(),
        (res) => {
          console.log(res);
        }
      );
      cargar_tabla_aspectos_colectivos();
    }
  } else {
    alert("No se ha seleccionado ningun recurso");
  }
}
//Arreglos
function LimpiarFormularioModelos() {
  document.getElementById("nombre_modelo").value = "";
  document.getElementById("descripcion_esenario").value = "";
  document.getElementById("autor_modelo").value = "";
  $("#crear_modelo_modal").modal("hide");
}

function validate_create_model_form() {
  var nombre = document.getElementById("nombre_modelo").value;
  var description = document.getElementById("descripcion_esenario").value;
  var autor = document.getElementById("autor_modelo").value;
  var archivo = document.getElementById("file_modelo_xmi").value;
  if (nombre != "" && description != "" && autor != "" && archivo != "") {
    return true;
  }
  alert("Debe llenar todos los campos");
  return false;
}
function descargar_modelo_generado() {
  var textInput = document.getElementById("document-text").innerHTML;
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8, " + encodeURIComponent(textInput)
  );
  element.setAttribute("download", "Model.txt");
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
