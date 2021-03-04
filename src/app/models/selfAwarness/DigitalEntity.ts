import { Entity } from "./Entity";

export class DigitalEntity extends Entity {
    constructor(id: number, name: string, description:string) {
        super(id,name,description);
      }
}
