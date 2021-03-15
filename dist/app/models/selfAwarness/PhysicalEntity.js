"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalEntity = void 0;
const Entity_1 = require("./Entity");
class PhysicalEntity extends Entity_1.Entity {
    constructor(id, name, description) {
        super(id, name, description);
        this._containsSubPhysicalEntity = [];
    }
    get containsSubPhysicalEntity() {
        return this._containsSubPhysicalEntity;
    }
    set containsSubPhysicalEntity(value) {
        this._containsSubPhysicalEntity = value;
    }
}
exports.PhysicalEntity = PhysicalEntity;
