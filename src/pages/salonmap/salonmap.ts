import { Component, ViewChild ,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SalonService} from "../../providers/salon-service";
declare var google: any;

@Component({
  selector: 'page-salonmap',
  templateUrl: 'salonmap.html',
})
export class SalonmapPage {
  @ViewChild('map') mapElement: ElementRef; 
  public lat : any;
  public lng : any;
  public salonid : any ;
  public salonsMap :any ;
  public map: any;

  constructor(public salonService : SalonService ,public navCtrl: NavController, public navParams: NavParams) {
    this.salonid = this.navParams.data.salon_id;
    this.executeMap();
    console.log(this.salonid);

    
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalonmapPage');
  }
 

  loadMap(lng,lat)
  {
    let latLng = new google.maps.LatLng(lng,lat);

    let mapOptions = {
      center: latLng,
      zoom:12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     this.addMarker(latLng);
  }


  executeMap(){
    this.salonService.salonDetails(this.salonid).subscribe((res)=>{
      this.salonsMap = res ;
      this.loadMap(this.salonsMap.latitude,this.salonsMap.longitude);
      console.log(this.salonsMap.latitude);
      console.log(this.salonsMap.longitude);
    });
  }

    addMarker(LatLng){
    let marker  = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: LatLng ,
    });
  }

  
}
