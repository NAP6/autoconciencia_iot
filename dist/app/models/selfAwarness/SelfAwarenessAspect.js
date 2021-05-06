"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAwarenessAspect = void 0;
class SelfAwarenessAspect {
    constructor(id, name, description, weight, aspectType) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._weight = weight;
        this._aspectType = aspectType;
        this._active = true;
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
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
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
    toObjectG() {
        var res = {};
        res.$ = {
            id: this.id,
            name: this.name,
            description: this.description,
            type: this.aspectType,
            weight: this.weight,
        };
        return res;
    }
}
exports.SelfAwarenessAspect = SelfAwarenessAspect;
