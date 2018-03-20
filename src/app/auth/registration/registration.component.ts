import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  private emailControl: FormControl;
  private isAllow = true;

  constructor(private userService: UsersService,
              private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    this.userService.getUserByEmail((<FormControl> this.form.get('email')).value)
      .subscribe((responseObject: User) => {
        if (responseObject === undefined) {
          const {email, password, name} = this.form.value;
          const user = new User( name, email, null, this.hashString(password));

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

}
