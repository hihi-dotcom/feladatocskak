const menedzser = new Manager(); //példányosítom a Manager osztályomat
const formfieldekArraye = [//definiálom a formfieldek tömbjét
    {
        label: 'Név: ',
        id: 'nev',
        inputType: 'text',
    },
    {
        label: 'Számjegyek száma: ',
        id: 'szamjegyek_szama',
        inputType: 'text',
    },
    {
        label: 'Század: ',
        id: 'szazad',
        inputType: 'text',
    },
];
const area = new TableArea('table', menedzser);//példányosítom a TableArea osztályunkat, amelynek értékül adom a table stringet és a manager példányunkat

const formarea = new FormArea('form', formfieldekArraye, menedzser);//példányosítom a FormArea osztályunkat, amelynek megadom a form stringet, és átadom neki a formfieldek tömbjét, illetve a menedzser példányomat is
const gombok = new Buttons('buttons', menedzser);//példányosítom a Buttons osztályomat, amely értékül kapja, a buttons stringet és a menedzser példányomat
const algoritmus = new Algorithm('algoritmusok');//példányosítom az Algorithm példányomat is, amelynek értékül adom az algoritmusok stringet;




