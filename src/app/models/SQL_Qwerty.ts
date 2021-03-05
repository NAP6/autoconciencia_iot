import { SSL_OP_NO_QUERY_MTU } from "constants";

export interface SQL_Qwerty {
  id: number;
  toSqlInsert(): string;
  toSqlSelect(): string;
  toSqlDelete(): string;
  toObjectArray(rows): SQL_Qwerty[];
}
