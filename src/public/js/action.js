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
/* 
    SECCION RECURSOS DE IMPLEMENTACION
        Descripcion:

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
        "http://localhost:3000/api/get_enumeracion",
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
        "http://localhost:3000/api/get_enumeracion",
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
        (url = "http://localhost:3000/api/deployment_resources"),
        cargar_recursos_de_implementacion_tabla,
        (err) => {
            alert(err);
        }
    );
}

function cargar_recursos_de_implementacion_tabla(json) {
    console.log(json);
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
        clon.getElementById("description").innerHTML = elem.descripcion;
        clon.getElementById("type").innerHTML = recurso[elem.tipo_recurso];
        table.appendChild(clon);
    });
}

function agregar_recurso() {
    var guardarButton = document.getElementById("GuardarRecurso_btn");
    var modificarButton = document.getElementById("ModificarRecurso_btn");
    guardarButton.classList.replace("d-none", "inline-block");
    modificarButton.classList.replace("inline-block", "d-none");
    limpiar_add_recusos();
    terminar_creacion_parametro("parametro_formula");
    terminar_creacion_parametro("parametro_funciones");
    terminar_creacion_parametro("parametro_servicios");

    $("#modal_resource_add").modal("show");
}

function modificar_recurso() {
    var guardarButton = document.getElementById("GuardarRecurso_btn");
    var modificarButton = document.getElementById("ModificarRecurso_btn");
    modificarButton.classList.replace("d-none", "inline-block");
    guardarButton.classList.replace("inline-block", "d-none");
    limpiar_add_recusos();
    terminar_creacion_parametro("parametro_formula");
    terminar_creacion_parametro("parametro_funciones");
    terminar_creacion_parametro("parametro_servicios");
    var radios = document.getElementsByName("radio_recurso_implementacion");
    var id = undefined;
    Array.from(radios).forEach((rad) => {
        if (rad.checked) {
            id = rad.dataset.id;
            return;
        }
    });
    if (id) {
        document.getElementById("input-id-resource-mod").value = id;
        post_api(
            "http://localhost:3000/api/ask_deployment_resources/", { id: id },
            cargar_recurso_para_modificar,
            (res) => {
                console.log(res);
            }
        );
    } else {
        alert("No se ha seleccionado ningun recurso");
    }

    $("#modal_resource_add").modal("show");
}

function cargar_recurso_para_modificar(json) {
    console.log(json);
    var nombre = document.getElementById("input-name-resource-add");
    var descripcion = document.getElementById("input-descripton-resource-add");
    var tipoRecurso = document.getElementById("select_tipo_recurso");
    nombre.value = json.nombre;
    descripcion.value = json.descripcion;
    tipoRecurso.selectedIndex = (parseInt(json.tipoRecurso) + 1).toString();
    visivilidad_tipo_recurso_form_add(json.tipoRecurso);
    tipoRecurso.disabled = true;
    cargar_parametros_recursos_para_modificar(
        json.tipoRecurso,
        json.arregloParametros
    );
    cargar_datos_recursos_modificar(json.tipoRecurso, json.EspecificoTipo);

}

function modificarRecursoImplementacion() {
    post_api(
        "http://localhost:3000/api/del_deployment_resources/", { id: document.getElementById("input-id-resource-mod").value },
        (res) => {
            guardarRecursoImplementacion();
        },
        (res) => {
            console.log(res);
        }
    );

}

function cargar_parametros_recursos_para_modificar(t, parametros) {
    idParametroCont = 0;
    var tipo = "";
    if (t == "0") {
        tipo = "parametro_formula";
    } else if (t == "1") {
        tipo = "parametro_funciones";
    } else {
        tipo = "parametro_servicios";
    }
    parametros.forEach((par) => {
        var seccion = document.createElement("li");
        seccion.classList.add("list-group-item", "li_parametros");
        seccion.dataset.ordinal = par.ordinal;
        seccion.dataset.nombre = par.nombre;
        seccion.dataset.activo = par.activo == "1" ? "true" : "false";
        seccion.dataset.opcional = par.opcional == "1" ? "true" : "false";
        seccion.dataset.tipo = par.tipo;
        seccion.dataset.tipoIndex = indexOfValueinSelect("#tipo_dato_parametro", par.tipo);
        seccion.id = `parameto_num_${idParametroCont++}`;
        seccion.innerHTML = par.nombre;
        if (tipo === "parametro_formula") {
            seccion.setAttribute("ondblclick", `agregar_a_formula('[${par.nombre}]');`);
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
        document.getElementById("area_de_nueva_formula").value = datos_especificos.formula;
        document.getElementById("selectTipoSalidaFormulaRecursoAdd").selectedIndex = indexOfValueinSelect("#selectTipoSalidaFormulaRecursoAdd", datos_especificos.datoSalida);

    } else if (tipo == "1") {
        document.getElementById("area_de_nueva_istruccion_funcion").value = datos_especificos.instrucciones;
        document.getElementById("selectTipoSalidaFuncionesRecursoAdd").selectedIndex = indexOfValueinSelect("#selectTipoSalidaFuncionesRecursoAdd", datos_especificos.datoSalida);

    } else {
        document.getElementById("input_endpoint_resource").value = datos_especificos.endPoint;
        document.getElementById("area_de_nueva_istruccion_servicios").value = datos_especificos.instrucciones;
        document.getElementById("selectTipoSalidaServiciosRecursoAdd").selectedIndex = indexOfValueinSelect("#selectTipoSalidaServiciosRecursoAdd", datos_especificos.datoSalida);
        document.getElementById("selectFormatodeSalida").selectedIndex = indexOfValueinSelect("#selectFormatodeSalida", datos_especificos.formatoSalida);
    }
}

function indexOfValueinSelect(query, value) {
    var conAux = 0;
    var respuesta = -1;
    Array.from(document.querySelector(query).options).forEach(element => {
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
                "http://localhost:3000/api/del_deployment_resources/", { id: id },
                (res) => {
                    console.log(res);
                },
                (res) => {
                    console.log(res);
                }
            );
        }
        cargar_recursos_de_implementacion();
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

function guardar_parametro(tipo) {
    var seccion = document.createElement("li");
    seccion.classList.add("list-group-item", "li_parametros");
    var ordinal = document.querySelector(`#${tipo} #ordinalParametro`).value;
    var nombre = document.querySelector(`#${tipo} #nombreParametro`).value;
    var activo = document.querySelector(`#${tipo} #activo_parametro`).checked;
    var opcional = document.querySelector(`#${tipo} #opcional_parametro`).checked;
    var tipoSe = document.querySelector(`#${tipo} #tipo_dato_parametro`).value;
    var tipoIndex = document.querySelector(`#${tipo} #tipo_dato_parametro`)
        .selectedIndex;

    seccion.dataset.ordinal = ordinal;
    seccion.dataset.nombre = nombre;
    seccion.dataset.activo = activo;
    seccion.dataset.opcional = opcional;
    seccion.dataset.tipo = tipoSe;
    seccion.dataset.tipoIndex = tipoIndex;
    seccion.id = `parameto_num_${idParametroCont++}`;
    seccion.innerHTML = nombre;
    if (tipo === "parametro_formula") {
        seccion.setAttribute("ondblclick", `agregar_a_formula('[${nombre}]');`);
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
        document.querySelector(`#${tipo} #tipo_dato_parametro`).selectedIndex =
            elegido.dataset.tipoIndex;
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
    elegido.dataset.opcional = document.querySelector(
        `#${tipo} #opcional_parametro`
    ).checked;
    elegido.dataset.activo = document.querySelector(
        `#${tipo} #activo_parametro`
    ).checked;
    elegido.innerHTML = elegido.dataset.nombre;
    terminar_creacion_parametro(tipo);
}

function eliminar_parametro(tipo) {
    if (parametro_seleccionado) {
        if (confirm("Esta seguro de eliminar el parametro")) {
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

function agregar_a_formula(nuevo) {
    var text = document.getElementById("area_de_nueva_formula");
    text.value += nuevo;
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
    document.getElementById("selectTipoSalidaFuncionesRecursoAdd").selectedIndex = "0";
    document.getElementById("selectTipoSalidaServiciosRecursoAdd").selectedIndex = "0";
    document.getElementById("selectTipoSalidaFormulaRecursoAdd").selectedIndex = "0";
    document.getElementById("selectFormatodeSalida").selectedIndex = "0";
    document.getElementById("input_endpoint_resource").value = "";
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
    var datoSalida = document.getElementById("selectTipoSalidaFormulaRecursoAdd")
        .value;
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
    var data = {
        instrucciones: instrucciones,
        datoSalida: datoSalida,
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
    var data = {
        endPoint: endPoint,
        instrucciones: instrucciones,
        datoSalida: datoSalida,
        formatoSalida: formatoSalida,
    };
    return data;
}

function getParametrosRecursosImple(id) {
    var parametros = document.querySelectorAll(
        `#${id} #lista_parametros_recursos li`
    );
    var arregloParametros = [];
    Array.from(parametros).forEach((element) => {
        var datos = {
            ordinal: element.dataset.ordinal,
            nombre: element.dataset.nombre,
            tipo: element.dataset.tipo,
            opcional: element.dataset.opcional,
            activo: element.dataset.activo,
        };
        arregloParametros.push(datos);
    });
    return arregloParametros;
}

function guardarRecursoImplementacion() {
    var nombre = document.getElementById("input-name-resource-add").value;
    var descripcion = document.getElementById("input-descripton-resource-add")
        .value;
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
            "http://localhost:3000/api/add_deployment_resources/",
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

/* 
    SECCION SELECCION SUJETOS CUADROS DINAMICOS SE SELECCION

        Descripcion:
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
        "http://localhost:3000/api/subjects",
        cargar_posibles_sujetos_modelo,
        error_cargar_posibles_sujetos_modelo
    );

function cargar_posibles_sujetos_modelo(json) {
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
            insertar = document.getElementById("lista_sujetos_para_cargar");
        } else {
            insertar = document.createElement("ul");
            document
                .getElementById(`li_entidad_para_seleccion_${elemento.padre}`)
                .appendChild(insertar);
        }
        var li = document.createElement("li");
        li.id = `li_entidad_para_seleccion_${elemento.id}`;
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
            `hijo_de_${elemento.padre}_para_seleccion` /*, "sujeto_para_seleccion_padre"*/ ,
            "checkbox_para_seleccion"
        );
        checkbox.id = `sujeto_para_seleccion_${elemento.id}`;
        checkbox.dataset.padre_id = elemento.padre;
        checkbox.dataset.puro_id = elemento.id;
        checkbox.setAttribute(
            "onclick",
            "verificar_seleccion_hijo_padre(this, 'para_seleccion');"
        );
        var labelChek = document.createElement("label");
        labelChek.classList.add("form-check-label");
        labelChek.htmlFor = checkbox.id;
        labelChek.innerHTML = elemento.nombre;
        li.appendChild(divFormCheck);
        divFormCheck.appendChild(checkbox);
        divFormCheck.appendChild(labelChek);
        insertar.appendChild(li);

        // ===========================================================================================

        if (!elemento.padre) {
            insertar = document.getElementById("lista_sujetos_seleccionados");
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
        checkbox.classList.add(
            "form-check-input",
            `hijo_de_${elemento.padre}_seleccionado`,
            "checkbox_seleccionado"
        );
        checkbox.id = `sujeto_seleccionado_${elemento.id}`;
        checkbox.dataset.padre_id = elemento.padre;
        checkbox.dataset.puro_id = elemento.id;
        checkbox.dataset.nombre = elemento.nombre;
        checkbox.setAttribute(
            "onclick",
            "verificar_seleccion_hijo_padre(this, 'seleccionado');"
        );
        labelChek = document.createElement("label");
        labelChek.classList.add("form-check-label");
        labelChek.htmlFor = checkbox.id;
        var button = document.createElement("button");
        button.classList.add("btn", "btn-link", "py-0", "px-0");
        button.setAttribute(
            "onclick",
            `abrirModalObjetosSujetosColor('${elemento.id}', '${elemento.nombre}');`
        );
        button.innerHTML = elemento.nombre;
        labelChek.appendChild(button);
        li.appendChild(divFormCheck);
        divFormCheck.appendChild(checkbox);
        divFormCheck.appendChild(labelChek);
        insertar.appendChild(li);
    });
}

function error_cargar_posibles_sujetos_modelo(error) {
    alert("Error al cargar los datos del modelo: " + error);
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
    if (!sujeto_selecciona_seccion_sujeto_modal ||
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
        document.getElementById(
            `sujeto_${lado}_${padre_id}`
        ).checked = !deseleccion;
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
            activo: document.getElementById(`li_entidad_seleccionado_${e.dataset.puro_id}`)
                .style.display == "list-item",
        };
        actualizacion.push(elem);
    });
    post_api(
        (url = "http://localhost:3000/api/update_subjects"),
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

        Descripcion:
		En este fragmeto se pretende crear las funciones que llamen a la ventana modal
		y todas las funciones que impliquen la creacion de los objetos que tienen los sujetos

        Incluye:
*/

function cargar_select_operador_agregacion() {
    var nombre = "TIPO_OPERADOR_ASIGNACION";
    var data = {
        tipo: nombre,
    };
    post_api(
        "http://localhost:3000/api/get_enumeracion",
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
}

function cargar_arbol(id) {
    post_api(
        (url = "http://localhost:3000/api/subjects_objects"), { id: id },
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
    document.getElementById("activoObjeto").disabled = false;
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
    document.getElementById("activoObjeto").disabled = true;
    document.getElementById("btn-agregarObjetoLista").disabled = true;

    document.getElementById("idPadreObjeto").value = "";
    document.getElementById("nombreObjeto").value = "";
    document.getElementById("descripcionObjeto").value = "";
    document.getElementById("pesoObjeto").value = "";
    document.getElementById("operadorAsigObjetos").value = "";
    document.getElementById("activoObjeto").checked = false;
}

function agregarObjeto() {
    var id_padre = document.getElementById("idPadreObjeto").value;
    var nombre = document.getElementById("nombreObjeto").value;
    var descripcion = document.getElementById("descripcionObjeto").value;
    var peso = document.getElementById("pesoObjeto").value;
    var operador = document.getElementById("operadorAsigObjetos").value;
    var activo = document.getElementById("activoObjeto").checked;
    if ((!!id_padre, !!nombre, !!descripcion, !!peso, !!operador)) {
        post_api(
            (url = "http://localhost:3000/api/save_subjects_objects"), {
                id_padre: id_padre,
                nombre: nombre,
                descripcion: descripcion,
                peso: peso,
                operador: operador,
                activo: activo,
                sujeto_id: idSujetoObjetoActual,
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
        (url = "http://localhost:3000/api/delete_subjects_objects"), {
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

        Descripcion:
		Esta seccion contiene las funciones de que carga las unidades de medida
		en la pagina de seleccionar sujetos.

        Incluye:
		cargar_unidades_de_medida_select
		error_cargar_unidades_de_medida_select
*/

function cargar_tipo_metrica_select(json) {
    res = "";
    json.forEach((me) => {
        res += `<option value='${me.id}'>${me.nombre}</option>`;
    });
    document.getElementById("select_metrica").innerHTML = res;
}

function error_cargar_tipo_metrica_select(err) {
    alert("Error al cargar los datos del modelo: " + err);
}

if (document.getElementById("unidad_medida_metrica"))
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
    document.getElementById("unidad_medida_metrica").innerHTML = res;
}

function error_cargar_unidades_de_medida_select(err) {
    alert("Error al cargar los datos del modelo: " + err);
}

/*CARGAR TIPO PARA LA SECCION DE ESCALAS*/

if (
    document.getElementById("tipo_escalas") ||
    document.getElementById("tipo_escalas2")
)
    consultar_api(
        "http://localhost:3000/api/enumeracion",
        cargar_enumeracion_select,
        error_cargar_enumeracion_select
    );

function cargar_enumeracion_select(json) {
    res = "";
    json.forEach((enu) => {
        res += `<option value='${enu.id}'>${enu.nombre}</option>`;
    });
    document.getElementById("tipo_escalas").innerHTML = res;
    document.getElementById("tipo_escalas2").innerHTML = res;
}

function error_cargar_enumeracion_select(err) {
    alert("Error al cargar los datos del modelo: " + err);
}

/* 
    SECCION SELECCION SUJETOS CARGAR LAS UNIDADES DE MEDIDA

        Descripcion:
		Esta seccion incluye el envio de datos para las unidades de medida

        Incluye:
*/

function cargar_unidades_de_medida_table(json) {
    var res = "";
    json.forEach((um) => {
        res += "<tr>";
        res += `<td><input type="radio" name="unidad_seleccionada" value="${
      um.id
    }" data-name="${um.nombre}" data-descripcion="${
      um.descripcion
    }" data-acronym="${um.acronimo}" data-activo="${
      um.activo == "true"
    }"></td>`;
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

function agregarUnidadMedida() {
    $("#modal_units_add").modal("show");
}

function guardarNuevaUnidadMedida() {
    var data = {
        nombre: document.getElementById("input-name-add").value,
        descripcion: document.getElementById("input-descripton-add").value,
        acronym: document.getElementById("input-weight-add").value,
    };
    if (!!data.nombre && !!data.descripcion && !!data.acronym) {
        post_api(
            "http://localhost:3000/api/add_measurement_units/",
            data,
            mensaje_exitoEnvioUnidadesMedida,
            mensaje_errorEnvioUnidadesMedida
        );
        consultar_api(
            "http://localhost:3000/api/measurement_units",
            cargar_unidades_de_medida_table,
            error_cargar_unidades_de_medida_table
        );
        $("#modal_units_add").modal("hide");
    } else alert("Ingrese todos los campos del formulario");
}

function eliminarUnidadMedida() {
    try {
        var radio = document.getElementsByName("unidad_seleccionada");
        var id;
        var name;
        var descripcion;
        var acronym;
        var activo;
        radio.forEach((elem) => {
            if (elem.checked) {
                id = elem.value;
                name = elem.dataset.name;
                descripcion = elem.dataset.descripcion;
                acronym = elem.dataset.acronym;
                activo = elem.dataset.activo == "true";
                return;
            }
        });

        if (!!id && !!name && !!descripcion && !!acronym) {
            $("#modal_eliminar_unidadMedida").modal("show");
        } else alert("Debe seleccionar un elemento para modificar");
    } catch (error) {
        alert(error);
    }
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
    if (!!id) {
        data = {
            id: id,
        };
        post_api(
            "http://localhost:3000/api/del_measurement_units/",
            data,
            mensaje_exitoEnvioUnidadesMedida,
            mensaje_errorEnvioUnidadesMedida
        );
        consultar_api(
            "http://localhost:3000/api/measurement_units",
            cargar_unidades_de_medida_table,
            error_cargar_unidades_de_medida_table
        );
        $("#modal_eliminar_unidadMedida").modal("hide");
    } else alert("Debe seleccionar un elemento para eliminar");
}

function modificarUnidadMedida() {
    try {
        var radio = document.getElementsByName("unidad_seleccionada");
        var id;
        var name;
        var descripcion;
        var acronym;
        var activo;
        radio.forEach((elem) => {
            if (elem.checked) {
                id = elem.value;
                name = elem.dataset.name;
                descripcion = elem.dataset.descripcion;
                acronym = elem.dataset.acronym;
                activo = elem.dataset.activo == "true";
                return;
            }
        });
        if (!!id && !!name && !!descripcion && !!acronym) {
            document.getElementById("input-id-update").value = id;
            document.getElementById("input-name-update").value = name;
            document.getElementById("input-descripton-update").value = "descripcion";
            document.getElementById("input-acronym-update").value = acronym;
            document.getElementById("ActivoUnits").checked = activo;
            $("#modal_modificar_unidadMedida").modal("show");
        } else alert("Debe seleccionar un elemento para modificar");
    } catch (error) {
        alert(error);
    }
}

function guardarModificacionMedida() {
    var data = {
        id: document.getElementById("input-id-update").value,
        nombre: document.getElementById("input-name-update").value,
        descripcion: document.getElementById("input-descripton-update").value,
        acronym: document.getElementById("input-acronym-update").value,
        activo: document.getElementById("ActivoUnits").checked,
    };
    if (!!data.id && !!data.nombre && !!data.descripcion && !!data.acronym) {
        post_api(
            "http://localhost:3000/api/upd_measurement_units/",
            data,
            mensaje_exitoEnvioUnidadesMedida,
            mensaje_errorEnvioUnidadesMedida
        );
        consultar_api(
            "http://localhost:3000/api/measurement_units",
            cargar_unidades_de_medida_table,
            error_cargar_unidades_de_medida_table
        );

        $("#modal_modificar_unidadMedida").modal("hide");
    } else alert("Debe debe completar todos los campos");
}

function mensaje_exitoEnvioUnidadesMedida(json) {
    alert(json.mensaje);
}

function mensaje_errorEnvioUnidadesMedida(err) {
    alert(err);
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
        res += `<td><input type="radio" name="escala_seleccionada" value="${
      es.id
    }" data-name="${es.nombre}" data-valor_valido="${
      es.valor_valido
    }" data-tipo="${es.tipo}" data-activo="${es.activo == "true"}"></td>`;
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
    SECCION SELECCION SUJETOS CARGAR LAS ESCALAS

        Descripcion:
		Esta seccion incluye el envio de datos para las Escalas

        Incluye:
*/

function agregar_escala() {
    $("#modal_scales_add").modal("show");
}

function guardarNuevaEscala() {
    try {
        var escala = document.getElementById("tipo_escalas");
        var escala_valor = escala.options[escala.selectedIndex].text;
        var data = {
            nombre: document.getElementById("input-name-scale-add").value,
            valor_valido: document.getElementById("input-valor-add").value,
            tipo: escala_valor,
            activo: document.getElementById("activoEscalas").value,
        };
        alert(data.tipo);
        if (!!data.nombre && !!data.valor_valido && !!data.tipo) {
            post_api(
                "http://localhost:3000/api/add_escales/",
                data,
                mensaje_exitoEnvioEscalas,
                mensaje_errorEnvioEscalas
            );
            consultar_api(
                "http://localhost:3000/api/escales",
                cargar_escales_table,
                error_cargar_escales_table
            );
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
    var valor_valido;
    var activo;
    var tipo;
    radio.forEach((elem) => {
        if (elem.checked) {
            id = elem.value;
            name = elem.dataset.name;
            valor_valido = elem.dataset.valor_valido;
            tipo = elem.dataset.tipo;
            activo = elem.dataset.activo == "true";
            return;
        }
    });

    if (!!id && !!name && !!valor_valido && !!tipo) {
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
        data = {
            id: id,
        };

        post_api(
            "http://localhost:3000/api/del_escales/",
            data,
            mensaje_exitoEnvioEscalas,
            mensaje_errorEnvioEscalas
        );
        consultar_api(
            "http://localhost:3000/api/escales",
            cargar_escales_table,
            error_cargar_escales_table
        );
        $("#modal_escalas_del").modal("hide");
    } else alert("Debe seleccionar un elemento para eliminar");
}

function modificarEscalas() {
    var radio = document.getElementsByName("escala_seleccionada");
    var id;
    var name;
    var valor_valido;
    var activo;
    var tipo;
    radio.forEach((elem) => {
        if (elem.checked) {
            id = elem.value;
            name = elem.dataset.name;
            valor_valido = elem.dataset.valor_valido;
            tipo = elem.dataset.tipo;
            activo = elem.dataset.activo == "true";
            return;
        }
    });

    if (!!id && !!name && !!valor_valido && !!tipo) {
        document.getElementById("input-escale-id-update").value = id;
        document.getElementById("input-escale-name-update").value = name;
        document.getElementById("input-escale-valor-update").value = valor_valido;
        document.getElementById("activoEscalas").checked = activo;
        $("#modal_escalas_mod").modal("show");
    } else alert("Debe seleccionar un elemento para modificar");
}

function guardarModificacionEscala() {
    var data = {
        id: document.getElementById("input-escale-id-update").value,
        nombre: document.getElementById("input-escale-name-update").value,
        valor_valido: document.getElementById("input-escale-valor-update").value,
        tipo: document.getElementById("tipo_escalas").value,
        activo: document.getElementById("activoEscalas").checked,
    };
    if (!!data.id && !!data.nombre && !!data.valor_valido && !!data.tipo) {
        post_api(
            "http://localhost:3000/api/upd_escales/",
            data,
            mensaje_exitoEnvioEscalas,
            mensaje_errorEnvioEscalas
        );
        consultar_api(
            "http://localhost:3000/api/escales",
            cargar_escales_table,
            error_cargar_escales_table
        );

        $("#modal_escalas_mod").modal("hide");
    } else alert("Debe debe completar todos los campos");
}

function mensaje_exitoEnvioEscalas(json) {
    alert(json.mensaje);
}

function mensaje_errorEnvioEscalas(err) {
    alert(err);
}

/* 
    SECCION SELECCION SUJETOS CARGAR LOS CRITERIOS DE DECISION

        Descripcion:
		Esta seccion incluye el envio de datos para los criterios de decision

        Incluye:
*/
//
function cargar_criterios_table(json) {
    res = "";
    json.forEach((cd) => {
        res += `<tr onClick="visibilidad_umbral('${cd.id}')">`;
        res += `<td><input type="checkbox" name="criterio_seleccionado" value="${
      cd.id
    }" data-name="${cd.nombre}" data-descripcion="${
      cd.descripcion
    }" data-activo="${cd.activo == "true"}"></td>`;
        res += `<td>${cd.id}</td>`;
        res += `<td>${cd.nombre}</td>`;
        res += `<td>${cd.descripcion}</td>`;
        if (cd.activo == "true")
            res += `<td><input type="checkbox" disabled checked></td>`;
        else res += `<td><input type="checkbox" disabled></td>`;
        res += "</tr>";
        post_api(
            "http://localhost:3000/api/umbral", { id: cd.id },
            cargar_umbral_table,
            () => {
                console.log("Error Al cargar el Umbral");
            }
        );
    });
    document.getElementById("tabla_criterios_decision").innerHTML = res;
}
var criterio_select;

function error_cargar_criterios_table(err) {
    alert("Error al cargar los datos del modelo: " + err);
}

function agregar_criterio_decision() {
    $("#modal_criteria_add").modal("show");
}

function guardarNuevoCriterio() {
    var data = {
        nombre: document.getElementById("input-name-criteria-add").value,
        descripcion: document.getElementById("input-descripton-criteria-add").value,
    };
    if (!!data.nombre && !!data.descripcion) {
        post_api(
            "http://localhost:3000/api/add_decision_criteria/",
            data,
            mensaje_exitoEnvioDecisionCriteria,
            mensaje_errorEnvioDecisionCriteria
        );
        consultar_api(
            "http://localhost:3000/api/decision_criteria",
            cargar_criterios_table,
            error_cargar_criterios_table
        );
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
            data = {
                id: id,
            };
            post_api(
                "http://localhost:3000/api/del_decision_criteria/",
                data,
                mensaje_exitoEnvioDecisionCriteria,
                mensaje_errorEnvioDecisionCriteria
            );
            consultar_api(
                "http://localhost:3000/api/decision_criteria",
                cargar_criterios_table,
                error_cargar_criterios_table
            );
            $("#modal_eliminar_criterios").modal("hide");
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
            document.getElementById("input-id-criteria-update").value = id;
            document.getElementById("input-name-criteria-update").value = name;
            document.getElementById(
                "input-descripton-criteria-update"
            ).value = descripcion;
            document.getElementById("activoCriteria").checked = activo;
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
            nombre: document.getElementById("input-name-criteria-update").value,
            descripcion: document.getElementById("input-descripton-criteria-update")
                .value,
            activo: document.getElementById("activoCriteria").checked,
        };
        if (!!data.id && !!data.nombre && !!data.descripcion) {
            post_api(
                "http://localhost:3000/api/upd_decision_criteria/",
                data,
                mensaje_exitoEnvioDecisionCriteria,
                mensaje_errorEnvioDecisionCriteria
            );
            consultar_api(
                "http://localhost:3000/api/decision_criteria",
                cargar_criterios_table,
                error_cargar_criterios_table
            );

            $("#modal_modificar_criterios").modal("hide");
        } else alert("Debe debe completar todos los campos");
    } catch (error) {
        alert(error);
    }
}

function mensaje_exitoEnvioDecisionCriteria(json) {
    alert(json.mensaje);
}

function mensaje_errorEnvioDecisionCriteria(err) {
    alert(err);
}

/* Relizar mantenimeinto de la tabla Umbrales partiendo del ID de los criterios de decision*/

function visibilidad_umbral(id) {
    document.getElementById("bt_addUmbral").style = "block";
    document.getElementById("bd_modUmbral").style = "block";
    document.getElementById("bd_delUmbral").style = "block";
    var dato = document.getElementById("umbral_" + id);
    dato.style.display = "table";
    if (criterio_select) {
        dato = document.getElementById("umbral_" + criterio_select);
        dato.style.display = "none";
    }
    criterio_select = id;
}

function cargar_umbral_table(json) {
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
        input.dataset.nombre = um.nombre;
        input.dataset.interpretacion = um.interpretacion;
        input.dataset.inferior = um.inferior;
        input.dataset.superior = um.superior;
        input.dataset.activo = um.activo;
        input.dataset.id_crite = json.id_decicion;
        dato.appendChild(input);
        fila.appendChild(dato);
        dato = document.createElement("td");
        dato.innerHTML = um.id;
        fila.appendChild(dato);
        dato = document.createElement("td");
        dato.innerHTML = um.nombre;
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
        input.checked = um.activo == "true";
        dato = document.createElement("td");
        dato.appendChild(input);
        fila.appendChild(dato);
        body.appendChild(fila);
    });
    body.id += "_" + json.id_decicion;
    var tabla = templeate.querySelector(".table");
    tabla.id = "umbral_" + json.id_decicion;
    tabla.style.display = "none";
    seccion.appendChild(templeate);
}

function agregar_umbral() {
    $("#modal_umbral_add").modal("show");
}

function guardarNuevoUmbral() {
    try {
        var data2 = {
            id: criterio_select,
        };
        var data = {
            nombre: document.getElementById("input-name-umbral-add").value,
            interpretacion: document.getElementById("input-interpretacion-umbral-add")
                .value,
            inferior: document.getElementById("input-inferior-umbral-add").value,
            superior: document.getElementById("input-superior-umbral-add").value,
            criterio_select,
        };
        if (!!data.nombre &&
            !!data.interpretacion &&
            !!data.inferior &&
            !!data.superior
        ) {
            post_api(
                "http://localhost:3000/api/add_umbral/",
                data,
                mensaje_exitoEnvioUmbral,
                mensaje_errorEnvioUmbral
            );
            $("#modal_umbral_add").modal("hide");
            post_api("http://localhost:3000/api/umbral/", data2, cargar_umbral_table);
        } else alert("Ingrese todos los campos del formulario");
    } catch (error) {
        alert(error);
    }
}

function eliminar_umbral() {
    try {
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
                activo = elem.dataset.activo == "true";
                return;
            }
        });
        if (!!id && !!name && !!interpretacion && !!superior && !!inferior) {
            document.getElementById("input-id-umbral-del").value = id;
            document.getElementById("input-name-umbral-del").value = name;
            document.getElementById(
                "input-interpretacion-umbral-del"
            ).value = interpretacion;
            document.getElementById("input-superior-umbral-del").value = superior;
            document.getElementById("input-inferior-umbral-del").value = inferior;
            document.getElementById("activoUmbralDel").checked = activo;
            $("#modal_eliminar_umbral").modal("show");
        } else alert("Seleccione el Elemento");
    } catch (error) {
        alert(error);
    }
}

function guardar_eliminar_umbral() {
    var radio = document.getElementsByName("umbral_seleccionado");
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
        post_api(
            "http://localhost:3000/api/del_umbral/",
            data,
            mensaje_exitoEnvioUmbral,
            mensaje_errorEnvioUmbral
        );
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
            activo = elem.dataset.activo == "true";
            return;
        }
    });
    if (!!id && !!name && !!interpretacion && !!superior && !!inferior) {
        document.getElementById("input-id-umbral-update").value = id;
        document.getElementById("input-name-umbral-update").value = name;
        document.getElementById(
            "input-interpretacion-umbral-update"
        ).value = interpretacion;
        document.getElementById("input-superior-umbral-update").value = superior;
        document.getElementById("input-inferior-umbral-update").value = inferior;
        document.getElementById("activoUmbral").checked = activo;
        $("#modal_modificar_umbral").modal("show");
    } else alert("Seleccione el Elemento");
}

function guardarModificacionUmbral() {
    try {
        var data = {
            id: document.getElementById("input-id-umbral-update").value,
            nombre: document.getElementById("input-name-umbral-update").value,
            interpretacion: document.getElementById(
                "input-interpretacion-umbral-update"
            ).value,
            inferior: document.getElementById("input-inferior-umbral-update").value,
            superior: document.getElementById("input-superior-umbral-update").value,
            activo: document.getElementById("activoUmbral").checked,
        };
        if (!!data.id &&
            !!data.nombre &&
            !!data.interpretacion &&
            !!data.inferior &&
            !!data.superior
        ) {
            post_api(
                "http://localhost:3000/api/upd_umbral/",
                data,
                mensaje_exitoEnvioUmbral,
                mensaje_errorEnvioUmbral
            );

            $("#modal_modificar_umbral").modal("hide");
        } else alert("Debe debe completar todos los campos");
    } catch (error) {
        alert("Qusa");
    }
}

function mensaje_exitoEnvioUmbral(json) {
    alert(json.mensaje);
}

function mensaje_errorEnvioUmbral(err) {
    alert(err);
}

/* 
    SECCION CARGAR CRITERIOS DECISION

        Descripcion:
		Esta seccion contiene las funciones de que carga los criterios de decision

        Incluye:
		cargar_criterios_table
		error_cargar_criterios_table
*/

/*Botones para los aspectos Ingresar Modificar y Eliminar*/
function agregar_aspecto() {
    $("#modal_aspecto_add").modal("show");
}

function guardarNuevoAspecto() {
    var data = {
        descripcion: document.getElementById("input-descripton-aspect-add").value,
    };
    if (!!data.descripcion) {
        post_api(
            "http://localhost:3000/api/add_aspects/",
            data,
            mensaje_exitoEnvioAspects,
            mensaje_errorEnvioAspects
        );
        consultar_api(
            "http://localhost:3000/api/aspects",
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
                "http://localhost:3000/api/get_metrica",
                data,
                cargar_aspectos_metrica_table,
                error_cargar_aspectos_metrica_table
            );
            post_api(
                "http://localhost:3000/api/get_enumeracion",
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
    alert(json.mensaje);
}

function mensaje_errorEnvioAspects(err) {
    alert(err);
}

if (document.getElementById("tabla_criterios_decision"))
    consultar_api(
        "http://localhost:3000/api/decision_criteria",
        cargar_criterios_table,
        error_cargar_criterios_table
    );

/* 
    SECCION CARGAR ASPECTOS AUTOCONSCIENCIA

        Descripcion:
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
    alert("Error al cargar los datos del modelo: " + err);
}

function cargar_aspectos_metrica_table(json) {
    res = "";
    console.log(json);
    json.forEach((met) => {
        res += "<tr>";
        res += `<td><input type="radio" name="metrica_seleccionado" value="${
      met.id
    }" data-name="${met.nombre}" data-tipo="${met.tipo}" data-abreviatura="${
      met.abreviatura
    }" data-activo="${met.activo == "true"}"></td>`;
        res += `<td>${met.id}</td>`;
        res += `<td>${met.nombre}</td>`;
        res += `<td>${met.tipo}</td>`;
        res += `<td>${met.abreviatura}</td>`;
        if (met.activo == "true")
            res += `<td><input type="checkbox" disabled checked></td>`;
        else res += `<td><input type="checkbox" disabled></td>`;
        res += "</tr>";
    });
    document.getElementById("tabla_aspectos_Metrica").innerHTML = res;
}

function error_cargar_aspectos_metrica_table(err) {
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
var modelo_fisico_json;
if (document.getElementById("tabla_modelos_autoconciencia"))
    consultar_api(
        "http://localhost:3000/api/user_models",
        cargar_modelos_table,
        error_cargar_models_table
    );

function cargar_modelos_table(json) {
    res = "";
    json.forEach((md) => {
        modelo_fisico_json = JSON.parse(md.json);
        res += `<tr id='modelo-${md.id}-tabla'>`;
        res += `<td name="modelo-${
      md.id
    }"><input type="radio" name="modelo_seleccionado_tabla" value="${
      md.id
    }" data-name="${md.nombre}" data-autor="${md.autor}" data-descripcion="${
      md.descripcion
    }" data-activo="${md.activo == "true"}"></td>`;
        res += `<td name="modelo-${md.id}">${md.id}</td>`;
        res += `<td name="modelo-${md.id}">${md.nombre}</td>`;
        res += `<td name="modelo-${md.id}">${md.autor}</td>`;
        res += `<td name="modelo-${md.id}">${md.descripcion}</td>`;
        res += `<td name="modelo-${
      md.id
    }"><buttom class="btn btn-link" onclick="mostrar_modal_json()">${
      Object.keys(JSON.parse(md.json))[0]
    }</buttom></td>`;
        if (md.activo == "true")
            res += `<td><input type="checkbox" disabled checked></td>`;
        else res += `<td><input type="checkbox" disabled></td>`;
        res += "</tr>";
    });

    document.getElementById("tabla_modelos_autoconciencia").innerHTML = res;
}

function error_cargar_models_table(err) {
    alert("Error al cargar los datos del modelo: " + err);
}

function mostrar_modal_json() {
    $("#modal_json").modal("show");
    document.getElementById("modal_json_title").innerHTML = Object.keys(
        modelo_fisico_json
    )[0];
    document.getElementById("contenido_json").innerHTML = JSON.stringify(
        modelo_fisico_json,
        null,
        2
    );
}

function activarFormularioAgregarMetrica() {
    try {
        document.getElementById("nombreMetrica").disabled = false;
        document.getElementById("descripcionMetrica").disabled = false;
        document.getElementById("abreviaturaMetrica").disabled = false;
        document.getElementById("escalas_seccion_entidad").disabled = false;
        document.getElementById("unidad_medida_metrica").disabled = false;
        document.getElementById("select_metrica").disabled = false;
        document.getElementById("activoMetrica").disabled = false;
        document.getElementById("btn-agregarMetrica").disabled = false;
        document.getElementById("btn-CancelarMetrica").disabled = false;
    } catch (error) {
        alert(error);
    }
}

function desactivarFormularioAgregarMetrica() {
    try {
        document.getElementById("nombreMetrica").disabled = true;
        document.getElementById("descripcionMetrica").disabled = true;
        document.getElementById("abreviaturaMetrica").disabled = true;
        document.getElementById("escalas_seccion_entidad").disabled = true;
        document.getElementById("unidad_medida_metrica").disabled = true;
        document.getElementById("select_metrica").disabled = true;
        document.getElementById("activoMetrica").disabled = true;
        document.getElementById("btn-agregarMetrica").disabled = true;
        document.getElementById("btn-CancelarMetrica").disabled = true;
        document.getElementById("nombreMetrica").value = "";
        document.getElementById("descripcionMetrica").value = "";
        document.getElementById("abreviaturaMetrica").value = "";
    } catch (error) {
        alert(error);
    }
}
if (document.getElementById("escalas_seccion_entidad"))
    consultar_api(
        "http://localhost:3000/api/escales",
        cargar_escalas_select,
        error_escalas_select
    );

function cargar_escalas_select(json) {
    res = "";
    json.forEach((es) => {
        res += `<option value='${es.id}'>${es.nombre}</option>`;
    });
    document.getElementById("escalas_seccion_entidad").innerHTML = res;
}

function error_escalas_select(err) {
    alert("Error al cargar las escalas select: " + err);
}
/* 
    SECCION LISTAR MODELOS

        Descripcion:
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
    var activo;
    var select = false;
    radios.forEach((elem) => {
        if (elem.checked) {
            id = elem.value;
            name = elem.dataset.name;
            descripcion = elem.dataset.descripcion;
            autor = elem.dataset.autor;
            activo = elem.dataset.activo == "true";
            select = true;
            return;
        }
    });

    document.getElementById("id_modelo_update").value = id;
    document.getElementById("nombre_modelo_update").value = name;
    document.getElementById("descripcion_esenario_update").value = descripcion;
    document.getElementById("autor_esenario_update").value = autor;
    document.getElementById("activoModelo").checked = activo;
    if (select) $("#modificar_modelo_modal").modal("show");
    else alert("Seleccione un modelo para modificar");
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
var entidades_list = [];
var entidades_aux = {};

$("#CategoriaEntidades").change(function() {
    var limpiar = document.getElementById("lista_entidades_para_cargar");
    limpiar.innerHTML = "";
    var limpiar2 = document.getElementById("lista_entidades_seleccionados");
    limpiar2.innerHTML = "";
    var seleccion = document.getElementById("CategoriaEntidades");
    var tipo_valor = seleccion.options[seleccion.selectedIndex].text;
    data = {
        valorS: tipo_valor,
    };
    post_api(
        "http://localhost:3000/api/entity",
        data,
        cargar_posibles_entidades_modelo,
        error_cargar_posibles_entidades_modelo
    );
});

function cargar_posibles_entidades_modelo(json) {
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
            `hijo_entidad_de_${elemento.padre}_para_seleccion` /*, "sujeto_para_seleccion_padre"*/ ,
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
        // ===========================================================================================

        if (!elemento.padre) {
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
        var button = document.createElement("button");
        button.classList.add("btn", "btn-link", "py-0", "px-0");
        button.setAttribute(
            "onclick",
            `abrirModalEntidadColor('${elemento.id}', '${elemento.nombre}');`
        );
        button.innerHTML = elemento.nombre;
        labelChek.appendChild(button);
        li.appendChild(divFormCheck);
        divFormCheck.appendChild(checkbox);
        divFormCheck.appendChild(labelChek);
        insertar.appendChild(li);
    });
}

function error_cargar_posibles_entidades_modelo(error) {
    alert("Error al cargar los datos del modelo: " + error);
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
    if (!entidad_selecciona_seccion_objetos_modal ||
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
    try {
        var padre_id = elemento.dataset.padre_id;
        if (padre_id != "null" && elemento.checked) {
            // Si es hijo y esta seleccionado
            document.getElementById(`sujeto_${lado}_${padre_id}`).checked = true;
        } else if (padre_id == "null") {
            // Si es padre
            var hijos = document.getElementsByClassName(
                `hijo_entidad_de_${elemento.dataset.puro_id}_${lado}`
            );
            Array.from(hijos).forEach((e) => {
                if (
                    document.getElementById(`li_ent_${lado}_${e.dataset.puro_id}`).style
                    .display == "list-item"
                )
                    e.checked = elemento.checked;
            });
        } else {
            // De otra forma
            var deseleccion = true;
            var hijos = document.getElementsByClassName(
                `hijo_de_${padre_id}_${lado}`
            );
            Array.from(hijos).forEach((e) => {
                deseleccion = deseleccion && !e.checked;
            });
            document.getElementById(
                `sujeto_${lado}_${padre_id}`
            ).checked = !deseleccion;
        }
    } catch (error) {
        alert(error);
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
        document.getElementById(`li_ent_para_seleccion_${e}`).style.display =
            "list-item";
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
            activo: document.getElementById(`li_ent_seleccionado_${e.dataset.puro_id}`)
                .style.display == "list-item",
        };
        actualizacion.push(elem);
    });
    post_api(
        (url = "http://localhost:3000/api/update_entity"),
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
        Descripcion:
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
            "http://localhost:3000/api/aspects",
            data,
            cargar_aspectos_table,
            error_cargar_aspectos_table
        );
        cargar_select_tipo_as();
    } catch (error) {
        alert(error);
    }
}

function cargar_select_tipo_as() {
    var tipo = "TIPO_ASPECTO";
    var data = {
        tipo: tipo,
    };
    post_api(
        "http://localhost:3000/api/get_enumeracion",
        data,
        cargar_select_tipo_aspecto,
        error_select_tipo_aspecto
    );
}

function cargar_select_tipo_aspecto(json) {
    var ope = document.getElementById("tipo_aspectos");
    ope.innerHTML = "";
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

function activarFormularioAgregarEntidad() {
    try {
        document.getElementById("nombreEntidad").disabled = false;
        document.getElementById("descripcionEntidad").disabled = false;
        document.getElementById("PesoEntidad").disabled = false;
        document.getElementById("tipo_aspectos").disabled = false;
        document.getElementById("activoEntidad").disabled = false;
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
    document.getElementById("activoEntidad").value = "";
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
                "http://localhost:3000/api/add_aspects/",
                data,
                mensaje_exitoEnvioAspects,
                mensaje_errorEnvioAspects
            );
        post_api(
            "http://localhost:3000/api/aspects",
            data,
            cargar_aspectos_table,
            error_cargar_aspectos_table
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
            "http://localhost:3000/api/del_aspects/",
            data,
            mensaje_exitoEnvioAspects,
            mensaje_errorEnvioAspects
        );
        post_api(
            "http://localhost:3000/api/aspects",
            data,
            cargar_aspectos_table,
            error_cargar_aspectos_table
        );
        $("#modal_eliminar_unidadMedida").modal("hide");
    } else alert("Debe seleccionar un elemento para eliminar");
}

/*Seccion de Metricas Botones Guardar Cancelar Agregar y Eliminar*/

function GuardarMetrica() {
    var escala = document.getElementById("escalas_seccion_entidad");
    var escalaS = escala.options[escala.selectedIndex].text;
    var unidad = document.getElementById("unidad_medida_metrica");
    var unidadS = unidad.options[unidad.selectedIndex].text;
    var tipo = document.getElementById("select_metrica");
    var tipoS = tipo.options[tipo.selectedIndex].text;
    var data = {
        id: AspectoId,
        nombre: document.getElementById("nombreMetrica").value,
        descripcion: document.getElementById("descripcionMetrica").value,
        abreviatura: document.getElementById("abreviaturaMetrica").value,
        escala: escalaS,
        unidad: unidadS,
        tipo: tipoS,
        activo: document.getElementById("activoMetrica").checked,
    };
    var data2 = {
        id: AspectoId,
    };
    if (!!data.nombre &&
        !!data.descripcion &&
        !!data.abreviatura &&
        !!data.escala &&
        !!data.unidad &&
        !!data.tipo
    ) {
        post_api(
            "http://localhost:3000/api/add_metrica/",
            data,
            mensaje_exitoEnvioMetrica,
            mensaje_errorEnvioMetrica
        );
        desactivarFormularioAgregarMetrica();
        post_api(
            "http://localhost:3000/api/get_metrica",
            data2,
            cargar_aspectos_metrica_table,
            error_cargar_aspectos_metrica_table
        );
    }
}

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
            "http://localhost:3000/api/del_metrica/",
            data,
            mensaje_exitoEnvioMetrica,
            mensaje_errorEnvioMetrica
        );
        post_api(
            "http://localhost:3000/api/get_metrica",
            data,
            cargar_aspectos_metrica_table,
            error_cargar_aspectos_metrica_table
        );
        $("#modal_eliminar_unidadMedida").modal("hide");
    } else alert("Debe seleccionar un elemento para eliminar");
}

function mensaje_exitoEnvioMetrica(json) {
    alert(json.mensaje);
}

function mensaje_errorEnvioMetrica(err) {
    alert(err);
}
/* 
    SECCION SELECCION SUJETOS CARGAR LOS RECURSOS DE IMPLEMENTACION

        Descripcion:
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
    if (!!data.nombre &&
        !!data.descripcion &&
        !!data.tipo_dato_salida &&
        !!data.tipo_recurso
    ) {
        post_api(
            "http://localhost:3000/api/add_ri/",
            data,
            mensaje_exitoEnvioRI,
            mensaje_errorEnvioRI
        );
        consultar_api(
            "http://localhost:3000/api/add_ri/",
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
            "http://localhost:3000/api/del_escales/",
            data,
            mensaje_exitoEnvioEscalas,
            mensaje_errorEnvioEscalas
        );
        consultar_api(
            "http://localhost:3000/api/escales",
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
            "http://localhost:3000/api/upd_escales/",
            data,
            mensaje_exitoEnvioEscalas,
            mensaje_errorEnvioEscalas
        );
        consultar_api(
            "http://localhost:3000/api/escales",
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

        Descripcion:
        Esta seccion contiene las funciones 
        de que carga los recursos de implementacion
		en la pagina

        Incluye:
		cargar_ri_table,
        error_cargar_ri_table
*/

if (document.getElementById("tabla_recurso_implementacion"))
    consultar_api(
        "http://localhost:3000/api/recurso_implementacion",
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
    alert("Error al cargar los datos del modelo: " + err);
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
        "http://localhost:3000/api/subjects",
        cargar_sujetos_activos,
        error_cargar_sujetos_activos
    );

function cargar_sujetos_activos(json) {
    var aux_visible_activo = new Set();
    var aux_visible_inactivo = new Set();
    json.forEach((elemento) => {
        if (!!elemento.padre && elemento.activo == 1) {
            aux_visible_activo.add(elemento.padre);
        } else if (!!elemento.padre && elemento.activo == 0) {
            aux_visible_inactivo.add(elemento.padre);
        }
    });
    console.log(aux_visible_inactivo);
    json.forEach((elemento) => {
        var insertar;
        if (!elemento.padre) {
            insertar = document.getElementById("lista_sujetos_activos");
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
        checkbox.classList.add(
            "form-check-input",
            `hijo_de_${elemento.padre}_seleccionado`,
            "checkbox_seleccionado"
        );
        checkbox.id = `sujeto_seleccionado_${elemento.id}`;
        checkbox.name = "checkbox_sujetos_objetos";
        checkbox.dataset.padre_id = elemento.padre;
        checkbox.dataset.puro_id = elemento.id;
        checkbox.dataset.nombre = elemento.nombre;
        checkbox.setAttribute("onclick", "verificarSeleccion(this);");
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

function error_cargar_sujetos_activos(error) {
    alert("Error al cargar los datos del modelo: " + error);
}

function verificarSeleccion(elemento) {
    var checkbox = document.getElementsByName("checkbox_sujetos_objetos");
    var auxChecked = elemento.checked;
    Array.from(checkbox).forEach((element) => {
        element.checked = false;
    });
    elemento.checked = auxChecked;
}

/*
Procesos Pre Reflexivos
*/

function agregarProcesoPreReflexivo() {
    var tipoComunicacion = "TIPO_COMUNICACION";
    data = {
        tipo: tipoComunicacion,
    };
    post_api(
        "http://localhost:3000/api/get_enumeracion",
        data,
        cargar_select_tipo_comunicacion,
        error_cargar_select_tipo_comunicacion
    );
    consultar_api(
        "http://localhost:3000/api/decision_criteria",
        cargar_select_criterios_proceso,
        error_cargar_select_criterios_proceso
    );
    $("#modal_proceso_pre_reflexivo").modal("show");

}
if (document.getElementById("lista_sujetos_activos_proceso"))
    consultar_api(
        "http://localhost:3000/api/subjects",
        cargar_sujetos_activos_procesos,
        error_cargar_sujetos_activos_procesos
    );

function cargar_sujetos_activos_procesos(json) {
    var aux_visible_activo = new Set();
    var aux_visible_inactivo = new Set();
    json.forEach((elemento) => {
        if (!!elemento.padre && elemento.activo == 1) {
            aux_visible_activo.add(elemento.padre);
        } else if (!!elemento.padre && elemento.activo == 0) {
            aux_visible_inactivo.add(elemento.padre);
        }
    });
    console.log(aux_visible_inactivo);
    json.forEach((elemento) => {
        var insertar;
        if (!elemento.padre) {
            insertar = document.getElementById("lista_sujetos_activos_proceso");
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
        checkbox.name = "checkbox_sujetos_procesos";
        checkbox.dataset.padre_id = elemento.padre;
        checkbox.dataset.puro_id = elemento.id;
        checkbox.dataset.nombre = elemento.nombre;
        checkbox.setAttribute("onclick", "verificarSeleccionProceso(this);");
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

function error_cargar_sujetos_activos_procesos(error) {
    alert("Error al cargar los datos del modelo: " + error);
}

function verificarSeleccionProceso(elemento) {
    var checkbox = document.getElementsByName("checkbox_sujetos_procesos");
    var auxChecked = elemento.checked;
    Array.from(checkbox).forEach((element) => {
        element.checked = false;
    });
    elemento.checked = auxChecked;
}
$("#CategoriaEntidadesProcesos").change(function() {
    var limpiar2 = document.getElementById(
        "lista_entidades_seleccionadas_procesos"
    );
    limpiar2.innerHTML = "";
    var seleccion = document.getElementById("CategoriaEntidadesProcesos");
    var tipo_valor = seleccion.options[seleccion.selectedIndex].text;
    data = {
        valorS: tipo_valor,
    };
    post_api(
        "http://localhost:3000/api/entity",
        data,
        cargar_posibles_entidades_modelo_proceso,
        error_cargar_posibles_entidades_modelo_proceso
    );
});

function cargar_posibles_entidades_modelo_proceso(json) {
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
    alert("Error al cargar los datos del modelo: " + error);
}

function cargar_aspectos(elemento, lado) {
    var checkbox = document.getElementsByName("checkbox_entidades_procesos");
    var auxChecked = elemento.checked;
    Array.from(checkbox).forEach((element) => {
        element.checked = false;
    });
    elemento.checked = auxChecked;
    var idObjeto = elemento.dataset.puro_id;
    var data = {
        id: idObjeto,
    };
    post_api(
        "http://localhost:3000/api/aspects",
        data,
        cargar_aspectos_select,
        error_cargar_aspectos_select
    );
}

function cargar_aspectos_select(json) {
    res = "";
    json.forEach((as) => {
        res += `<option value='${as.id}'>${as.nombre}</option>`;
    });
    document.getElementById("Aspectos_autoconsciencia").innerHTML = res;
}

function error_cargar_aspectos_select(err) {
    alert("Error al cargar los datos del modelo: " + err);
}
$("#Aspectos_autoconsciencia").change(function() {
    var limpiar = document.getElementById("metrica_directa");
    limpiar.innerHTML = "";
    var seleccionIndicador = document.getElementById("Aspectos_autoconsciencia");
    var tipo_valor =
        seleccionIndicador.options[seleccionIndicador.selectedIndex].text;
    tipoM = "DIRECTA";
    data = {
        nombre: tipo_valor,
        tipo: tipoM,
    };
    post_api(
        "http://localhost:3000/api/get_metrica_select",
        data,
        cargar_select_metrica_proceso,
        error_cargar_select_metrica_proceso
    );

    var limpiar3 = document.getElementById("indicador_modelo");
    limpiar3.innerHTML = "";
    var seleccion = document.getElementById("Aspectos_autoconsciencia");
    var tipo_valor_Indicador = seleccion.options[seleccion.selectedIndex].text;
    var tipoIndi = "INDICADOR";
    data2 = {
        nombre: tipo_valor_Indicador,
        tipo: tipoIndi,
    };
    post_api(
        "http://localhost:3000/api/get_metrica_select",
        data2,
        cargar_select_indicador_proceso,
        error_cargar_select_indicador_proceso
    );
});

function cargar_select_metrica_proceso(json) {
    var ope = document.getElementById("metrica_directa");
    ope.innerHTML = "";
    json.forEach((element) => {
        var option = document.createElement("option");
        option.value = element.id;
        option.innerHTML = element.nombre;
        ope.appendChild(option);
    });
}

function error_cargar_select_metrica_proceso() {
    alert("No se cargo el select metrica en el modal procesos");
}

function cargar_select_indicador_proceso(json) {
    var ope = document.getElementById("indicador_modelo");
    ope.innerHTML = "";
    json.forEach((element) => {
        var option = document.createElement("option");
        option.value = element.id;
        option.innerHTML = element.nombre;
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
    ope.innerHTML = "";
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

$("#criterio_de_decision").change(function() {
    var seleccionCriterio = document.getElementById("criterio_de_decision");
    var tipo_criterio =
        seleccionCriterio.options[seleccionCriterio.selectedIndex].text;

    data = {
        nombre: tipo_criterio,
    };
    post_api(
        "http://localhost:3000/api/get_umbral",
        data,
        cargar_lista_umbrales_proceso,
        error_cargar_lista_umbrales_proceso
    );
});

function cargar_lista_umbrales_proceso(json) {
    console.log(json);
    res = "";
    json.forEach((cd) => {
        res += `<tr onClick="">`;
        res += `<td><input type="checkbox" name="umbral_seleccionado" value="${cd.id}" data-name="${cd.nombre}" data-inferior="${cd.inferior}" data-superior="${cd.superior}"></td>`;
        res += `<td>${cd.id}</td>`;
        res += `<td>${cd.nombre}</td>`;
        res += `<td>${cd.inferior}</td>`;
        res += `<td>${cd.superior}</td>`;
        res += "</tr>";
    });
    document.getElementById("tabla_umbrales_procesos").innerHTML = res;
}

function error_cargar_lista_umbrales_proceso(err) {
    alert("No se puede cargar los umbrales" + err);
}
var UmbralId = undefined;

function AgregarAccion(id, nombre) {
    try {
        UmbralId = id;
        var nombreU = document.getElementById("Nombre_umbral");
        nombreU.innerHTML = nombre;
        data2 = {
            id: UmbralId,
        };
        post_api(
            "http://localhost:3000/api/get_accion",
            data2,
            cargar_accion_table,
            error_cargar_accion_table
        );
        $("#modal_agregar_accion_proceso").modal("show");
    } catch (error) {
        alert(error);
    }
}

function activarFormularioAgregarAccion() {
    document.getElementById("nombre_accion").disabled = false;
    document.getElementById("descripcion_accion").disabled = false;
    document.getElementById("activoAccion").disabled = false;
    document.getElementById("btn-agregarAccion").disabled = false;
    document.getElementById("btn-CancelarAccion").disabled = false;
}

function desactivarFormularioAgregarAccion() {
    document.getElementById("nombre_accion").disabled = true;
    document.getElementById("descripcion_accion").disabled = true;
    document.getElementById("activoAccion").disabled = true;
    document.getElementById("btn-agregarAccion").disabled = true;
    document.getElementById("btn-CancelarAccion").disabled = true;
    document.getElementById("nombre_accion").value = "";
    document.getElementById("descripcion_accion").value = "";
}

function GuardarAccion() {
    var data = {
        id: UmbralId,
        nombre: document.getElementById("nombre_accion").value,
        descripcion: document.getElementById("descripcion_accion").value,
        activo: document.getElementById("activoAccion").checked,
    };
    var data2 = {
        id: UmbralId,
    };
    if (!!data.nombre && !!data.descripcion) {
        post_api(
            "http://localhost:3000/api/add_accion/",
            data,
            mensaje_exitoEnvioAccion,
            mensaje_errorEnvioAccion
        );
        desactivarFormularioAgregarAccion();
        post_api(
            "http://localhost:3000/api/get_accion",
            data2,
            cargar_accion_table,
            error_cargar_accion_table
        );
    } else {
        alert("Debe llenar todos los campos");
    }
}

function mensaje_exitoEnvioAccion(json) {
    alert(json.mensaje);
}

function mensaje_errorEnvioAccion(err) {
    alert(err);
}

function cargar_accion_table(json) {
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
}

function error_cargar_accion_table(err) {
    alert("Error al cargar los datos del modelo: " + err);
}

function guardar_eliminar_accion() {
    var radio = document.getElementsByName("accion_seleccionada");
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
        data2 = {
            id: UmbralId,
        };
        post_api(
            "http://localhost:3000/api/del_accion/",
            data,
            mensaje_exitoEnvioAccion,
            mensaje_errorEnvioAccion
        );
        post_api(
            "http://localhost:3000/api/get_accion/",
            data2,
            cargar_accion_table,
            error_cargar_accion_table
        );
    } else alert("Debe seleccionar un elemento para eliminar");
}

function SeleccionaRecursoSelect(element) {
    if (element.value) {
        post_api(
            "http://localhost:3000/api/ask_deployment_resources_select/", { tipo: element.value },
            cargar_select_recurso_proceso,
            json => { console.log(json); }
        );
    }
}

function cargar_select_recurso_proceso(json) {
    var ope = document.createElement("select");
    ope.innerHTML = "";
    json.forEach((element) => {
        var option = document.createElement("option");
        option.value = element.id;
        option.innerHTML = element.nombre;
        ope.appendChild(option);
    });
    document.getElementById("recurso").innerHTML =
        ope.innerHTML;
}