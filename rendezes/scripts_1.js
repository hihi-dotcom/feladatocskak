class DataToTable{
 
   #area;
    constructor(area){
        this.#area = area;
        const table = this.htmlElementMaker(`table`,``, document.body);
        const thead = this.htmlElementMaker(`thead`,``, table);
        const tbody = this.htmlElementMaker(`tbody`,``, table);

        this.htmlElementMaker(`th`, `Megnevezés`, thead);
        this.htmlElementMaker(`th`, `Helyszín`, thead);
        this.htmlElementMaker(`th`, `Hónap`, thead);
        this.htmlElementMaker(`th`, `Összeg`, thead)

        this.#area.settingTableCallback((tomb) => {
            for(const element of tomb){
           
            const tr = this.htmlElementMaker(`tr`, ``, tbody);
            this.htmlElementMaker(`td`, element.megnevezes, tr);
            this.htmlElementMaker(`td`, element.helyszin, tr);
            this.htmlElementMaker(`td`, element.honap, tr);
            const koltseg = this.htmlElementMaker(`td`, element.koltseg, tr);
         this.renderingmoney(element, koltseg);
        }
        });

        this.#area.settingRenderCallback((rendezett_tomb) => {
            tbody.innerHTML = '';
            for(const elem of rendezett_tomb){
                const tr_rendezett = this.htmlElementMaker('tr', '', tbody);
                this.htmlElementMaker('td', elem.megnevezes, tr_rendezett);
                this.htmlElementMaker('td', elem.helyszin, tr_rendezett);
                this.htmlElementMaker('td', elem.honap, tr_rendezett);
                const koltseges = this.htmlElementMaker('td', elem.koltseg, tr_rendezett);
                this.renderingmoney(elem, koltseges);
            }
        });

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
     #RenderCallback;
     #fajltomb;
     #TableCallback;

     get fajltomb(){
        return this.#fajltomb;
     }

    settingRenderCallback(bem_callback){
        this.#RenderCallback = bem_callback;
    }
    settingTableCallback(bem1_callback){
        this.#TableCallback = bem1_callback;
    }
    constructor(){
        this.#fajltomb = [];
        this.Downloading();
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

        form.addEventListener(`submit`, (e) => {
            e.preventDefault();

            this.orderBy((koltseg1, koltseg2) => {
                let ertek_tarolo = false;
                let value_1 = koltseg1[select_elem.value];
                let value_2 = koltseg2[select_elem.value];
                if(select_elem.value !== "koltseg"){
                    if(csokkenovagynovekvo.value === "csokkeno" && value_1.localeCompare(value_2) < 0){
                        ertek_tarolo = true;
                    }
                    else if(csokkenovagynovekvo.value === "novekvo" && value_1.localeCompare(value_2) > 0){
                        ertek_tarolo = true;
                    }
                }
                else if(select_elem.value == "koltseg" && csokkenovagynovekvo.value == "csokkeno"){
                        if(value_1 < value_2){
                            ertek_tarolo = true;
                        }
                }
                else if(select_elem.value == "koltseg" && csokkenovagynovekvo.value == "novekvo"){
                    if(value_1 > value_2){
                        ertek_tarolo = true;
                    }
                }
                return ertek_tarolo;
            });
            

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

        for(const koltseg of this.#fajltomb){
            result_rendezes.push(koltseg);
        }
        for(let a = 0; a < result_rendezes.length; a++){
            
            for(let j = a + 1; j < result_rendezes.length; j++){
                if(rendezo_callback(result_rendezes[a], result_rendezes[j])){
                    const temp = result_rendezes[a];
                    result_rendezes[a] = result_rendezes[j];
                    result_rendezes[j] = temp;
                };
            };
            
        };
       this.#RenderCallback(result_rendezes);
    };
    Downloading(){
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
                    const trimmer = sor.trim();
                    if(trimmer !== ''){
                        const sorelemek = sor.split(';');
                        const kolt_bevetel= {
                            megnevezes: sorelemek[0],
                            helyszin: sorelemek[1],
                            honap: sorelemek[2],
                            koltseg: parseInt(sorelemek[3]),
                        }
                        this.#fajltomb.push(kolt_bevetel);
                        
                    }

                };
                this.#TableCallback(this.#fajltomb);
            };
        });
    };


};





const arena = new Area();
const adat_to_t = new DataToTable(arena);