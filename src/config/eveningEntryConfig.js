/*
Dieses File ist eine Sammlung der Fragen für den Abend-Fragebogen.
Jedes Element weist eine Option auf, welche dem Typ des Eingabefeldes entspricht

© Biel 2020, Jeannine Bürki, Lisa Lüscher, Nora Möri
*/
export default [
    {
        option: "sliderOption",
        title: "Tagesmüdigkeit:",
        label: "Keine",
        id: "dayTiredness",
        value: "0"
    },
    {
        option: "sliderOption",
        title: "Konzentration:",
        label: "Gut",
        id: "concentration",
        value: "0"
    },
    {
        option: "sliderOption",
        title: "Stimmung:",
        label: "Gut",
        id: "mood",
        value: "0"
    },
    {
        option: "sliderOption",
        title: "Körperliche Entspanntheit:",
        label: "Gut",
        id: "relaxation",
        value: "0"
    },
    {
        option: "checkboxOptionSchlaf",
        title: "Tagesschlaf:",
        id: "daySleep",
        value: "[false, false, false]"
    },
    {
        option: "checkboxOptionGenuss",
        title: "Genussmitttel:",
        id: "stimulants",
        value: "[false, false, false, false]"
    }
]