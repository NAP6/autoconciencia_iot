"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoTGateway = void 0;
const EdgeNode_1 = require("./EdgeNode");
class IoTGateway extends EdgeNode_1.EdgeNode {
    constructor(id, name, description) {
        super(id, name, description);
    }
}
exports.IoTGateway = IoTGateway;
