"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = void 0;
const fs = __importStar(require("fs"));
const xml2js_1 = require("xml2js");
class json {
    constructor() {
        this.json = [];
    }
    setJSON(json) {
        this.json = json;
    }
    getJSON() {
        return this.json;
    }
    xml_file2json(xml_file) {
        var json = [];
        try {
            const xml = fs.readFileSync(xml_file);
            (0, xml2js_1.parseString)(xml, function (err, result) {
                if (err)
                    throw err;
                json = result;
            });
            fs.unlink(xml_file, (err) => {
                if (err)
                    throw err;
            });
        }
        catch (error) {
            console.log("No se ha ingresado ningun valor");
        }
        this.json = json;
        return json;
    }
    getSystem() {
        var nameModel = Object.keys(this.json)[0];
        const ob = this.json[nameModel]["represents"];
        return ob;
    }
    /*public getEntity(): [systemEnt] {
      var nameModel: string = Object.keys(this.json)[0];
      const ob = this.json[nameModel]["containsEntity"];
      return ob;
    }*/
    getEntity() {
        var nameM = Object.keys(this.json)[0];
        var entidades = this.json[nameM]["containsEntity"];
        var obj;
        entidades.forEach(element => {
            element.$["xsi:type"] = element.$["xsi:type"].split(':')[1];
            var auxComputing;
            var auxEntity;
            var auxcontain;
            if (element.containsResource) {
                auxcontain = this.extraerItems(element.containsResource);
            }
            if (element.containsComputingNode) {
                auxComputing = this.extraerItems(element.containsComputingNode);
            }
            if (element.subPhysicalEntity) {
                auxEntity = this.extraerItems(element.subPhysicalEntity, true);
            }
            var data = { $: element.$ };
            if (element.has) {
                var hasAux = [];
                //data["has"] = element.has;
                element.has.forEach(element2 => {
                    var aux2 = { $: element2.$ };
                    if (element2.$.hasRulePropertyToDataColumn) {
                        var nameModel = Object.keys(this.json)[0];
                        var ob = this.json[nameModel]["containsDataFlow"];
                        var dataF = this.extracDataFlow(element2.$.hasRulePropertyToDataColumn, ob);
                        aux2.dataFlow = dataF;
                    }
                    hasAux.push(aux2);
                });
                data["has"] = hasAux;
            }
            if (auxComputing)
                data["comput"] = auxComputing;
            if (auxEntity)
                data["Entity"] = auxEntity;
            if (auxcontain)
                data["containsResource"] = auxcontain;
            if (obj)
                obj.push(data);
            else
                obj = [data];
        });
        return obj;
    }
    extraerItems(item, isSubEntity = false) {
        var obj;
        item.forEach(element => {
            if (isSubEntity) {
                element.$["xsi:type"] = "PhysicalEntity";
            }
            else if (element.$["xsi:type"]) {
                element.$["xsi:type"] = element.$["xsi:type"].split(':')[1];
            }
            var auxComputing;
            var auxEntity;
            var auxcontain;
            if (element.containsResource) {
                auxcontain = this.extraerItems(element.containsResource);
            }
            if (element.containsComputingNode) {
                auxComputing = this.extraerItems(element.containsComputingNode);
            }
            if (element.subPhysicalEntity) {
                auxEntity = this.extraerItems(element.subPhysicalEntity, true);
            }
            var data = { $: element.$ };
            if (element.has) {
                var hasAux = [];
                //data["has"] = element.has;
                element.has.forEach(element2 => {
                    var aux2 = { $: element2.$ };
                    if (element2.$.hasRulePropertyToDataColumn) {
                        var nameModel = Object.keys(this.json)[0];
                        var ob = this.json[nameModel]["containsDataFlow"];
                        var dataF = this.extracDataFlow(element2.$.hasRulePropertyToDataColumn, ob);
                        aux2.dataFlow = dataF;
                    }
                    hasAux.push(aux2);
                });
                data["has"] = hasAux;
            }
            if (auxComputing)
                data["comput"] = auxComputing;
            if (auxEntity)
                data["Entity"] = auxEntity;
            if (auxcontain)
                data["containsResource"] = auxcontain;
            if (obj)
                obj.push(data);
            else
                obj = [data];
        });
        return obj;
    }
    extracDataFlow(listDataFlow, listJson) {
        var lista = listDataFlow.split(" ");
        var obj = [];
        lista.forEach(element => {
            var aux = element.split("/").join("");
            var aux2 = aux.split("@");
            var indice = aux2[1].split(".");
            var elem = (listJson[parseInt(indice[1])]);
            var flu = { id: elem.$.id, description: elem.$.description, communicationType: elem.$.communicationType };
            obj.push(flu);
        });
        return obj;
    }
}
exports.json = json;
