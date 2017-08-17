import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, Nav, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Lang}from "../pages/lang/lang";
import { Home } from '../pages/home/home';
import {Aboutclick} from "../pages/aboutclick/aboutclick";
import {Contactus} from "../pages/contactus/contactus";
import {Map} from "../pages/map/map";
import {Signup} from "../pages/signup/signup";
import {Login} from "../pages/login/login";
import {CustomerService} from "../providers/customer-service";
import {MainService} from "../providers/main-service";
import {Push, PushObject, PushOptions} from "@ionic-native/push";
import {Terms} from "../pages/terms/terms";
import {Favorites} from "../pages/favorites/favorites";
import {Notification} from "../pages/notification/notification";
import {Appointment} from "../pages/appointment/appointment";
import {CommonService} from "../providers/common-service";
import {Editaccount} from "../pages/editaccount/editaccount";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = Lang;
  public visitorPages : Array<{title: string, icon: string, component: any}>;
  public customerPages : Array<{title: string, icon: string, component: any}>;
  public  MainService = MainService;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public customerService : CustomerService , public push :Push ,
              public alertCtrl : AlertController , public commonService: CommonService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // chseck for any customer
      this.customerService.customerStorageGet();
      this.pushInit();
    });
    this.initLists();
  }
  pushInit()
  {
    // to initialize push notifications

    const options: PushOptions = {
      android: {
        senderID: '918871217671'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      this.handleEvents(notification);
    });

    pushObject.on('registration').subscribe((registration: any) => {

      this.customerService.deviceToken = registration.registrationId ;
      console.log('Device registered', registration)
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  initLists()
  {
    this.visitorPages = [
      { title: 'Home', icon: 'home',component: Home},
      { title: 'SignUp', icon: 'log-in',component: Signup },
      { title: 'Login', icon: 'log-in',component: Login},
      { title: 'Contact US', icon: 'contacts',component: Contactus },
      { title: 'About Click', icon: 'alert',component: Aboutclick },
      { title: 'Terms', icon: 'document',component: Terms },
      { title: 'Map', icon: 'map',component: Map },
      { title: 'Lang', icon: 'home',component: Lang }
    ];
    this.customerPages = [
      { title: 'Home', icon: 'home',component: Home},
      { title: 'My Favorite', icon: 'heart',component: Favorites},
      { title: 'Edit Account', icon: 'contact',component: Editaccount},
      { title: 'Notification', icon: 'alert',component: Notification},
      { title: 'Appointment', icon: 'list-box',component: Appointment},
      { title: 'Contact US', icon: 'contacts',component: Contactus },
      { title: 'About Click', icon: 'alert',component: Aboutclick },
      { title: 'Terms', icon: 'document',component: Terms },
      { title: 'Lang', icon: 'home',component: Lang },
      { title: 'LogOut', icon: 'exit',component: Home }
    ];
  }
  openPage(p:any){
    if (p.title == 'LogOut') {
      this.customerService.customerStorageErase();
    }
    this.nav.push(p.component);
  }
  handleEvents(data : any)
  {
    if (data.additionalData.foreground) {
      switch (data.additionalData.type)
      {
        case 'confirmed':
          this.notificationEvent(data);
          break;
        default:
          alert("Wrong Grade.........");

      }
    } else {
      //if user NOT using app and push notification comes
      //TODO: Your logic on click of push notification directly
      console.log("Push notification clicked");
      alert(data.message);
    }
  }
  notificationEvent(data : any)
  {
    let alert = this.alertCtrl.create({
      title: data.title,
      subTitle: data.message,
      buttons: [{
        text: 'OK',
        handler: res => {
          this.readNotifications(data.additionalData.notification_id);
        }
      }]
    });
    alert.present();
  }
  readNotifications(notification_id : any)
  {
    this.customerService.readNotifications(notification_id).subscribe((res)=>{
      if(res.error)
      {
        this.commonService.errorToast();
      }
      else
      {
        this.commonService.successToast();
      }
    });
  }
}

