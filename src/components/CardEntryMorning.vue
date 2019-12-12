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
      <card-clock
        :value="value"
        :label="label"
        :id="id"
        @changedClock="onChangedNumber($event)"
      >
      </card-clock>
    </div>
  </v-card>
</template>

<script>
import CardSlider from "./CardSlider.vue";
import CardCheckbox from "./CardCheckbox.vue";
import CardNumber from "./CardNumber.vue";
import CardTime from "./CardTime.vue";
import CardClock from "./CardClock.vue";

export default {
  components: {
    CardSlider,
    CardCheckbox,
    CardNumber,
    CardTime,
    CardClock
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
      ]
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
    }
  }
};
</script>