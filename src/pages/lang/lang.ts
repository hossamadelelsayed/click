import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Home} from "../home/home";
import {MainService} from "../../providers/main-service";
import {Choosingservices} from "../choosingservices/choosingservices";
import {Usertype} from "../usertype/usertype";






@Component({
  selector: 'page-lang',
  templateUrl: 'lang.html',
})
export class Lang {

  constructor(
    public platform : Platform ,
    public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Lang');
  }
  changeLang(type){
    this.navCtrl.push(Home);
    this.translate.setDefaultLang(type);
    MainService.lang = type;
    if(MainService.lang == 'en')
      this.platform.setDir('ltr', true);
    else
      this.platform.setDir('rtl', true);
    //this.navCtrl.push(Usertype);

  }

}
