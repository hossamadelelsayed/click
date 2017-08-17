import { Component } from '@angular/core';
import {NavController, NavParams, MenuController, ActionSheetController, Platform} from 'ionic-angular';
import {Salondetails} from "../salondetails/salondetails";
import {SalonService} from "../../providers/salon-service";
import {Map} from "../map/map";
import {Appointment} from "../appointment/appointment";
import {Notification} from "../notification/notification";
import {CustomerService} from "../../providers/customer-service";
import {CommonService} from "../../providers/common-service";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {
  public salons : any ;
  public offers : any ;
  public offersFeature : any ;
  public designers : any;
  public sliders :any ;
  public services : any;
  public homeService : any ;
  public khadmat : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public salonService: SalonService , public menuCtrl: MenuController ,
              public customerService : CustomerService , public commonService : CommonService ,
              public actionSheetCtrl: ActionSheetController , public platform : Platform) {
               this.imageSlider();
  }

  ionViewWillEnter(){
    this.getSalons();
    this.salonService.homeService().subscribe((res)=>{
      this.homeService = res;
    });

    this.salonService.offers().subscribe((res)=>{
      this.offers = res;
    });
    this.salonService.offersFeature().subscribe((res)=>{
      this.offersFeature = res;
    });
    this.salonService.designers().subscribe((res)=>{
      this.designers = res;
    });
    this.salonService.services().subscribe((res)=>{
      this.services = res;
    });

  }
  ionViewDidLoad() {
  }
  getSalons()
  {
    this.salonService.salons().subscribe((res)=>{
      this.salons = res;
      console.log(res);
    });
  }
  salonDetails(salon_id){
    this.navCtrl.push(Salondetails,{salon_id:salon_id});
    console.log(this.salons);
  }
  toggleMenu()
  {
    this.menuCtrl.toggle();
  }
  showMap()
  {
    this.navCtrl.push(Map);
  }
  openSalon(salon_id : number)
  {
    this.navCtrl.push(Salondetails,{salon_id : salon_id});
  }
  showNotification()
  {
    if(this.customerService.customer != null)
      this.navCtrl.push(Notification);
    else{
      this.commonService.translateAndToast("You Have To Login First");
    }
  }
  showAppointment()
  {
    if(this.customerService.customer != null)
     this.navCtrl.push(Appointment);
    else{
      this.commonService.translateAndToast("You Have To Login First");
    }
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
  showSearch() {
    this.commonService.translateArray(
      ['Sort By',
       'Latest',
       'Highest Rated',
       'Deliver Home Service']).subscribe((translatedArray)=>{
      this.showActionSheet(translatedArray);
    });

  }
  showActionSheet(translatedArray : string[])
  {
    let actionSheet = this.actionSheetCtrl.create({
      title: translatedArray[0],
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: translatedArray[1],
          icon: 'funnel',
          handler: () => {
            console.log('Latest');
            this.getSalons();
          }
        },
        {
          text: translatedArray[2],
          icon: 'funnel',
          handler: () => {
            console.log('Highest Rated');
            this.SortSalonByRate();
          }
        },
        {
          text: translatedArray[3],
          icon: 'home',
          handler: () => {
            console.log('Deliver Home Service');
            this.SortSalonByHS();
          }
        }
      ]
    });
    actionSheet.present();
  }

  SortSalonByHS()
  {
    this.salonService.SortSalonByHS().subscribe((res)=>{
      this.salons = res ;
    });
  }
  SortSalonByRate()
  {
    this.salonService.SortSalonByRate().subscribe((res)=>{
      this.salons = res ;
    });
  }
  imageSlider(){
    this.salonService.sliderImage().subscribe((res)=>{
        this.sliders = res;
        console.log(this.sliders);
    });
  }
}
