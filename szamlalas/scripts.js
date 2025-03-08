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

        const th_megnevezes = document.createElement(`th`);
        th_megnevezes.innerHTML = `Megnevezés`;
        t_head_sor.appendChild(th_megnevezes);

        const th_helyszin = document.createElement(`th`);
        th_helyszin.innerHTML = `Helyszín`;
        t_head_sor.appendChild(th_helyszin);

        const th_honap = document.createElement(`th`);
        th_honap.innerHTML = `Hónap`;
        t_head_sor.appendChild(th_honap);

        const th_osszeg = document.createElement(`th`);
        th_osszeg.innerHTML = `Összeg`;
        t_head_sor.appendChild(th_osszeg);

        this.render_Tablazat(kolt_bev_tomb);
    };


    render_Tablazat(koltseg_bevetel_tomb){
        this.tbody.innerHTML = ``;

        for(const kolt_bev of koltseg_bevetel_tomb){
            const body_sor = document.createElement(`tr`);
            this.tbody.appendChild(body_sor);

            const elso_cella = document.createElement(`td`);
            body_sor.appendChild(elso_cella);
            elso_cella.innerHTML = kolt_bev.megnevezes;

            const masodik_cella = document.createElement(`td`);
            body_sor.appendChild(masodik_cella);
            masodik_cella.innerHTML = kolt_bev.helyszin;

            const harmadik_cella = document.createElement(`td`);
            body_sor.appendChild(harmadik_cella);
            harmadik_cella.innerHTML = kolt_bev.honap;

            const negyedik_cella = document.createElement(`td`);
            body_sor.appendChild(negyedik_cella);
            negyedik_cella.innerHTML = kolt_bev.osszeg;
        };
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

            const adattablazat = new DataTable(koltesek_bevetelek_tombje);
        }
    };
});
