import Realm from 'realm';
import Tree from './models/tree';
import createTreeAction, { TreeAction } from './actions/treeAction';

const realmInstance = new Realm({
    schema: [Tree],
});

export const getRealmInstance = () => realmInstance;

export const treeActions: TreeAction = createTreeAction(realmInstance);
