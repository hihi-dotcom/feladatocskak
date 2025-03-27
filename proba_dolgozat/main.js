const menedzser = new Manager();
const formfieldekArraye = [
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
const area = new TableArea('table', menedzser);

const formarea = new FormArea('form', formfieldekArraye, menedzser);
const gombok = new Buttons('buttons', menedzser);
const algoritmus = new Algorithm('algoritmusok');




