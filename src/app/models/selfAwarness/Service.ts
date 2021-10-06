import { Entity } from "./Entity";

export class Service extends Entity {
    constructor(id: number, name: string, description:string) {
        super(id,name,description);
      }
}
