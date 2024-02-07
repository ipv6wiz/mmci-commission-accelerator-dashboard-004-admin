import {signal} from "@angular/core";
import {FileItem} from "../dtos/file-item.interface";
const files: FileItem[] = [];
export const newLeaf = signal(files);
