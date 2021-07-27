"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Threshold = void 0;
class Threshold {
    constructor(id, name, interpretation, lowerThreshold, upperThreshold) {
        this._id = id;
        this._name = name;
        this._interpretation = interpretation;
        this._lowerThreshold = lowerThreshold;
        this._upperThreshold = upperThreshold;
        this._recommends = [];
        this._active = true;
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
    get interpretation() {
        return this._interpretation;
    }
    set interpretation(value) {
        this._interpretation = value;
    }
    get lowerThreshold() {
        return this._lowerThreshold;
    }
    set lowerThreshold(value) {
        this._lowerThreshold = value;
    }
    get upperThreshold() {
        return this._upperThreshold;
    }
    set upperThreshold(value) {
        this._upperThreshold = value;
    }
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
    }
    get recommends() {
        return this._recommends;
    }
    set recommends(value) {
        this._recommends = value;
    }
    toObjectG() {
        return {
            $: {
                id: this.id,
                name: this.name,
                interpretation: this.interpretation,
                lowerThreshold: this.lowerThreshold,
                upperThreshold: this.upperThreshold,
            },
        };
    }
}
exports.Threshold = Threshold;
