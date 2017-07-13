import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ContactService} from "../../providers/contact-service";

/**
 * Generated class for the Terms page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class Terms {

  public terms : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public contactService: ContactService) {
  }
  ionViewWillEnter()
  {
    this.contactService.terms().subscribe((res)=>{
      this.terms = res ;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Aboutclick');
  }
}
