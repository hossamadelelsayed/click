import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Signup} from "../signup/signup";
import {Activation} from "../activation/activation";
import {Editaccount} from "../editaccount/editaccount";
import { AlertController } from 'ionic-angular';
import {Home} from "../home/home";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  public customer ;
  constructor(public navCtrl: NavController, public navParams: NavParams
              ,public alertCtrl: AlertController,public customerService: CustomerService
              ,public commonService : CommonService,public translateService:TranslateService) {
    this.customer= {'':''};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  login()
  {
      this.customerService.customerLogin('974'+this.customer.mobile,this.customer.password).subscribe((data)=>{
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
    this.translateService.get('Success').subscribe(
      value => {
        // value is our translated string
        this.commonService.presentToast(value);
      }
    );
    this.navCtrl.push(Home);
  }
  gosign(){
    this.navCtrl.push(Signup);
  }

   goactive(){
    this.navCtrl.push(Activation);
  }
  gotoedit(){
    this.navCtrl.push(Editaccount);
  }

 showPrompt() {
    let prompt = this.alertCtrl.create({
      message: " لاسترجاع كلمه المرور برجاء ادخال البريد الالكترونى",
      inputs: [
        {
          name: 'email',
          placeholder: 'البريد الاليكترونى'
        },
      ],
      buttons: [
        {
          text: 'موافق',
          handler: data => {
            this.customerForgotPassword(data.email);
          }
        }
      ]
    });
    prompt.present();
  }
  customerForgotPassword(email)
  {
    this.customerService.customerForgotPassword(email).subscribe((data)=>{
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
home(){
  this.navCtrl.push(Home);
}
}
