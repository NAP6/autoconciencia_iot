"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudNode = void 0;
const ComputeNode_1 = require("./ComputeNode");
class CloudNode extends ComputeNode_1.ComputeNode {
    constructor(id, name, description) {
        super(id, name, description);
    }
}
exports.CloudNode = CloudNode;
