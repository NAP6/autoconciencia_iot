import { ImplementationResource } from "./ImplementationResource";

export class Formula extends ImplementationResource {
  private _expression: string;
  constructor(
    id: number,
    name: string,
    description: string,
    returnDataType,
    expression: string
  ) {
    super(id, name, description, returnDataType);
    this._expression = expression;
  }
  get expression(): string {
    return this._expression;
  }

  set expression(value: string) {
    this._expression = value;
  }

  public toObjectG() {
    return {
      $: {
        id: this.id,
        name: this.name,
        description: this.description,
        returnDataType: this.returnDataType,
        expression: this.expression,
      },
    };
  }
}
