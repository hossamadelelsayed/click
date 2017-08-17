import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Salondetails} from "../salondetails/salondetails";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";


@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class Favorites {
  public favorites : any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public customerService : CustomerService , public commonService : CommonService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Favorites');
  }
  ionViewWillEnter()
  {
    this.getFavorites();
  }
  getFavorites()
  {
    this.customerService.getFavorites().subscribe((res)=>{
      this.favorites = res ;
    });
  }
  details(salon_id : number){
    this.navCtrl.push(Salondetails,{
      salon_id : salon_id
    });
  }
  icons(rate : number)
  {
    return this.commonService.icons(rate);
  }
  customerRate(salon_id : number , rate : number)
  {
    if(this.customerService.customer != null)
    {
      this.customerService.customerRate(salon_id,rate).subscribe((res)=>{
        if(res.rating_id)
          this.commonService.successToast();
        else
          this.commonService.translateAndToast(res.error);
      });
    }
    else
    {
      this.commonService.translateAndToast("You Have To Login First");
    }

  }
  delFavorite(favorite_id : number)
  {
    this.customerService.delFavorite(favorite_id).subscribe((res)=>{
      if(res.favorite_id != null)
      {
        this.commonService.successToast();
        this.favorites = this.favorites.filter((fav) => {
          return (fav.favourite_id != favorite_id);
        });
      }
      else this.commonService.errorToast();
    });
  }
}
