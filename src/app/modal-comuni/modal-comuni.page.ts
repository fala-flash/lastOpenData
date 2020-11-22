import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: "app-modal-comuni",
  templateUrl: "./modal-comuni.page.html",
  styleUrls: ["./modal-comuni.page.scss"],
})
export class ModalComuniPage implements OnInit {
  comuni = [
    "Acquacanina",
    "Apiro",
    "Appignano",
    "Belforte del Chienti",
    "Bolognola",
    "Caldarola",
    "Camerino",
    "Camporotondo di Fiastrone",
    "Castelraimondo",
    "Castelsantangelo sul Nera",
    "Cessapalombo",
    "Cingoli",
    "Civitanova Marche",
    "Colmurano",
    "Corridonia",
    "Esanatoglia",
    "Fiastra",
    "Fiordimonte",
    "Fiuminata",
    "Gagliole",
    "Gualdo",
    "Loro Piceno",
    "Macerata",
    "Matelica",
    "Mogliano",
    "Monte Cavallo",
    "Monte San Giusto",
    "Monte San Martino",
    "Montecassiano",
    "Montecosaro",
    "Montefano",
    "Montelupone",
    "Morrovalle",
    "Muccia",
    "Penna San Giovanni",
    "Petriolo",
    "Pieve Torina",
    "Pievebovigliana",
    "Pioraco",
    "Poggio San Vicino",
    "Pollenza",
    "Porto Recanati",
    "Potenza Picena",
    "Recanati",
    "Ripe San Ginesio",
    "San Ginesio",
    "San Severino Marche",
    "Sant'Angelo in Pontano",
    "Sarnano",
    "Sefro",
    "Serrapetrona",
    "Serravalle di Chienti",
    "Tolentino",
    "Treia",
    "Urbisaglia",
    "Ussita",
    "Visso"
  ];

  constructor(
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private nativeStorage: NativeStorage
  ) {}

  ngOnInit() {}

  public closeModal(comune: string) {
    this.modalCtrl.dismiss(comune);
  }

  async presentAlertConfirm(comune: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Comune Selezionato',
      message: comune,
      buttons: [
        {
          text: 'Annulla',
          handler: () => {
            this.saveComune("");
          }
        }, {
          text: 'Conferma',
          handler: () => {
            this.saveComune(comune);
            this.closeModal(comune);
          }
        }
      ]
    });

    await alert.present();
  }

  selectComune(comune: string) {
    this.presentAlertConfirm(comune);
  }

  saveComune(comune: string){
    this.nativeStorage.setItem('Comune', comune)
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  }

  removeFiltro(){
    this.nativeStorage.setItem('Comune', "").then(
      () => console.log('Stored item!'),
      (error) => console.log('Error storing item', error)
    )
  }
}
