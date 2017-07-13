import {Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import {CommonService} from "../../providers/common-service";
import {TranslateService} from "@ngx-translate/core";
import {Geolocation} from "@ionic-native/geolocation";


declare var google;
/**
 * Generated class for the Location page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class Location {

  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public markers = [];
  public lat : number = 0 ;
  public lng : number = 0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private commonService : CommonService,
              private translateService : TranslateService,
              private viewCtrl : ViewController) {
    if(this.navParams.data.lat != 0)
    {
      this.lat = this.navParams.data.lat ;
      this.lng = this.navParams.data.lng ;
    }
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng ;
      if(this.lat == 0)
         latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      else
         latLng = new google.maps.LatLng(this.lat, this.lng);


      let mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      google.maps.event.addListener(this.map, 'click', (event) => {
        this.setMapOnAll(null);
        var location  = event.latLng;
        this.addMarker(location);
        this.sendCustomerLocation(location);
      });
      this.addMarker(this.map.getCenter());
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }
  sendCustomerLocation(location)
  {
    this.viewCtrl.dismiss(
      { lat : location.lat(),
        lng : location.lng()
      });
    this.translateService.get('Success').subscribe(
      value => {
        // value is our translated string
        this.commonService.presentToast(value);
      }
    );
  }
  addMarker(LatLng){
    let marker  = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: LatLng
    });
    let content = "<h4>Delivery Location!</h4>";
    //this.addInfoWindow(marker, content);
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    infoWindow.open(this.map,marker);
    this.markers.push(marker);
  }
  // Sets the map on all markers in the array.
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }


}
