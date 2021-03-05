import { SSL_OP_NO_QUERY_MTU } from "constants";

export interface SQL_Qwerty {
  id: number;
  toSqlInsert(tag:string[],value:string[]): string;
  toSqlSelect(tag:string[],value:string[]): string;
  toSqlDelete(tag:string[],value:string[]): string;
  toObjectArray(rows): any[];
}
