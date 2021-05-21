"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
class Action {
    constructor(id, description) {
        this._id = id;
        this._description = description;
        this._active = true;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get isRecommendedln() {
        return this._isRecommendedln;
    }
    set isRecommendedln(value) {
        this._isRecommendedln = value;
    }
}
exports.Action = Action;
