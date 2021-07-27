"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const IoTDevice_1 = require("./IoTDevice");
class Tag extends IoTDevice_1.IoTDevice {
    constructor(id, name, description) {
        super(id, name, description);
    }
}
exports.Tag = Tag;
