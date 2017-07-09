import { Component } from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {Orderinfo} from "../orderinfo/orderinfo";
import {Copon} from "../copon/copon";
import {CustomerService} from "../../providers/customer-service";
import {SalonService} from "../../providers/salon-service";
import {CommonService} from "../../providers/common-service";
import {TranslateService} from "@ngx-translate/core";
import {Login} from "../login/login";
import {Location} from "../location/location";
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import {MainService} from "../../providers/main-service";
import {Terms} from "../terms/terms";


@Component({
  selector: 'page-choosingservices',
  templateUrl: 'choosingservices.html',
})
export class Choosingservices {
  public orderDetails : any
  public salon_id: any ;
  public salonDesigners : any ;
  public service_code : number ;
  // order information
  public date : string ;
  public time : string ;
  public latitude : number = 0;
  public longitude : number = 0;
  public payment : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public customerService : CustomerService  , public salonService: SalonService ,
              public commonService : CommonService , public translateService : TranslateService,
              public modalCtrl : ModalController , public payPal: PayPal) {
      this.salon_id = this.navParams.data.salon_id ;
      this.service_code = this.navParams.data.service_code ;
  }

  ionViewWillEnter()
  {
    this.salonService.salonDesigners(this.salon_id).subscribe((res)=>{
      this.salonDesigners = res ;
    });
    this.customerService.customerOrderD().subscribe((res)=>{
        this.orderDetails = res ;
        console.log(this.orderDetails);
      });
  }
  customerOrderDesignerUpdate(orders_id:number,designer_id:number)
  {
    this.customerService.customerOrderDesignerUpdate(orders_id,designer_id).subscribe((res)=>{
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
        this.commonService.presentToast(res.error) ;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Choosingservices');
  }

  checkout(){
       if(this.customerService.customer != null)
      {
        this.customerService.checkout(
          this.latitude.toString() ,
          this.longitude.toString() ,
          this.date  ,
          this.time  ,
          this.payment ).subscribe((res)=>{
          if(res.checkout_id)
            this.handle_success_checkout(res);
          else
            this.commonService.presentToast(res.error);
        });
      }
      else
      {
        this.navCtrl.push(Login);
      }
    }
   handle_success_checkout(res:any)
   {
     if(this.payment == 'paypal')
          this.payPalPayment(res.total);
     this.translateService.get('Success').subscribe(
       value => {
         // value is our translated string
         this.commonService.presentToast(value);
         this.navCtrl.push(Orderinfo,{
           order : res
         });
       }
     );
   }
   coponPage()
   {
     this.navCtrl.push(Copon);
   }
   locateMe()
   {
     let modal = this.modalCtrl.create(Location,{
       lat : this.latitude ,
       lng : this.longitude
     });
     modal.present();
     modal.onDidDismiss((data)=>{
       this.latitude = data.lat ;
       this.longitude = data.lng
     });
   }
  terms()
  {
    this.navCtrl.push(Terms);
  }
   payPalPayment(amount : string)
   {
     this.payPal.init({
       PayPalEnvironmentProduction: MainService.payPalEnvironmentProduction ,//'YOUR_PRODUCTION_CLIENT_ID'
       PayPalEnvironmentSandbox: MainService.payPalEnvironmentSandbox//'YOUR_SANDBOX_CLIENT_ID'
     }).then(() => {
       // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
       this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
         // Only needed if you get an "Internal Service Error" after PayPal login!
         //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
       })).then(() => {
         let payment = new PayPalPayment(amount, 'USD', 'Description', 'sale');
         this.payPal.renderSinglePaymentUI(payment).then((res) => {
           // Successfully paid
           console.log(res);
           this.commonService.presentToast('Done');
           this.customerService.recharge(0.01).subscribe(()=>{
             this.commonService.presentToast('Done Recharge');
           });

         }, (res) => {
           // Error or render dialog closed without being successful
           console.log(res);
           this.commonService.presentToast('Error or render dialog closed without being successful');
         });
       }, (res) => {
         // Error in configuration
         console.log(res);
         this.commonService.presentToast('Error in configuration');
       });
     }, (res) => {
       // Error in initialization, maybe PayPal isn't supported or something else
       console.log(res);
       this.commonService.presentToast('Error in initialization, maybe PayPal isnt supported or something else');
     });
   }
}
