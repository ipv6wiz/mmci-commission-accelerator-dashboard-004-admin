import { FileItem } from './file-item.interface';

export interface FileModalData {
  clientId: string;
  fileItem: FileItem;
  bucket: string;
}
