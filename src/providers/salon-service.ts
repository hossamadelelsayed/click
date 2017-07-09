import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MainService} from "./main-service";

/*
  Generated class for the SalonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SalonService {
  public  readonly ServiceCode : number = 1;
  public  readonly HomeServiceCode : number = 2;

  public offersArUrl : string = MainService.baseUrl+"api/ar/offers";
  public offersEnUrl : string = MainService.baseUrl+"api/en/offers";

  public offersFeatureArUrl : string = MainService.baseUrl+"api/ar/offers/feature";
  public offersFeatureEnUrl : string = MainService.baseUrl+"api/en/offers/feature";

  public salonsArUrl : string = MainService.baseUrl+"api/ar/salons";
  public salonsEnUrl : string = MainService.baseUrl+"api/en/salons";

  public designersArUrl : string = MainService.baseUrl+"api/ar/designers";
  public designersEnUrl : string = MainService.baseUrl+"api/en/designers";

  public servicesArUrl : string = MainService.baseUrl+"api/ar/services";
  public servicesEnUrl : string = MainService.baseUrl+"api/en/services";

  public homeServicesArUrl : string = MainService.baseUrl+"api/ar/home/services";
  public homeServicesEnUrl : string = MainService.baseUrl+"api/ar/home/services";

  public salonDetailsArUrl : string = MainService.baseUrl+"api/ar/single/salon/";
  public salonDetailsEnUrl : string = MainService.baseUrl+"api/en/single/salon/";

  public salonServicesArUrl : string = MainService.baseUrl+"api/ar/services/salon/";
  public salonServicesEnUrl : string = MainService.baseUrl+"api/en/services/salon/";

  public salonHomeServicesCatArUrl : string = MainService.baseUrl+"/api/ar/home/services/salon/";
  public salonHomeServicesCatEnUrl : string = MainService.baseUrl+"/api/en/home/services/salon/";

  public salonHomeServicesArUrl : string = MainService.baseUrl+"/api/ar/sub/services/";
  public salonHomeServicesEnUrl : string = MainService.baseUrl+"/api/en/sub/services/";

  public salonDesignersArUrl : string = MainService.baseUrl+"api/ar/designers/salon/";
  public salonDesignersEnUrl : string = MainService.baseUrl+"api/en/designers/salon/";

  public salonsMapArUrl : string = MainService.baseUrl+"api/ar/salons/map"; //has no home service
  public salonsMapEnUrl : string = MainService.baseUrl+"api/en/salons/map"; //has no home service

  public salonsHomeServiceMapArUrl : string = MainService.baseUrl+"/api/ar/salons/home/map";
  public salonsHomeServiceMapEnUrl : string = MainService.baseUrl+"/api/en/salons/home/map";

  public designersMapArUrl : string = MainService.baseUrl+"/api/ar/designers/map";
  public designersMapEnUrl : string = MainService.baseUrl+"/api/en/designers/map";

  public SortSalonByHSArUrl : string = MainService.baseUrl+"/api/ar/salons/home";
  public SortSalonByHSEnUrl : string = MainService.baseUrl+"/api/en/salons/home";

  public SortSalonByRateArUrl : string = MainService.baseUrl+"/api/ar/salons/rate";
  public SortSalonByRateEnUrl : string = MainService.baseUrl+"/api/en/salons/rate";

  public SalonCommentsArUrl : string = MainService.baseUrl+"/api/ar/comments/salone/";
  public SalonCommentsEnUrl : string = MainService.baseUrl+"/api/en/comments/salone/";

  constructor(public http: Http) {
    console.log('Hello SalonService Provider');
  }
  salonComments(salon_id : number)
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.SalonCommentsArUrl + salon_id).map((res) => res.json());
    else return this.http.get(this.SalonCommentsEnUrl + salon_id).map((res) => res.json());
  }
  SortSalonByHS()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.SortSalonByHSArUrl).map((res) => res.json());
    else return this.http.get(this.SortSalonByHSEnUrl).map((res) => res.json());
  }
  SortSalonByRate()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.SortSalonByRateArUrl).map((res) => res.json());
    else return this.http.get(this.SortSalonByRateEnUrl).map((res) => res.json());
  }
  offers()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.offersArUrl).map((res) => res.json());
    else return this.http.get(this.offersEnUrl).map((res) => res.json());
  }
  offersFeature()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.offersFeatureArUrl).map((res) => res.json());
    else return this.http.get(this.offersFeatureEnUrl).map((res) => res.json());
  }
  salons()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.salonsArUrl).map((res) => res.json());
    else return this.http.get(this.salonsEnUrl).map((res) => res.json());
  }
  designers()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.designersArUrl).map((res) => res.json());
    else return this.http.get(this.designersEnUrl).map((res) => res.json());
  }
  services()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.servicesArUrl).map((res) => res.json());
    else return this.http.get(this.servicesEnUrl).map((res) => res.json());
  }
  homeService()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.homeServicesArUrl).map((res) => res.json());
    else return this.http.get(this.homeServicesEnUrl).map((res) => res.json());
  }
  salonsMap()//has no home service
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.salonsMapArUrl).map((res) => res.json());
    else return this.http.get(this.salonsMapEnUrl).map((res) => res.json());
  }
  salonsHomeServiceMap()
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.salonsHomeServiceMapArUrl).map((res) => res.json());
    else return this.http.get(this.salonsHomeServiceMapEnUrl).map((res) => res.json());
  }
  designersMap()// individuals
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.designersMapArUrl).map((res) => res.json());
    else return this.http.get(this.designersMapEnUrl).map((res) => res.json());
  }
  salonDetails(salon_id)
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.salonDetailsArUrl+salon_id).map((res) => res.json());
    else return this.http.get(this.salonDetailsEnUrl+salon_id).map((res) => res.json());
  }
  salonServices(salon_id)
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.salonServicesArUrl+salon_id).map((res) => res.json());
    else return this.http.get(this.salonServicesEnUrl+salon_id).map((res) => res.json());
  }
  salonHomeServicesCat(salon_id)
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.salonHomeServicesCatArUrl+salon_id).map((res) => res.json());
    else return this.http.get(this.salonHomeServicesCatEnUrl+salon_id).map((res) => res.json());
  }
  salonHomeServices(cat_id)
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.salonHomeServicesArUrl+cat_id).map((res) => res.json());
    else return this.http.get(this.salonHomeServicesEnUrl+cat_id).map((res) => res.json());
  }
  salonDesigners(salon_id)
  {
    if(MainService.lang == 'ar')
      return this.http.get(this.salonDesignersArUrl+salon_id).map((res) => res.json());
    else return this.http.get(this.salonDesignersEnUrl+salon_id).map((res) => res.json());
  }
}
