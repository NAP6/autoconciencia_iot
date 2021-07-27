"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeNode = void 0;
const ComputeNode_1 = require("./ComputeNode");
class EdgeNode extends ComputeNode_1.ComputeNode {
    constructor(id, name, description) {
        super(id, name, description);
    }
}
exports.EdgeNode = EdgeNode;
