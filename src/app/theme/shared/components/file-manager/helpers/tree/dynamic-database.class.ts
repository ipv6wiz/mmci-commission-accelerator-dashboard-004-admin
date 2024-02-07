import {DynamicFlatNode} from "./dynamic-flat-node.class";
import {Injectable} from "@angular/core";
import {FileItem} from "../../dtos/file-item.interface";
import {StorageService} from "../../services/storage.service";

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({providedIn: 'root'})
export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
    ['Fruits', ['Apple', 'Orange', 'Banana']],
    ['Vegetables', ['Tomato', 'Potato', 'Onion']],
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple']],
  ]);

  fileMap = new Map<string, FileItem[]>();

  rootLevelNodes: string[] = ['Fruits', 'Vegetables'];
  constructor(private storageService: StorageService) {}

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    console.log('getChildren - node: ', node);
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    console.log('isExpandable - node: ', node);
    return this.dataMap.has(node);
  }
}
