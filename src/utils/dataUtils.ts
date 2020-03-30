import _ from 'lodash';
import { TreeType } from './../storage/models/tree';

const convertRawArrayToTree = (treeArray: any): TreeType => {
    const tree = _.map(treeArray, eachField => {
        if (_.isNull(eachField)) {
            return '';
        }
        return eachField;
    });
    return {
        id: tree[9],
        blockId: tree[10],
        theGeom: tree[11],
        treeDbh: tree[12],
        stumpDiam: tree[13],
        curbLoc: tree[14],
        status: tree[15],
        health: tree[16],
        spcLatin: tree[17],
        spcCommon: tree[18],
        steward: tree[19],
        guards: tree[20],
        sidewalk: tree[21],
        userType: tree[22],
        problems: tree[23],
        rootStone: tree[24],
        rootGrate: tree[25],
        rootOther: tree[26],
        trnkWire: tree[27],
        trnkLight: tree[28],
        trnkOther: tree[29],
        brnchLigh: tree[30],
        brnchShoe: tree[31],
        brnchOthe: tree[32],
        address: tree[33],
        zipcode: tree[34],
        zipCity: tree[35],
        cbNum: tree[36],
        borocode: tree[37],
        boroname: tree[38],
        cncldist: tree[39],
        stAssem: tree[40],
        stSenate: tree[41],
        nta: tree[42],
        ntaName: tree[43],
        boroCt: tree[44],
        state: tree[45],
        latitude: Number(tree[46]),
        longitude: Number(tree[47]),
        xSp: tree[48],
        ySp: tree[49],
        createdAt: tree[8],
    };
};

const convertRealmObjectToTree = (tree: TreeType & Realm.Object): TreeType => {
    return {
        id: tree.id,
        blockId: tree.blockId,
        theGeom: tree.theGeom,
        treeDbh: tree.treeDbh,
        stumpDiam: tree.stumpDiam,
        curbLoc: tree.curbLoc,
        status: tree.status,
        health: tree.health,
        spcLatin: tree.spcLatin,
        spcCommon: tree.spcCommon,
        steward: tree.steward,
        guards: tree.guards,
        sidewalk: tree.sidewalk,
        userType: tree.userType,
        problems: tree.problems,
        rootStone: tree.rootStone,
        rootGrate: tree.rootGrate,
        rootOther: tree.rootOther,
        trnkWire: tree.trnkWire,
        trnkLight: tree.trnkLight,
        trnkOther: tree.trnkOther,
        brnchLigh: tree.brnchLigh,
        brnchShoe: tree.brnchShoe,
        brnchOthe: tree.brnchOthe,
        address: tree.address,
        zipcode: tree.zipcode,
        zipCity: tree.zipCity,
        cbNum: tree.cbNum,
        borocode: tree.borocode,
        boroname: tree.boroname,
        cncldist: tree.cncldist,
        stAssem: tree.stAssem,
        stSenate: tree.stSenate,
        nta: tree.nta,
        ntaName: tree.ntaName,
        boroCt: tree.boroCt,
        state: tree.state,
        latitude: tree.latitude,
        longitude: tree.longitude,
        xSp: tree.xSp,
        ySp: tree.ySp,
        createdAt: tree.createdAt,
    };
};

const capitalizeTreeName = (name: string) => {
    return _.replace(_.capitalize(name), ' ', '');
};

export { convertRawArrayToTree, capitalizeTreeName, convertRealmObjectToTree };
