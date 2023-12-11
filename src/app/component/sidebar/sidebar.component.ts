import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserService } from '../../Services/user.service';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @ViewChild(HomeComponent) homeComponent: HomeComponent;

  content: 'home' | 'profile' = 'profile';

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  users: any[] = [];
  reRender: any;

  ngOnInit() {
    this.userService.getFollowRecomendations().subscribe(
      (res) => {
        this.users = res.data;
      },
      (error) => {}
    );
  }

  showHome() {
    this.content = 'home';
  }

  showProfile() {
    this.content = 'profile';
  }

  handleUserSelection(user: any) {
    // following is the state that we wnts to do

    if (user.following) {
      this.userService.follow(user.id).subscribe((res) => {
        this.homeComponent.refreshCom();
        this.notificationService.showSuccess(res.message);
      });
      // If user is following, call a function for unfollow
    } else {
      // If user is not following, call a function for follow
      this.userService.unfollow(user.id).subscribe((res) => {
        this.homeComponent.refreshCom();
        this.notificationService.showSuccess(res.message);
      });
    }
  }

  logout() {
    document.cookie =
      'authToken' + '=;expires=Thu, 01 Jan 2023 00:00:00 GMT;path=/;';

    this.router.navigate(['/login']);
  }
}
