"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
class Scope {
    constructor() {
        this._containsSelfAwarenessAspect = [];
    }
    get containsSelfAwarenessAspect() {
        return this._containsSelfAwarenessAspect;
    }
    set containsSelfAwarenessAspect(value) {
        this._containsSelfAwarenessAspect = value;
    }
}
exports.Scope = Scope;
