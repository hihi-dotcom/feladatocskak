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

};





const fajlbe_input = document.createElement(`input`);
document.body.appendChild(fajlbe_input);
fajlbe_input.type = `file`;

fajlbe_input.addEventListener(`change`, (e) => {
    const sajat_fajlunk = e.target.files[0];

    const fajlbeolvaso = new FileReader();

    fajlbeolvaso.readAsText(sajat_fajlunk);

    fajlbeolvaso.onload = (e) => {
        const fajlunk_contentje = e.target.result;

        const fajlunk_sorai = fajlunk_contentje.split(`\n`);
        const koltesek_bevetelek_tombje = [];
        for(const line of fajlunk_sorai){
            const elemek = line.split(`;`);

            const koltes_bevetel = {
                megnevezes: elemek[0],
                helyszin: elemek[1],
                honap: elemek[2],
                osszeg: elemek[3]
            };
            koltesek_bevetelek_tombje.push(koltes_bevetel);

            
        }
        const adattablazat = new DataTable(koltesek_bevetelek_tombje);
    };
});
