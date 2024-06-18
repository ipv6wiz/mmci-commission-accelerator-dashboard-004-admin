import { Injectable } from '@angular/core';
import {NavigationItem} from "../entities/navigation-item.interface";
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../dtos/api-response.dto';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private apiUrl = environment.gcpCommAccApiUrl;
  private readonly endPoint: string = 'navigation';
  private readonly endPointUrl: string;

  constructor(private http: HttpClient) {
    this.endPointUrl = `${this.apiUrl}/${this.endPoint}`;
    console.log('OptionsService - endPointUrl: ', this.endPointUrl);
  }

  async loadUserNavigation(userRoles: string[]): Promise<any> {
    const response: ApiResponse = await lastValueFrom(this.getAllFilteredByRoleForUser(userRoles), {defaultValue: {statusCode: 400, msg: 'Default Response'}});
    return response.data;
  }

  getAllFilteredByRoleForUser(userRoles: string[]): Observable<ApiResponse> {
      console.log('NavigationService - getAllFilteredByRole - userRoles: ', userRoles);
    return this.http.put<ApiResponse>(`${this.endPointUrl}/user`, {roles: userRoles});

  }

  // createMenuSection(section: NavigationItem) {
  //     section.children = [];
  //     return this.navRef.add({...section});
  // }
  //
  // updateParent(parentId: string, data: any) {
  //     return this.navRef.doc(parentId).update(data);
  // }
  //
  // createMenuChild(parentId: string, childItem: NavigationItem) {
  //     const addArrayItem = {children: arrayUnion(childItem)};
  //     return this.updateParent(parentId, addArrayItem);
  // }

  cleanNavTree(navTreeItem: NavigationItem, userRoles: string[]) {
      // console.log('navTreeItem: ', navTreeItem);
      // console.log('userRoles: ', userRoles);
      const okRole = (navTreeItem.roles) ? navTreeItem.roles.some((r: string) => userRoles.includes(r)) : false;
      // console.log('okRole: ', okRole);
      if(!okRole) {
          return null;
      }
      if(okRole && navTreeItem.children && navTreeItem.children.length > 0) {
          let i = 0;
          while (i < navTreeItem.children.length) {
              const res = this.cleanNavTree(navTreeItem.children[i], userRoles)
              if (res === null) {
                  navTreeItem.children.splice(i, 1);
              } else {
                  i++;
              }
          }
      }
      if(okRole) {
          return navTreeItem;
      } else {
          return null;
      }
  }
}
