# Lista Comandi per buildare iOS

* installare **node** e **npm**
  
* installare dipendenze **ionic** e **capacitor**
	```
	npm install -g @ionic/cli native-run cordova-res
	npm install -g @capacitor/core @capacitor/cli
	```

* **clonare** questa repo
	```
	git clone https://github.com/fala-flash/lastOpenData.git
	```

* installare **node_modules e dipendenze**
	```
	npm install -- save
	```

* aggiungere al file *ios/App/App/Info.plist* le seguenti chiavi se non presenti
	```plist
		<key>NSLocationAlwaysUsageDescription</key>
		<string>We use your location for full functionality of certain app features.</string>
		<key>NSLocationWhenInUseUsageDescription</key>
		<string>We use your location for full functionality of certain app features.</string>
	```

* procedere alla **build** per **ios**
  ```
  ionic cap build
  ionic cap copy ios
  ionic cap sync ios
  ionic cap open ios
  ```
* una volta che **xcode** si è aperto in **automatico** vanno fatte le procedure **standard** per la creazione di un **.ipa**