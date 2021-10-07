"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
class Scope {
    constructor() {
        this._has = [];
    }
    get containsSelfAwarenessAspect() {
        return this._has;
    }
    set containsSelfAwarenessAspect(value) {
        this._has = value;
    }
}
exports.Scope = Scope;
