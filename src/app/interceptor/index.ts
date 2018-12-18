import { HTTP_INTERCEPTORS } from "../../../node_modules/@angular/common/http";
import { AuthInterceptor } from "./auth-interceptor";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]