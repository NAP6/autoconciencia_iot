export class Object {
  id: number;
  name: string;
  Otype: string;
  active: boolean;
  subObject: Object[];

  constructor(id: number, name: string, Otype: string) {
    this.id = id;
    this.name = name;
    this.Otype = Otype;
    this.active = true;
    this.subObject = [];
  }
}
