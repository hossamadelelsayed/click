import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {MainService} from "../../providers/main-service";
import {TranslateService} from "@ngx-translate/core";
import {CommonService} from "../../providers/common-service";


@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class Editaccount {

  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public platform : Platform , public customerService : CustomerService ,
              private translate: TranslateService , public commonService : CommonService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Editaccount');
  }
  customerUpdate(inputs : any)
  {
    console.log(inputs);
    this.customerService.customerUpdate(
      inputs.username,inputs.email,inputs.mobile,
      inputs.password,inputs.confirm_password,inputs.address
     ).subscribe((res)=>{
        console.log(res);
        if(res.member_id)
        {
          this.commonService.successToast();
          this.customerService.customer = res ;
          this.navCtrl.pop();
        }
        else
          this.commonService.errorToast();
    });
  }
  changeLang(type){
    this.translate.setDefaultLang(type);
    MainService.lang = type;
    if(type == 'en')
      this.platform.setDir('ltr', true);
    else
      this.platform.setDir('rtl', true);
  }
}
