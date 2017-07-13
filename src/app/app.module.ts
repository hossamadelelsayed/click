import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {Aboutclick} from "../pages/aboutclick/aboutclick";
import {Activation} from "../pages/activation/activation";
import {Appointment} from "../pages/appointment/appointment";
import {Cashing} from "../pages/cashing/cashing";
import {Choosingservices} from "../pages/choosingservices/choosingservices";
import {Contactus} from "../pages/contactus/contactus";
import {Copon} from "../pages/copon/copon";
import {Editaccount} from "../pages/editaccount/editaccount";
import {Lang} from "../pages/lang/lang";
import {Login} from "../pages/login/login";
import {Map} from "../pages/map/map";
import {Notification} from "../pages/notification/notification";
import {Orderinfo} from "../pages/orderinfo/orderinfo";
import {Salondetails} from "../pages/salondetails/salondetails";
import {Servicedetails} from "../pages/servicedetails/servicedetails";
import {Signup} from "../pages/signup/signup";
import {Usertype} from "../pages/usertype/usertype";


import { MyApp } from './app.component';
import { Home} from '../pages/home/home';
import {Favorites} from "../pages/favorites/favorites";


import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Http, HttpModule} from "@angular/http";
import {MainService} from "../providers/main-service";
import {CustomerService} from "../providers/customer-service";
import {CommonService} from "../providers/common-service";
import {NativeStorage} from "@ionic-native/native-storage";
import {SalonService} from "../providers/salon-service";
import {Location} from "../pages/location/location";
import {Geolocation} from "@ionic-native/geolocation";
import {Push} from "@ionic-native/push";
import {ContactService} from "../providers/contact-service";
import {Terms} from "../pages/terms/terms";
import {PayPal} from "@ionic-native/paypal";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    Home,
    Aboutclick,
    Activation,
    Appointment,
    Cashing,
    Choosingservices,
    Contactus,
    Copon,
    Editaccount,
    Lang,
    Login,
    Map,
    Notification,
    Orderinfo,
    Salondetails,
    Servicedetails,
    Signup,
    Usertype,
    Favorites,
    Location,
    Terms
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Aboutclick,
    Activation,
    Appointment,
    Cashing,
    Choosingservices,
    Contactus,
    Copon,
    Editaccount,
    Lang,
    Login,
    Map,
    Notification,
    Orderinfo,
    Salondetails,
    Servicedetails,
    Signup,
    Usertype,
    Favorites,
    Location,
    Terms
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MainService,
    CustomerService,
    CommonService,
    ContactService,
    SalonService,
    Geolocation,
    Push,
    PayPal

  ]
})
export class AppModule {}
