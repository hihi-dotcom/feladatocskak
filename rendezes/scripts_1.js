class DataToTable{
    tomb;

    constructor(at_tomb){
        this.tomb = at_tomb;

        const table = this.htmlElementMaker(`table`,``, document.body);
        const thead = this.htmlElementMaker(`thead`,``, table);
        const tbody = this.htmlElementMaker(`tbody`,``, table);

        this.htmlElementMaker(`th`, `Megnevezés`, thead);
        this.htmlElementMaker(`th`, `Helyszín`, thead);
        this.htmlElementMaker(`th`, `Hónap`, thead);
        this.htmlElementMaker(`th`, `Összeg`, thead);

        for(const element of at_tomb){
            const tr = this.htmlElementMaker(`tr`, ``, tbody);
            this.htmlElementMaker(`td`, element.megnevezes, tr);
            this.htmlElementMaker(`td`, element.helyszin, tr);
            this.htmlElementMaker(`td`, element.honap, tr);
         const koltseg = this.htmlElementMaker(`td`, element.koltseg, tr);
         this.renderingmoney(element, koltseg);
        }
    };

    htmlElementMaker(htmlelemtype, innerhtml, parent){
        const htmlelement = document.createElement(htmlelemtype);
        htmlelement.innerHTML = innerhtml;
        parent.appendChild(htmlelement);

        return htmlelement;
    };

    /**
     * 
     * @param {Array} kolt_bevektombje 
     * @param {HTMLElement} htmlelem 
     */
    renderingmoney(kolt_bev, htmlelem){
            if(kolt_bev.koltseg < 0){
                htmlelem.classList.add(`red`);
            }
            else if(kolt_bev.koltseg > 0){
                htmlelem.classList.add(`green`);
            }
    }
};





const input_file = document.createElement(`input`);
input_file.type = `file`;
document.body.appendChild(input_file);

input_file.addEventListener(`change`, (e) => {
    const sajatfile = e.target.files[0];

    const fajlbeolvaso = new FileReader();

    fajlbeolvaso.readAsText(sajatfile);
    fajlbeolvaso.onload = (e) => {
        const sajat_fajltart = fajlbeolvaso.result;
        const sajatfajlunksorai = sajat_fajltart.split('\n');
        const kolt_bevetel_tomb = [];
        for(const sor of sajatfajlunksorai){
            const sorelemek = sor.split(';');
            const kolt_bevetel= {
                megnevezes: sorelemek[0],
                helyszin: sorelemek[1],
                honap: sorelemek[2],
                koltseg: sorelemek[3],
            }
            kolt_bevetel_tomb.push(kolt_bevetel);
            
        };
        const adattablazat = new DataToTable(kolt_bevetel_tomb);
        console.log(kolt_bevetel_tomb);
    };
});
