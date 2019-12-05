<template>
  <v-card class="mx-auto mt-2" max-width="400" dark>
    <v-card-title>{{ title }}</v-card-title>

    <!-- Insert a slider if the option of the card(card.option) says 'slider' -->
    <div v-if="option == 'sliderOption'">
      <card-slider
        :value="value"
        :label="label"
        :id="id"
        @changedNumber="onChangedNumber($event)"
      >
      </card-slider>
    </div>

    <!-- Insert a checkbox if the option of the card(card.option) says 'checkbox' -->
    <div v-else-if="option == 'checkboxOption'">
      <v-container fluid>
        <card-checkbox
          v-for="checkbox in medicationCheckbox"
          :label="checkbox.label"
          :key="checkbox.label"
          :id="id"
          :value="checkbox.value"
          :number="checkbox.number"
          @changedValue="onChangedCheckbox($event)"
        >
        </card-checkbox>
      </v-container>
    </div>

    <!-- Insert a number textfield if the option of the card(card.option) says 'numbers' -->
    <div v-else-if="option == 'numbersOption'">
      <card-number
        :value="value"
        :label="label"
        :id="id"
        @changedNumber="onChangedNumber($event)"
      >
      </card-number>
    </div>

    <!-- Insert a time textfield if the option of the card(card.option) says 'hhmm'.
    These are the inputs for a format like hh:mm-->
    <div v-else-if="option == 'hhmmOption'">
      <card-time
        :value="value"
        :label="label"
        :id="id"
        @changedTime="onChangedTime($event)"
      >
      </card-time>
    </div>

    <!-- Insert a clock if the option of the card(card.option) says 'clock' -->
    <div v-else-if="option == 'clockOption'">
      <v-col cols="12" sm="4">
        <v-dialog
          ref="dialog"
          v-model="clockTime"
          :return-value.sync="time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="time"
              :label="label"
              :rules="ruleClockTime"
              prepend-inner-icon="$vuetify.icons.clock"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="clockTime"
            :id="id"
            v-model="time"
            full-width
            format="24hr"
            color="yellow darken-3"
            @change="onClockChanged()"
          >
            <v-spacer></v-spacer>
            <v-btn text color="yellow darken-3" @click="clockTime = false">Abbrechen</v-btn>
            <v-btn text color="yellow darken-3" @click="save(time)">Übernehmen</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-col>
    </div>
  </v-card>
</template>

<script>
import CardSlider from "./CardSlider.vue";
import CardCheckbox from "./CardCheckbox.vue";
import CardNumber from "./CardNumber.vue";
import CardTime from "./CardTime.vue";

export default {
  components: {
    CardSlider,
    CardCheckbox,
    CardNumber,
    CardTime
  },
  name: "cardEntryMorning",
  props: {
    title: String,
    option: String,
    label: String,
    id: String,
    value: String
  },
  data() {
    return {
      medication: [
        {
          label: "Vor dem zu Bett gehen",
          value: false,
          number: 0
        },
        {
          label: "In der Nacht",
          value: false,
          number: 1
        }
      ],
      test: null,
      time: null,
      clockTime: false,
      clock: false,
      ruleClockTime: [v => !!v || "Dies ist ein Pflichtfeld"],
    };
  },
  computed: {
    medicationCheckbox: function () {
      let values = this.value.replace(/ /g, "");
      values = values.slice(1,-1).split(",");
      let medication = this.medication;
      for(let i = 0; i < values.length; i++) {
        let boolValue = (values[i] == "true");
        medication[i].value = boolValue;
      }
      return medication;
    }
  },
  methods: {
    save(time) {
      this.$refs.dialog.save(time);
    },
    onChangedNumber(changedNumber) {
      this.$emit("changedValue", changedNumber);
    },
    onChangedCheckbox(value) {
      this.medication[value.number].value = value.value;
      let output = [];
      for(let i = 0; i < this.medication.length; i++) {
        output[i] = this.medication[i].value;
      }
      const changedValue = {
        value: output,
        id: value.id
      };
      this.$emit("changedValue", changedValue);
    },
    onChangedTime(changedTime) {
      let value = changedTime.value;
      let minutes = value.split(":")[0] * 60 + value.split(":")[1] * 1;
     
     const changedValue = {
        value: minutes,
        id: changedTime.id
      };
      this.$emit("changedValue", changedValue);
    },


    onClockChanged() {
      const changedClock = {
        value: this.time,
        id: this.id
      };
      this.$emit("changedClock", changedClock);
    }
  }
};
</script>