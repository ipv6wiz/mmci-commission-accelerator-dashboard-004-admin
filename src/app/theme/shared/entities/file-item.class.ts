export interface FileItemX {
    name: string;
    isDirectory: boolean;
    size?: number;
    dateCreated?: string;
    items?: FileItemX[];
}
