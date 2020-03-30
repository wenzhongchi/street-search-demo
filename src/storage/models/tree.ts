import Realm from 'realm';

// tree data type is defined https://data.cityofnewyork.us/resource/5rq2-4hqu.json
export type TreeType = {
    id: string;
    blockId: string;
    theGeom: string;
    treeDbh: string;
    stumpDiam: string;
    curbLoc: string;
    status: string;
    health: string;
    spcLatin: string;
    spcCommon: string;
    steward: string;
    guards: string;
    sidewalk: string;
    userType: string;
    problems: string;
    rootStone: string;
    rootGrate: string;
    rootOther: string;
    trnkWire: string;
    trnkLight: string;
    trnkOther: string;
    brnchLigh: string;
    brnchShoe: string;
    brnchOthe: string;
    address: string;
    zipcode: string;
    zipCity: string;
    cbNum: string;
    borocode: string;
    boroname: string;
    cncldist: string;
    stAssem: string;
    stSenate: string;
    nta: string;
    ntaName: string;
    boroCt: string;
    state: string;
    latitude: number;
    longitude: number;
    xSp: string;
    ySp: string;
    createdAt: string;
};

class TreeSchema {
    static getModelName() {
        return TreeSchema.schema.name;
    }

    static schema: Realm.ObjectSchema = {
        name: 'Tree',
        primaryKey: 'id',
        properties: {
            id: { type: 'string', indexed: true },
            blockId: { type: 'string' },
            theGeom: { type: 'string' },
            treeDbh: { type: 'string' },
            stumpDiam: { type: 'string' },
            curbLoc: { type: 'string' },
            status: { type: 'string' },
            health: { type: 'string' },
            spcLatin: { type: 'string' },
            spcCommon: { type: 'string' },
            steward: { type: 'string' },
            guards: { type: 'string' },
            sidewalk: { type: 'string' },
            userType: { type: 'string' },
            problems: { type: 'string' },
            rootStone: { type: 'string' },
            rootGrate: { type: 'string' },
            rootOther: { type: 'string' },
            trnkWire: { type: 'string' },
            trnkLight: { type: 'string' },
            trnkOther: { type: 'string' },
            brnchLigh: { type: 'string' },
            brnchShoe: { type: 'string' },
            brnchOthe: { type: 'string' },
            address: { type: 'string' },
            zipcode: { type: 'string' },
            zipCity: { type: 'string' },
            cbNum: { type: 'string' },
            borocode: { type: 'string' },
            boroname: { type: 'string' },
            cncldist: { type: 'string' },
            stAssem: { type: 'string' },
            stSenate: { type: 'string' },
            nta: { type: 'string' },
            ntaName: { type: 'string' },
            boroCt: { type: 'string' },
            state: { type: 'string' },
            latitude: { type: 'double' },
            longitude: { type: 'double' },
            xSp: { type: 'string' },
            ySp: { type: 'string' },
            createdAt: { type: 'string' },
        },
    };
}

export default TreeSchema;
