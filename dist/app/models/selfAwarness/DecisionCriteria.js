"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionCriteria = void 0;
class DecisionCriteria {
    constructor(id, name, description) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._active = true;
        this._containsThreshold = [];
        this._isUded = [];
        this._interprets = [];
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
    set active(value) {
        this._active = value;
    }
    get active() {
        return this._active;
    }
    set description(value) {
        this._description = value;
    }
    get containsThreshold() {
        return this._containsThreshold;
    }
    set containsThreshold(value) {
        this._containsThreshold = value;
    }
    get isUded() {
        return this._isUded;
    }
    set isUded(value) {
        this._isUded = value;
    }
    get interprets() {
        return this._interprets;
    }
    set interprets(value) {
        this._interprets = value;
    }
    toObjectG() {
        return {
            $: {
                id: this.id,
                name: this.name,
                description: this.description,
            },
        };
    }
}
exports.DecisionCriteria = DecisionCriteria;
