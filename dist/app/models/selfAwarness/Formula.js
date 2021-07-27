"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formula = void 0;
const ImplementationResource_1 = require("./ImplementationResource");
class Formula extends ImplementationResource_1.ImplementationResource {
    constructor(id, name, description, returnDataType, expression) {
        super(id, name, description, returnDataType);
        this._expression = expression;
    }
    get expression() {
        return this._expression;
    }
    set expression(value) {
        this._expression = value;
    }
    toObjectG() {
        return {
            $: {
                id: this.id,
                name: this.name,
                description: this.description,
                returnDataType: this.returnDataType,
                expression: this.expression,
            },
        };
    }
}
exports.Formula = Formula;
