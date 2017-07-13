import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'page-copon',
  templateUrl: 'copon.html',
})
export class Copon {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService: CustomerService , public commonService: CommonService ,
              public translateService : TranslateService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Copon');
  }
  applyCoupon(code)
  {
    this.customerService.applyCoupon(code).subscribe((res)=>{
      if(res)
      {
        console.log(res);
        this.navCtrl.pop();
      }
      else
      {
        this.translateService.get('Coupon Review Pls').subscribe(
          value => {
            // value is our translated string
            this.commonService.presentToast(value);

          }
        );
      }
    });
  }

}
