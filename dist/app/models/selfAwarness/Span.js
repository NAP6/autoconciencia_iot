"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Span = void 0;
class Span {
    constructor() {
        this._has = [];
        this._executes = [];
    }
    get has() {
        return this._has;
    }
    set has(value) {
        this._has = value;
    }
    get executes() {
        return this._executes;
    }
    set executes(value) {
        this._executes = value;
    }
}
exports.Span = Span;
