import { FileItem } from '../../../entities/file-item.class';

export interface FileVerifyStatusDto {
  action: string;
  item?: FileItem;
}
