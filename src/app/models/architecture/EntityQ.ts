import { Entity } from "./Entity";
import { PropertyQ } from "./PropertyQ";
import { IoTSystemQ } from "./IoTSystemQ";
import { SQL_Qwerty } from '../SQL_Qwerty';

export class EntityQ extends Entity implements SQL_Qwerty {
    private _propertysQ: PropertyQ[];
    private _subEntityQ: EntityQ[];
    private _iotSystemQ: IoTSystemQ[];

    constructor(id: number, name: string, entityType: string) {
        super(id, name, entityType)
        this._propertysQ = [];
        this._subEntityQ = [];
        this._iotSystemQ = [];
    }

    get propertys(): PropertyQ[] {
        return this._propertysQ;
    }

    set propertys(propertys: PropertyQ[]) {
        this._propertysQ = propertys;
    }

    get subEntity(): EntityQ[] {
        return this._subEntityQ;
    }

    set subEntity(subEntity: EntityQ[]) {
        this._subEntityQ = subEntity;
    }

    get iotSystem(): IoTSystemQ[] {
        return this._iotSystemQ;
    }

    set iotSystem(iotSystem: IoTSystemQ[]) {
        this._iotSystemQ = iotSystem;
    }

    toSqlInsert(): string {
        return `INSERT INTO objeto (ma_id, obj_nombre, obj_tipo, obj_padre) VALUES (/@/MODELO/@/, '${this.name}', '${this.entityType}' , /@/PADRE/@/)`;
    }

    toSqlSelect(): string {
        return ``;
    }

    toSqlDelete(): string {
        return ``;
    }

    /* static parceQ(value: Entity): EntityQ {
        var ent = new EntityQ(value.id, value.name, value.entityType);
        ent.propertys = value.propertys;
        ent.subEntity = value.subEntity;
        ent.iotSystem = value.iotSystem;
        return ent;
    }

    static parceQA(value: Entity[]): EntityQ[] {
        var returnV: EntityQ[] = [];
        for (var i = 0; i < value.length; i++) {
            var ent = new EntityQ(value[i].id, value[i].name, value[i].entityType);
            ent.propertys = value[i].propertys;
            ent.subEntity = value[i].subEntity;
            ent.iotSystem = value[i].iotSystem;
            returnV.push(ent);
        }
        return returnV;
    } */
}
