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
exports.get_data_flow = void 0;
const database2_1 = require("../../data/database2");
const DataFlowQ_1 = require("../../models/selfAwarness/qwertyModels/DataFlowQ");
function get_data_flow(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var db = new database2_1.database2();
            var propiedad = req.body.propiedad;
            var modeloID = req.session.active_model.modelID;
            var comunicacion = req.body.comunicacion;
            var comu;
            if (comunicacion == "SÍNCRONA") {
                comu = "Synchronous";
            }
            else if (comunicacion == "ASÍNCRONA") {
                comu = undefined;
            }
            var data_flow = new DataFlowQ_1.DataFlowQ(-1, "", "", "", "", -1);
            var rows = yield db.qwerty(data_flow.toSqlSelect(["/@/MODEL/@/", "/@/PROPERTY/@/", "/@/COMUNICATION/@/"], [modeloID, propiedad, comu]));
            res.json(rows);
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.get_data_flow = get_data_flow;
