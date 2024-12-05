export interface FileOrFolder {
    id: string;
    name: string;
    folder?: object;
    childCount: number;
    createdDateTime: string;
    eTag: string;
    lastModifiedDateTime: string;
    webUrl: string;
    size: number;
    shared: object;
    "@microsoft.graph.downloadUrl": string;
    createdBy: { user: User };
    lastModifiedBy: { user: User };
    url: string;
    date: string;
    iconName: string;
    // Add any other properties that are used in both components
  }
 
  export interface User {
    id: string;
    displayName: string;
  }
