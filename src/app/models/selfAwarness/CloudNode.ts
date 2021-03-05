import { ComputeNode } from "./ComputeNode";

export class CloudNode extends ComputeNode {
    constructor(id: number, name: string, description:string) {
        super(id,name,description);
      }
}
