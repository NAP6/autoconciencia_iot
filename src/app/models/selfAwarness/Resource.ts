import { PhysicalEntity } from "./PhysicalEntity";

export class Resource extends PhysicalEntity {
    constructor(id: number, name: string, description:string) {
        super(id,name,description);
      }
}
