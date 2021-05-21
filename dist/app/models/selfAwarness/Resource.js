"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const PhysicalEntity_1 = require("./PhysicalEntity");
class Resource extends PhysicalEntity_1.PhysicalEntity {
    constructor(id, name, description) {
        super(id, name, description);
    }
}
exports.Resource = Resource;
