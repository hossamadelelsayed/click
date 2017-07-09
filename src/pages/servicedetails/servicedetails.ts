import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Choosingservices} from "../choosingservices/choosingservices";
import {SalonService} from "../../providers/salon-service";
import {CustomerService} from "../../providers/customer-service";
import {TranslateService} from "@ngx-translate/core";
import {CommonService} from "../../providers/common-service";

@Component({
  selector: 'page-servicedetails',
  templateUrl: 'servicedetails.html',
})
export class Servicedetails {
  public cat_id: any;
  public salon_id : any ;
  public service_code : number ;
  public salonHomeServices : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public salonService :SalonService, public customerService: CustomerService,
              public translateService:TranslateService,public commonService : CommonService) {
    this.cat_id = this.navParams.data.cat_id ;
    this.salon_id = this.navParams.data.salon_id;
    this.service_code = this.navParams.data.service_code;
  }

  ionViewWillEnter()
  {
    this.salonService.salonHomeServices(this.cat_id).subscribe((res)=>{
      this.salonHomeServices = res ;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Servicedetails');
  }
  customerOrder(service_id)
  {
    this.customerService.customerOrder(service_id).subscribe((res)=>{
      if(res.order_id)
      {
        this.translateService.get('Success').subscribe(
          value => {
            // value is our translated string
            this.commonService.presentToast(value);
          }
        );
      }
      else
      {
        this.commonService.presentToast(res.error);
      }
    });
  }
   gochose(){
        this.navCtrl.push(Choosingservices,{
          salon_id : this.salon_id ,
          service_code : this.service_code
        });
   }
}
