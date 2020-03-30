import Realm from 'realm';
import TreeSchema, { TreeType } from '../models/tree';
import { Region } from 'react-native-maps';
import { convertRealmObjectToTree } from '../../utils/dataUtils';

const TREE_PAGE_COUNT = 20;
export interface TreeAction {
    isEmpty(): Promise<boolean>;
    saveTree(tree: TreeType): Promise<TreeType>;
    getTreesWithRegion(region: Region, page: number): Promise<TreeType[]>;
}

const createTreeAction = (realmInstance: Realm): TreeAction => {
    return {
        isEmpty: (): Promise<boolean> => {
            return new Promise((resolve, reject) => {
                try {
                    const objectCount = realmInstance.objects<TreeType>(TreeSchema.getModelName()).length;
                    if (objectCount > 0) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        },
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
        getTreesWithRegion: (region: Region, page: number): Promise<TreeType[]> => {
            return new Promise((resolve, reject) => {
                try {
                    // calculate region boundaries
                    const minLatitude = region.latitude - region.latitudeDelta;
                    const maxLatitude = region.latitude + region.latitudeDelta;
                    const minLongitude = region.longitude - region.longitudeDelta;
                    const maxLongitude = region.longitude + region.longitudeDelta;

                    // console.log('min', minLatitude);
                    // console.log('max', maxLatitude);
                    const filteredTrees = realmInstance
                        .objects<TreeType>(TreeSchema.getModelName())
                        .filtered(
                            'latitude >= $0 AND latitude <= $1 AND longitude >= $2 AND longitude <= $3',
                            minLatitude,
                            maxLatitude,
                            minLongitude,
                            maxLongitude,
                        )
                        .slice(0, TREE_PAGE_COUNT * page)
                        .map(tree => {
                            return convertRealmObjectToTree(tree);
                        });
                    resolve(filteredTrees);
                } catch (error) {
                    reject(error);
                }
            });
        },
    };
};

export default createTreeAction;
