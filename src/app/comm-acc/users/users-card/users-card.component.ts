// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UserCardClipComponent } from './user-card-clip/user-card-clip.component';
import { UserCardFooterComponent } from './user-card-footer/user-card-footer.component';
import { UserCardOtherComponent } from './user-card-other/user-card-other.component';
import { UserCardSimpleComponent } from './user-card-simple/user-card-simple.component';
import { UserCardSocialComponent } from './user-card-social/user-card-social.component';

@Component({
  selector: 'app-users-card',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    UserCardSocialComponent,
    UserCardClipComponent,
    UserCardSimpleComponent,
    UserCardOtherComponent,
    UserCardFooterComponent
  ],
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.scss']
})
export default class UsersCardComponent {}
