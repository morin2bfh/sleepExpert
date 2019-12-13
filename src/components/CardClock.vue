<template>
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
                >
                </v-text-field>
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
</template>

<script>
export default {
    props: {
        value: String,
        label: String,
        id: String
    },
    data() {
        return {
            time: null,
            clockTime: false,
            clock: false,
            ruleClockTime: [v => !!v || "Dies ist ein Pflichtfeld"],
        }
    },
    created() {
        if(this.value) {
            this.time = this.value;
        }
    },
    methods: {
        save(time) {
            this.$refs.dialog.save(time);
        },
        onClockChanged() {
            const changedClock = {
                value: this.time,
                id: this.id
            };
            this.$emit("changedClock", changedClock);
        }
    }
}
</script>

<style>

</style>