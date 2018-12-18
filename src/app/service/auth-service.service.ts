import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  token: string
  constructor() { }

  getToken(): string {
    return  this.token = localStorage.token
  }

  awsAuth() {
    const AWSAccessKeyId = "AKIAP6AE6SRJSD7LSJIQ";
    const SecretAccessKey = "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"
    const Authorization = "AWS" + " " + AWSAccessKeyId + ":" + SecretAccessKey;
  }
}
