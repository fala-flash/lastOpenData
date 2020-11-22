import { Component } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { HttpClient } from "@angular/common/http";
import { ModalController } from "@ionic/angular";
import { ModalBandiPage } from "../modal-bandi/modal-bandi.page";

const BANDI_URL = "http://192.168.1.43:5000/opendatamacerata/bandi";
const BANDI_HASH_URL = "http://192.168.1.43:5000/opendatamacerata/hashbandi";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  comune: string = "";
  isLoading: boolean;
  showTitle: boolean;
  showList: boolean;
  json: any = [];
  filteredJson: any = [];
  bandiHash: string = "bandihash";
  remoteHash: string = "remotehash";

  constructor(
    public modalController: ModalController,
    private nativeStorage: NativeStorage,
    private http: HttpClient
  ) {}
  ionViewWillEnter() {
    this.getComune();
  }

  async openModalBandi(data) {
    const modal = await this.modalController.create({
      component: ModalBandiPage,
      componentProps: {
        data: data,
      },
    });
    return await modal.present();
  }

  showSpinner(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  filterJson(comune: string) {
    this.filteredJson = this.json;
    if (comune && comune.trim() !== "") {
      this.filteredJson = this.filteredJson.filter(
        (term: { Comune: string }) => {
          return (
            term.Comune.toLowerCase().indexOf(comune.trim().toLowerCase()) > -1
          );
        }
      );
    }
  }

  getComune() {
    
    this.nativeStorage.getItem("Comune").then(
      (data) => {
        this.showTitle = false;
        this.comune = data;
        this.showTitle = true;
        this.getJson();
        
      },
      (error) => {
        this.showTitle = false;
        this.comune = "";
        this.showTitle = true;
        this.getJson();
      }
    );
  }

  getJsonFromStorage() {
    this.nativeStorage.getItem("Bandi").then(
      (data) => {
        this.json = JSON.parse(data);
      },
      (error) => {
        this.json = [];
      }
    );
  }

  getBandiHashFromStorage() {
    this.nativeStorage.getItem("BandiHash").then(
      (data) => {
        this.bandiHash = data;
      },
      (error) => {
        this.bandiHash = "bandihash";
      }
    );
  }

  saveJsonInStorage(json) {
    this.nativeStorage.remove("Bandi").then(
      () => {
        this.nativeStorage.setItem("Bandi", json).then(
          () => console.log("bandi salvati!"),
          (error) => console.log("Error bandi non salvati", error)
        );
      },
      (error) => {
        console.log("Error storing item", error);
        this.nativeStorage.setItem("Bandi", json).then(
          () => console.log("bandi salvati!"),
          (error) => console.log("Error bandi non salvati", error)
        );
      }
    );
  }

  saveBandiHash(hash) {
    this.nativeStorage.remove("BandiHash").then(
      () => {
        this.nativeStorage.setItem("BandiHash", hash).then(
          () => console.log("bandihash salvato!"),
          (error) => console.log("Error bandihash non salvato", error)
        );
      },
      (error) => {
        console.log("Error storing item", error);
        this.nativeStorage.setItem("BandiHash", hash).then(
          () => console.log("bandihash salvato item!"),
          (error) => console.log("Error bandihash non salvato", error)
        );
      }
    );
  }

  deserializeJson(req) {
    var res = [];
    if (req !== null) {
      req.result.results.forEach((item) => {
        item.JSONElement.forEach((jtem) => {
          res.push(jtem);
        });
      });
      return res;
    } else {
      return 400;
    }
  }

  getJson() {
    this.getBandiHashFromStorage();
    this.isLoading = true;
    this.showList = false;
    this.showSpinner(100).then(() => {
      this.http.get(BANDI_HASH_URL).subscribe(
        (data: any) => {
          this.remoteHash = data.hash;
          if (this.remoteHash == this.bandiHash) {
            console.log("gli hash sono uguali, carico dati da native storage");
            this.getJsonFromStorage();
            console.log("filtro il json per darti solo il tuo comune");
            this.filterJson(this.comune);
            this.isLoading = false;
            this.showList = true;
          } else {
            console.log(
              "gli hash sono diversi, carico dati da internet e salvo nuovo hash"
            );
            this.saveBandiHash(data.hash);
            this.http.get(BANDI_URL).subscribe(
              (data) => {
                console.log("salvo i dati nel native storage");
                this.saveJsonInStorage(
                  JSON.stringify(this.deserializeJson(data))
                );
                this.json = JSON.stringify(this.deserializeJson(data));
                this.filteredJson = JSON.stringify(this.deserializeJson(data));
                console.log("filtro il json per darti solo il tuo comune");
                this.filterJson(this.comune);
                this.isLoading = false;
                this.showList = true;
              },
              () => {
                console.log(
                  "in assenza di internet ti do i dati che ho salvato nello storage."
                );
                this.getJsonFromStorage();
                console.log("filtro il json per darti solo il tuo comune");
                this.filterJson(this.comune);
                this.isLoading = false;
                this.showList = true;
              }
            );
          }
        },
        () => {
          console.log(
            "non ho internet per controllare hash, quindi ti do quello che hai nello storage"
          );
          this.remoteHash = "";
          this.getJsonFromStorage();
          console.log("filtro il json per darti solo il tuo comune");
          this.filterJson(this.comune);
          this.isLoading = false;
          this.showList = true;
        }
      );
    });
  }

  refresh() {
    this.getJson();
  }
}
