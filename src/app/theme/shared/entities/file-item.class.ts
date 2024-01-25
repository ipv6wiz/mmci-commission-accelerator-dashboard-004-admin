export interface FileItem {
    name: string;
    isDirectory: boolean;
    size?: number;
    dateCreated?: string;
    items?: FileItem[];
}
