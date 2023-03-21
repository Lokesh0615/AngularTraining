import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http'
import { tap } from 'rxjs';

export class AuthInterceptorSrvice implements HttpInterceptor{
    intercept(req:HttpRequest<any>, next:HttpHandler){
        
        // console.log('request is on its way');
        console.log(req.url);
        
        const modfiedRequest=req.clone({headers: req.headers.append('auth',"xyz")})
        return next.handle(modfiedRequest)
    }
} 