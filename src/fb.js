/*
In diesem File werden Einstellungen für die Datenbankanbindung gemacht.
Die Objekte db und auth werden exportiert, damit später in allen Komponenten die Funktionen
dieser Objekte leichter gneutzt werden können.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
*/
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//informationen zur DB
var config = {
    apiKey: "AIzaSyD4GsmiUorIBAGiGMGvgfloOZm7W236aYI",
    authDomain: "sleepexpertbfh.firebaseapp.com",
    databaseURL: "https://sleepexpertbfh.firebaseio.com",
    projectId: "sleepexpertbfh",
    storageBucket: "sleepexpertbfh.appspot.com",
    messagingSenderId: "819577963596",
    appId: "1:819577963596:web:d82cc720e94d9b5ba520e9"
};

firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();

export default db;
export { auth };