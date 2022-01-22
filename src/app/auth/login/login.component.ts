import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading: boolean = false;

  public loginForm = this.fb.group({
    email: ['mbastiasm@bancoripley.com', [ Validators.required, Validators.email ]],
    password: ['bm123123', [ Validators.required ]]
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  login() {

    if(!this.loginForm.valid){
      return;
    }

    this.isLoading = true;

    this.userService.login( this.loginForm.value )
        .subscribe({
          next: (resp) => {
            this.router.navigateByUrl('/home/accounts');
          },
          error: (err) => {
            this.openSnackBar(err.error.msg, 'Aceptar' );
          }
        });

    this.isLoading = false;
  }

  openSnackBar(message: string, textBtn: string){
    this.snackBar.open(message, textBtn);
  }

}
