"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const fs = __importStar(require("fs"));
const xml2js_1 = require("xml2js");
const database2_1 = require("../data/database2");
var json = [];
try {
    const xml = fs.readFileSync("C:\\Users\\NICO\\Downloads\\xmi\\MonitoringArchitectureModel.xmi");
    xml2js_1.parseString(xml, function (err, result) {
        if (err)
            throw err;
        json = result;
    });
}
catch (error) {
    console.log("No se ha ingresado ningun valor");
}
//var arquitectura = new JSON2Architecture(json);
/*
console.log(arquitectura.modelIoTSystem.IoTSubSystem[1].id);
console.log(arquitectura.modelIoTSystem.IoTSubSystem[1].name);
console.log(arquitectura.modelEntity[1].iotSystem[0].id);
console.log(arquitectura.modelEntity[1].iotSystem[0].name);
arquitectura.modelIoTSystem.IoTSubSystem[1].id = 666 // Id Base de datos
console.log(arquitectura.modelIoTSystem.IoTSubSystem[1].id);
console.log(arquitectura.modelIoTSystem.IoTSubSystem[1].name);
console.log(arquitectura.modelEntity[1].iotSystem[0].id);
console.log(arquitectura.modelEntity[1].iotSystem[0].name);
*/
var db2 = new database2_1.database2();
//db2.architecture(arquitectura, '49');
//
//
class cosaPadre {
    constructor(ele1) {
        this._ele1 = ele1;
    }
    get ele1() {
        return this._ele1;
    }
    set ele1(value) {
        this._ele1 = value;
    }
}
class cosaHijo extends cosaPadre {
    constructor(ele1, ele2) {
        super(ele1);
        this._ele2 = ele2;
    }
    get ele2() {
        return this._ele2;
    }
    set ele2(value) {
        this._ele2 = value;
    }
}
var cosaA = [];
cosaA.push(new cosaHijo(1, 2));
cosaA.push(new cosaHijo(3, 4));
var aux = cosaA[0];
if (aux instanceof cosaHijo) {
    console.log(aux.ele2);
}
else {
    console.log("No es cosa hijo");
}
