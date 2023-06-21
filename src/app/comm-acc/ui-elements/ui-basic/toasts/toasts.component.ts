// Angular Import
import { Component, QueryList, Renderer2, ViewChildren, VERSION } from '@angular/core';
import { cloneDeep, random } from 'lodash-es';

// third party
import { GlobalConfig } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { ToastContainerDirective } from 'ngx-toastr';
import { ToastNoAnimation } from 'ngx-toastr';
import { NotyfToastComponent } from './tosts-config/notyf.toast';
import { PinkToastComponent } from './tosts-config/pink.toast';
import { BootstrapToastComponent } from './tosts-config/bootstrap.toast';

interface Quote {
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {
  // public props
  quotes: Quote[] = [
    {
      title: 'Title',
      message: 'Message'
    },
    {
      title: '😃',
      message: 'Supports Emoji'
    },
    {
      message: 'My name is Inigo Montoya. You killed my father. Prepare to die!'
    },
    {
      message: 'Titles are not always needed'
    },
    {
      title: 'Title only 👊'
    },
    {
      title: '',
      message: `Supports Angular ${VERSION.full}`
    }
  ];
  types = ['success', 'error', 'info', 'warning'];
  options: GlobalConfig;
  title = '';
  message = '';
  type = this.types[0];
  version = VERSION;
  enableBootstrap = false;
  inline = false;
  inlinePositionIndex = 0;
  @ViewChildren(ToastContainerDirective)
  inlineContainers!: QueryList<ToastContainerDirective>;

  // private props
  private lastInserted: number[] = [];

  // Constructor
  constructor(public toastr: ToastrService, private renderer: Renderer2) {
    this.options = this.toastr.toastrConfig;
  }

  // public Method
  getMessage() {
    let m: string | undefined = this.message;
    let t: string | undefined = this.title;
    if (!this.title.length && !this.message.length) {
      const randomMessage = this.quotes[random(0, this.quotes.length - 1)];
      m = randomMessage.message;
      t = randomMessage.title;
    }
    return {
      message: m,
      title: t
    };
  }

  openToast() {
    const { message, title } = this.getMessage();
    const opt = cloneDeep(this.options);
    const inserted = this.toastr.show(message, title, opt, this.options.iconClasses[this.type]);
    if (inserted) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  openToastNoAnimation() {
    const { message, title } = this.getMessage();
    const opt = cloneDeep(this.options);
    opt.toastComponent = ToastNoAnimation;
    const inserted = this.toastr.show(message, title, opt, this.options.iconClasses[this.type]);
    if (inserted) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  openPinkToast() {
    const opt = cloneDeep(this.options);
    opt.toastComponent = PinkToastComponent;
    opt.toastClass = 'pinktoast';
    const { message, title } = this.getMessage();
    const inserted = this.toastr.show(message, title, opt);
    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  openBootstrapToast() {
    const opt = cloneDeep(this.options);
    opt.toastComponent = BootstrapToastComponent;
    opt.toastClass = 'toast';
    const { message, title } = this.getMessage();
    const inserted = this.toastr.show(message, title, opt);
    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  openNotyf() {
    const opt = cloneDeep(this.options);
    opt.toastComponent = NotyfToastComponent;
    opt.toastClass = 'notyf confirm';
    const { message, title } = this.getMessage();
    const inserted = this.toastr.show(message || 'Success', title, opt);
    if (inserted && inserted.toastId) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }

  clearToasts() {
    this.toastr.clear();
  }

  clearLastToast() {
    this.toastr.clear(this.lastInserted.pop());
  }

  fixNumber(field: keyof GlobalConfig): void {
    // eslint-disable-next-line
    (this.options as any)[field] = Number(this.options[field]);
  }

  setInlineClass(enableInline: boolean) {
    if (enableInline) {
      this.toastr.overlayContainer = this.inlineContainers.toArray()[this.inlinePositionIndex];
      this.options.positionClass = 'inline';
    } else {
      this.toastr.overlayContainer = undefined;
      this.options.positionClass = 'toast-top-right';
    }
  }

  setInlinePosition(index: number) {
    this.toastr.overlayContainer = this.inlineContainers.toArray()[index];
  }

  setClass(enableBootstrap: boolean) {
    const add = enableBootstrap ? 'bootstrap' : 'normal';
    const remove = enableBootstrap ? 'normal' : 'bootstrap';
    this.renderer.addClass(document.body, add);
    this.renderer.removeClass(document.body, remove);
  }
}
