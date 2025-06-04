class Area{

    #fejlectomb;

    #easy_algos;
    #algos;
    /**
     * 
     * @param {FormArea} form_area 
     */
    #form_area;

    /**
     * 
     * @param {FormArea} form_area
     * @param {EasyAlgos} e_algos
     * @param {Algo} algo_1   
     */
    constructor(form_area, e_algos, algo_1){
        this.#form_area = form_area;
        this.#easy_algos = e_algos;
        this.#algos = algo_1;
        this.#fejlectomb = [
            {
                textcontent: 'Megnevezés'
            },
            {
                textcontent: 'hely',
            },
            {
                textcontent: 'hónap'
            },
            {
                textcontent: 'összeg'
            },
        ];

        const table = this.#HTMLElementMakerWithParent('table', document.body);
        const thead = this.#HTMLElementMakerWithParent('thead', table);
        const tbody = this.#HTMLElementMakerWithParent('tbody', table);
        const thead_tr = this.#HTMLElementMakerWithParent('tr', thead);

        for(const fejlec_cella of this.#fejlectomb){
            this.#HTMLElementMakerWithParentAndTextContent('td', thead_tr, fejlec_cella.textcontent);
        };

        this.#form_area.settingTableCallBack((fajl_tomb) => {
            for(const fajlsor of fajl_tomb){
                const tbody_tr = this.#HTMLElementMakerWithParent('tr', tbody);
                this.#HTMLElementMakerWithParentAndTextContent('td', tbody_tr, fajlsor.megnevezes);
                this.#HTMLElementMakerWithParentAndTextContent('td', tbody_tr, fajlsor.helyszin);
                this.#HTMLElementMakerWithParentAndTextContent('td', tbody_tr, fajlsor.honap);
                const koltseg_cella = this.#HTMLElementMakerWithParentAndTextContent('td', tbody_tr, fajlsor.koltseg);

                if(fajlsor.koltseg < 0){
                    koltseg_cella.classList.add('red');
                }
                else{
                    koltseg_cella.classList.add('green');
                };

               
            }
             this.#easy_algos.osszegkiiratas();
             this.#easy_algos.szamlalaskiiratas();
        });

        this.#algos.settingSzures_RenderCallback((szures_er_tomb) => {
            tbody.textContent = "";
            for(const eredmeny of szures_er_tomb){
                const szures_tr = this.#HTMLElementMakerWithParent('tr', tbody);
                this.#HTMLElementMakerWithParentAndTextContent('td', szures_tr, eredmeny.megnevezes);
                this.#HTMLElementMakerWithParentAndTextContent('td', szures_tr, eredmeny.helyszin);
                this.#HTMLElementMakerWithParentAndTextContent('td', szures_tr, eredmeny.honap);
                const koltseg_cella_szur = this.#HTMLElementMakerWithParentAndTextContent('td', szures_tr, eredmeny.koltseg);


                if(eredmeny.koltseg < 0){
                    koltseg_cella_szur.classList.add('red');
                }
                else{
                    koltseg_cella_szur.classList.add('green');
                };
            }


        });
        
    };

    /**
     * 
     * @param {String} htmlElem 
     * @param {HTMLElement} parent 
     */
    #HTMLElementMakerWithParent(htmlElem, parent){
        const htmlelem = document.createElement(htmlElem);
        parent.appendChild(htmlelem);

        return htmlelem;
    };


    /**
     * 
     * @param {String} htmlElem 
     * @param {HTMLElement} parent 
     * @param {String} textcontent
     */
    #HTMLElementMakerWithParentAndTextContent(htmlElem, parent, textcontent){
        const htmlelem = document.createElement(htmlElem);
        htmlelem.textContent = textcontent;
        parent.appendChild(htmlelem);

        return htmlelem;
    };
    
};

class FormArea{

    #fajltart;
    #optionvaluek;
    #sorbarendszpont;
    #sorbarendezesoptionok_tomb;
    #tableCallback;
    #form;

    #megnevezes_inp;
    #honaposselect;
    #koltseg_inp;
    #sorba_szempont;
    #sorba_irany;

    get form(){
        return this.#form;
    }

    get fajltar(){
        return this.#fajltart;
    }
    get megnevezes_input(){
        return this.#megnevezes_inp;
    }
    get honap_select(){
        return this.#honaposselect;
    }

    get koltseg_input(){
        return this.#koltseg_inp;
    }
    get sorba_szempont(){
        return this.#sorba_szempont;
    }
    get sorba_irany(){
        return this.#sorba_irany;
    }

    /**
     * 
     * @param {HTMLOptionElement[]} optionok 
     */
    constructor(optionok, optionoktomb2){
        this.#fajltart = [];
        this.#sorbarendszpont = optionoktomb2;
        this.#optionvaluek = optionok;
        this.#sorbarendezesoptionok_tomb = [
            {
                value: 'csokkeno',
                textcontent: 'Csökkenő'
            },
            {
                value: 'novekvo',
                textcontent: 'Növekvő'
            }
        ];
        const download_input = this.#InputMakerMethod('file','download', document.body);
        console.log(download_input);
        download_input.addEventListener('change', this.#DownloadInputEventMethod());

        const form = this.#HTMLElementMakerWithParent1('form', document.body);
        this.#form = form;
        this.#labelMakerMethod('megnevezes', form, 'Megnevezés: ')
        this.#brMaker(form);
        const megnevezes_input = this.#InputMakerMethod('text', 'megnevezes', form);
        this.#megnevezes_inp = megnevezes_input;
        this.#brMaker(form);
        this.#labelMakerMethod('honap', form, 'hónap: ');
        this.#brMaker(form);
        const honap_select =  this.#HTMLElementMakerWithParent1('select', form);
        this.#honaposselect = honap_select;
       honap_select.id = 'honap';
        for(const option_elem of this.#optionvaluek){
            this.#OptionMaker(option_elem.value, option_elem.text, honap_select);
        };
        this.#brMaker(form);
        this.#labelMakerMethod('koltseg', form, 'összeg: ');
        this.#brMaker(form);
       const koltseg_input = this.#InputMakerMethod('text', 'koltseg', form);
       this.#koltseg_inp = koltseg_input;
        this.#brMaker(form);

        
        const sorba_select = this.#HTMLElementMakerWithParent1('select', form);
        this.#sorba_irany = sorba_select;
        for(const option1 of this.#sorbarendezesoptionok_tomb){
            this.#OptionMaker(option1.value, option1.textcontent, sorba_select);
        }
     
        const select_sorba_szempontok = this.#HTMLElementMakerWithParent1('select', form);
        this.#sorba_szempont = select_sorba_szempontok;
        for(const value of this.#sorbarendszpont){
            this.#OptionMaker(value.value, value.innerHTML, select_sorba_szempontok);
        };
        this.#buttonMaker('submit', form, 'elküld');
   


    };
    
    settingTableCallBack(callback_param){
        this.#tableCallback = callback_param;
    }
    /**
     * 
     * @param {String} input_type 
     * @param {HTMLElement} parent 
     */
    #InputMakerMethod(input_type, input_id, parent){
        const input_1 = document.createElement('input');
        input_1.id = input_id;
        input_1.type = input_type;
        parent.appendChild(input_1);

        return input_1;
    };
    /**
     * 
     * @param {String} label_for 
     * @param {HTMLElement} parent 
     * @param {String} textcontent 
     * @returns {HTMLLabelElement}
     */
    #labelMakerMethod(label_for, parent, textcontent){
        const label = document.createElement('label');
        label.textContent = textcontent;
        label.htmlFor = label_for;
        parent.appendChild(label);

        return label
    };

    /**
     * 
     * @param {HTMLElement} parent 
     */
    #brMaker(parent){
        const br = document.createElement('br');
        parent.appendChild(br);

        return br;
    };

    /**
     * 
     * @param {String} buttontype 
     * @param {HTMLElement} buttonparent 
     * @param {String} buttontcontent 
     * @returns {HTMLButtonElement}
     */
    #buttonMaker(buttontype, buttonparent, buttontcontent){
        const button = document.createElement('button');
        button.textContent = buttontcontent;
        button.type = buttontype;
        buttonparent.appendChild(button);

        return button;
    }

    /**
     * 
     * @param {string} optionvalue 
     * @param {string} optionText 
     * @param {HTMLSelectElement} parent2
     * @returns {HTMLOptionElement}
     */
    #OptionMaker(optionvalue, optionText, parent2){
        const option = document.createElement('option');
        option.value = optionvalue;
        option.textContent = optionText;
        parent2.appendChild(option);
        

        return option;
    }

    /**
     * 
     * @param {String} htmlElem 
     * @param {HTMLElement} parent 
     */
    #HTMLElementMakerWithParent1(htmlElem, parent){
        const htmlelem = document.createElement(htmlElem);
        parent.appendChild(htmlelem);

        return htmlelem;
    };
    #DownloadInputEventMethod(){
        return (e) => {
            const sajat_fajl = e.target.files[0];

            const filereader_1 = new FileReader();
            filereader_1.readAsText(sajat_fajl);
            filereader_1.onload = (e) => {
                const sajat_fajl_tart = filereader_1.result;
                const sajatfajlunksorai = sajat_fajl_tart.split('\n');
                for(const sor of sajatfajlunksorai){
                    const trimmer = sor.trim();
                    if(trimmer !== ''){
                        const sor_elemei = sor.split(';');
                        const penz = {
                            megnevezes: sor_elemei[0],
                            helyszin: sor_elemei[1],
                            honap: sor_elemei[2],
                            koltseg: parseInt(sor_elemei[3]),
                        };
                        this.#fajltart.push(penz);
                    }

                };
                this.#tableCallback(this.#fajltart);
            };

        }
    };

}