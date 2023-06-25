// Angular Import
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';

// project import
import {  NavigationItems } from 'src/app/theme/layout/admin/navigation/navigation';
import {NavigationItem} from "../../entities/navigation-item.interface";
import {NavigationService} from "../../service/navigation.service";
import {AuthenticationService} from "../../service";
interface titleType {
  url: string | boolean | undefined;
  title: string;
  breadcrumbs: unknown;
  type: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  // public props
  @Input() type: string;
    currentUserRoles: string[] = [];
  navigations: NavigationItem[] = [];
  breadcrumbList: Array<string> = [];
  navigationList: string[] | { url: string | boolean | undefined; title: string; breadcrumbs: unknown; type: string }[] = [];

  // constructor
  constructor(
      private route: Router,
      private titleService: Title,
      private navService: NavigationService,
      private authAService: AuthenticationService
      ) {
      this.authAService.getCurrentUserRoles().then(roles => {
          this.currentUserRoles = roles;
          this.navService.getAllFilteredByRole(this.currentUserRoles).then(nav => this.navigations = nav);
      });
    this.type = 'theme2';
    this.setBreadcrumb();
  }

  // public method
  setBreadcrumb() {
    this.route.events.subscribe((router: Event) => {
      if (router instanceof NavigationEnd) {
        const activeLink = router.url;
        const breadcrumbList = this.filterNavigation(this.navigations, activeLink);
        this.navigationList = breadcrumbList;
        const title = breadcrumbList[breadcrumbList.length - 1]?.title || 'Welcome';
        this.titleService.setTitle(title + ' | Commission Accelerator');
      }
    });
  }

  filterNavigation(navItems: NavigationItem[], activeLink: string): titleType[] {
    for (const navItem of navItems) {
      if (navItem.type === 'item' && 'url' in navItem && navItem.url === activeLink) {
        return [
          {
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          }
        ];
      }
      if ((navItem.type === 'group' || navItem.type === 'collapse') && 'children' in navItem) {
        // eslint-disable-next-line
        const breadcrumbList = this.filterNavigation(navItem.children!, activeLink);
        if (breadcrumbList.length > 0) {
          breadcrumbList.unshift({
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          });
          return breadcrumbList;
        }
      }
    }
    return [];
  }
}
