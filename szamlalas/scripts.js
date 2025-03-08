class DataTable{
    array;
    tbody;

    /**
     * 
     * @param {Array} kolt_bev_tomb 
     * @type {koltes[]}
     */
    constructor(kolt_bev_tomb){
        this.array = kolt_bev_tomb;
        
        

        const table = document.createElement(`table`);
        document.body.appendChild(table);

        const table_head = document.createElement(`thead`);
        table.appendChild(table_head);

        const table_body = document.createElement(`tbody`);
        this.tbody = table_body;
        table.appendChild(table_body);

        const t_head_sor = document.createElement(`tr`);
        table_head.appendChild(t_head_sor);


        this.htmlElementMaker(`th`, t_head_sor, `Megnevezés`);
        this.htmlElementMaker(`th`, t_head_sor, `Helyszín`);
        this.htmlElementMaker(`th`, t_head_sor, `Hónap`);
        this.htmlElementMaker(`th`, t_head_sor, `Összeg`);

        this.render_Tablazat(kolt_bev_tomb);

        this.htmlElementMaker(`div`, document.body, `A költségeink száma: ${this.szamlalas(kolt_bev_tomb)}.`)
        
    };


    render_Tablazat(koltseg_bevetel_tomb){
        this.tbody.innerHTML = ``;

        for(const kolt_bev of koltseg_bevetel_tomb){
            const body_sor = document.createElement(`tr`);
            this.tbody.appendChild(body_sor);
            this.htmlElementMaker(`td`, body_sor, kolt_bev.megnevezes);
            this.htmlElementMaker(`td`, body_sor, kolt_bev.helyszin);
            this.htmlElementMaker(`td`, body_sor, kolt_bev.honap);
            this.htmlElementMaker(`td`, body_sor, kolt_bev.osszeg);
        };
    };

    htmlElementMaker(htmlelem, parentelem, innerHTML){
        const htmlElement = document.createElement(htmlelem);
        parentelem.appendChild(htmlElement);
        htmlElement.innerHTML = innerHTML;
    }

    szamlalas(kolt_bev_tomb){
        let counter = 0;
        for(let i = 0; i < kolt_bev_tomb.length; i++){   
            counter ++;
        }

        return counter;
    }

};





const fajlbe_input = document.createElement(`input`);//Létrehozok egy inputot
document.body.appendChild(fajlbe_input);//hozzáfűzöm az inputot a HTML fájlomhoz
fajlbe_input.type = `file`;//beállítom az input típusát

fajlbe_input.addEventListener(`change`, (e) => {//definiálok egy addeventlistenert, a most létrehozott input change eseményére
    const sajat_fajlunk = e.target.files[0];//eltárolom egy változóban, az eventtarget(inputunk) files tömb propertyjének első elemét(a mi feltöltött fájlunkat)

    const fajlbeolvaso = new FileReader();//példányosítom, a beépített FileReader interfacet

    fajlbeolvaso.readAsText(sajat_fajlunk);//a FileReader Interface példányára(filebeolvaso), meghívom readAsText beépített metódusát, és annak megadom paraméterként a mi fájlunkat

    fajlbeolvaso.onload = (e) => {//a FileReader Interface példányára(fajlbeolvaso) létrehozok egy eseménykezelőt, pontosan a load eseményre az .onload metódus és egy arrow function segítségével
        const fajlunk_contentje = e.target.result;//eltároljuk egy változóban az inputunk propertyjeként a FileReader result propertyjét, amely a beolvasott fájlt egy string tömbként adja vissza nekünk

        const fajlunk_sorai = fajlunk_contentje.split(`\n`);//A most létrehozott string tömböt tördeljük, új soronként
        const koltesek_bevetelek_tombje = [];//létrehozok egy üres tömböt
        for(const line of fajlunk_sorai){//bejárom a string tömb letördelt sorait egy for of ciklusssal
            const elemek = line.split(`;`);//ezeket a letördelt sorokat tovább tördelem elemekre, pontos vesszőként, és ezt eltárolom egy változóban, ez egy string tömb lesz ismét

            const koltes_bevetel = {//definiálom a koltes_bevetel objektumot
                megnevezes: elemek[0],//létrehozom a megnevezes tulajdonságát a koltes_bevetel objektumnak, és értékül adom neki az elemek tömb első elemét
                helyszin: elemek[1],//létrehozom a helyszin tulajdonságát a koltes_bevetel objektumnak, és értékül adom neki az elemek tömb második elemét
                honap: elemek[2],//létrehozom a honap tulajdonságát a koltes_bevetel objektumnak, és értékül adom neki az elemek tömb harmadik elemét
                osszeg: elemek[3]//létrehozom a osszeg tulajdonságát a koltes_bevetel objektumnak, és értékül adom neki az elemek tömb negyedik elemét
            };
            koltesek_bevetelek_tombje.push(koltes_bevetel);//majd a korábban létrehozott üres tömböt feltöltöm ezekkel az objektumokkal

            
        }
        const adattablazat = new DataTable(koltesek_bevetelek_tombje);//példányosítom a DataTable osztályomat, amely egy tömb paramétert vár, és megadom neki a koltesek_bevetelek_tombje tömböt értékül
    };
});
