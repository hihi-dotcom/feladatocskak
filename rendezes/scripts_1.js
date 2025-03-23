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
        this.htmlElementMaker(`th`, `Összeg`, thead)

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

class Area{

    valuesarray;
    csokkenovagynovekvoarray;
    constructor(){
     const form = document.createElement("form");
     document.body.appendChild(form);

     const select_elem = document.createElement("select");
     form.appendChild(select_elem);

     const csokkenovagynovekvo = document.createElement("select");
     form.appendChild(csokkenovagynovekvo);
       this.valuesarray = [
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
       this.csokkenovagynovekvoarray = [
            {value: "csokkeno",
            innerHTML:"Csökkenő"
            },
            {
                value: "novekvo",
                innerHTML: "Növekvő"
            }
       ];
       for(const ertek of this.valuesarray){
        this.optionHTMLElementMaker(ertek,select_elem)
       };
       for(const ertek of this.csokkenovagynovekvoarray){
        this.optionHTMLElementMaker(ertek,csokkenovagynovekvo)
        };

        const submitgomb = document.createElement("button");
        form.appendChild(submitgomb);
        submitgomb.innerHTML = "Rendezés";
        submitgomb.type = "submit";

        submitgomb.addEventListener(`submit`, (e) => {
            e.preventDefault();
            for(const kolt_bev of this.tomb){
                this.selectkivalasztas(select_elem, 'Hónap',)
            }
            

        });
    };

    

    optionHTMLElementMaker(valuearrayelement, parent){
        const opcio = document.createElement("option");
        opcio.value = valuearrayelement.value;
        opcio.innerHTML = valuearrayelement.innerHTML;
        parent.appendChild(opcio);

        return opcio;
    };

    /**
     * @param {function (koltseg, koltseg):boolean} rendezo_callback 
     */
    orderBy(rendezo_callback){
        const result_rendezes = [];

        for(const koltseg of this.tomb){
            result_rendezes.push(koltseg);
        }
        for(let a = 0; a < result_rendezes.length; a++){
            
            for(let j = a + 1; j < result_rendezes.length; j++){
                if(rendezo_callback(result_rendezes[i], result_rendezes[j])){
                    const temp = result_rendezes[i];
                    result_rendezes[i] = result_rendezes[j];
                    result_rendezes[j] = temp;
                };
            };
            
        };
    };

/**
 * 
 * @param {HTMLElement} selectrendezo 
 * @param {string} vizsgalnikivantmegnevezes 
 * @param {function(koltseg, koltseg):boolean} rendezofuggveny 
 */
    selectkivalasztas(selectrendezo, vizsgalnikivantmegnevezes, property1,){
        if(selectrendezo.value === vizsgalnikivantmegnevezes){
            this.orderBy((koltseg1, koltseg2) => {
                return koltseg1.property1.localCompare(koltseg2.property1)
            });
        };
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

const arena = new Area();