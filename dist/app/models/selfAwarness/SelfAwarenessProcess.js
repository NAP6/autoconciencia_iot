"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAwarenessProcess = void 0;
class SelfAwarenessProcess {
    constructor(id, name, description, type_process, executionPeriodStart, executionPeriodEnd) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._type_process = type_process;
        this._active = true;
        this._executionPeriodStart = executionPeriodStart;
        this._executionPeriodEnd = executionPeriodEnd;
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
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get type_process() {
        return this._type_process;
    }
    set type_process(value) {
        this._type_process = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get executionPeriodStart() {
        return this._executionPeriodStart;
    }
    set executionPeriodStart(value) {
        this._executionPeriodStart = value;
    }
    get executionPeriodEnd() {
        return this._executionPeriodEnd;
    }
    set executionPeriodEnd(value) {
        this._executionPeriodEnd = value;
    }
    get supports() {
        return this._supports;
    }
    set supports(value) {
        this._supports = value;
    }
    get captures() {
        return this._captures;
    }
    set captures(value) {
        this._captures = value;
    }
    toObjectG() {
        var res = {};
        res.$ = {
            id: this.id,
            name: this.name,
            description: this.description,
        };
        return res;
    }
}
exports.SelfAwarenessProcess = SelfAwarenessProcess;
