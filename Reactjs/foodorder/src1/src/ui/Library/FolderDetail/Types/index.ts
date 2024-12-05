export interface IFiles {
    createdBy:                       EdBy;
    createdDateTime:                 Date;
    eTag:                            string;
    id:                              string;
    lastModifiedBy:                  EdBy;
    lastModifiedDateTime:            Date;
    name:                            string;
    parentReference:                 ParentReference;
    webUrl:                          string;
    cTag:                            string;
    fileSystemInfo:                  FileSystemInfo;
    folder?:                         Folder;
    shared:                          Shared;
    size:                            number;
    "@microsoft.graph.downloadUrl"?: string;
    file?:                           File;
    image?:                          Image;
    photo?:                          Photo;
    childCount?:number
}

export interface EdBy {
    user: User;
}

export interface User {
    email:       string;
    id:          string;
    displayName: string;
}

export interface File {
    hashes:   Hashes;
    mimeType: string;
}

export interface Hashes {
    quickXorHash: string;
}

export interface FileSystemInfo {
    createdDateTime:      Date;
    lastModifiedDateTime: Date;
}

export interface Folder {
    childCount: number;
}

export interface Image {
}

export interface ParentReference {
    driveType: string;
    driveId:   string;
    id:        string;
    name:      string;
    path:      string;
    siteId:    string;
}

export interface Photo {
    alternateTakenDateTime: Date;
}

export interface Shared {
    scope: string;
}
