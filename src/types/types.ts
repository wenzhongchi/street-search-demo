export interface TreeData {
    data: [string[]];
}

export interface Search {
    name: string;
    date: Date;
}

export interface Bookmark {
    treeId: string;
    name: string;
    address: string;
    image: string;
}
