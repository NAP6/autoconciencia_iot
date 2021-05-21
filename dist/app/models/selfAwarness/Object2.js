"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object = void 0;
class Object {
    constructor(id, name, Otype) {
        this.id = id;
        this.name = name;
        this.Otype = Otype;
        this.active = true;
        this.subObject = [];
    }
}
exports.Object = Object;
