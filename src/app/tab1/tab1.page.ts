import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ModalComuniPage } from "../modal-comuni/modal-comuni.page";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {

  isLoading: boolean;

  comune: string = "";
  showComune: boolean;

  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  address: any = ""; //address

  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };


  constructor(
    public modalController: ModalController,
    private nativeStorage: NativeStorage,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {}

  ionViewWillEnter() {
    this.getComune();
  }


  getCurrentCoordinates() {
    this.isLoading = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getAddress(resp.coords.latitude, resp.coords.longitude);
     }).catch((error) => {
       this.isLoading = false;
       this.getComune();
       console.log('Error getting location', error);
     });
  }

  getAddress(lat,long){
    this.nativeGeocoder.reverseGeocode(lat, long, this.options)
    .then((res: NativeGeocoderResult[]) => {
      this.address = res[0].locality;
      this.comune = res[0].locality;
      this.nativeStorage.setItem("Comune", res[0].locality).then(
        () => {
          console.log("Stored item!");
          this.isLoading = false;
        },
        (error) => {
          this.getComune();
          this.isLoading = false;
        }
      );
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

  async openModalComuni() {
    const modal = await this.modalController.create({
      component: ModalComuniPage,
    });

    modal.onDidDismiss().then((data) => {
      this.showComune = true;
      this.comune = data.data;
    });
    return await modal.present();
  }

  removeFiltro() {
    this.comune = "";
    this.showComune = false;
    this.nativeStorage.setItem("Comune", "").then(
      () => console.log("Stored item!"),
      (error) => console.log("Error storing item", error)
    );
  }


  getComune() {
    this.nativeStorage.getItem("Comune").then(
      (data) => {
        this.showComune = false;
        this.comune = data;
        this.showComune = true;
      },
      (error) => {
        this.showComune = false;
        this.comune = "";
        this.showComune = true;
      }
    );
  }
}
