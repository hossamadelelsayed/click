import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Servicedetails} from "../servicedetails/servicedetails";
import {SalonService} from "../../providers/salon-service";
import {DomSanitizer} from "@angular/platform-browser";
import {Map} from "../map/map";
import {CustomerService} from "../../providers/customer-service";
import {TranslateService} from "@ngx-translate/core";
import {SalonmapPage} from "../salonmap/salonmap";
import {CommonService} from "../../providers/common-service";

@Component({
  selector: 'page-salondetails',
  templateUrl: 'salondetails.html',
})
export class Salondetails {

  public salon_id : any ;
  public salonServices : any ;
  public salonDetails : any ;
  public salonDesigners  : any ;
  public salonHomeServicesCat : any ;
  public salonComments : any ;
  public addCom : string ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public salonService : SalonService ,private sanitizer: DomSanitizer ,
              public customerService : CustomerService , public translateService : TranslateService ,
              public commonService: CommonService) {
    this.salon_id = this.navParams.data.salon_id ;
  }
  ionViewWillEnter()
  {
    this.salonService.salonComments(this.salon_id).subscribe((res)=>{
      this.salonComments = res ;
    });
    this.salonService.salonServices(this.salon_id).subscribe((res)=>{
      this.salonServices = res ;
    });
    this.salonService.salonDetails(this.salon_id).subscribe((res)=>{
      this.salonDetails = res ;
    });
    this.salonService.salonDesigners(this.salon_id).subscribe((res)=>{
      this.salonDesigners = res ;
    });
    this.salonService.salonHomeServicesCat(this.salon_id).subscribe((res)=>{
      this.salonHomeServicesCat = res ;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Salondetails');
  }
  servicedetail(cat_id,service_code){
    this.navCtrl.push(Servicedetails,{
      cat_id:cat_id ,
      salon_id:this.salon_id ,
      service_code : service_code
    });
  }
  getBackground (image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }
  showMap()
  {
    this.navCtrl.push(SalonmapPage,{salon_id:this.salon_id});
  }
  addFavorit()
  {
    this.customerService.addFavorite(this.salon_id).subscribe((res)=>{
      if(res.favorite_id)
      {
        this.commonService.successToast();
      }
      else
      {
        this.commonService.translateAndToast('You Aleady Added To Your Favorite');
      }
    });
  }
  addComment()
  {
    let comment = this.addCom ;
    this.addCom = null;
    this.customerService.addComment(this.salon_id,comment).subscribe((res)=>{
      if(res.comment_id)
        this.commonService.successToast();
      else
        this.commonService.errorToast();
    });
  }

}
