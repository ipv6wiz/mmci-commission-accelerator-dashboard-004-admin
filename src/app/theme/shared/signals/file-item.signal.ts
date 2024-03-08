import {signal} from "@angular/core";
import {FileItem} from "../components/file-manager/dtos/file-item.interface";
const files: FileItem[] = [];
// const clientId: string = '';
export const newLeaf = signal(files);
