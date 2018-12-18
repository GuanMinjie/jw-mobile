import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpEvent, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import apiConfig from '../config/api-config';
import { SecurityCode } from '../interface/security-code';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { catchError, retry } from '../../../node_modules/rxjs/operators';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) { }

  /**
   * 邮箱唯一性验证
   * @param email 邮箱
   */
  validateEmailUnqi(email: string){
    let options = {params: new HttpParams().set("email", email)};
    return this.http.get(apiConfig.checkEmail, options).pipe(
      retry(3),  //连接失败重试 3次
      catchError(this.handleError)
    )
  }

  /**
   * 给用户邮箱发送验证码
   * @param email 邮箱
   */
  getSecurityCode(email: string){
    return this.http.post(apiConfig.securityCode, {"email": email},)
  }

  /**
   * 注册账号
   * @param email 邮箱地址
   * @param password 密码
   * @param passwordCofimation 重复密码
   * @param securityCode 验证码
   */
  register(email: string, password: string, passwordConfirmation: string, securityCode: string){
    const body = {
      user: 
      {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
        security_code: securityCode
      }
    }
    return this.http.post(apiConfig.register, body, {responseType: "json", observe: "response"})
  }

  /**
   * 登录
   * @param email 邮箱
   * @param password 密码
   */
  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }
    return this.http.post(apiConfig.login, body, {observe: "response"})
  }

  /**
   * 修改密码
   * @param email 邮箱
   * @param password 密码
   * @param securityCode 验证码
   */
  modifyPassword(email:string, password:string,securityCode:string ) {
    const body ={ 
      user: 
      {
        email: email,
        password: password,
        password_confirmation: password,
        security_code: securityCode
      }
    }
    return this.http.patch(apiConfig.modifyPassword, body)
  }

  // 获取用户详细信息
  getUserProfile(){
    return this.http.get<User>(apiConfig.userProfile)
  }

  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurrederror occurred:', error.error.message);
    }else {
      switch (error.status) {
        case 404:
          alert("账号不存在");
          break;        
        case 401:
          alert("密码错误");
          break;
      }
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
