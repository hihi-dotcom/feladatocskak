const optionvaluek = [           
            {
                value: '',
                text: 'üres',
            },
            {
                value: 'jan',
                text: 'Január',
            },
            {
                value: 'feb',
                text: 'Február',
            },
            {
                value: 'mar',
                text: 'Március',
            },
            {
                value: 'apr',
                text: 'Április',
            },
            {
                value: 'maj',
                text: 'Május',
            },
            {
                value: 'jun',
                text: 'Június',
            },
            {
                value: 'jul',
                text: 'Július',
            },
            {
                value: 'aug',
                text: 'Augusztus',
            },
            {
                value: 'sep',
                text: 'Szeptember',
            },
            {
                value: 'okt',
                text: 'Október',
            },
            {
                value: 'nov',
                text: 'November',
            },
            {
                value: 'dec',
                text: 'December'
            },
];         
const szempontok = [
        {
            value: "megnevezes",
            innerHTML: "Megnevezés"
        },
        {
            value: "helyszin",
            innerHTML: "Helyszín"
        },
        {
            value: "honap",
            innerHTML: "Hónap"
        },
        {
            value: "koltseg",
            innerHTML: "Költség"
        }
       ];

const formos = new FormArea(optionvaluek, szempontok);
const easyalgoritmusok = new EasyAlgos(formos);
const algoritmusok = new Algo(formos);
const area_resz = new Area(formos, easyalgoritmusok, algoritmusok);




