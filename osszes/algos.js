class Algo{
    /**
     * @type {FormArea}
     */
    #formarea;
    #Szures_RenderCallback;
    settingSzures_RenderCallback(bem_par_callback){
        this.#Szures_RenderCallback = bem_par_callback;
    }
    constructor(form_be_area){
        this.#formarea = form_be_area;
        const eventback = this.#FilterAndOrderEventMethod();
        this.#formarea.form.addEventListener('submit',eventback);
    }
    filterBy(callback_bem_param){
        const szures_eredmeny = [];
        for(let i = 0; i < this.#formarea.fajltar.length; i++){
            if(callback_bem_param(this.#formarea.fajltar[i])){
                szures_eredmeny.push(this.#formarea.fajltar[i]);
            }
        };
        this.#Szures_RenderCallback(szures_eredmeny);
    };

    orderBy(rend_callback_bem){
        const rendezes_tomb = [];
        for(const sor of this.#formarea.fajltar){
            rendezes_tomb.push(sor);
        }

        for(let i = 0; i < rendezes_tomb.length; i++){
            for(let j = i + 1; j < rendezes_tomb.length; j++){
                if(rend_callback_bem(rendezes_tomb[i], rendezes_tomb[j])){
                    const temp = rendezes_tomb[i];
                    rendezes_tomb[i] = rendezes_tomb[j];
                    rendezes_tomb[j] = temp;
                }
            }
        };
        this.#Szures_RenderCallback(rendezes_tomb);
    };
    #FilterAndOrderEventMethod(){
        return (e) => {
            e.preventDefault()
            const megnevezes_input_v = this.#formarea.megnevezes_input.value;
            const select_v = this.#formarea.honap_select.value;
            const koltseg_input_v = this.#formarea.koltseg_input.value;

            const sorba_irany_v = this.#formarea.sorba_irany.value;
            const sorba_szempont_v = this.#formarea.sorba_szempont.value;

            if(megnevezes_input_v || select_v || koltseg_input_v && !sorba_irany_v || sorba_szempont_v){
                this.filterBy((result_kolt) => {
                    let eredmenytarolo = false;

                    if(megnevezes_input_v == "" || result_kolt.megnevezes.includes(megnevezes_input_v)){
                        eredmenytarolo = true;
                    }
                    else{
                        eredmenytarolo = false;
                    }
                    if(eredmenytarolo){
                        if(!select_v || select_v == result_kolt.honap){
                            eredmenytarolo = true;
                        }
                        else{
                            eredmenytarolo = false;
                        }
                    }
                    if(eredmenytarolo){
                        if(!koltseg_input_v || String(result_kolt.koltseg).includes(koltseg_input_v)){
                            eredmenytarolo = true;
                        }
                        else{
                            eredmenytarolo = false;
                        }
                    }

                    return eredmenytarolo;
                                
                });
                
            }
            if(!megnevezes_input_v || select_v || koltseg_input_v && sorba_irany_v || sorba_szempont_v){
                this.orderBy((rendez_koltes1, rendezkoltes2) => {
                    let rendezes_eredmeny_tar = false;
                    let ertek_1 = rendez_koltes1[sorba_szempont_v];
                    let ertek_2 = rendezkoltes2[sorba_szempont_v];

                    if(sorba_szempont_v !== "koltseg"){
                        if(sorba_irany_v == "csokkeno" && ertek_1.localeCompare(ertek_2) < 0){
                            rendezes_eredmeny_tar = true;
                        }
                        else if(sorba_irany_v == "novekvo" && ertek_1.localeCompare(ertek_2) > 0){
                            rendezes_eredmeny_tar = true;
                        }
                    }
                    else if(sorba_szempont_v == "koltseg" && sorba_irany_v == "csokkeno"){
                        if(ertek_1 < ertek_2){
                            rendezes_eredmeny_tar = true;
                        }
                    }
                    else if(sorba_szempont_v == "koltseg" && sorba_irany_v == "novekvo"){
                        if(ertek_1 > ertek_2){
                            rendezes_eredmeny_tar = true;
                        }
                    }
                    return rendezes_eredmeny_tar;
                });
            }
        }
    }

};

class EasyAlgos{
    /**
     * @type {FormArea}
     */
    #formarea1;
    constructor(form_be_resz){
       
        this.#formarea1 = form_be_resz;
  
    };

    #osszeg(tomb_param){
        let poz_szamlalo = 0;
        let negativ_szamlalo = 0;

        for(let i = 0; i < tomb_param.length; i++){
            if(tomb_param[i].koltseg > 0){
                poz_szamlalo += tomb_param[i].koltseg;
            }
            else if(tomb_param[i].koltseg < 0){
                negativ_szamlalo += tomb_param[i].koltseg;
            }
        };

        return [poz_szamlalo, negativ_szamlalo]
    };
    #szamlalas(bem_tomb){
        let szamlalo = 0;
        for(let i = 0; i < bem_tomb.length; i++){
            szamlalo++;
        }

        return szamlalo;
    }

    osszegkiiratas(){
        this.#HTMLElemMakerWithText('div', document.body, `A bevételek és kiadások összege vesszővel elválasztva: ${this.#osszeg(this.#formarea1.fajltar)}`);
    }

    szamlalaskiiratas(){
        this.#HTMLElemMakerWithText('div', document.body, `Az összes tranzakció száma: ${this.#szamlalas(this.#formarea1.fajltar)}`);
    }
    /**
     * 
     * @param {String} htmlElem 
     * @param {HTMLElement} parent 
     * @param {String} textcontent
     */
    #HTMLElemMakerWithText(htmlElem, parent, textcontent){
        const htmlelem = document.createElement(htmlElem);
        htmlelem.textContent = textcontent;
        parent.appendChild(htmlelem);

        return htmlelem;
    
    };
};