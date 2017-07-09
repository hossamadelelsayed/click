import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ContactService} from "../../providers/contact-service";
import {CommonService} from "../../providers/common-service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class Contactus {
  public contact : any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public contactService: ContactService , public commonService: CommonService ,
              public translateService : TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contactus');
  }
  contactus()
  {
    this.contactService.contactus(this.contact.name,this.contact.email,
                                  this.contact.subject , this.contact.message).subscribe((res)=>{
        if(res.error)
        {
          this.commonService.presentToast(res.error);
        }
        else{
          this.translateService.get('Success').subscribe(
            value => {
              // value is our translated string
              this.commonService.presentToast(value);
              this.navCtrl.pop();
            }
          );
        }
    });
  }
}
