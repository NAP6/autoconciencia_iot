import { Entity } from "./Entity";

export class PhysicalEntity extends Entity {
    private _containsSubPhysicalEntity: PhysicalEntity[];
    constructor(id: number, name: string, description:string) {
        super(id,name,description);
        this._containsSubPhysicalEntity = [];
      }
      get containsSubPhysicalEntity(): PhysicalEntity[] {
        return this._containsSubPhysicalEntity;
      }
    
      set containsSubPhysicalEntity(value: PhysicalEntity[]) {
        this._containsSubPhysicalEntity = value;
      }
}
