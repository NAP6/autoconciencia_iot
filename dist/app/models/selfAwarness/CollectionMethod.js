"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionMethod = void 0;
const LearningReasoningMethod_1 = require("./LearningReasoningMethod");
class CollectionMethod extends LearningReasoningMethod_1.LearningReasoningMethod {
    constructor(id, collectionScope) {
        super(id);
        this._collectionScope = collectionScope;
        this._collectsProperty = [];
    }
    get collectionScope() {
        return this._collectionScope;
    }
    set collectionScope(value) {
        this._collectionScope = value;
    }
    get collectsProperty() {
        return this._collectsProperty;
    }
    set collectsProperty(value) {
        this._collectsProperty = value;
    }
    get produces() {
        return this._produces;
    }
    set produces(value) {
        this._produces = value;
    }
    get isSupported() {
        return this._isSupported;
    }
    set isSupported(value) {
        this._isSupported = value;
    }
    toObjectG() {
        return {
            $: {
                id: this.id,
                collectionScope: this.collectionScope,
            },
        };
    }
}
exports.CollectionMethod = CollectionMethod;
