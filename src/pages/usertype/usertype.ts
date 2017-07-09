import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Home} from "../home/home";
import {Login} from "../login/login";
import {Contactus} from "../contactus/contactus";
import {Aboutclick} from "../aboutclick/aboutclick";



@Component({
  selector: 'page-usertype',
  templateUrl: 'usertype.html',
})
export class Usertype {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Usertype');
  }
 gohome(){
   this.navCtrl.push(Home)
 }
 golog(){
   this.navCtrl.push(Login)
 }
 contact(){
   this.navCtrl.push(Contactus);
 }
 about(){
   this.navCtrl.push(Aboutclick);
 }
}
