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
            xml2js_1.parseString(xml, function (err, result) {
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
        return json;
    }
    getSystem() {
        return [];
    }
    getEntity() {
        return [];
    }
}
exports.json = json;
