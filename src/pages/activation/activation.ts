import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {TranslateService} from "@ngx-translate/core";
import {CommonService} from "../../providers/common-service";
import {Home} from "../home/home";


@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})
export class Activation {
  public customer ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService:CustomerService,public commonService:CommonService,
              public translateService: TranslateService) {
    this.customer = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Activation');
  }
  confirm()
  {
    this.customerService.customerConfirm(this.customer.member_id,this.customer.code).subscribe((data)=>{
      if(data.error)
      {
        this.commonService.presentToast(data.error);
      }
      else
      {
        this.successConfirm(data);
      }
    });
  }
  successConfirm(customer)
  {
    this.navCtrl.push(Home);
    this.customerService.customer = customer; // temparay has to be deleted
    this.customerService.customerStorageSave(customer);
    this.translateService.get('Success').subscribe(
      value => {
        // value is our translated string
        this.commonService.presentToast(value);
      }
    );
  }
  reSendCode()
  {
    this.customerService.customerResendCode(this.customer.member_id).subscribe((data)=>{
      if(data.error)
      {
        this.commonService.presentToast(data.error);
      }
      else
      {
        this.translateService.get('Success').subscribe(
          value => {
            // value is our translated string
            this.commonService.presentToast(value);
          }
        );
      }
    });
  }

}
