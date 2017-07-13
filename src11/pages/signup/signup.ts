import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {TranslateService} from "@ngx-translate/core";
import {Activation} from "../activation/activation";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  public customer ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService : CustomerService,public commonService : CommonService,
              public translateService : TranslateService) {
    this.customer = {'':''};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }
  register()
  {
    this.customerService.customerRegister(
      this.customer.username,this.customer.email,this.customer.mobile,
      this.customer.password,this.customer.confirm_password,this.customer.address
    ).subscribe((data)=>{
      if(data.error)
      {
        this.commonService.presentToast(data.error);
      }
      else
      {
        this.successlogin(data);
      }
    });
  }
  successlogin(customer)
  {
    this.customerService.customer = customer; // temparay has to be deleted
    this.customerService.customerStorageSave(customer);
    this.navCtrl.push(Activation,{member_id:customer.member_id});
    this.translateService.get('Success').subscribe(
      value => {
        // value is our translated string
        this.commonService.presentToast(value);

      }
    );
  }
}
