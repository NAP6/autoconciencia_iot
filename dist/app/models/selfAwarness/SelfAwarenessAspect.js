"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAwarenessAspect = void 0;
class SelfAwarenessAspect {
    constructor(id, name, description, weight, aspectType, aggregationOperator, scope) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._weight = weight;
        this._aspectType = aspectType;
        this._active = true;
        this._isEvaluated = [];
        this._derives = [];
        this._aggregationOperator = aggregationOperator;
        this._scope = scope;
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
    get aggregationOperator() {
        return this._aggregationOperator;
    }
    set aggregationOperator(value) {
        this._aggregationOperator = value;
    }
    get isEvaluated() {
        return this._isEvaluated;
    }
    set isEvaluated(value) {
        this._isEvaluated = value;
    }
    get scope() {
        return this._scope;
    }
    set scope(value) {
        this._scope = value;
    }
    is_individual() {
        return this._scope == "INDIVIDUAL";
    }
    is_colective() {
        return this._scope == "COLECTIVO";
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
        if (this.is_colective())
            res.$.aggregationOperator = this.aggregationOperator;
        return res;
    }
}
exports.SelfAwarenessAspect = SelfAwarenessAspect;
