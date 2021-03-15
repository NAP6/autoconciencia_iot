import { IoTDevice } from "./IoTDevice";

export class Tag extends IoTDevice {
    constructor(id: number, name: string, description:string) {
        super(id,name,description);
      }
}
