import { Entity } from "./Entity";

export class PhysicalEntity extends Entity {
    private _containsSubPhysicalEntity: PhysicalEntity[];
    constructor() {
        super();
        this._containsSubPhysicalEntity = [];
      }
      get containsSubPhysicalEntity(): PhysicalEntity[] {
        return this._containsSubPhysicalEntity;
      }
    
      set containsSubPhysicalEntity(value: PhysicalEntity[]) {
        this._containsSubPhysicalEntity = value;
      }
}
