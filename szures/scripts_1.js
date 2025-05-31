class Data_to_Table{

   #renderCallback;
   #array;

   settingRenderCallback(callback007){
    this.#renderCallback = callback007;
   }
    constructor(bejovo_tomb){
        this.#array = bejovo_tomb;
        const table = this.HTMLElementMakerWithParent('table', document.body);
        const thead = this.HTMLElementMakerWithParent('thead', table);
        const fejtr = this.HTMLElementMakerWithParent('tr', thead);
        const tbody = this.HTMLElementMakerWithParent('tbody', table); 
        
        const fejlec_tomb = [
            {
                Text: 'Megnevezés',
                parent: fejtr,
            },
            {
                Text: 'Hely',
                parent: fejtr,
            },
            {
                Text: 'Hónap',
                parent: fejtr,
            },
            {
                Text: 'Összeg',
                parent: fejtr,
            },
        ];

        for(const fejlecobj of fejlec_tomb){
            this.HTMLElementMakerWithParentAndTContent('th', fejlecobj.Text, fejlecobj.parent);
        };
        this.TableCompleter(bejovo_tomb, tbody);

        this.settingRenderCallback((result_termekek) => {
            tbody.innerHTML = "";
            for(const termek of result_termekek){
                const tr3 = this.HTMLElementMakerWithParent('tr', tbody);
                this.HTMLElementMakerWithParentAndTContent('td', termek.megnevezes, tr3);
                this.HTMLElementMakerWithParentAndTContent('td', termek.aruhaz, tr3);
                this.HTMLElementMakerWithParentAndTContent('td', termek.honap, tr3);
               const tdosszeg =  this.HTMLElementMakerWithParentAndTContent('td', termek.osszeg, tr3);

                            
                if(termek.osszeg < 0){
                    tdosszeg.classList.add(`red`);
                }
                else{
                    tdosszeg.classList.add(`green`);
                };
            }
        });

    };

    /**
     * 
     * @param {String} ElementName 
     * @param {HTMLTableElement} Parent 
     * @returns {HTMLElement}
     */
    HTMLElementMakerWithParent(ElementName, Parent){
        const HTMLelem = document.createElement(ElementName);
        Parent.appendChild(HTMLelem);

        return HTMLelem;
    };

    /**
     * 
     * @param {String} ElementName 
     * @param {String} TextContent 
     * @param {HTMLElement} Parent 
     * @returns 
     */
    HTMLElementMakerWithParentAndTContent(ElementName,TextContent, Parent){
        const HTMLelem = document.createElement(ElementName);
        HTMLelem.textContent = TextContent;
        Parent.appendChild(HTMLelem);

        return HTMLelem;
    };

    TableCompleter(termekek_tombje1, parent){
        
        for(const termek of termekek_tombje1){
            const tr1 = this.HTMLElementMakerWithParent('tr', parent);
            this.HTMLElementMakerWithParentAndTContent('td', termek.megnevezes, tr1);
            this.HTMLElementMakerWithParentAndTContent('td', termek.aruhaz, tr1);
            this.HTMLElementMakerWithParentAndTContent('td', termek.honap, tr1);
           const osszegtd =  this.HTMLElementMakerWithParentAndTContent('td', termek.osszeg, tr1);
     
      
        if(termek.osszeg < 0){
            osszegtd.classList.add(`red`);
        }
        else{
            osszegtd.classList.add(`green`);
        };
          
        };
    };

     filterBy(callback_bemenetiparam){
        const result_ok = [];
        for(let i = 0; i < this.#array.length; i++){
            if(callback_bemenetiparam(this.#array[i])){
                result_ok.push(this.#array[i]);
            };
        };

        this.#renderCallback(result_ok);
    };

    DefaultRendering(){
        this.#renderCallback(this.#array);
    }



        

};

let AdatTabla = 0;
const fajl_input2 = document.createElement('input');
        document.body.appendChild(fajl_input2);
        fajl_input2.type = 'file';


        fajl_input2.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
            const termekek_tombje = [];
            reader.onload = () => {
            const sorsz = reader.result.split('\n');
            for(const sor of sorsz){
                const trimming = sor.trim();
                if(trimming !== ''){
                    const mezok = trimming.split(';');

                    const termek = {
                        megnevezes: mezok[0],
                        aruhaz: mezok[1],
                        honap: mezok[2],
                        osszeg: parseInt(mezok[3])
                    }
                    termekek_tombje.push(termek)
                }
          
                
            }
           AdatTabla = new Data_to_Table(termekek_tombje);
            };  
           
});


        const form = document.createElement('form');
        document.body.appendChild(form);

        const label = document.createElement('label');
        const br1 = document.createElement('br');
        
        form.appendChild(label);
        form.appendChild(br1);
        label.textContent = "Megnevezés: ";
        label.htmlFor = "megnevezes";

        

        const megnevezesinput = document.createElement('input');
        form.appendChild(megnevezesinput);
        megnevezesinput.type = "text";
        megnevezesinput.id = "megnevezes"

        
        const label_honap = document.createElement('label');
        label_honap.htmlFor = 'honap';
        label_honap.textContent = 'hónap: '

       const br2 = document.createElement('br');

        form.appendChild(br2)
        form.appendChild(label_honap);
        
        const select = document.createElement('select');
        select.id = 'honap';
      
        form.appendChild(select);

        const optionertekek = [
            {
                value: '',
                text: 'üres',
            },
            {
                value: 'jan',
                text: 'Január',
            },
            {
                value: 'feb',
                text: 'Február',
            },
            {
                value: 'mar',
                text: 'Március',
            },
            {
                value: 'apr',
                text: 'Április',
            },
            {
                value: 'maj',
                text: 'Május',
            },
            {
                value: 'jun',
                text: 'Június',
            },
            {
                value: 'jul',
                text: 'Július',
            },
            {
                value: 'aug',
                text: 'Augusztus',
            },
            {
                value: 'sep',
                text: 'Szeptember',
            },
            {
                value: 'okt',
                text: 'Október',
            },
            {
                value: 'nov',
                text: 'November',
            },
            {
                value: 'dec',
                text: 'December'
            },
            
        ];

        for(const opt of optionertekek){
            OptionMaker(opt.value, opt.text, select);
        }
        
        const br4 = document.createElement('br');
        form.appendChild(br4);
        
        const label_osszeg = document.createElement('label');
        const br3 = document.createElement('br');
        
        form.appendChild(label_osszeg);
        form.appendChild(br3);
        label_osszeg.textContent = "Összeg: ";
        label_osszeg.htmlFor = "osszeg";

        

        const osszeginput = document.createElement('input');
        form.appendChild(osszeginput);
        osszeginput.type = "text";
        osszeginput.id = "osszeg"

        const br5 = document.createElement('br');
        form.appendChild(br5);

        const button_submit = document.createElement('button');
        button_submit.type = 'submit';
        button_submit.textContent = 'szűrés';
        form.appendChild(button_submit);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const megnevezes_input_value = megnevezesinput.value;

            const osszeg_input_value = Number(osszeginput.value);

            AdatTabla.filterBy((result_termek) => {
                    let resulttarolo = false;
                    if(result_termek.megnevezes.includes(megnevezes_input_value) && result_termek.osszeg === osszeg_input_value && select.value === result_termek.honap){
                        resulttarolo = true;
                    }
                    if(megnevezes_input_value == "" && osszeg_input_value == "" && select.value == ''){
                        AdatTabla.DefaultRendering();
                        resulttarolo = true;
                    }
                    return resulttarolo;
            });
        });
    /**
     * 
     * @param {string} optionvalue 
     * @param {string} optionText 
     * @param {HTMLSelectElement} parent2
     * @returns 
     */
function OptionMaker(optionvalue, optionText, parent2){


        const option = document.createElement('option');
        option.value = optionvalue;
        option.textContent = optionText;
        parent2.appendChild(option);
        

        return option;
};




      