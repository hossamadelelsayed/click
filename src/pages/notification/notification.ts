import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class Notification {
  public notifications = [];
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService , public commonService: CommonService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notification');
  }
  ionViewWillEnter()
  {
    this.customerService.getNotifications().subscribe((res)=>{
      if(res.error)
      {
        this.commonService.translateAndToast('There Is No Data');
      }
      else
      {
        this.notifications = res ;
        console.log(this.notifications);
      }
    });
  }


}
