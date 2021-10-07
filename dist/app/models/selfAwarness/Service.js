"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const Entity_1 = require("./Entity");
class Service extends Entity_1.Entity {
    constructor(id, name, description) {
        super(id, name, description);
    }
}
exports.Service = Service;
