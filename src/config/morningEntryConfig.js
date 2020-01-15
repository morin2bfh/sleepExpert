/*
Diesed File ist eine Sammlung der Fragen für den Morgen-Fragebogen.
Jedes Element weist eine option auf, welche dem Typ des Eingabefeldes entspricht

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
*/

export default [
    {
        option: "clockOption",
        title: "Zu Bett gegangen um: *",
        label: "Uhrzeit",
        id: "bedTime",
    },
    {
        option: "clockOption",
        title: "Licht gelöscht um: *",
        label: "Uhrzeit",
        id: "lightsOut"
    },
    {
        option: "hhmmOption",
        title: "Geschätzte Einschlafdauer: *",
        label: "hh:mm",
        id: "fallAsleepTime"
    },
    {
        option: "hhmmOption",
        title: "Wie lange wach in der Nacht: *",
        label: "hh:mm",
        id: "durationAwake"
    },
    {
        option: "clockOption",
        title: "Endgültig aufgewacht um: *",
        label: "Uhrzeit",
        id: "wakeUpTime"
    },
    {
        option: "clockOption",
        title: "Morgens aufgestanden um: *",
        label: "Uhrzeit",
        id: "standUpTime"
    },
    {
        option: "sliderOption",
        title: "Schlafqualität:",
        label: "Gut",
        id: "sleepQuality",
        value: "0"
    },
    {
        option: "sliderOption",
        title: "Gefühl des Erholtseins:",
        label: "Gut",
        id: "relaxation",
        value: "0"
    },
    {
        option: "sliderOption",
        title: "Müdigkeit beim Zubettgehen:",
        label: "Keine",
        id: "tiredness",
        value: "0"
    },
    {
        option: "numbersOption",
        title: "Wie oft aufgewacht:",
        label: "Anzahl",
        id: "timesAwake"
    },
    {
        option: "checkboxOption",
        title: "Schlafmittel genommen:",
        id: "medication",
        value: "[false, false]"
    }
]