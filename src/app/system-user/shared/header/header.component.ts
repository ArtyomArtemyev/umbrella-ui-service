import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../shared/models/user.model';
import {AuthService} from '../../../shared/services/auth.service';
import {UsersService} from '../../../shared/services/users.service';
import {Token} from '../../../shared/models/token.model';
import {UpdateUser} from '../../../shared/models/upate-user.model';

@Component({
  selector: 'wfm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;
  @ViewChild('newPassword') newPassword: ElementRef;
  @ViewChild('newEmail') newEmail: ElementRef;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UsersService) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  saveAccountCahnges() {
    let currentUser: User = JSON.parse(window.localStorage.getItem('user'));
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    if (this.newEmail.nativeElement.value !== '' || this.newPassword.nativeElement.value !== '') {
      if (this.newEmail.nativeElement.value !== '') {
        currentUser.email = this.newEmail.nativeElement.value;
      }
      if (this.newPassword.nativeElement.value !== '') {
        currentUser.password = this.hashString(this.newPassword.nativeElement.value);
      }
      const updateUser: UpdateUser = new UpdateUser(currentUser, token);
      this.userService.updateUser(updateUser)
        .subscribe((response: UpdateUser) => {
          window.localStorage.removeItem('user');
          window.localStorage.setItem('user', JSON.stringify(response.user));
        });
    }
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash;
    }
    return hash.toString();
  }
}
