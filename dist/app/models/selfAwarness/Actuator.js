"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actuator = void 0;
const IoTDevice_1 = require("./IoTDevice");
class Actuator extends IoTDevice_1.IoTDevice {
    constructor(id, name, description) {
        super(id, name, description);
    }
}
exports.Actuator = Actuator;
