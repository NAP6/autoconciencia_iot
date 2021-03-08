"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
class Action {
    constructor(id, description) {
        this._id = id;
        this._description = description;
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
    get sRecommendedln() {
        return this._sRecommendedln;
    }
    set sRecommendedln(value) {
        this._sRecommendedln = value;
    }
}
exports.Action = Action;
