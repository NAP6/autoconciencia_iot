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
exports.user_models = void 0;
const database2_1 = require("../../data/database2");
const selfAwarnessModels_1 = require("../../models/selfAwarnessModels");
function user_models(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            var id = (_b = req.session) === null || _b === void 0 ? void 0 : _b.user._id;
            var db = new database2_1.database2();
            var model = new selfAwarnessModels_1.SelfAwarnessQ(-1, "", "", "", "");
            console.log((_c = req.session) === null || _c === void 0 ? void 0 : _c.user);
            var rows = yield db.qwerty(model.toSqlSelect(["/@/USER/@/"], [id.toString()]));
            console.log(model.toObjectArray(rows));
            res.json(model.toObjectArray(rows));
        }
        else {
            res.json({ error: "debe iniciar session para poder usar la api" });
        }
    });
}
exports.user_models = user_models;
