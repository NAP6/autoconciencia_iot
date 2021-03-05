"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputeNode = void 0;
const PhysicalEntity_1 = require("./PhysicalEntity");
class ComputeNode extends PhysicalEntity_1.PhysicalEntity {
    constructor() {
        super();
        this._containsResource = [];
    }
    get containsResource() {
        return this.containsResource;
    }
    set containsResource(value) {
        this._containsResource = value;
    }
}
exports.ComputeNode = ComputeNode;
