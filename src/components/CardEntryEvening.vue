<template>
  <v-card class="mx-auto mt-2" max-width="400" dark>
    <v-card-title>{{ title }}</v-card-title>

    <!-- Insert a slider if the option of the card(card.option) says 'slider' -->
    <div v-if="option == 'sliderOption'">
      <card-slider
        :value="value"
        :label="label"
        :id="id"
        @changedNumber="onChangedSlider($event)"
      >
      </card-slider>
    </div>

    <!-- Insert a slider if the option of the card(card.option) says 'checkbox Genuss' -->
    <div v-else-if="option == 'checkboxOptionGenuss'">
      <v-container fluid>
        <card-checkbox
          v-for="checkbox in stimulantCheckbox"
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

    <!-- Insert a slider if the option of the card(card.option) says 'checkbox Schlaf' -->
    <div v-else-if="option == 'checkboxOptionSchlaf'">
     <v-container fluid>
       <card-checkbox
          v-for="checkbox in daySleepCheckbox"
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
  </v-card>
</template>

<script>
import CardSlider from "./CardSlider.vue";
import CardCheckbox from "./CardCheckbox.vue";

export default {
  components: {
    CardSlider,
    CardCheckbox
  },
  name: "cardEntryEvening",
  props: {
    title: String,
    option: String,
    label: String,
    id: String,
    value: String
  },
  data() {
    return {
      stimulants: [
        {
          label: "Kaffee",
          value: false,
          number: 0
        },
        {
          label: "Tee",
          value: false,
          number: 1
        },
        {
          label: "Cola",
          value: false,
          number: 2
        },
        {
          label: "Alkohol",
          value: false,
          number: 3
        }
      ],
      daySleep: [
        {
          label: "Mittagsschlaf",
          value: false,
          number: 0
        },
        {
          label: "Nickerchen vor dem TV",
          value: false,
          number: 1
        },
        {
          label: "Power-Nap",
          value: false,
          number: 2
        }
      ]
    };
  },
  computed: {
    stimulantCheckbox: function () {
      let values = this.value.replace(/ /g, "");
      values = values.slice(1,-1).split(",");
      let stimulants = this.stimulants;
      for(let i = 0; i < values.length; i++) {
        let boolValue = (values[i] == "true");
        stimulants[i].value = boolValue;
      }
      return stimulants;
    },
    daySleepCheckbox: function() {
      let values = this.value.replace(/ /g, "");
      values = values.slice(1,-1).split(",");
      let daySleep = this.daySleep;
      for(let i = 0; i < values.length; i++) {
        let boolValue = (values[i] == "true");
        daySleep[i].value = boolValue;
      }
      return daySleep;
    }
  },
  methods: {
    onChangedSlider(changedValue) {
      this.$emit("changedValue", changedValue);
    },
    onChangedCheckbox(value) {
      let checkbox = null;
      if(value.id == "stimulants") {
        checkbox = this.stimulants;  
      } else if(value.id == "daySleep") {
        checkbox = this.daySleep;
      }
      checkbox[value.number].value = value.value;
      let output = [];
      for(let i = 0; i < checkbox.length; i++) {
        output[i] = checkbox[i].value;
      }
      const changedValue = {
        value: output,
        id: value.id
      };
      this.$emit("changedValue", changedValue);
    }
  }
};
</script>