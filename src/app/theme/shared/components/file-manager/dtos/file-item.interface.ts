export interface FileItem {
  id: string;
  name: string;
  expanded: boolean;
  folder: string;
  isDirectory: boolean;
  level: number;
  fileType?: string;
  size?: number;
  dateCreated?: string;
  meta?: any;
  downloadLink?: string;
  verifyStatus: number;
  items: FileItem[];
}
