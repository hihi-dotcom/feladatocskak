class Buttons extends Area{
    
    /**
     * @type {Manager}
     */
    #manager;

    constructor(cssClass, manager){
        super(cssClass);
        this.#manager = manager;

        const fajletolto_gomb = document.createElement('input');
        this.div.appendChild(fajletolto_gomb);
        fajletolto_gomb.textContent = 'Download';
        fajletolto_gomb.type = "file";

        fajletolto_gomb.addEventListener('change', (e) => {
            const file = e.target.files[0];

            const fileolvasas = new FileReader();

            fileolvasas.readAsText(file);
            fileolvasas.onload = () => {
                const fileContent = fileolvasas.result;
                const sorok = fileContent.split('\n');
                const vagott_sor =  sorok.slice(2);
                for(const sor of vagott_sor){
                    const elems = sor.split(';');
                    const author = {
                        nev: elems[0],
                        szamjegyek_szama: elems[1],
                        szazad: elems[2],
                    };

                    const szerzo = new Author(author.nev, author.szamjegyek_szama, author.szazad);
                    manager.add(szerzo);
                }
        
            };
        });




        const letolto_button = document.createElement('button');
        this.div.appendChild(letolto_button);
        letolto_button.textContent = "Letöltés";

        letolto_button.addEventListener('click', (e) => {
            e.preventDefault();
            const hiperhivatkozas = document.createElement('a');
            const contenttoExport = menedzser.generateToExport();
            const blob = new Blob([contenttoExport]);
            hiperhivatkozas.href = URL.createObjectURL(blob);
            hiperhivatkozas.download = 'new.csv';

            hiperhivatkozas.click();
            URL.revokeObjectURL(hiperhivatkozas.href);
        });
    };
}