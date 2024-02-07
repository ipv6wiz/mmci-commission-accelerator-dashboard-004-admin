import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class TreeNavService {
   elem: Element | null = document.querySelector('app-file-manager');
   treeNavMinWidth: number = 0;
   treeNavMaxWidth: number = 0;
   cardWidth: number = 0;

  constructor() {
     this.setMinAndMaxWidth();
  }

  setMinAndMaxWidth() {
    if(!!this.elem) {
      this.treeNavMinWidth = parseInt(
        getComputedStyle(this.elem).getPropertyValue('--file-mgr-tree-min-width'), 10);
      this.treeNavMaxWidth = parseInt(
        getComputedStyle(this.elem).getPropertyValue('--file-mgr-tree-max-width'), 10);
      this.cardWidth = parseInt(
        getComputedStyle(this.elem).getPropertyValue('--file-mgr-card-width'), 10
      );
    }
  }

  get treeNavWidth(): number {
    if (this.elem) {
      const rawValue = getComputedStyle(this.elem).getPropertyValue('--file-mgr-tree-width');
      return parseInt(
        rawValue,
        10
      );
    }
    return -1;
  }

  setTreeNavWidth(width: number) {
    const clampedWidth = Math.min(
      Math.max(width, this.treeNavMinWidth),
      this.treeNavMaxWidth
    );
    const contentWidth = this.cardWidth - clampedWidth;

    if (!!this.elem) {
      if(!!this.elem) {
        const firstElem:HTMLElement | null = this.elem.querySelector(':first-child');
        const contentElem: HTMLElement | null = this.elem.querySelector('#file-mgr-content');
        if(!!firstElem) {
          firstElem.style.setProperty('--file-mgr-tree-width', `${clampedWidth}px`);
        }
        if(!!contentElem) {
          contentElem.style.setProperty('margin-left', `${clampedWidth}px`);
        }
      }
    }
  }
}
