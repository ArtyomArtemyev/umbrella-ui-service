import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../shared/models/user.model';
import {AuthService} from '../../../shared/services/auth.service';
import {UsersService} from '../../../shared/services/users.service';
import {Token} from '../../../shared/models/token.model';
import {UpdateUser} from '../../../shared/models/upate-user.model';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

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
  @ViewChild('exampleModalCenter') exampleModalCenter: ElementRef;
  showInfo: boolean;
  text: string;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UsersService) {
  }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.showInfo = false;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  saveAccountCahnges() {
    console.log(2);
    let flag1 = false;
    let flag2 = false;
    if (this.showInfo) {
      this.showInfo = false;
    }
    let currentUser: User = JSON.parse(window.localStorage.getItem('user'));
    const token: Token = new Token(JSON.parse(window.localStorage.getItem('Bearer')));
    if (this.newEmail.nativeElement.value !== '' || this.newPassword.nativeElement.value !== '') {
      if (this.newEmail.nativeElement.value === '') {
        flag1 = true;
      }
      if (this.newPassword.nativeElement.value === '') {
        flag2 = true;
      }
      if (this.newEmail.nativeElement.value !== '' && this.validateEmail(this.newEmail.nativeElement.value)) {
        flag1 = true;
        currentUser.email = this.newEmail.nativeElement.value;
      }
      if (this.newPassword.nativeElement.value !== '' && +this.newPassword.nativeElement.value.length > 6) {
        flag2 = true;
        currentUser.password = this.hashString(this.newPassword.nativeElement.value);
      }
      if (flag1 && flag2) {
        const updateUser: UpdateUser = new UpdateUser(currentUser, token);
        this.userService.updateUser(updateUser)
          .subscribe((response: UpdateUser) => {
            if (this.newPassword.nativeElement.value !== '') {
              this.newPassword.nativeElement.value = '';
            }
            if (this.newEmail.nativeElement.value !== '') {
              this.newEmail.nativeElement.value = '';
            }
            window.localStorage.removeItem('user');
            window.localStorage.setItem('user', JSON.stringify(response));
            this.text = 'Изменения сохранены';
            this.showInfo = true;

          });
      } else {
        this.text = 'Проверьте данные';
        this.showInfo = true;
        if (this.newPassword.nativeElement.value !== '') {
          this.newPassword.nativeElement.value = '';
        }
        if (this.newEmail.nativeElement.value !== '') {
          this.newEmail.nativeElement.value = '';
        }
      }
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

  private validateEmail(mail: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
  }
}
