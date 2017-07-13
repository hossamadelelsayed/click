import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MainService} from "./main-service";

/*
  Generated class for the ContactService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactService {

  public aboutArUrl : string = MainService.baseUrl+"api/ar/about";
  public aboutEnUrl : string = MainService.baseUrl+"api/en/about";

  public termsArUrl : string = MainService.baseUrl+"api/ar/terms";
  public termsEnUrl : string = MainService.baseUrl+"api/en/terms";

  public paypalUrl : string = MainService.baseUrl+"api/paypal";

  public contactusUrl : string = MainService.baseUrl+"api/contactus";
  constructor(public http: Http) {
    console.log('Hello ContactService Provider');
  }
  about()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.aboutArUrl).map((res) => res.json());
    else return this.http.get(this.aboutEnUrl).map((res) => res.json());
  }
  terms()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.termsArUrl).map((res) => res.json());
    else return this.http.get(this.termsEnUrl).map((res) => res.json());
  }
  paypal()
  {
    return this.http.get(this.paypalUrl).map((res) => res.json());
  }
  contactus(name : string,email: string,subject : string, message : string)
  {
    let body = {
      name : name ,
      email : email ,
      subject : subject ,
      message : message
    };
    return this.http.post(this.contactusUrl,body).map((res) => res.json());
  }


}
