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
exports.delete_subjects_goal = exports.save_subjects_goal = exports.subjects_goals = exports.update_subjects = exports.subjects = exports.subject = void 0;
const database2_1 = require("../../data/database2");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
function subject(req, res) {
    res.render("subject", {
        error: req.flash("error"),
        succes: req.flash("succes"),
        session: req.session,
    });
}
exports.subject = subject;
function subjects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var id = req.session.active_model.modelID;
            var db = new database2_1.database2();
            var system = new selfAwarnessModels_1.IoTSystemQ(-1, "");
            var rows = yield db.qwerty(system.toSqlSelect(["/@/MODEL/@/"], [id]));
            //console.log(rows)
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.subjects = subjects;
function update_subjects(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var elementos = req.body;
            var id = req.session.active_model.modelID;
            for (var i = 0; i < elementos.length; i++) {
                var system = new selfAwarnessModels_1.IoTSystemQ(parseInt(elementos[i].id), "");
                system.active = elementos[i].activo ? true : false;
                yield db.qwerty(system.toSqlUpdate(["/@/ACTIVE/@/", "/@/MODEL/@/"], [system.active, id]));
            }
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ Mensaje: "Debe iniciar session para poder usar la api" });
        }
    });
}
exports.update_subjects = update_subjects;
function subjects_goals(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var systemID = req.body.id;
            var modelID = req.session.active_model.modelID;
            var goal = new selfAwarnessModels_1.GoalQ(-1, "", "", 0, "");
            var rows = yield db.qwerty(goal.toSqlSelect(["/@/SYSTEM/@/", "/@/MODEL/@/"], [systemID, modelID]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.subjects_goals = subjects_goals;
function save_subjects_goal(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var newGoal = req.body;
            var goal = new selfAwarnessModels_1.GoalQ(-1, newGoal.name, newGoal.description, newGoal.weigth, newGoal.agregationOperator);
            goal.active = newGoal.active;
            var modelID = req.session.active_model.modelID;
            yield db.qwerty(goal.toSqlInsert(["/@/FATHER/@/", "/@/IOTSYSTEM/@/", "/@/MODEL/@/", "/@/CRITERIA/@/"], [newGoal.father, newGoal.system, modelID, newGoal.criteria]));
            res.json({ Mensaje: "Los datos se han enviado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.save_subjects_goal = save_subjects_goal;
function delete_subjects_goal(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var goal = new selfAwarnessModels_1.GoalQ(req.body.id, "", "", -1, "");
            yield db.qwerty(goal.toSqlDelete([], []));
            res.json({ Mensaje: "Los datos se han eliminado con exito" });
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.delete_subjects_goal = delete_subjects_goal;
