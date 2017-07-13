import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ContactService} from "../../providers/contact-service";


@Component({
  selector: 'page-aboutclick',
  templateUrl: 'aboutclick.html',
})
export class Aboutclick {
  public about : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
            public contactService: ContactService) {
  }
  ionViewWillEnter()
  {
    this.contactService.about().subscribe((res)=>{
      this.about = res ;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Aboutclick');
  }

}
