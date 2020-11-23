import { Component, OnInit } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { HttpClient } from "@angular/common/http";
import { ModalConcorsiPage } from "../modal-concorsi/modal-concorsi.page";
import { ModalController } from "@ionic/angular";

const CONCORSI_URL = "http://5.196.27.144:81/opendatamacerata/concorsi";
const CONCORSI_HASH_URL =
  "http://5.196.27.144:81/opendatamacerata/hashconcorsi";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  comune: string = "";
  isLoading: boolean;
  showTitle: boolean;
  showList: boolean;
  json: any = [];
  filteredJson: any = [];
  concorsiHash: string = "concorsihash";
  remoteHash: string = "remotehash";
  constructor(
    private nativeStorage: NativeStorage,
    private http: HttpClient,
    public modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.getComune();
  }

  ionViewWillEnter() {
    this.getComune();
  }

  async openModalConcorsi(data) {
    const modal = await this.modalController.create({
      component: ModalConcorsiPage,
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
    this.nativeStorage.getItem("Concorsi").then(
      (data) => {
        this.json = JSON.parse(data);
      },
      (error) => {
        this.json = [];
      }
    );
  }

  getConcorsiHashFromStorage() {
    this.nativeStorage.getItem("ConcorsiHash").then(
      (data) => {
        this.concorsiHash = data;
      },
      (error) => {
        this.concorsiHash = "concorsihash";
      }
    );
  }

  saveJsonInStorage(json) {
    this.nativeStorage.remove("Concorsi").then(
      () => {
        this.nativeStorage.setItem("Concorsi", json).then(
          () => console.log("concorsi salvati!"),
          (error) => console.log("Error concorsi non salvati", error)
        );
      },
      (error) => {
        console.log("Error storing item", error);
        this.nativeStorage.setItem("Concorsi", json).then(
          () => console.log("concorsi salvati!"),
          (error) => console.log("Error concorsi non salvati", error)
        );
      }
    );
  }

  saveConcorsiHash(hash) {
    this.nativeStorage.remove("ConcorsiHash").then(
      () => {
        this.nativeStorage.setItem("ConcorsiHash", hash).then(
          () => console.log("conoorsihash salvato!"),
          (error) => console.log("Error concorsihash non salvato", error)
        );
      },
      (error) => {
        console.log("Error storing item", error);
        this.nativeStorage.setItem("ConcorsiHash", hash).then(
          () => console.log("concorsihash salvato item!"),
          (error) => console.log("Error concorsihash non salvato", error)
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
    this.getConcorsiHashFromStorage();
    this.isLoading = true;
    this.showList = false;
    this.showSpinner(100).then(() => {
      this.http.get(CONCORSI_HASH_URL).subscribe(
        (data: any) => {
          this.remoteHash = data.hash;
          if (this.remoteHash == this.concorsiHash) {
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
            this.saveConcorsiHash(data.hash);
            this.http.get(CONCORSI_URL).subscribe(
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
