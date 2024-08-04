import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared.module";
import { GradientConfig } from 'src/app/app-config';
import {AppModule} from "../../../../app.module";

@Component({
  selector: 'app-reg-nav-bar',
    standalone: true,
    imports: [CommonModule, SharedModule, ],
  templateUrl: './reg-nav-bar.component.html',
  styleUrls: ['./reg-nav-bar.component.scss']
})
export class RegNavBarComponent {
    gradientConfig;
    menuClass: boolean;
    collapseStyle: string;
    windowWidth: number;

    constructor() {
        this.gradientConfig = GradientConfig;
        this.menuClass = false;
        this.collapseStyle = 'block';
        this.windowWidth = window.innerWidth;
    }
}
