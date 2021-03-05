import { PhysicalEntity } from "./PhysicalEntity";
import { Resource } from "./Resource";

export class ComputeNode extends PhysicalEntity {
    private _containsResource: Resource[];
    constructor(id: number, name: string, description:string) {
        super(id,name,description);
        this._containsResource = [];
      }

      get containsResource(): Resource[] {
        return this.containsResource;
      }
    
      set containsResource(value: Resource[]) {
        this._containsResource = value;
      }
}
