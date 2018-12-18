import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../service/user-info.service';
import { User } from '../../class/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserInfoService) { }
  currentUser: User
  ngOnInit() {
    this.getUserProfile()
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      data => {
        this.currentUser = {...data}
      },
      err => {
        console.log(err);
      } 
    )
  }
}
