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
            var connection = yield this.conectar();
            var [rows, fields] = yield connection.execute(sql);
            connection.end();
            return rows;
        });
    }
    architecture(architecture, modelID) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.qwerty(architecture.modelIoTSystem.toSqlInsert(["/@/MODELO/@/", "/@/PADRE/@/"], [modelID, "NULL"]));
            var systems = architecture.modelIoTSystem.IoTSubSystem;
            var id = architecture.modelIoTSystem.id;
            for (var i = 0; i < systems.length; i++) {
                yield this.qwerty(systems[i].toSqlInsert(["/@/MODELO/@/", "/@/PADRE/@/"], [modelID, `${id}`]));
            }
            var dataFlows = architecture.modelDataFlow;
            for (var i = 0; i < dataFlows.length; i++) {
                yield this.qwerty(dataFlows[i].toSqlInsert([], []));
            }
            this.insertar_entidades_recursivo(architecture.modelEntity, [
                modelID,
                "NULL",
            ]);
        });
    }
    insertar_entidades_recursivo(entidades, value) {
        return __awaiter(this, void 0, void 0, function* () {
            for (var i = 0; i < entidades.length; i++) {
                yield this.qwerty(entidades[i].toSqlInsert(["/@/MODELO/@/", "/@/PADRE/@/"], value));
                if (entidades[i].propertys.length > 0) {
                    for (var j = 0; j < entidades[i].propertys.length; j++) {
                        yield this.qwerty(entidades[i].propertys[j].toSqlInsert(["/@/OBJETOS/@/"], [`${entidades[i].id}`]));
                        this.relation_propiedad_flujo(entidades[i].propertys[j].id.toString(), entidades[i].propertys[j].dataFlow);
                    }
                }
                if (entidades[i].subEntity.length > 0) {
                    var valueAux = [value[0], entidades[i].id.toString()];
                    yield this.insertar_entidades_recursivo(entidades[i].subEntity, valueAux);
                }
                this.relation_sujeto_objeto(entidades[i].id.toString(), entidades[i].iotSystem);
            }
        });
    }
    relation_sujeto_objeto(id, systemas) {
        return __awaiter(this, void 0, void 0, function* () {
            var connection = yield this.conectar();
            systemas.forEach((sys) => {
                connection.execute(`insert INTO sujeto_objeto(suj_id,obj_id) VALUES (${sys.id},${id})`);
            });
            connection.end();
        });
    }
    relation_propiedad_flujo(id, flujos) {
        return __awaiter(this, void 0, void 0, function* () {
            var connection = yield this.conectar();
            flujos.forEach((flu) => {
                connection.execute(`insert INTO propiedad_flujodatos (pro_id, flu_id) VALUES (${id},${flu.id})`);
            });
            connection.end();
        });
    }
}
exports.database2 = database2;
