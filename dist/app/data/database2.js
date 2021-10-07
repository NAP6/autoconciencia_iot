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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database2 = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const constants_1 = __importDefault(require("../../config/constants"));
class database2 {
    constructor() { }
    conectar() {
        return __awaiter(this, void 0, void 0, function* () {
            var connection = yield promise_1.default.createConnection({
                host: constants_1.default["db-url"],
                port: constants_1.default["db-port"],
                user: constants_1.default["db-user"],
                password: constants_1.default["db-password"],
                database: constants_1.default["db-schema"],
            });
            return connection;
        });
    }
    qwerty(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(sql);
            var connection = yield this.conectar();
            var [rows, fields] = yield connection.execute(sql);
            connection.end();
            return rows;
        });
    }
    architecture(architecture, modelID) {
        return __awaiter(this, void 0, void 0, function* () {
            this.insertar_sistemas_recursivo(modelID, "NULL", architecture.modelIoTSystem);
            var dataFlows = architecture.modelDataFlow;
            for (var i = 0; i < dataFlows.length; i++) {
                var insertedFlow = yield this.qwerty(dataFlows[i].toSqlInsert(["/@/MODELO/@/"], [modelID]));
            }
            this.insertar_entidades_recursivo(architecture.modelEntity, [
                modelID,
                "NULL",
            ]);
        });
    }
    insertar_sistemas_recursivo(modelID, idPadre, system) {
        return __awaiter(this, void 0, void 0, function* () {
            var architectureFather = yield this.qwerty(system.toSqlInsert(["/@/MODELO/@/", "/@/PADRE/@/"], [modelID, `${idPadre}`]));
            var systems = system.IoTSubSystem;
            for (var i = 0; i < systems.length; i++) {
                this.insertar_sistemas_recursivo(modelID, system.id.toString(), systems[i]);
            }
        });
    }
    insertar_entidades_recursivo(entidades, value) {
        return __awaiter(this, void 0, void 0, function* () {
            for (var i = 0; i < entidades.length; i++) {
                var insertEnt = yield this.qwerty(entidades[i].toSqlInsert(["/@/MODELO/@/", "/@/PADRE/@/"], value));
                if (entidades[i].propertys.length > 0) {
                    for (var j = 0; j < entidades[i].propertys.length; j++) {
                        var insertProp = yield this.qwerty(entidades[i].propertys[j].toSqlInsert(["/@/MODELO/@/", "/@/OBJETOS/@/"], [value[0], `${entidades[i].id}`]));
                        this.relation_propiedad_flujo(entidades[i].propertys[j].id.toString(), entidades[i].propertys[j].dataFlow, value[0], entidades[i].id.toString());
                    }
                }
                if (entidades[i].subEntity.length > 0) {
                    var valueAux = [value[0], entidades[i].id.toString()];
                    yield this.insertar_entidades_recursivo(entidades[i].subEntity, valueAux);
                }
                this.relation_sujeto_objeto(entidades[i].id.toString(), entidades[i].iotSystem, value[0]);
            }
        });
    }
    relation_sujeto_objeto(id, systemas, ma_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var connection = yield this.conectar();
            systemas.forEach((sys) => {
                connection.execute(`insert INTO sujeto_objeto(suj_id,obj_id,ma_id) VALUES (${sys.id},${id}, ${ma_id})`);
            });
            connection.end();
        });
    }
    relation_propiedad_flujo(id, flujos, ma_id, obj_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var connection = yield this.conectar();
            flujos.forEach((flu) => {
                connection.execute(`insert INTO propiedad_flujodatos (pro_id, flu_id, ma_id, obj_id) VALUES (${id},${flu.id}, ${ma_id}, ${obj_id})`);
            });
            connection.end();
        });
    }
}
exports.database2 = database2;
