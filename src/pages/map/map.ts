import {Component, ViewChild , ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SalonService} from "../../providers/salon-service";
import {Salondetails} from "../salondetails/salondetails";
declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class Map {
  @ViewChild('map') mapElement: ElementRef;
  public readonly salonsMapCode : number = 1 ;
  public readonly salonsHomeServiceMapCode : number = 2 ;
  public readonly designersMapCode : number = 3 ;
  public map: any;
  public salonsMap = [] ;
  public salonsHomeServiceMap = [] ;
  public designersMap = [];
  public Markers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public salonService: SalonService) {
  }
  ionViewWillEnter()
  {
    this.loadMap();
    this.salonService.salonsMap().subscribe((res)=>{
      this.salonsMap = res ;
      this.setMarkers(this.salonsMapCode);
      this.adjustBounds();
    });
    this.salonService.designersMap().subscribe((res)=>{
      this.designersMap = res ;
      this.setMarkers(this.designersMapCode);
      this.adjustBounds();
    });
    this.salonService.salonsHomeServiceMap().subscribe((res)=>{
      this.salonsHomeServiceMap = res ;
      this.setMarkers(this.salonsHomeServiceMapCode);
      this.adjustBounds();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Map');



  }
  loadMap()
  {
    let latLng = new google.maps.LatLng(25.286106, 51.534817 );

    let mapOptions = {
      center: latLng,
      zoom:10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  setMarkers(code)
  {
    let array = [] ;
    if(code == this.salonsMapCode)
      array = this.salonsMap ;
    else if(code == this.designersMapCode)
      array = this.designersMap ;
    else if(code == this.salonsHomeServiceMapCode)
      array = this.salonsHomeServiceMap ;
    for (let i = 0; i < array.length; i++){
      let LatLng = new google.maps.LatLng(parseFloat(array[i].latitude),parseFloat(array[i].longitude));
      this.addMarker(array[i].salon_id,LatLng,array[i].address,code);
    }

  }
  addMarker(salon_id,LatLng,address,code){
    let image : string ;
    if(code == this.salonsMapCode)
      image = 'assets/imgs/salon.png' ;
    else if(code == this.designersMapCode)
      image = 'assets/imgs/designer.png' ;
    else if(code == this.salonsHomeServiceMapCode)
      image = 'assets/imgs/salons-home-service.png' ;
    let marker  = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: LatLng ,
      icon : { url : image }
    });
    let self = this ;
     marker.addListener('click', function() {
          self.navCtrl.push(Salondetails,{salon_id:salon_id});
        });
    google.maps.event.addListener(marker,'click',function() {
      var infowindow = new google.maps.InfoWindow({
        content:address
      });
      infowindow.open(this.map,marker);
    });
    this.Markers.push(marker);
  }
  adjustBounds()
  {
    let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < this.Markers.length; i++) {
      bounds.extend(this.Markers[i].getPosition());
    }
    this.map.fitBounds(bounds);
  }

}
