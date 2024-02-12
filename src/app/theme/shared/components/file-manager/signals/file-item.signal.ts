import {signal} from "@angular/core";
import {FileItem} from "../dtos/file-item.interface";
const files: FileItem[] = [];
// const clientId: string = '';
export const newLeaf = signal(files);
