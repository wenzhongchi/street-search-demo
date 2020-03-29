import Realm from 'realm';
import TreeSchema, { TreeType } from '../models/tree';

export interface TreeAction {
    saveTree(tree: TreeType): Promise<TreeType>;
    getTreesWith(x: number, y: number): Promise<TreeType[]>;
}

const createTreeAction = (realmInstance: Realm): TreeAction => {
    return {
        saveTree: (tree: TreeType): Promise<TreeType> => {
            return new Promise((resolve, reject) => {
                try {
                    realmInstance.write(() => {
                        const createdTree = realmInstance.create(TreeSchema.getModelName(), tree, true);
                        resolve(createdTree);
                    });
                } catch (error) {
                    reject(error);
                }
            });
        },
        getTreesWith: (x: number, y: number): Promise<TreeType[]> => {
            return new Promise((resolve, reject) => {});
        },
    };
};

export default createTreeAction;
