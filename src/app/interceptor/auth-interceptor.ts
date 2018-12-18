import { HttpRequest, HttpInterceptor, HttpHandler } from "../../../node_modules/@angular/common/http";
import { AuthServiceService } from "../service/auth-service.service";
import { Injectable } from "../../../node_modules/@angular/core";
import { of } from "../../../node_modules/rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private auth: AuthServiceService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getToken();
    if (!authToken) return next.handle(req)
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}