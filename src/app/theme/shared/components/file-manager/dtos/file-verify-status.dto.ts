import { FileItem } from './file-item.interface';


export interface FileVerifyStatusDto {
  action: string;
  item?: FileItem;
  clientId?: string;
}
