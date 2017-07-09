import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";
import {Home} from "../home/home";


@Component({
  selector: 'page-orderinfo',
  templateUrl: 'orderinfo.html',
})
export class Orderinfo {
  public order : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams ) {
     this.order = this.navParams.data.order ;
     console.log(this.order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Orderinfo');
  }
  goHome()
  {
    this.navCtrl.push(Home);
  }
}
