import { Component } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {

  constructor(private router: Router){}
  
  // 退出账号
  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
