import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CustomerService} from "../../providers/customer-service";



@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class Appointment {
  public history = [] ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService :  CustomerService) {
  }

  ionViewWillEnter()
  {
    this.customerService.getHistory().subscribe((res)=>{
      this.history = res ;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Appointment');
  }

}
