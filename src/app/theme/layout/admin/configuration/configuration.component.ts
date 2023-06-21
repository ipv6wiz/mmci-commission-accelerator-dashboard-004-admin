// Angular Import
import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { GradientConfig } from 'src/app/app-config';
import { Location, LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationComponent implements OnInit {
  // public props
  styleSelectorToggle!: boolean; // open configuration menu
  layoutType!: string; // layout type
  rtlLayout!: boolean; // rtl type
  menuFixedLayout!: boolean; // menu/navbar fixed flag
  headerFixedLayout!: boolean; // header fixed flag
  boxLayout!: boolean; // box layout flag
  headerBackgroundColor!: string; // header background color

  headerBackColor!: string;

  gradientConfig;
  isConfig!: boolean;

  scroll = (): void => {
    if (this.headerFixedLayout === false) {
      (document.querySelector('#nav-ps-gradient-able') as HTMLElement).style.maxHeight = 'calc(100vh)';
      const el = document.querySelector('.pcoded-navbar.menupos-fixed') as HTMLElement;
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 56) {
        el.style.position = 'fixed';
        el.style.transition = 'none';
        el.style.marginTop = '0';
      } else {
        el.style.position = 'absolute';
        el.style.marginTop = '56px';
      }
    } else if (document.querySelector('.pcoded-navbar')?.hasAttribute('style')) {
      document.querySelector('.pcoded-navbar.menupos-fixed')?.removeAttribute('style');
    }
  };

  // constructor
  constructor(private zone: NgZone, private location: Location, private locationStrategy: LocationStrategy) {
    this.gradientConfig = GradientConfig;
    this.setThemeLayout();
  }

  // life cycle event
  ngOnInit() {
    this.styleSelectorToggle = false;
    this.layoutType = GradientConfig.layoutType;
    this.setLayout(this.layoutType);
    this.headerBackgroundColor = GradientConfig.header_back_color;
    this.setHeaderBackground(this.headerBackgroundColor);
    this.rtlLayout = GradientConfig.isRtlLayout;
    this.changeRtlLayout(this.rtlLayout);
    this.menuFixedLayout = GradientConfig.nav_fixed_layout;
    if (GradientConfig.layout === 'vertical') {
      this.changeMenuFixedLayout(this.menuFixedLayout);
    }
    this.headerFixedLayout = GradientConfig.header_fixed_layout;
    this.changeHeaderFixedLayout(this.headerFixedLayout);
    this.boxLayout = GradientConfig.isBoxLayout;
    this.changeBoxLayout(this.boxLayout);
  }

  // public method
  setThemeLayout() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }

    switch (current_url) {
      case baseHref + '/layout/static':
        GradientConfig.layout = 'vertical';
        GradientConfig.nav_fixed_layout = false;
        GradientConfig.header_fixed_layout = false;
        break;
      case baseHref + '/layout/fixed':
        GradientConfig.layout = 'vertical';
        GradientConfig.nav_fixed_layout = true;
        GradientConfig.header_fixed_layout = true;
        break;
      case baseHref + '/layout/nav-fixed':
        GradientConfig.layout = 'vertical';
        GradientConfig.nav_fixed_layout = true;
        GradientConfig.header_fixed_layout = false;
        break;
      case baseHref + '/layout/collapse-menu':
        GradientConfig.layout = 'vertical';
        GradientConfig.isCollapse_menu = true;
        break;
      case baseHref + '/layout/vertical-rtl':
        GradientConfig.layout = 'vertical';
        GradientConfig.isRtlLayout = true;
        break;
      case baseHref + '/layout/horizontal':
        GradientConfig.layout = 'horizontal';
        GradientConfig.nav_fixed_layout = false;
        GradientConfig.header_fixed_layout = false;
        break;
      case baseHref + '/layout/horizontal-l2':
        GradientConfig.layout = 'horizontal';
        GradientConfig.subLayout = 'horizontal-2';
        GradientConfig.nav_fixed_layout = false;
        GradientConfig.header_fixed_layout = false;
        break;
      case baseHref + '/layout/box':
        GradientConfig.layout = 'vertical';
        GradientConfig.isBoxLayout = true;
        GradientConfig.header_fixed_layout = false;
        GradientConfig.isCollapse_menu = true;
        break;
      case baseHref + '/layout/light':
        GradientConfig.layout = 'vertical';
        GradientConfig.layoutType = 'menu-light';
        GradientConfig.header_back_color = 'header-blue';
        break;
      case baseHref + '/layout/dark':
        GradientConfig.layout = 'vertical';
        GradientConfig.layoutType = 'dark';
        GradientConfig.header_back_color = 'header-dark';
        break;
      case baseHref + '/layout/nav-color':
        GradientConfig.layout = 'vertical';
        GradientConfig.layoutType = 'menu-light';
        GradientConfig.header_back_color = 'header-info';
        GradientConfig.nav_fixed_layout = true;
        GradientConfig.header_fixed_layout = true;
        break;
      default:
        break;
    }
  }

  setHeaderBackColor(color: string) {
    this.headerBackColor = color;
    (document.querySelector('body') as HTMLElement).style.background = color;
  }

  // change main layout
  setLayout(layout: string) {
    this.isConfig = true;
    document.querySelector('.pcoded-navbar')?.classList.remove('menu-light');
    document.querySelector('.pcoded-navbar')?.classList.remove('menu-dark');
    document.querySelector('.pcoded-navbar')?.classList.remove('navbar-dark');
    document.querySelector('.pcoded-navbar')?.classList.remove('brand-dark');
    document.querySelector('body')?.classList.remove('gradient-dark');
    this.setHeaderBackground('header-blue');

    this.layoutType = layout;
    if (layout === 'menu-light') {
      document.querySelector('.pcoded-navbar')?.classList.add(layout);
    }
    if (layout === 'dark') {
      document.querySelector('.pcoded-navbar')?.classList.add('navbar-dark');
      document.querySelector('.pcoded-navbar')?.classList.add('brand-dark');
      this.setHeaderBackground('header-dark');

      document.querySelector('body')?.classList.add('gradient-dark');
    }
    if (layout === 'reset') {
      this.reset();
    }
  }

  reset() {
    document.querySelector('.pcoded-navbar')?.classList.remove('icon-colored');
    this.ngOnInit(); // life cycle event
  }

  setRtlLayout(e: Event) {
    const flag = (e.target as HTMLInputElement).checked;
    this.changeRtlLayout(flag);
  }

  changeRtlLayout(flag: boolean) {
    if (flag) {
      document.querySelector('body')?.classList.add('gradient-rtl');
    } else {
      document.querySelector('body')?.classList.remove('gradient-rtl');
    }
  }

  setMenuFixedLayout(e: Event) {
    const flag = (e.target as HTMLInputElement).checked;
    this.changeMenuFixedLayout(flag);
  }

  changeMenuFixedLayout(flag: boolean) {
    setTimeout(() => {
      if (flag) {
        document.querySelector('.pcoded-navbar')?.classList.remove('menupos-static');
        document.querySelector('.pcoded-navbar')?.classList.add('menupos-fixed');
        if (GradientConfig.layout === 'vertical') {
          (document.querySelector('#nav-ps-gradient-able') as HTMLElement).style.maxHeight = 'calc(100vh - 56px)'; // calc(100vh - 70px)
        }
        window.addEventListener('scroll', this.scroll, true);
        window.scrollTo(0, 0);
      } else {
        document.querySelector('.pcoded-navbar')?.classList.add('menupos-static');
        document.querySelector('.pcoded-navbar')?.classList.remove('menupos-fixed');
        if (GradientConfig.layout === 'vertical') {
          (document.querySelector('#nav-ps-gradient-able') as HTMLElement).style.maxHeight = 'calc(100%)'; // calc(100% - 70px)
        }
        if (GradientConfig.layout === 'vertical') {
          window.removeEventListener('scroll', this.scroll, true);
        }
      }
    }, 100);
  }

  setHeaderFixedLayout(e: Event) {
    const flag = (e.target as HTMLInputElement).checked;
    this.changeHeaderFixedLayout(flag);
  }

  changeHeaderFixedLayout(flag: boolean) {
    if (flag) {
      document.querySelector('.pcoded-header')?.classList.add('headerPos-fixed');
    } else {
      document.querySelector('.pcoded-header')?.classList.remove('headerPos-fixed');
      // static
      if (GradientConfig.layout === 'vertical' && this.menuFixedLayout) {
        window.addEventListener('scroll', this.scroll, true);
        window.scrollTo(0, 0);
      } else {
        window.removeEventListener('scroll', this.scroll, true);
      }
    }
  }

  setBoxLayout(e: Event) {
    const flag = (e.target as HTMLInputElement).checked;
    this.changeBoxLayout(flag);
  }

  changeBoxLayout(flag: boolean) {
    if (flag) {
      document.querySelector('body')?.classList.add('container');
      document.querySelector('body')?.classList.add('box-layout');
    } else {
      document.querySelector('body')?.classList.remove('box-layout');
      document.querySelector('body')?.classList.remove('container');
    }
  }

  setHeaderBackground(background: string) {
    this.headerBackgroundColor = background;
    GradientConfig.header_back_color = background;
    document.querySelector('.pcoded-header')?.classList.remove('header-blue');
    document.querySelector('.pcoded-header')?.classList.remove('header-red');
    document.querySelector('.pcoded-header')?.classList.remove('header-purple');
    document.querySelector('.pcoded-header')?.classList.remove('header-info');
    document.querySelector('.pcoded-header')?.classList.remove('header-dark');
    document.querySelector('.pcoded-header')?.classList.remove('header-orange');
    document.querySelector('.pcoded-header')?.classList.remove('header-green');
    document.querySelector('.pcoded-header')?.classList.remove('header-yellow');
    document.querySelector('.pcoded-header')?.classList.remove('header-orchidGreen');
    document.querySelector('.pcoded-header')?.classList.remove('header-indigoGreen');
    document.querySelector('.pcoded-header')?.classList.remove('header-darkGreen');
    document.querySelector('.pcoded-header')?.classList.remove('header-darkblue');

    if (background !== 'header-default') {
      document.querySelector('.pcoded-header')?.classList.add(background);
    }
  }
}
