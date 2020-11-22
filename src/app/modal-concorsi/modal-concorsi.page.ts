import { Component, Input } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
@Component({
  selector: "app-modal-concorsi",
  templateUrl: "./modal-concorsi.page.html",
  styleUrls: ["./modal-concorsi.page.scss"],
})
export class ModalConcorsiPage {
  @Input() data: any;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private socialSharing: SocialSharing
  ) {
    this.data = navParams.get("data");
  }

  public closeModal() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  share(url: string){
    this.socialSharing.share(null, null, null, url).then(
      (success) => {
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
