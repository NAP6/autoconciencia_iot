import { SelfAwarness } from "./SelfAwarness";
import { SQL_Qwerty } from "../SQL_Qwerty";

export class SelfAwarnessQ extends SelfAwarness implements SQL_Qwerty {

    toSqlInsert(): string {
        return `INSERT INTO modeloautoconsciencia (ma_nombre, ma_descripcion, ma_autor, ma_modelo_arquitectura , usr_id) VALUES ('${this.name}','${this.description}','${this.author}','${this.architectureModel}', /@/USER/@/)`;
    }

    toSqlSelect(): string {
        return ``;
    }

    toSqlDelete(): string {
        return ``;
    }
}