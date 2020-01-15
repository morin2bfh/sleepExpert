<!--
In diesem File wird die Verlaufsansicht initialisiert.
Die Daten, welche benötigt werden, werden aus dem Array cards der data() Funktion eingelesen.
Dazu wird eine Datenbankabfrage gemacht.

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
-->
<template>
  <v-container class="flex-column" id="container">
    <card-history
      v-for="card in cards"
      :key="card.data().timestamp.seconds"
      :imgSrc="getImgSrc(card.data())"
      :title="format(card.data().timestamp.seconds)"
      :route="card.id"
      :data="card.data()"
      :morning="isMorning(card.data())"
    />
  </v-container>
</template>

<script>
import CardHistory from "../components/CardHistory.vue";
import db from "../fb";
import { auth } from "../fb";

export default {
  components: {
    CardHistory
  },
  data() {
    return {
      cards: []
    };
  },
  created() {
    //sobald die Seite initialisiert ist, werden die Daten aus der DB gelsen
    var entries = [];

    //die Daten liegen in zwei Collections: EntryMorning für die Morgeneinträge
    var p1 = db
      .collection("EntryMorning")
      .where("uid", "==", auth.currentUser.uid)
      .get();

    //EntryEvening für die Abendeinträge
    var p2 = db
      .collection("EntryEvening")
      .where("uid", "==", auth.currentUser.uid)
      .get();

    //Die DB Abfrage ist asynchron, es muss also auf die vollendung des Query
    //gewartet werden, bevor mit den Daten weitergearbeitet wird.
    Promise.all([p1, p2]).then(values => {
      //values beinhaltet die return-values der im promise ausgeführten funktionen.
      //in diesem Fall ein Array der Einträge.
      //Die erhaltenen Einträge werden nun in ein gemeinsames Array geschrieben, um weitere Operationen ausführen zu können.
      var resultMorn = values[0];
      resultMorn.forEach(function(doc) {
        entries.push(doc);
      });
      var resultEv = values[1];
      resultEv.forEach(function(doc) {
        entries.push(doc);
      });
      //Einträge nach Datum sortieren, damit ein echter Verlauf entsteht.
      entries.sort((a, b) => {
        return -1 * (a.data().timestamp.seconds - b.data().timestamp.seconds);
      });
      //sortiertes Array dem Komponenten übergeben, sodass die Einträgen agezeigt werden können.
      this.cards = entries;
    });
  },
  methods: {
    format(ts) {
      //Diese funktion wandelt dem Timpestamp der Firebase DB in eine Stringräpresentation des Datums um.
      return new Date(ts * 1000).toLocaleDateString("de-CH");
    },
    getImgSrc(entry) {
      //wenn beim Eintrag das Attribut bedTime vorhanden ist, handelt es sich um einen Morgeneintrag.
      //in diesem Fall wird das Bild sun.png angezeigt, sont moon.png
      const asset = entry.bedTime ? "sun" : "moon";
      return require(`../assets/${asset}.png`);
    },
    isMorning(entry) {
      //überprüft ob ein eintrag ein Morgen- oder Abendeintrag ist.
      return entry.bedTime ? true : false;
    }
  }
};
</script>
<style scoped>
#container {
  padding-bottom: 55px;
}
</style>