"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAwarenessAspect = void 0;
class SelfAwarenessAspect {
    constructor(id, name, description, aspectType, weight) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._aspectType = aspectType;
        this._weight = weight;
        this._isEvaluated = [];
        this._isCaptured = [];
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
    get aspectType() {
        return this._aspectType;
    }
    set aspectType(value) {
        this._aspectType = value;
    }
    get weight() {
        return this._weight;
    }
    set weight(value) {
        this._weight = value;
    }
    get isEvaluated() {
        return this._isEvaluated;
    }
    set isEvaluated(value) {
        this._isEvaluated = value;
    }
    get isCaptured() {
        return this._isCaptured;
    }
    set isCaptured(value) {
        this._isCaptured = value;
    }
}
exports.SelfAwarenessAspect = SelfAwarenessAspect;
