"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metric = void 0;
class Metric {
    constructor(id, name, description, abbreviation, perspective) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._abbreviation = abbreviation;
        this._perspective = perspective;
        this._active = true;
        this._isUsedIn = [];
        this._evaluates = [];
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
    get abbreviation() {
        return this._abbreviation;
    }
    set abbreviation(value) {
        this._abbreviation = value;
    }
    get perspective() {
        return this._perspective;
    }
    set perspective(value) {
        this._perspective = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get isValidatedBy() {
        return this._isValidatedBy;
    }
    set isValidatedBy(value) {
        this._isValidatedBy = value;
    }
    get isExpressedIn() {
        return this._isExpressedIn;
    }
    set isExpressedIn(value) {
        this._isExpressedIn = value;
    }
    get isUsedIn() {
        return this._isUsedIn;
    }
    set isUsedIn(value) {
        this._isUsedIn = value;
    }
    get evaluates() {
        return this._evaluates;
    }
    set evaluates(value) {
        this._evaluates = value;
    }
}
exports.Metric = Metric;
