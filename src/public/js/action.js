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

var objetosde_Sujetos = [];
var objetosde_Sujetos_aux = {};

if (document.getElementById("lista_sujetos_para_cargar"))
    consultar_api(
        "http://localhost:3000/api/subjects",
        cargar_posibles_sujetos_modelo,
        error_cargar_posibles_sujetos_modelo,

    );

function cargar_posibles_sujetos_modelo(json) {
    var para_cargar = document.getElementById("lista_sujetos_para_cargar");
    var seleccionados = document.getElementById("lista_sujetos_seleccionados");
    var contenido_carga = "";
    var contenido_seleccion = "";
    objetosde_Sujetos = json;
    json.forEach((element) => {
        objetosde_Sujetos_aux[element["id"]] = {
            id: element["id"],
            name: element["name"],
            objetos: element["objects"],
        };
        contenido_carga +=
            "<li " +
            (!element["inactivo"] ? 'style="display: none;"' : "") +
            ' id="visivilidad_sujetos_para_seleccion_' +
            element["id"] +
            '"><div class="form-check"><input type="checkbox" class="form-check-input sujeto_para_seleccion_padre" id="sujetos_para_seleccion_' +
            element["id"] +
            '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
            element["id"] +
            '" data-puro_name="' +
            element["name"] +
            '" data-oculto="' +
            !element["inactivo"] +
            '"><label class="form-check-label" for="sujetos_para_seleccion_' +
            element["id"] +
            '">' +
            element["name"] +
            "</label></div>";
        contenido_seleccion +=
            "<li " +
            (!element["activo"] ? 'style="display: none;"' : "") +
            ' id="visivilidad_sujetos_seleccionado_' +
            element["id"] +
            '"><div class="form-check"><input type="checkbox" class="form-check-input sujeto_seleccionado_padre" id="sujetos_seleccionado_' +
            element["id"] +
            '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
            element["id"] +
            '" data-puro_name="' +
            element["name"] +
            '" data-oculto="' +
            !element["activo"] +
            '"><label class="form-check-label" for="sujetos_seleccionado_' +
            element["id"] +
            '">' +
            "<button class='btn-sujetoLinkObjetivos btn btn-link' onclick='abrirModalObjetosSujetos(\"" +
            element["id"] +
            "\")'>" +
            element["name"] +
            "</button>" +
            "</label></div>";
        if (element["subSystem"]) {
            contenido_carga += "<ul>";
            contenido_seleccion += "<ul>";
            element["subSystem"].forEach((subSystem) => {
                objetosde_Sujetos_aux[subSystem["id"]] = {
                    id: subSystem["id"],
                    name: subSystem["name"],
                    objetos: subSystem["objects"],
                };
                contenido_carga +=
                    "<li " +
                    (subSystem["activo"] ? 'style="display: none;"' : "") +
                    ' id="visivilidad_sujetos_para_seleccion_' +
                    subSystem["id"] +
                    '"><div class="form-check"><input type="checkbox" class="form-check-input sujeto_para_seleccion_hijo" name="sujetos_para_seleccion_' +
                    element["id"] +
                    '" id="sujetos_para_seleccion_' +
                    subSystem["id"] +
                    '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
                    subSystem["id"] +
                    '" data-puro_name="' +
                    subSystem["name"] +
                    '" data-oculto="' +
                    subSystem["activo"] +
                    '"><label class="form-check-label" for="sujetos_para_seleccion_' +
                    subSystem["id"] +
                    '">' +
                    subSystem["name"] +
                    "</label></div></li>";
                contenido_seleccion +=
                    "<li " +
                    (!subSystem["activo"] ? 'style="display: none;"' : "") +
                    ' id="visivilidad_sujetos_seleccionado_' +
                    subSystem["id"] +
                    '"><div class="form-check"><input type="checkbox" class="form-check-input sujeto_seleccionado_hijo" name="sujetos_seleccionado_' +
                    element["id"] +
                    '" id="sujetos_seleccionado_' +
                    subSystem["id"] +
                    '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
                    subSystem["id"] +
                    '" data-puro_name="' +
                    subSystem["name"] +
                    '" data-oculto="' +
                    !subSystem["activo"] +
                    '"><label class="form-check-label" for="sujetos_seleccionado_' +
                    subSystem["id"] +
                    '">' +
                    "<button class='btn-sujetoLinkObjetivos btn btn-link' onclick='abrirModalObjetosSujetos(\"" +
                    subSystem["id"] +
                    "\")'>" +
                    subSystem["name"] +
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
    document.getElementById("sujetos_seleccion").value = JSON.stringify(
        seleccion
    );
    post_api(
        "http://localhost:3000/api/save_subjects/",
        seleccion,
        (json) => {
            alert("Actualizacion exitosa", json);
        },
        (err) => {
            alert(err);
        }
    );
}

function extraer_datos_sujeto() {
    var padres = document.querySelectorAll(
        "#lista_sujetos_seleccionados > li > div > input"
    );
    var new_obj = [];
    Array.from(padres).forEach((pad) => {
        var id = pad.dataset.puro_id;
        var name = pad.dataset.puro_name;
        var aux_obj;
        var list_obj_h = [];
        var activo = pad.dataset.oculto == "false";
        var inactivo = false;
        var hijos = document.getElementsByName(pad.id);
        Array.from(hijos).forEach((hj) => {
            var id_h = hj.dataset.puro_id;
            var name_h = hj.dataset.puro_name;
            var activo_h = hj.dataset.oculto == "false";
            inactivo = inactivo || !activo_h;
            var obj_hijos = {
                id: id_h,
                name: name_h,
                activo: activo_h,
                objects: objetosde_Sujetos_aux[id_h].objetos,
            };
            list_obj_h.push(obj_hijos);
        });

        if (list_obj_h.length > 0) {
            aux_obj = {
                id: id,
                name: name,
                activo: activo,
                inactivo: inactivo,
                tiene_subsistemas: true,
                objects: objetosde_Sujetos_aux[id].objetos,
                subSystem: list_obj_h,
            };
        } else {
            aux_obj = {
                id: id,
                name: name,
                activo: activo,
                inactivo: inactivo,
                tiene_subsistemas: false,
                objects: objetosde_Sujetos_aux[id].objetos,
            };
        }
        new_obj.push(aux_obj);
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

var objetosde_Sujetos_activoID;
var id_objetoPadre_agregar;

function abrirModalObjetosSujetos(id) {
    $("#objetosde_sujetoModal").modal("show");
    objetosde_Sujetos_activoID = id;
    var nombre = document.getElementById("nombreSujetoObjetoActivo");
    nombre.innerHTML = objetosde_Sujetos_aux[id]["name"];
    var arbol = document.getElementById("arbol_objetivos_del_sujeto");
    arbol.innerHTML = generar_arbol_obejetosde_sujeto(
        objetosde_Sujetos_aux[id]["objetos"]
    );
    var elemRaiz = document.getElementById("raiz_0");
    elemRaiz.checked = true;
    desactivarFormularioAgregarObjeto();
}

function generar_arbol_obejetosde_sujeto(lista) {
    var strlista = "<ul>";
    Object.entries(lista).forEach(([key, value]) => {
        strlista += `<li><input class="form-check-input" type='radio' value='${key}' name='objetosde_Sujetos_imputSelect' id='${key}'/><label class="form-check-label" for='${key}'>${value.nombre}</label>`;
        if (Object.keys(value.objetos).length > 0) {
            strlista += generar_arbol_obejetosde_sujeto(value.objetos);
        }
        strlista += "</li>";
    });
    strlista += "</ul>";
    return strlista;
}

function activarFormularioAgregarObjeto() {
    document.getElementById("nombreObjeto").disabled = false;
    document.getElementById("descripcionObjeto").disabled = false;
    document.getElementById("unidades_medida_seccion_sujetos").disabled = false;
    document.getElementById("activoObjeto").disabled = false;
    document.getElementById("btn-agregarObjetoLista").disabled = false;
    var arbol = document.getElementsByName("objetosde_Sujetos_imputSelect");
    arbol.forEach((elem) => {
        elem.disabled = true;
    });
    consultar_api(
        "http://localhost:3000/api/last_ObjectSubjectID/",
        cargar_idNuevoObjeto,
        error_cargar_idNuevoObjeto
    );
}

function desactivarFormularioAgregarObjeto() {
    document.getElementById("nombreObjeto").disabled = true;
    document.getElementById("descripcionObjeto").disabled = true;
    document.getElementById("unidades_medida_seccion_sujetos").disabled = true;
    document.getElementById("activoObjeto").disabled = true;
    document.getElementById("btn-agregarObjetoLista").disabled = true;
    document.getElementById("idObjeto").value = "";
    document.getElementById("nombreObjeto").value = "";
    document.getElementById("descripcionObjeto").value = "";
    document.getElementById("unidades_medida_seccion_sujetos").value = "";
    document.getElementById("activoObjeto").value = "";
    var arbol = document.getElementsByName("objetosde_Sujetos_imputSelect");
    arbol.forEach((elem) => {
        elem.disabled = false;
    });
}

function eliminarObjetoLista() {
    var idSeleccionado = getSelectedItemArbolObjetosSelected();
    if (idSeleccionado != "raiz_0") {
        var objetos = objetosde_Sujetos_aux[objetosde_Sujetos_activoID].objetos;
        objetosde_Sujetos_aux[
            objetosde_Sujetos_activoID
        ].objetos = remover_objetode_sujeto_objID(idSeleccionado, objetos);
        var arbol = document.getElementById("arbol_objetivos_del_sujeto");
        arbol.innerHTML = generar_arbol_obejetosde_sujeto(
            objetosde_Sujetos_aux[objetosde_Sujetos_activoID]["objetos"]
        );
        var elemRaiz = document.getElementById("raiz_0");
        elemRaiz.checked = true;
        desactivarFormularioAgregarObjeto();
    } else {
        alert("No se puede eliminar el nodo raiz");
    }
}

function agregarObjetoLista() {
    var id = document.getElementById("idObjeto").value;
    var nombre = document.getElementById("nombreObjeto").value;
    var descripcion = document.getElementById("descripcionObjeto").value;
    var unidadMedida = document.getElementById("unidades_medida_seccion_sujetos")
        .value;
    var activo = document.getElementById("activoObjeto").checked;
    if (!!id && !!nombre && !!descripcion && !!unidadMedida) {
        var objetos = objetosde_Sujetos_aux[objetosde_Sujetos_activoID].objetos;
        var idSeleccionado = getSelectedItemArbolObjetosSelected();
        var obj_aux = {
            id: id.toString(),
            nombre: nombre,
            descripcion: descripcion,
            unidadMedida: unidadMedida,
            activo: activo,
            objetos: {},
        };
        objetosde_Sujetos_aux[
            objetosde_Sujetos_activoID
        ].objetos = agregar_objetode_sujeto_objID(idSeleccionado, obj_aux, objetos);
        var arbol = document.getElementById("arbol_objetivos_del_sujeto");
        arbol.innerHTML = generar_arbol_obejetosde_sujeto(
            objetosde_Sujetos_aux[objetosde_Sujetos_activoID]["objetos"]
        );
        var elemRaiz = document.getElementById("raiz_0");
        elemRaiz.checked = true;
        desactivarFormularioAgregarObjeto();
    } else {
        alert("Ingrese valores en todos los campos para poder agregar el Objeto");
    }
}

function getSelectedItemArbolObjetosSelected() {
    var arbol = document.getElementsByName("objetosde_Sujetos_imputSelect");
    var idSeleccionado = "raiz_0";
    arbol.forEach((elem) => {
        if (elem.checked) {
            idSeleccionado = elem.value;
            return;
        }
    });
    return idSeleccionado;
}

function agregar_objetode_sujeto_objID(id, objA, objList) {
    Object.entries(objList).forEach(([key, value]) => {
        if (value.id == id) {
            value.objetos[objA.id] = objA;
            return;
        }
        if (Object.keys(value.objetos).length > 0) {
            value.objetos = agregar_objetode_sujeto_objID(id, objA, value.objetos);
        }
    });
    return objList;
}

function remover_objetode_sujeto_objID(id, objList) {
    Object.entries(objList).forEach(([key, value]) => {
        if (value.id == id) {
            delete objList[key];
            return;
        }
        if (Object.keys(value.objetos).length > 0) {
            value.objetos = remover_objetode_sujeto_objID(id, value.objetos);
        }
    });
    return objList;
}

function cargar_idNuevoObjeto(json) {
    document.getElementById("idObjeto").value = json.id + 1;
}

function error_cargar_idNuevoObjeto(err) {
    alert(`Error al cargar el ultimo ID ${err}`);
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


/*CARGAR TIPO PARA LA SECCION DE ESCALAS*/

if (document.getElementById("tipo_escalas"))
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
}

function error_cargar_enumeracion_select(err) {
    alert("Error al cargar los datos del modelo: " + err);
}

/*
CARGAR ESCALAS-TIPO A LA PAGINA OBJETOS
*/
if (document.getElementById("escalas_seccion_entidad"))
    consultar_api(
        "http://localhost:3000/api/escales",
        cargar_tipo__select,
        error_cargar_tipo_select
    );

function cargar_tipo__select(json) {
    res = "";
    json.forEach((es) => {
        res += `<option value='${es.id}'>${es.tipo}</option>`;
    });
    document.getElementById("escalas_seccion_entidad").innerHTML = res;
}

function error_cargar_tipo_select(err) {
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
        res += `<td><input type="radio" name="unidad_seleccionada" value="${um.id}" data-name="${um.nombre}" data-descripcion="${um.descripcion}" data-acronym="${um.acronimo}" data-activo="${um.activo=="true"}"></td>`;
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
    console.log(data);
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
            cargar_unidades_de_medida_table, error_cargar_unidades_de_medida_table
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
        activo: document.getElementById("ActivoUnits").checked

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
        res += `<td><input type="radio" name="escala_seleccionada" value="${es.id}" data-name="${es.nombre}" data-valor_valido="${es.valor_valido}" data-tipo="${es.tipo}" data-activo="${es.activo=="true"}"></td>`;
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
            activo: document.getElementById("activoEscalas").value
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
        console.log(data);
        post_api(
            "http://localhost:3000/api/del_escales/",
            data,
            mensaje_exitoEnvioEscalas,
            mensaje_errorEnvioEscalas
        );
        consultar_api(
            "http://localhost:3000/api/escales",
            cargar_escales_table, error_cargar_escales_table
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
function cargar_criterios_table(json) {
    res = "";
    json.forEach((cd) => {
        res += `<tr onClick="visibilidad_umbral('${cd.id}')">`;
        res += `<td><input type="checkbox" name="criterio_seleccionado" value="${cd.id}" data-name="${cd.nombre}" data-descripcion="${cd.descripcion}" data-activo="${cd.activo=="true"}"></td>`;
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
            () => { console.log("Error Al cargar el Umbral") }
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
                cargar_criterios_table, error_cargar_criterios_table
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
            document.getElementById("input-descripton-criteria-update").value = descripcion;
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
            descripcion: document.getElementById("input-descripton-criteria-update").value,
            activo: document.getElementById("activoCriteria").checked
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
    var dato = document.getElementById("umbral_" + id);
    dato.style.display = "table";
    if (criterio_select) {
        dato = document.getElementById("umbral_" + criterio_select);
        dato.style.display = "none";
    }
    criterio_select = id;
}

function cargar_umbral_table(json) {
    var templeate = document.getElementById("templeta_tabla_umbral").content.cloneNode(true);
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

        var data = {
            nombre: document.getElementById("input-name-umbral-add").value,
            interpretacion: document.getElementById("input-interpretacion-umbral-add").value,
            inferior: document.getElementById("input-inferior-umbral-add").value,
            superior: document.getElementById("input-superior-umbral-add").value,
            criterio_select
        };
        if (!!data.nombre && !!data.interpretacion && !!data.inferior && !!data.superior) {

            post_api(
                "http://localhost:3000/api/add_umbral/",
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
            document.getElementById("input-interpretacion-umbral-del").value = interpretacion;
            document.getElementById("input-superior-umbral-del").value = superior;
            document.getElementById("input-inferior-umbral-del").value = inferior;
            document.getElementById("activoUmbralDel").checked = activo;
            $("#modal_eliminar_umbral").modal("show");
        } else alert("Seleccione el Elemento");
    } catch (error) {
        alert(error)
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
        console.log(data);
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
        document.getElementById("input-interpretacion-umbral-update").value = interpretacion;
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
            interpretacion: document.getElementById("input-interpretacion-umbral-update").value,
            inferior: document.getElementById("input-inferior-umbral-update").value,
            superior: document.getElementById("input-superior-umbral-update").value,
            activo: document.getElementById("activoUmbral").checked,

        };
        if (!!data.id && !!data.nombre && !!data.interpretacion && !!data.inferior && !!data.superior) {
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
    console.log(data);
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

function eliminar_aspecto() {
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
            id: id,
        };
        console.log(data);
        post_api(
            "http://localhost:3000/api/del_aspects/",
            data,
            mensaje_exitoEnvioAspects,
            mensaje_errorEnvioAspects
        );
        consultar_api(
            "http://localhost:3000/api/aspects",
            cargar_aspectos_table, error_cargar_aspectos_table
        );
    } else alert("Debe seleccionar un elemento para eliminar");
}

function modificar_aspecto() {
    try {
        var radio = document.getElementsByName("aspecto_seleccionado");
        var id;
        var descripcion;
        radio.forEach((elem) => {
            if (elem.checked) {
                id = elem.value;
                descripcion = elem.dataset.descripcion;
                return;
            }
        });

        if (!!id && !!descripcion) {
            document.getElementById("input-id-aspecto-mod").value = id;
            document.getElementById("input-descripton-aspect-mod").value = descripcion;

            $("#modal_modificar_aspecto").modal("show");
        } else alert("Seleccione el Elemento");

    } catch (error) {
        alert(error);
    }

}

function guardarModificacionAspecto() {
    var data = {
        id: document.getElementById("input-id-aspecto-mod").value,
        descripcion: document.getElementById("input-descripton-aspect-mod").value,
    };
    if (!!data.id && !!data.descripcion) {
        post_api(
            "http://localhost:3000/api/upd_aspects/",
            data,
            mensaje_exitoEnvioAspects,
            mensaje_errorEnvioAspects

        );
        consultar_api(
            "http://localhost:3000/api/aspects",
            cargar_aspectos_table,
            error_cargar_aspectos_table
        );

        $("#modal_modificar_aspecto").modal("hide");
    } else alert("Debe debe completar todos los campos");
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

if (document.getElementById("tabla_aspectos"))
    consultar_api(
        "http://localhost:3000/api/aspects",
        cargar_aspectos_table,
        error_cargar_aspectos_table
    );

function cargar_aspectos_table(json) {
    res = "";
    json.forEach((as) => {
        res += "<tr>";
        res += `<td><input type="radio" name="aspecto_seleccionado" data-descripcion="${as.descripcion}"></td>`;
        res += `<td>${as.descripcion}</td>`;
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
        res += `<td name="modelo-${md.id}"><input type="radio" name="modelo_seleccionado_tabla" value="${md.id}" data-name="${md.nombre}" data-autor="${md.autor}" data-descripcion="${md.descripcion}" data-activo="${md.activo == "true"}"></td>`;
        res += `<td name="modelo-${md.id}">${md.id}</td>`;
        res += `<td name="modelo-${md.id}">${md.nombre}</td>`;
        res += `<td name="modelo-${md.id}">${md.autor}</td>`;
        res += `<td name="modelo-${md.id}">${md.descripcion}</td>`;
        res += `<td name="modelo-${md.id}"><buttom class="btn btn-link" onclick="mostrar_modal_json()">${Object.keys(JSON.parse(md.json))[0]}</buttom></td>`;
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
    $('#modal_json').modal('show');
    document.getElementById('modal_json_title').innerHTML = Object.keys(modelo_fisico_json)[0];
    document.getElementById('contenido_json').innerHTML = JSON.stringify(modelo_fisico_json, null, 2);
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
        console.log(elem);
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

if (document.getElementById("lista_entidades_para_cargar"))
    consultar_api(
        "http://localhost:3000/api/entity",
        cargar_posibles_entidades_modelo,
        error_cargar_posibles_entidades_modelo
    );

function cargar_posibles_entidades_modelo(json) {
    var para_cargar = document.getElementById("lista_entidades_para_cargar");
    var seleccionados = document.getElementById("lista_entidades_seleccionados");
    var contenido_carga = "";
    var contenido_seleccion = "";
    entidades_list = json;
    json.forEach((element) => {
        entidades_aux[element["id"]] = {
            id: element["id"],
            name: element["name"],
            entidades: element["entitys"],
        };
        contenido_carga +=
            "<li " +
            (!element["inactivo"] ? 'style="display: none;"' : "") +
            ' id="visivilidad_entidad_para_seleccion_' +
            element["id"] +
            '"><div class="form-check"><input type="checkbox" class="form-check-input entidad_para_seleccion_padre" id="entidad_para_seleccion_' +
            element["id"] +
            '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
            element["id"] +
            '" data-puro_name="' +
            element["name"] +
            '" data-oculto="' +
            !element["inactivo"] +
            '"><label class="form-check-label" for="entidad_para_seleccion_' +
            element["id"] +
            '">' +
            element["name"] +
            "</label></div>";
        contenido_seleccion +=
            "<li " +
            (!element["activo"] ? 'style="display: none;"' : "") +
            ' id="visivilidad_entidad_seleccionado_' +
            element["id"] +
            '"><div class="form-check"><input type="checkbox" class="form-check-input entidad_seleccionado_padre" id="entidad_seleccionado_' +
            element["id"] +
            '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
            element["id"] +
            '" data-puro_name="' +
            element["name"] +
            '" data-oculto="' +
            !element["activo"] +
            '"><label class="form-check-label" for="entidad_seleccionado_' +
            element["id"] +
            '">' +
            "<button class='btn-entidadLinkObjetivos btn btn-link' onclick='abrirModalEntidad(\"" +
            element["id"] +
            "\")'>" +
            element["name"] +
            "</button>" +
            "</label></div>";
        if (element["entity"]) {
            contenido_carga += "<ul>";
            contenido_seleccion += "<ul>";
            element["entity"].forEach((entity) => {
                entidades_aux[entity["id"]] = {
                    id: entity["id"],
                    name: entity["name"],
                    entidades: entity["entitys"],
                };
                contenido_carga +=
                    "<li " +
                    (entity["activo"] ? 'style="display: none;"' : "") +
                    ' id="visivilidad_entidad_para_seleccion_' +
                    entity["id"] +
                    '"><div class="form-check"><input type="checkbox" class="form-check-input entidad_para_seleccion_hijo" name="entidad_para_seleccion_' +
                    element["id"] +
                    '" id="entidad_para_seleccion_' +
                    entity["id"] +
                    '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
                    entity["id"] +
                    '" data-puro_name="' +
                    entity["name"] +
                    '" data-oculto="' +
                    entity["activo"] +
                    '"><label class="form-check-label" for="entidad_para_seleccion_' +
                    entity["id"] +
                    '">' +
                    entity["name"] +
                    "</label></div></li>";
                contenido_seleccion +=
                    "<li " +
                    (!entity["activo"] ? 'style="display: none;"' : "") +
                    ' id="visivilidad_entidad_seleccionado_' +
                    entity["id"] +
                    '"><div class="form-check"><input type="checkbox" class="form-check-input entidad_seleccionado_hijo" name="entidad_seleccionado_' +
                    element["id"] +
                    '" id="entidad_seleccionado_' +
                    entity["id"] +
                    '" onclick="verificar_seleccion_hijo_pagre(this);" data-puro_id="' +
                    entity["id"] +
                    '" data-puro_name="' +
                    entity["name"] +
                    '" data-oculto="' +
                    !entity["activo"] +
                    '"><label class="form-check-label" for="entidad_seleccionado_' +
                    entity["id"] +
                    '">' +
                    "<button class='btn-entidadLinkObjetivos btn btn-link' onclick='abrirModalEntidad(\"" +
                    entity["id"] +
                    "\")'>" +
                    entity["name"] +
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



function error_cargar_posibles_entidades_modelo(error) {
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

function agregar_entidad_seleccionado() {
    extraer_datos_entidad_e_hijos_lista_check("para_seleccion", "seleccionado");
}

function remover_entidad_seleccionado() {
    extraer_datos_entidad_e_hijos_lista_check("seleccionado", "para_seleccion");
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

function actualizar_entidad() {
    var seleccion = extraer_datos_entidad();
    document.getElementById("entidad_seleccion").value = JSON.stringify(
        seleccion
    );
    post_api(
        "http://localhost:3000/api/save_entity/",
        seleccion,
        (json) => {
            alert("Actualizacion exitosa", json);
        },
        (err) => {
            alert(err);
        }
    );
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
var entidad_activoID;
var id_EntidadPadre_agregar;

function abrirModalEntidad(id) {
    try {
        $("#modal_agregar_entidad").modal("show");
        entidad_activoID = id;

        var nombre = document.getElementById("nombreEntidadActiva");
        nombre.innerHTML = entidades_aux[id]["name"];
        var arbol = document.getElementById("arbol_objetivos_de_entidad");
        arbol.innerHTML = generar_arbol_entidades(
            entidades_aux[id]["entidades"]

        );
        var elemRaiz = document.getElementById("raiz_0");
        elemRaiz.checked = true;
        desactivarFormularioAgregarEntidad();
    } catch (error) {
        alert(error);
    }
}

function generar_arbol_entidades(lista) {

    var strlista = "<ul>";

    Object.entries(lista).forEach(([key, value]) => {

        strlista += `<li><input class="form-check-input" type='radio' value='${key}' name='Entidades_inputSelect' id='${key}'/><label class="form-check-label" for='${key}'>${value.nombre}</label>`;

        if (Object.keys(value.entidades).length > 0) {
            strlista += generar_arbol_entidades(value.entidades);

        }
        strlista += "</li>";
    });
    strlista += "</ul>";
    return strlista;
}

function activarFormularioAgregarEntidad() {
    document.getElementById("nombreEntidad").disabled = false;
    document.getElementById("descripcionEntidad").disabled = false;
    document.getElementById("AlcanceEntidad").disabled = false;
    document.getElementById("escalas_seccion_entidad").disabled = false;
    document.getElementById("activoEntidad").disabled = false;
    document.getElementById("btn-agregarEntidadLista").disabled = false;

    var arbol = document.getElementsByName("Entidades_inputSelect");
    arbol.forEach((elem) => {
        elem.disabled = true;
    });
    consultar_api(
        "http://localhost:3000/api/last_EntityID/",
        cargar_idNuevaEntidad,
        error_cargar_idNuevaEntidad
    );
}

function desactivarFormularioAgregarEntidad() {
    document.getElementById("nombreEntidad").disabled = true;
    document.getElementById("descripcionEntidad").disabled = true;
    document.getElementById("AlcanceEntidad").disabled = true;
    document.getElementById("escalas_seccion_entidad").disabled = true;
    document.getElementById("activoEntidad").disabled = true;
    document.getElementById("btn-agregarEntidadLista").disabled = true;
    document.getElementById("idEntidad").value = "";
    document.getElementById("nombreEntidad").value = "";
    document.getElementById("descripcionEntidad").value = "";
    document.getElementById("AlcanceEntidad").value = "";
    document.getElementById("escalas_seccion_entidad").value = "";
    document.getElementById("activoEntidad").value = "";
    var arbol = document.getElementsByName("Entidades_inputSelect");
    arbol.forEach((elem) => {
        elem.disabled = false;
    });
}

function eliminarEntidadLista() {
    var idSeleccionado = getSelectedItemArbolEntidadesSelected();
    if (idSeleccionado != "raiz_0") {
        var entidades = entidades_aux[entidad_activoID].entidades;
        entidades_aux[
            entidad_activoID
        ].entidades = remover_entidad_entID(idSeleccionado, entidades);
        var arbol = document.getElementById("arbol_objetivos_de_entidad");
        arbol.innerHTML = generar_arbol_entidades(
            entidades_aux[entidad_activoID]["entidades"]
        );
        var elemRaiz = document.getElementById("raiz_0");
        elemRaiz.checked = true;
        desactivarFormularioAgregarObjeto();
    } else {
        alert("No se puede eliminar el nodo raiz");
    }
}

function agregarEntidadLista() {
    var id = document.getElementById("idEntidad").value;
    var nombre = document.getElementById("nombreEntidad").value;
    var descripcion = document.getElementById("descripcionEntidad").value;
    var alcance = document.getElementById("AlcanceEntidad").value;
    var tipo = document.getElementById("escalas_seccion_entidad")
        .value;
    var activo = document.getElementById("activoEntidad").checked;
    if (!!id && !!nombre && !!descripcion && !!tipo && !!alcance) {
        var entidades = entidades_aux[entidad_activoID].entidades;
        var idSeleccionado = getSelectedItemArbolEntidadesSelected();
        var ent_aux = {
            id: id.toString(),
            nombre: nombre,
            alcance: alcance,
            descripcion: descripcion,
            tipo: tipo,
            activo: activo,
            entidades: {},
        };
        entidades_aux[
            entidad_activoID
        ].entidades = agregar_entidad_entID(idSeleccionado, ent_aux, entidades);
        var arbol = document.getElementById("arbol_objetivos_de_entidad");
        arbol.innerHTML = generar_arbol_entidades(
            entidades_aux[entidad_activoID]["entidades"]
        );
        var elemRaiz = document.getElementById("raiz_0");
        elemRaiz.checked = true;
        desactivarFormularioAgregarEntidad();
    } else {
        alert("Ingrese valores en todos los campos para poder agregar el Objeto");
    }
}

function getSelectedItemArbolEntidadesSelected() {
    var arbol = document.getElementsByName("Entidades_inputSelect");
    var idSeleccionado = "raiz_0";
    arbol.forEach((elem) => {
        if (elem.checked) {
            idSeleccionado = elem.value;
            return;
        }
    });
    return idSeleccionado;
}

function agregar_entidad_entID(id, objA, objList) {
    Object.entries(objList).forEach(([key, value]) => {
        if (value.id == id) {
            value.entidades[objA.id] = objA;
            return;
        }
        if (Object.keys(value.entidades).length > 0) {
            value.entidades = agregar_entidad_entID(id, objA, value.entidades);
        }
    });
    return objList;
}

function remover_entidad_entID(id, entList) {
    Object.entries(entList).forEach(([key, value]) => {
        if (value.id == id) {
            delete entList[key];
            return;
        }
        if (Object.keys(value.entidades).length > 0) {
            value.entidades = remover_entidad_entID(id, value.entidades);
        }
    });
    return entList;
}

function cargar_idNuevaEntidad(json) {
    document.getElementById("idEntidad").value = json.id + 1;
}

function error_cargar_idNuevaEntidad(err) {
    alert(`Error al cargar el ultimo ID ${err}`);
}
if (document.getElementById("lista_sujetosObjetos"))
    consultar_api(
        "http://localhost:3000/api/subjects",
        cargar_posibles_sujetos,
        error_cargar_posibles_sujetos,
    );

function cargar_posibles_sujetos(json) {
    var seleccionados = document.getElementById("lista_sujetosObjetos");
    var contenido_seleccion = "";
    objetosde_Sujetos = json;
    json.forEach((element) => {
        objetosde_Sujetos_aux[element["id"]] = {
            id: element["id"],
            name: element["name"],
            objetos: element["objects"],
        };
        contenido_seleccion +=
            "<li " +
            ' id=""><div><id="' +
            element["id"] +
            '" onclick="" data-puro_id="' +
            element["id"] +
            '" data-puro_name="' +
            element["name"] +
            '" data-oculto="' +
            !element["activo"] +
            '"><label class="form-check-label" for="">' +
            "<button class='btn-sujetoLinkObjetivos btn btn-light' onclick='seleccionar_entidad(\"" +
            element["id"] + "\")'>" +
            element["name"] +
            "</button>" +
            "</label></div>";
        if (element["subSystem"]) {
            contenido_seleccion += "<ul>";
            element["subSystem"].forEach((subSystem) => {
                objetosde_Sujetos_aux[subSystem["id"]] = {
                    id: subSystem["id"],
                    name: subSystem["name"],
                    objetos: subSystem["objects"],
                };
                contenido_seleccion +=
                    "<li " +
                    ' id="visivilidad_sujetos_seleccionado_' +
                    subSystem["id"] +
                    '"><div class=""><' +
                    element["id"] +
                    '" id="sujetos_seleccionado_' +
                    subSystem["id"] +
                    '" onclick="" data-puro_id="' +
                    subSystem["id"] +
                    '" data-puro_name="' +
                    subSystem["name"] +
                    '" data-oculto="' +
                    !subSystem["activo"] +
                    '"><label class="" for="' +
                    subSystem["id"] +
                    '">' +
                    "<button class='btn-sujetoLinkObjetivos btn btn-light' onclick='seleccionar_entidad(\"" +
                    subSystem["id"] + "\")'>" +
                    subSystem["name"] +
                    "</button>" +
                    "</label></div></li>";
            });

            contenido_seleccion += "</ul>";
        }
        contenido_seleccion += "</li>";
    });

    seleccionados.innerHTML = contenido_seleccion;
}


function error_cargar_posibles_sujetos(json) {
    alert("Error al cargar los datos del modelo: " + error);
}

function seleccionar_sujetos_Objetos(id) {
    alert(id);
}

/*CARGAR ENTIDADES DISPONIBLES  PARA LA VISTA OBJETOS*/
if (document.getElementById("Cargar_Lista_Entidades"))
    consultar_api(
        "http://localhost:3000/api/entity",
        cargar_posibles_entidades_seleccion,
        error_cargar_posibles_entidades_seleccion,
    );

function cargar_posibles_entidades_seleccion(json) {
    var seleccionados = document.getElementById("Cargar_Lista_Entidades");
    var contenido_seleccion = "";
    entidades_list = json;
    json.forEach((element) => {
        entidades_aux[element["id"]] = {
            id: element["id"],
            name: element["name"],
            entidades: element["entitys"],
        };
        contenido_seleccion +=
            "<li " +
            ' id="' +
            element["id"] +
            '"><div id="Entidad_Seleccionada" ' +
            element["id"] +
            '" onclick="" data-puro_id="' +
            element["id"] +
            '" data-puro_name="' +
            element["name"] +
            '" data-oculto="' +
            !element["activo"] +
            '"><label class="form-check-label" for="entidad_seleccionado_' +
            element["id"] +
            '">' +
            "<button class='btn-EntidadSeleccionado btn btn-light' onclick='seleccionar_entidad(\"" +
            element["id"] +
            "\")'>" +
            element["name"] +
            "</button>" +
            "</label></div>";
        contenido_seleccion += "</li>";
    });
    seleccionados.innerHTML = contenido_seleccion;
}


function error_cargar_posibles_entidades_seleccion(json) {
    alert("Error al cargar los datos del modelo: " + error);
}

function seleccionar_entidad(id) {
    alert(id);

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
        tipo_recurso: document.getElementById("select_tipo_recurso").value
    };
    console.log(data);
    if (!!data.nombre && !!data.descripcion && !!data.tipo_dato_salida && !!data.tipo_recurso) {
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
            cargar_escales_table, error_cargar_escales_table
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
            id = elem.value;;
            tr = elem.dataset.tr;
            return;
        }
    });

    if (tr == 'Fórmula') {
        document.getElementById("input-tr-id").value = id;
        $("#modal_tipo_recurso_formula").modal("show");
    } else if (tr == 'Función') {
        document.getElementById("input-tr-id").value = id;
        $("#modal_tipo_recurso_funcion").modal("show");
    } else if (tr == 'Servicio') {
        document.getElementById("input-escale-id-update").value = id;
        $("#modal_tipo_recurso_servicio").modal("show");
    } else alert("No hay tipo de recurso");
}
