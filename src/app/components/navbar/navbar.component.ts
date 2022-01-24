import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userName: string = localStorage.getItem('userName') || '';

  constructor(
    private userService: UserService
  ) { }

  logout(){
    this.userService.logout()
  }

}
