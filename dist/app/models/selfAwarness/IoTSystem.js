"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoTSystem = void 0;
const Span_1 = require("./Span");
class IoTSystem extends Span_1.Span {
    constructor(id, name) {
        super();
        this._id = id;
        this._name = name;
        this._active = true;
        this._containsSubIoTSystem = [];
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get containsSubIoTSystem() {
        return this._containsSubIoTSystem;
    }
    set containsSubIoTSystem(value) {
        this._containsSubIoTSystem = value;
    }
}
exports.IoTSystem = IoTSystem;
