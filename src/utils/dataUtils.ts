import _ from 'lodash';
import { TreeType } from './../storage/models/tree';

const convertRawArrayToTree = (treeArray: string[]): TreeType => {
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
        latitude: tree[46],
        longitude: tree[47],
        xSp: tree[48],
        ySp: tree[49],
        createdAt: tree[8],
    };
};

export { convertRawArrayToTree };
