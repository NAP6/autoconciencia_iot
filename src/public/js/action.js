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
        error_cargar_posibles_sujetos_modelo
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
            "<button class='btn-sujetoLinkObjetivos' onclick='abrirModalObjetosSujetos(\"" +
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
                    "<button class='btn-sujetoLinkObjetivos' onclick='abrirModalObjetosSujetos(\"" +
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
        res += `<tr id='modelo-${md.id}-tabla'>`;
        res += `<td name="modelo-${md.id}"><input type="radio" name="modelo_seleccionado_tabla" value="${md.id}" data-name="${md.nombre}" data-descripcion="${md.descripcion}"></td>`;
        res += `<td name="modelo-${md.id}">${md.id}</td>`;
        res += `<td name="modelo-${md.id}">${md.nombre}</td>`;
        res += `<td name="modelo-${md.id}">${md.descripcion}</td>`;
        res += `<td name="modelo-${md.id}"><a href="\#">JSON</a></td>`;
        res += "</tr>";
    });
    document.getElementById("tabla_modelos_autoconciencia").innerHTML = res;
}

function error_cargar_models_table(err) {
    alert("Error al cargar los datos del modelo: " + err);
}

/* 
    SECCION LISTAR MODELOS

        Descripcion:
		En esta seccion se incluyen las funciones que permiten cargar los
		datos del modelo seleccionado al formularionde actualizacion.

        Incluye:
*/

function modal_modificar_modelo() {
    console.log("Entra en la funciono de modificar modelo");
    var radios = document.getElementsByName("modelo_seleccionado_tabla");
    var id;
    var name;
    var descripcion;
    var select = false;
    radios.forEach((elem) => {
        console.log(elem);
        if (elem.checked) {
            id = elem.value;
            name = elem.dataset.name;
            descripcion = elem.dataset.descripcion;
            select = true;
            return;
        }
    });
    document.getElementById("id_modelo_update").value = id;
    document.getElementById("nombre_modelo_update").value = name;
    document.getElementById("descripcion_esenario_update").value = descripcion;
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

var entidades_aux = [];
var entidades = {};
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
    objetosde_Sujetos = json;
    json.forEach((element) => {
        entidades_aux[element["id"]] = {
            id: element["id"],
            name: element["name"],
            objetos: element["objects"],
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
            "<button class='btn-entidadLinkObjetivos' onclick='abrirModalObjetosEntidad(\"" +
            element["id"] +
            "\")'>" +
            element["name"] +
            "</button>" +
            "</label></div>";
        if (element["entity"]) {
            contenido_carga += "<ul>";
            contenido_seleccion += "<ul>";
            element["entity"].forEach((entity) => {
                objetosde_Sujetos_aux[entity["id"]] = {
                    id: entity["id"],
                    name: entity["name"],
                    objetos: entity["objects"],
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
                    "<button class='btn-entidadLinkObjetivos' onclick='abrirModalEntidad(\"" +
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
                objects: entidades_aux[id_h].entidad,
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
                objects: entidades_aux[id].entidad,
                subSystem: list_ent_h,
            };
        } else {
            aux_ent = {
                id: id,
                name: name,
                activo: activo,
                inactivo: inactivo,
                tiene_subsistemas: false,
                objects: entidades_aux[id].entidad,
            };
        }
        new_ent.push(aux_ent);
    });
    return new_ent;
}