"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisModel = void 0;
const LearningReasoningMethod_1 = require("./LearningReasoningMethod");
class AnalysisModel extends LearningReasoningMethod_1.LearningReasoningMethod {
    constructor(id, implementationResourceType) {
        super(id);
        this._implementationResourceType = implementationResourceType;
        this._containsAction = [];
    }
    get implementationResourceType() {
        return this._implementationResourceType;
    }
    set implementationResourceType(value) {
        this._implementationResourceType = value;
    }
    get uses() {
        return this._uses;
    }
    set uses(value) {
        this._uses = value;
    }
    get containsAction() {
        return this._containsAction;
    }
    set containsAction(value) {
        this._containsAction = value;
    }
    get produces() {
        return this._produces;
    }
    set produces(value) {
        this._produces = value;
    }
}
exports.AnalysisModel = AnalysisModel;
