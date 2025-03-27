class Buttons extends Area{
    
    /**
     * @type {Manager}
     */
    #manager;

    /**
     * 
     * @param {string} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager){
        super(cssClass);//meghívom az ősosztály konstruktorát
        this.#manager = manager;//Beállítom a manager priv. tulajdonságnak a bemeneti praméterben kapott értéket

        const fajletolto_input = document.createElement('input');//létrehozok egy inputot
        this.div.appendChild(fajletolto_input);//hozzáfűzöm a child divünkhöz
        fajletolto_input.textContent = 'Download';//Beállítom neki a DOwnload stringet
        fajletolto_input.type = "file";//meghatározom az input típusát

        fajletolto_input.addEventListener('change', (e) => {//definiálok egy eventListenert a change eventre
            const file = e.target.files[0];//eltárolom egy változóba az inputba betöltött fájlok közül az elsőt

            const fileolvasas = new FileReader();//példányosítom a FileReader osztályt

            fileolvasas.readAsText(file);//majd meghívom a readAsText függvényét
            fileolvasas.onload = () => {//az onload eventlistenert megvalósítom
                const fileContent = fileolvasas.result;//a FileReader osztályunk eredmény propertyjét eltárolom egy változóban
                const sorok = fileContent.split('\n');//splittelem az eredményt soronként
                const vagott_sor = sorok.slice(1); //majd levágom az első elemét a sliceal
                for(const sor of vagott_sor){//bejárom a splittelt sorokat
                    const elems = sor.split(';');//minden egyes iterációkor, a ciklusváltozót, tovább splittelem pontos vesszőnként
                    const author = {//létrehozom az author objektumot
                        nev: elems[0],//az author nev tulajdonsága lesz a splitelt elemeink elsője
                        szamjegyek_szama: elems[1],// az author szamjegyek_szama tulajdonsága lesz a splittelt elemeink második eleme
                        szazad: elems[2],// az author szazad tulajdonsága lesz a splittelt elemeink harmadik eleme
                    };

                    const szerzo = new Author(author.nev, author.szamjegyek_szama, author.szazad);//példányosítom az Author osztályt, az author objektum tulajdonságaival
                    manager.add(szerzo);//majd meghívom a manager add függvényét, a most példányosított szerzőnkkel
                }
        
            };
        });




        const letolto_button = document.createElement('button');//létrehozom egy HTML gombot
        this.div.appendChild(letolto_button);//ezt hozzáappendelem az örökölt divemhez
        letolto_button.textContent = "Letöltés";//beállítom a gombnak a letöltés stringet

        letolto_button.addEventListener('click', (e) => {//a gomb click eventjére definiálok egy eventListenert
            e.preventDefault();//megakadályozom, hogy az alapértelmezett működés lefusson
            const hiperhivatkozas = document.createElement('a');//Létrehozok egy hiperhivatkozást
            const contenttoExport = manager.generateToExport();//eltárolom a manager osztályom generateToExport függvény visszatérési értékét egy változóba
            const blob = new Blob([contenttoExport]); //példányosítom a Blob beépített osztályt, amely megkapja egy tömbben a generateToExport függvényem visszatérési értékét tartalmazó változót
            hiperhivatkozas.href = URL.createObjectURL(blob);// a hiperhivatkozás href tulajdonságának megadom az URL beépített createObjectURL metódusát, aminek megadom a blob osztályunk példányát paraméterül
            hiperhivatkozas.download = 'new.csv';// a hiperhivatkozás download tulajdonságának megadok egy stringet ami a fájlunk neve lesz majd

            hiperhivatkozas.click();// meghívom a hiperhivatkozásom click beépített metódusát
            URL.revokeObjectURL(hiperhivatkozas.href);//majd az URL interface beépített revokeObjectURL metódusát meghívva megadom neki paraméterül a hiperhivatkozásom href tulajdonságát
        });
    };
}