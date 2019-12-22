 <template>
  <v-col cols="12" sm="4">
    <v-text-field
      v-model="hhmmValue"
      :label="label"
      :rules="ruleHHMM"
      :id="id"
      :disabled="disabled"
      single-line
      width="290px"
      @change="onTimeChanged()"
    />
  </v-col>
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    id: String,
    disabled: Boolean
  },
  data() {
    return {
      hhmmValue: null,
      ruleHHMM: [
        v => !!v || "Dies ist ein Pflichtfeld",
        v => (v || "").length <= 5 || "Maximal 4 Zeichen",
        v => {
          const pattern = /[0-9?]{1,2}:[0-5?][0-9?]/;
          return pattern.test(v) || "Ungültiges Format, Bsp: 01:12";
        }
      ]
    };
  },
  created() {
    if (this.value) {
      let value = this.value / 60 + "";
      let hours = value.split(".")[0];
      let minutes = this.value - 60 * hours;
      this.hhmmValue =
        ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
    }
  },
  methods: {
    onTimeChanged() {
      const changedTime = {
        value: this.hhmmValue,
        id: this.id
      };
      this.$emit("changedTime", changedTime);
    }
  }
};
</script>