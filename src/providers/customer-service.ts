import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MainService} from "./main-service";
import {NativeStorage} from "@ionic-native/native-storage";
import {CommonService} from "./common-service";
import {TranslateService} from "@ngx-translate/core";

/*
  Generated class for the CustomerService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CustomerService {
  public customer = null;
  public deviceToken = "xyz";
  public customerRegisterUrl : string = MainService.baseUrl+"api/register/client";
  public customerLoginUrl : string = MainService.baseUrl+"api/login/client";
  public customerConfirmUrl : string = MainService.baseUrl+"api/confirm";
  public customerForgotPasswordUrl : string = MainService.baseUrl+"api/forgot/password";
  public customerResendCodeUrl : string = MainService.baseUrl+"api/resend/code";
  public customerLogoutUrl : string = MainService.baseUrl+"api/logout";
  public customerUpdateUrl : string = MainService.baseUrl+"api/update/info";
  public customerOrderUrl : string = MainService.baseUrl+"api/service/order";
  public customerOrderDUrl : string = MainService.baseUrl+"api/order/details";
  public customerOrderDesignerUpdateUrl : string = MainService.baseUrl+"api/update/order/designer";
  public applyCouponUrl : string = MainService.baseUrl+"api/apply/coupon";
  public checkoutUrl : string = MainService.baseUrl+"api/checkout";
  public rechargeUrl : string = MainService.baseUrl+"api/recharge";
  public addFavoriteUrl : string = MainService.baseUrl+"api/add/favorite";
  public favoriteUrl : string = MainService.baseUrl+"api/favorite";
  public notificationsUrl : string = MainService.baseUrl+"api/notifications";
  public historyUrl : string = MainService.baseUrl+"api/history";
  public readNotificationsUrl : string = MainService.baseUrl+"api/read/notifications";
  public customerRateUrl : string = MainService.baseUrl+"api/rating";
  public addCommentUrl : string = MainService.baseUrl+"api/add/comment";

  constructor(public http: Http,public nativeStorage : NativeStorage,
              public commonService:CommonService ,public translateService : TranslateService) {
    console.log('Hello CustomerService Provider');
  }
  addComment(salon_id : number ,comment : string)
  {
    let body = {
      member_id : this.customer.member_id ,
      salon_id : salon_id ,
      comment : comment
    };
    return this.http.post(this.addCommentUrl,body).map((res) => res.json());
  }
  customerRate(salon_id : number ,rate : number)
  {
    let customer = {
      member_id : this.customer.member_id ,
      salon_id : salon_id ,
      rate : rate
    };
    return this.http.post(this.customerRateUrl,customer).map((res) => res.json());
  }
  customerUpdate(username,email,mobile,password,confirm_password,address)
  {
    let customer = {
      member_id : this.customer.member_id ,
      username : username ,
      email : email ,
      mobile : mobile ,
      password : password ,
      confirm_password : confirm_password ,
      address : address ,
      gcm_regid:  this.deviceToken
    };
    return this.http.post(this.customerUpdateUrl,customer).map((res) => res.json());
  }
  readNotifications(notification_id : number)
  {
    let body = {
      notification_id : notification_id
    };
    return this.http.post(this.readNotificationsUrl,body).map((res) => res.json());
  }
  getHistory()
  {
    let body = {
      member_id : this.customer.member_id
    };
    return this.http.post(this.historyUrl,body).map((res) => res.json());
  }
  getNotifications()
  {
    let body = {
      member_id : this.customer.member_id
    };
    return this.http.post(this.notificationsUrl,body).map((res) => res.json());
  }
  addFavorite(salon_id : number)
  {
    let body = {
      member_id : this.customer.member_id ,
      salon_id : salon_id
    };
    return this.http.post(this.addFavoriteUrl,body).map((res) => res.json());
  }
  getFavorites()
  {
    let body = {
      member_id : this.customer.member_id
    };
    return this.http.post(this.favoriteUrl,body).map((res) => res.json());
  }
  recharge(amount : number)
  {
    let body = {
      member_id : this.customer.member_id ,
      amount : amount
    };
    return this.http.post(this.rechargeUrl,body).map((res) => res.json());
  }
  checkout(latitude : string ,
           longitude : string ,
           date : string ,
           time : string ,
           payment : string)
  {
    let body = {
      member_id : this.customer.member_id ,
      address : this.deviceToken ,
      latitude : latitude ,
      longitude : longitude ,
      date : date ,
      time : time ,
      payment : payment
    };
    return this.http.post(this.checkoutUrl,body).map((res) => res.json());
  }
  applyCoupon(code : number)
  {
    let body = {
      code : code ,
      member_id : this.customer.member_id
    };
    return this.http.post(this.applyCouponUrl,body).map((res) => res.json());
  }
  customerOrderDesignerUpdate(orders_id : number,designer_id : number)
  {
    let body = {
      orders_id : orders_id ,
      designer_id : designer_id
    };
    return this.http.post(this.customerOrderDesignerUpdateUrl,body).map((res) => res.json());
  }
  customerOrderD()
  {
    let order ;
    if(this.customer != null)
    {
      order = {
        member_id : this.customer.member_id
      };
    }
    else
    {
      order = {
        gcm_regid : this.deviceToken
      };
    }
    return this.http.post(this.customerOrderDUrl,order).map((res) => res.json());
  }
  customerOrder(service_id: number)
  {
    let order ;
    if(this.customer != null)
    {
      order = {
          sub_service_id : service_id  ,
          member_id : this.customer.member_id
      };
    }
    else
    {
        order = {
          sub_service_id : service_id  ,
          gcm_regid : this.deviceToken
        };
    }
    return this.http.post(this.customerOrderUrl,order).map((res) => res.json());
  }
  customerRegister(username,email,mobile,password,confirm_password,address)
  {
      let customer = {
        username : username ,
        email : email ,
        mobile : mobile ,
        password : password ,
        confirm_password : confirm_password ,
        address : address ,
        gcm_regid:  this.deviceToken
      };
      return this.http.post(this.customerRegisterUrl,customer).map((res) => res.json());
  }
  customerLogin(mobile,password)
  {
    let customer = {
      mobile : mobile ,
      password : password ,
      gcm_regid:  this.deviceToken
    };
    return this.http.post(this.customerLoginUrl,customer).map((res) => res.json());
  }
  customerLogout(member_id)
  {
    let customer = {
      member_id : member_id
    };
    return this.http.post(this.customerLogoutUrl,customer).map((res) => res.json());
  }
  customerConfirm(member_id,code)
  {
    let customer = {
      member_id : member_id ,
      code : code
    };
    return this.http.post(this.customerConfirmUrl,customer).map((res) => res.json());
  }
  customerResendCode(member_id)
  {
    let customer = {
      member_id : member_id
    };
    return this.http.post(this.customerResendCodeUrl,customer).map((res) => res.json());
  }
  customerForgotPassword(email)
  {
    let customer = {
      email : email
    };
    return this.http.post(this.customerForgotPasswordUrl,customer).map((res) => res.json());
  }
  customerStorageSave(customer:any){
    this.nativeStorage.setItem('customer', customer)
      .then(
        () => {
          this.customer = customer;
          console.log('Customer Is Stored!');
        },
        error => console.error('Error storing item', error)
      );
  }
  customerStorageErase(){
    this.customerLogout(this.customer.member_id).subscribe(()=>{
        this.translateService.get('Success').subscribe(
          value => {
            // value is our translated string
            this.commonService.presentToast(value);
            this.customer = null;
          }
        );
      });
    this.nativeStorage.remove('customer')
      .then(
        () => {
          this.customer = null;
          console.log('Customer Is Erased!');
        },
        error => console.error(error)
      );
  }
  customerStorageGet(){
    this.nativeStorage.getItem('customer')
      .then(
        (customer) => {
          this.customer = customer;
          console.log('Customer Is Geted!');
          //return customer
        },
        error => console.error(error)
      );
  }
}
