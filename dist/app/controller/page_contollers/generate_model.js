"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_model = void 0;
const database2_1 = require("../../data/database2");
const SelfAwarenessAspectQ_1 = require("../../models/selfAwarness/qwertyModels/SelfAwarenessAspectQ");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
var modelID;
var routes = {};
function generate_model(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        modelID = (_a = req.session) === null || _a === void 0 ? void 0 : _a.active_model.modelID;
        var db = new database2_1.database2();
        var modelo = new selfAwarnessModels_1.SelfAwarnessQ(-1, "", "", "", "");
        var rows = yield db.qwerty(modelo.toSqlSelect(["/@/MODEL/@/"], [modelID.toString()]));
        modelo = modelo.toObjectArray(rows)[0];
        var modeloA = JSON.parse(modelo.architectureModel);
        yield add_span(modeloA[Object.keys(modeloA)[0]]);
        yield add_scope(modeloA[Object.keys(modeloA)[0]]);
        yield add_scale(modeloA[Object.keys(modeloA)[0]]);
        res.render("generate_model", {
            error: req.flash("error"),
            succes: req.flash("succes"),
            session: req.session,
            model: JSON.stringify(modeloA, null, "  "),
        });
    });
}
exports.generate_model = generate_model;
function add_span(model) {
    return __awaiter(this, void 0, void 0, function* () {
        if (model["containsIoTSystem"]) {
            var principa_system = model["containsIoTSystem"][0];
            yield add_goal(principa_system);
            yield add_SelfAwarenessProcess(principa_system);
            yield add_SelfAwarenessAspect(principa_system, "//@containsIoTSystem.0");
            if (principa_system.containsIoTSubSystem) {
                yield recursive_span(principa_system.containsIoTSubSystem, "//@containsIoTSystem.0");
            }
        }
        model["containsIoTSystem"][0] = principa_system;
    });
}
function recursive_span(system, path) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < system.length; i++) {
            var actual_path = path + `/@containsIoTSubSystem.${i}`;
            yield add_goal(system[i]);
            yield add_SelfAwarenessProcess(system[i]);
            yield add_SelfAwarenessAspect(system[i], actual_path);
            if (system[i].containsIoTSubSystem)
                yield recursive_span(system[i].containsIoTSubSystem, actual_path);
        }
    });
}
function add_goal(span) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        var goal = new selfAwarnessModels_1.GoalQ(-1, "", "", 0, "");
        var rows = yield db.qwerty(goal.toSqlSelect(["/@/SYSTEM/@/", "/@/MODEL/@/"], [span.$.id, modelID]));
        var id_hierarchical = rows.map((row) => {
            return { id: row.id, padre: row.padre };
        });
        var list_of_goals = goal.toObjectArray(rows);
        span.containsGoal = order_goals_hierarchical(list_of_goals, id_hierarchical, null);
    });
}
function order_goals_hierarchical(list_of_goals, id_hierarchical, id_f) {
    //Lista de pares seleccionados
    var selected_goals_id = id_hierarchical.filter((goal) => goal.padre == id_f);
    //Lista de pares no seleccionados
    var not_selected_goals_id = id_hierarchical.filter((goal) => goal.padre != id_f);
    //id puros seleccionados
    var ids = selected_goals_id.map((goal) => goal.id);
    //retornar si no no hay ids seleccionados
    if (ids.length == 0)
        return [];
    //Sublista de objetivos seleccionados
    var selected_goals = list_of_goals.filter((goal) => ids.indexOf(goal.id) != -1);
    //Sublista de objetivos no seleccionados
    var unselected_goals = list_of_goals.filter((goal) => ids.indexOf(goal.id) == -1);
    var result_goals = [];
    selected_goals.forEach((goal) => {
        var aux_subGoal = order_goals_hierarchical(unselected_goals, not_selected_goals_id, goal.id);
        if (aux_subGoal.length > 0)
            goal.containsSubGoal = aux_subGoal;
        result_goals.push(goal.toObjectG());
    });
    return result_goals;
}
function add_calculatedGoalIndicator(span) {
    console.log(span);
}
function add_SelfAwarenessProcess(span) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        var SelfAwarness;
        SelfAwarness = new selfAwarnessModels_1.SelfAwarenessProcessQ(-1, "", "", 0, undefined, undefined);
        var sql = SelfAwarness.toSqlSelect(["/@/SYSTEM/@/", "/@/MODEL/@/"], [span.$.id, modelID]);
        var rows = yield db.qwerty(sql);
        var process = SelfAwarness.toObjectArray(rows);
        var arr_insert_process = [];
        for (var i = 0; i < process.length; i++) {
            var new_process = process[i].toObjectG();
            arr_insert_process.push(new_process);
            if (process[i].type_process == 17)
                yield add_PreReflectiveProcess_extras(new_process);
            else
                yield add_ReflectiveProcess_extras();
        }
        if (arr_insert_process.length > 0)
            span.constainsSelfAwarenessProcess = arr_insert_process;
    });
}
function add_PreReflectiveProcess_extras(process) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        var CollectionMethod;
        CollectionMethod = new selfAwarnessModels_1.CollectionMethodQ(-1, "");
        var sql = CollectionMethod.toSqlSelect(["/@/PROCES/@/"], [process.$.id]);
    });
}
function add_ReflectiveProcess_extras() {
    return __awaiter(this, void 0, void 0, function* () { });
}
function add_SelfAwarenessAspect(span, span_path) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        var SelfAwarness;
        SelfAwarness = new SelfAwarenessAspectQ_1.SelfAwarenessAspectQ(-1, "", "", 0, undefined);
        var sql = SelfAwarness.toSqlSelect(["/@/MODEL/@/", "/@/SYSTEM/@/"], [modelID, span.$.id]);
        var rows = yield db.qwerty(sql);
        var aspects = SelfAwarness.toObjectArray(rows);
        var arr_insert_aspects = [];
        for (var i = 0; i < aspects.length; i++) {
            var new_aspect = aspects[i].toObjectG();
            arr_insert_aspects.push(new_aspect);
            yield add_relation_Aspect_Process_SelfAweranes(new_aspect, arr_insert_aspects.length - 1, span.constainsSelfAwarenessProcess, span_path);
            yield add_relation_SelfAweranesAspect_Goals(new_aspect, arr_insert_aspects.length - 1, span.containsGoal, span_path);
        }
        if (arr_insert_aspects.length > 0)
            span.constainsSelfAwarenessAspect = arr_insert_aspects;
    });
}
function add_relation_Aspect_Process_SelfAweranes(aspect, aspect_inx, list_of_process, path) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        var rows = yield db.qwerty(`select pa_id from procesoautoconsciencia where aa_id=${aspect.$.id}`);
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < list_of_process.length; j++) {
                if (rows[i].pa_id == list_of_process[j].$.id) {
                    if (aspect.iscaptured)
                        aspect.iscaptured += ` ${path}/@constainsSelfAwarenessProcess.${i}`;
                    else
                        aspect.iscaptured = path + `/@constainsSelfAwarenessProcess.${i}`;
                    list_of_process[j].captures =
                        path + `/@constainsSelfAwarenessAspect.${aspect_inx}`;
                }
            }
        }
    });
}
function add_relation_SelfAweranesAspect_Goals(aspect, aspect_inx, list_of_goals, path) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        var rows = yield db.qwerty(`SELECT obj_id from aspectoautoconsciencia where aa_id=${aspect.$.id}`);
        rows = rows[0];
        for (var i = 0; i < list_of_goals.length; i++) {
            if (rows.obj_id == list_of_goals[i].$.id) {
                aspect.isUsedToCalculate = `${path}/@containsGoal.${i}`;
                if (list_of_goals[i].isCalculatedBy)
                    list_of_goals[i].isCalculatedBy += ` ${path}/@constainsSelfAwarenessAspect.${aspect_inx}`;
                else
                    list_of_goals[i].isCalculatedBy = `${path}/@constainsSelfAwarenessAspect.${aspect_inx}`;
                routes[`${aspect.$.id}`] = `${path}/@constainsSelfAwarenessAspect.${aspect_inx}`;
            }
        }
    });
}
function add_scale(model) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
    });
}
function add_scope(model) {
    return __awaiter(this, void 0, void 0, function* () {
        if (model["containsEntity"]) {
            var containsEntity = model["containsEntity"];
            yield recursive_scope(containsEntity, "//@containsEntity", model);
        }
    });
}
function recursive_scope(scope_list, path, model) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < scope_list.length; i++) {
            var actual_path = `${path}.${i}`;
            yield add_relation_scope_selfAweranessAspect(scope_list[i], actual_path, model);
            if (scope_list[i].containsSubPhysicalEntity) {
                yield recursive_scope(scope_list[i].containsSubPhysicalEntity, `${actual_path}/@containsSubPhysicalEntity`, model);
            }
            if (scope_list[i].containsComputingNode) {
                yield recursive_scope(scope_list[i].containsComputingNode, `${actual_path}/@containsComputingNode`, model);
            }
            if (scope_list[i].containsResource) {
                yield recursive_scope(scope_list[i].containsResource, `${actual_path}/@containsResource`, model);
            }
        }
    });
}
function add_relation_scope_selfAweranessAspect(scope, path, model) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        var rows = yield db.qwerty(`select aa_id from aspectoautoconsciencia_objeto where obj_id=${scope.$.id} and ma_id=${modelID}`);
        for (var i = 0; i < rows.length; i++) {
            yield recursive_relation_scope_selfAweranessAspect(rows[i].aa_id, scope, path, model);
        }
    });
}
function recursive_relation_scope_selfAweranessAspect(aspect_id, scope, scope_path, model) {
    return __awaiter(this, void 0, void 0, function* () {
        var route = routes[`${aspect_id}`];
        route = route.substring(3, route.length);
        route = route.split("/@").reverse();
        var aspect_obj = recursive_element(route, model);
        aspect_obj.belongsTo = scope_path;
        if (scope.has)
            scope.has += " " + routes[`${aspect_id}`];
        else
            scope.has = routes[`${aspect_id}`];
    });
}
function recursive_element(arr_path, sub_model) {
    if (arr_path.length > 0) {
        var redireccion = arr_path.pop();
        redireccion = redireccion.split(".");
        var sub_elemento = sub_model[redireccion[0]][parseInt(redireccion[1])];
        return recursive_element(arr_path, sub_elemento);
    }
    return sub_model;
}
