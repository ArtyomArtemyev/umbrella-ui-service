import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {observable} from 'rxjs/symbol/observable';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  private emailControl: FormControl;
  private response: boolean;

  constructor(private userService: UsersService,
              private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      /*Описываем контролы*/
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    console.log(this.checkForbiddenEmails(<FormControl> this.form.get('email')));
    if (this.checkForbiddenEmails(<FormControl> this.form.get('email'))) {
      const {email, password, name} = this.form.value;
      const user = new User(email, password, name);

      this.userService.createNewUser(user)
        .subscribe((user: User) => {
          this.router.navigate(['/login'], {
            queryParams: {
              nowCanLogin: true
            }
          });
        });
    } else {
      this.emailControl = <FormControl> this.form.get('email');
      this.emailControl.setErrors({'forbiddenEmail': true});
    }
  }

  checkForbiddenEmails(control: FormControl) {
   return this.userService.checkUserByEmail(control.value)
     .subscribe((observable: boolean) => {});
  }

}
