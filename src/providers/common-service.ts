import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subscriber} from "rxjs";

/*
  Generated class for the CommonService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonService {
  public readonly maxRate: number = 5;
  public iconEmpty: string = 'star-outline';
  public iconFull: string = 'star';
  constructor(public http: Http,public toastCtrl:ToastController ,
              public translateService : TranslateService) {
    console.log('Hello CommonService Provider');
  }
  presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000
    });
    toast.present();
  }
  successToast()
  {
    this.translateService.get('Success').subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);
      }
    );
  }
  errorToast()
  {
    this.translateService.get('Error').subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);

      }
    );
  }
  translateAndToast(word : string)
  {
    this.translateService.get(word).subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);

      }
    );
  }
  getTranslation(word : string)
  {
    this.translateService.get(word).subscribe(
      value => {
        // value is our translated string
        return value;

      }
    );
  }
  public translateArray(words : string[])
  {
    let values = [];
    for (let i = 0; i < words.length; i++) {
      this.translateService.get(words[i]).subscribe(
        value => {
          // value is our translated string
          values.push(value);
        }
      );
    }
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(values);
      observer.complete();
    });
  }
  // Rate Service
  public icons(rate : number): string[] {
    let icons = [];
    for (let i = 1; i <= this.maxRate; i++) {
      if (i <= rate) {
        icons.push(this.iconFull);
      }
      else {
        icons.push(this.iconEmpty);
      }
    }
    return icons;
  }
}
