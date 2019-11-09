<template>
    <v-container>
        <h1 align="center"> Morgeneintrag erfassen </h1>
    
        <cardentry dark v-for="card in cards"
            :key="card.title"
            :title="card.title" 
        > 

           <!-- Insert a slider if the option of the card(card.option) says 'slider' -->
        <div v-if="card.option == 'slider'"   >
            <v-slider
               v-model="numbers"
                :tick-labels="numbersLabel"
                :max="7"
                :color="'#F9A825'"
                :label="card.label"
                        
                step="1"
                ticks="always"
                tick-size="4"                                      
                >
                
            
            </v-slider>
            </div>

            <!-- Insert a slider if the option of the card(card.option) says 'checkbox' -->
           <div v-else-if="card.option == 'checkbox'">
                <v-container fluid>
                    <v-checkbox v-model="checkbox1"  
                        :label="'Vor dem zu Bett gehen'">    
                    </v-checkbox>
                    <v-checkbox v-model="checkbox2"  
                        :label="'In der Nacht'">
                          
                    </v-checkbox>
                </v-container>
            </div>

            <!-- Insert a slider if the option of the card(card.option) says 'clock' -->
            <div v-else-if="card.option == 'clock'">
                <v-col cols="12" sm="4">
                    <v-dialog
                        ref="dialog"
                        v-model="clock"
                        :return-value.sync="time"
                        persistent
                        width="290px"
                        
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="time"
                                :label="card.label"
                                readonly
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="clock"
                        v-model="time"
                        full-width
                        format="24hr"
                        color="yellow darken-3"
                        >
                        <v-spacer></v-spacer>
                            <v-btn text color="yellow darken-3" @click="clock = false">Cancel</v-btn>
                            <v-btn text color="yellow darken-3" @click="$refs.dialog.save(time)">OK_V1</v-btn>
                            <v-btn text color="yellow darken-3" @click="save(time)">OK_V2</v-btn>
                        </v-time-picker>
                    </v-dialog>
                </v-col>
            </div>

            <!-- Insert a slider if the option of the card(card.option) says 'numbers' -->
            <div v-else-if="card.option == 'numbers'">
                <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="numberValue"
                        :label="card.label"
                        :rules="ruleNumbers"
                        hide-details
                        single-line
                        type="number"
                        />
                </v-col>
            </div>
            
             <!-- Insert a slider if the option of the card(card.option) says 'hhmm'.
             These are the inputs for a format like hh:mm -->
            <div v-else-if="card.option == 'hhmm'">
                <v-col cols="12" sm="4" >
                    <v-text-field
                        v-model="hhmmValue"
                        :label="card.label"
                        :rules="ruleHHMM"
                        single-line
                        width="290px"
                        />
                </v-col>
            </div>

             <!-- Insert a slider if the option of the card(card.option) says 'buttons' -->
            <div v-else-if="card.option == 'buttons'">
                <v-container horizontal >
                    <v-btn color="#6D4C41" > Abbrechen</v-btn>
                    <v-btn color="#FBC02D" > Speichern</v-btn>
                </v-container>
            </div>
        </cardentry>
    </v-container> 
</template>

<script>
    import CardEntry from "@/components/Card_Entry.vue";
    export default {
        components: {
             CardEntry,
        },
       
        data () {
        return {
            
            time: null,
            clock: false,
            routes: [ {
            route: "/dashboard"
            }],

            ruleHHMM: [
                value => (value || '').length <= 5 || 'Max 5 characters',
                value =>{
                    const pattern = /[0-1?][0-9?]:[0-5?][0-9?]/
                    return pattern.test(value) || 'hh:mm Bsp: 01:12'
                },
            ],
            
            ruleNumbers: [
            value => (value || '').length <= 2 || 'Max 2 characters',
            value =>{
                const pattern = /[0-2?]?[0-9?]?/
                return pattern.test(value) || 'hh:mm Bsp: 01:12'
            },
            ],

            numbersLabel:[
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
            ],
            
            
            cards:[ {
                option: 'slider',
                title: "Schlafqualität:",
                label: 'Gut',
                },
                {
                option: 'slider',
                title: 'Gefühl des Erholtseins:',
                label: 'Gut',
                },
                { option: 'slider',
                title: "Müdigkeit beim Zubettgehen:",
                label: 'Keine',
                },
                { option: 'clock',
                title: "Zu Bett gegangen um:",
                label: "Uhrzeit",
                
                },
                { option: 'clock',
                title: "Licht gelöscht um:",
                label: "Uhrzeit",
                },
                { option: 'hhmm',
                title: "Geschätzte Einschlafdauer:",
                label: "hh:mm",
                },
                { option: 'numbers',
                title: "Wie oft aufgewacht:",
                label:"Anzahl",
                },
                { option: 'hhmm',
                title: "Wie lange wach in der Nacht:",
                label: "hh:mm",
                },
                { option: 'clock',
                title: "Endgültig aufgewacht um:",
                label:"Uhrzeit",
                },
                { option: 'clock',
                title: "Morgens aufgestanden um:",
                label: "Uhrzeit",
                },
                { option: 'checkbox',
                title: "Schlafmittel genommen:",
                },
                { option: 'buttons',
                
                },],
            
            };
        },
            
        methods:{   
            save(time){                
                this.$refs.dialog.save(time)
            },
        },
    };
</script>