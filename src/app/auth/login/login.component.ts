import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {Message} from '../../shared/models/message.models';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../shared/models/user.model';
import {Subscription} from 'rxjs/Subscription';
import {TokenService} from '../../shared/services/token.service';
import {Token} from '../../shared/models/token.model';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

  form: FormGroup;

  message: Message;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.sub1 = this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'Teперь вы можете зайти в систему',
            type: 'success'
          });
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.sub2 = this.usersService.getUserByEmailAndPassword(formData.email, this.hashString(formData.password))
      .subscribe((user: User) => {
        if (user) {
          if (user.password === this.hashString(formData.password) && user.email === formData.email) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.tokenService.getToken(user).subscribe((response: Token) => {
              if (response.accessToken === 'Not Identification User') {
                this.router.navigate(['', 'registration']);
              } else {
                window.localStorage.setItem('Bearer', JSON.stringify(response.accessToken));
                this.authService.login();
                console.log(user.role);
                if (user.role === 'user') {
                  console.log('navigate-to-user');
                  this.router.navigate(['/system-user', 'find-hotel']);
                } else {
                  this.router.navigate(['/system', 'add-hotel']);
                }
              }
            });
          } else {
            this.showMessage({text: 'Проверьте введенный логин и пароль', type: 'danger'});
          }
        } else {
          this.showMessage({text: 'Такого пользователя не существует', type: 'danger'});
        }
      });
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash;
    }
    return hash.toString();
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
