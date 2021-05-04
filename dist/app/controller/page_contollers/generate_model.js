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
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
var modelID;
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
            if (principa_system.containsIoTSubSystem) {
                yield recursive_span(principa_system.containsIoTSubSystem);
            }
        }
        model["containsIoTSystem"][0] = principa_system;
    });
}
function recursive_span(system) {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < system.length; i++) {
            yield add_goal(system[i]);
            if (system[i].containsIoTSubSystem)
                yield recursive_span(system[i].containsIoTSubSystem);
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
function add_calculatedGoalIndicator(span) { }
function add_SelfAwarenessProcess(span) {
    return __awaiter(this, void 0, void 0, function* () {
        var db = new database2_1.database2();
        var SelfAwarness;
        SelfAwarness = new selfAwarnessModels_1.SelfAwarenessProcessQ(-1, "", "", 0, undefined, undefined);
        var sql = SelfAwarness.toSqlSelect(["/@/SYSTEM/@/", "/@/MODEL/@/"], [span, modelID]);
        var rows = yield db.qwerty(sql);
        var process = SelfAwarness.toObjectArray(rows);
        for (var i = 0; i < process.length; i++) { }
    });
}
function add_scope() { }
