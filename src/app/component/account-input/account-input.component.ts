import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, AsyncValidatorFn, ValidationErrors } from '../../../../node_modules/@angular/forms';
import { Observable, of } from '../../../../node_modules/rxjs';
import { UserInfoService } from '../../service/user-info.service';
import { map } from "rxjs/operators"
import { Router } from '../../../../node_modules/@angular/router';
import { SecurityCode } from '../../interface/security-code';

@Component({
  selector: 'app-account-input',
  templateUrl: './account-input.component.html',
  styleUrls: ['./account-input.component.scss']
})
export class AccountInputComponent implements OnInit {

  @Input() actionName: string;
  @Input() isDisplayVerify: boolean;
  authCode: SecurityCode  //验证码
  token: string
  error: string

  form = this.fb.group({
    email: ["", [Validators.required,
    Validators.email],
      this.validateEmailUnqi()],
    password: ["", [Validators.required,
    Validators.minLength(6)]],
    securityCode: [""]
  })


  constructor(private fb: FormBuilder,
    private userServie: UserInfoService,
    private router: Router) {

  }

  ngOnInit() {

  }

  get email() { return this.form.get('email') }
  get password() { return this.form.get("password") }
  get passwordConfirmation() { return this.form.get("password") }
  get securityCode() { return this.form.get("securityCode") }

  // 提交
  onSubmit() {
    switch(this.actionName){    
      case "登录":
        this.login();
        break;
      case "注册":
        this.register();
        break;
      case "修改":
        this.modifyPassword();
        break;
    }
  }

  // 注册
  register() {
    if (!this.authCode) {
      alert("请先获取验证码");
      return
    }
    // 比对验证码是否一致
    if (this.securityCode.value !== this.authCode.securityCode){
      alert("验证码错误")
      return
    } 
    this.userServie.register(this.email.value, this.password.value, this.passwordConfirmation.value, this.securityCode.value)
      .subscribe(
        res => {
          console.log(res);
          this.setToken(res.body["auth_token"])
          this.router.navigate(["/home"])
        },
        err => {
          switch (err.status) {
            case 422:
              console.log(err);
              break;        
            default:
              break;
          }
        })
  }

  // 登录
  login() {
    this.userServie.login(this.email.value, this.password.value).subscribe(
      res => {
        this.setToken(res.body["token"]);
        this.router.navigate(["/home"]);
      },
      err => {
        switch (err.status) {
          case 404:
            alert("账号不存在");
            break;        
          case 401:
            alert("密码错误");
            break;
        }
      }
    )
  }

  // 修改密码
  modifyPassword() {
    if (this.securityCode.value !== this.authCode.securityCode) return
    this.userServie.modifyPassword(this.email.value, this.password.value, this.securityCode.value).subscribe(
      res => {
        alert("修改成功，重新登录")
        this.router.navigate([""]);
      },
      err => {
        alert(err.error.message);
      }
    )
  }

  // 设置authtoken 
  setToken(token: string) {
    localStorage.token = token;
  }

  // 获取验证码
  getSecurityCode() {
    if (!this.email.value) return;
    this.userServie.getSecurityCode(this.email.value)
      .subscribe(
        (data: any) => {
          alert("发送成功");
          let {security_code: securityCode}  = data
          this.authCode = { "securityCode": securityCode}
        },
        err => {
          console.log(err)
        }
      )
  }

  // 邮箱唯一性验证
  validateEmailUnqi(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      let res;
      // 如果是登录界面跳过验证
      switch(this.actionName){
        case  "登录":
          res = of(null)
          break;
        case "注册":
          res = this.userServie.validateEmailUnqi(control.value).pipe(
            map(data => (+data["check_code"] === 1) ? { "uniq": "邮箱已注册" } : null)
          )
          break;
        case "修改":
          res = this.userServie.validateEmailUnqi(control.value).pipe(
            map(data => (+data["check_code"] === 0) ? { "uniq": "邮箱未注册" } : null)
          )
          break;
      }
      return res;
    }
  }
}
