"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAwarness = void 0;
class SelfAwarness {
    constructor(id, name, description, author, architectureModel) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._author = author;
        this._active = true;
        this._architectureModel = architectureModel;
        this._containsSpan = [];
        this._containsDecisionCriteria = [];
        this._containsScope = [];
        this._containsScale = [];
        this._containsImplementationResource = [];
        this._containsDataFlow = [];
        this._containsMetric = [];
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
    get author() {
        return this._author;
    }
    set author(value) {
        this._author = value;
    }
    get architectureModel() {
        return this._architectureModel;
    }
    set architectureModel(value) {
        this._architectureModel = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get containsSpan() {
        return this._containsSpan;
    }
    set containsSpan(value) {
        this._containsSpan = value;
    }
    get containsDecisionCriteria() {
        return this._containsDecisionCriteria;
    }
    set containsDecisionCriteria(value) {
        this._containsDecisionCriteria = value;
    }
    get containsScale() {
        return this._containsScale;
    }
    set containsScale(value) {
        this._containsScale = value;
    }
    get containsScope() {
        return this._containsScope;
    }
    set containsScope(value) {
        this._containsScope = value;
    }
    get containsImplementationResource() {
        return this._containsImplementationResource;
    }
    set containsImplementationResource(value) {
        this._containsImplementationResource = value;
    }
    get containsDataFlow() {
        return this._containsDataFlow;
    }
    set containsDataFlow(value) {
        this._containsDataFlow = value;
    }
    get containsMetric() {
        return this._containsMetric;
    }
    set containsMetric(value) {
        this._containsMetric = value;
    }
}
exports.SelfAwarness = SelfAwarness;
