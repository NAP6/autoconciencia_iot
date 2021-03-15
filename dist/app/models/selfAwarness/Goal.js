"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goal = void 0;
class Goal {
    constructor(id, name, description, weight, aggregationOperator) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._weight = weight;
        this._aggregationOperator = aggregationOperator;
        this._active = true;
        this._containsSubGoal = [];
        this._isSuported = [];
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
    get weight() {
        return this._weight;
    }
    set weight(value) {
        this._weight = value;
    }
    get aggregationOperator() {
        return this._aggregationOperator;
    }
    set aggregationOperator(value) {
        this._aggregationOperator = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get containsSubGoal() {
        return this._containsSubGoal;
    }
    set containsSubGoal(value) {
        this._containsSubGoal = value;
    }
    get isSuported() {
        return this._isSuported;
    }
    set isSuported(value) {
        this._isSuported = value;
    }
    get isInterpretedBy() {
        return this._isInterpretedBy;
    }
    set isInterpretedBy(value) {
        this._isInterpretedBy = value;
    }
}
exports.Goal = Goal;
