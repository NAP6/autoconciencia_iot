"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFlow = void 0;
class DataFlow {
    constructor(id, description, dataFlowType, communicationtType, unitOfTime, executionTimeInterval, flowExecutionTime) {
        this._id = id;
        this._description = description;
        this._dataFlowType = dataFlowType;
        this._communicationtType = communicationtType;
        this._unitOfTime = unitOfTime;
        this._executionTimeInterval = executionTimeInterval;
        this._flowExecutionTime = flowExecutionTime;
        this._support = [];
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
    get dataFlowType() {
        return this._dataFlowType;
    }
    set dataFlowType(value) {
        this._dataFlowType = value;
    }
    get communicationType() {
        return this._communicationtType;
    }
    set communicationType(value) {
        this._communicationtType = value;
    }
    get unitOfTime() {
        return this._unitOfTime;
    }
    set unitOfTime(value) {
        this._unitOfTime = value;
    }
    get executionTimeInterval() {
        return this._executionTimeInterval;
    }
    set executionTimeInterval(value) {
        this._executionTimeInterval = value;
    }
    get flowExecutionTime() {
        return this._flowExecutionTime;
    }
    set flowExecutionTime(value) {
        this._flowExecutionTime = value;
    }
    get support() {
        return this._support;
    }
    set support(value) {
        this._support = value;
    }
}
exports.DataFlow = DataFlow;
