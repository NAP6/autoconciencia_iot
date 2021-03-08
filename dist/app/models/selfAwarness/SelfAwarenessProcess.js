"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAwarenessProcess = void 0;
class SelfAwarenessProcess {
    constructor(id, name, description, executionPeriodStart, executionPeriodEnd) {
        this._id = id;
        this._name = name;
        this._description = description;
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
}
exports.SelfAwarenessProcess = SelfAwarenessProcess;
