class Area{

    /**
     * @type {string}
     */
    #cssosztaly;

    /**
     * @type {HTMLDivElement}
     */
    #div;

    //div privát tulajdonság gettere
    get div(){
        return this.#div;
    };

    /**
     * 
     * @param {string} cssosztaly 
     */
    constructor(cssosztaly){
        this.#cssosztaly = cssosztaly;//Beállítjuk a css osztály tulajdonságot
        const kontener = this.gettingDivElements();//eltároljuk a függvény visszatérési értékét egy változóban
        kontener.className = "container";//a divnek, ami a függvényünk visszatérésnek az értéke, megadjuk a container classt

        const child_div = document.createElement('div');//létrehozunk egy új divet
        child_div.className = cssosztaly;//megadjuk neki a constructor bemeneti paraméterét
        kontener.appendChild(child_div);//appendáljuk a container divhez a child divünket
        this.#div = child_div;//majd a div privát tulajdonságunknak megadjuk a child_div értékét
    };

    /**
     * 
     * @returns {HTMLDivElement}
     */
    gettingDivElements(){
        let container = document.querySelector('.container');

        if(container === null){
            container = document.createElement('div');
            document.body.appendChild(container);
        };

        return container;
    };
};


class TableArea extends Area{

    /**
     * @type {Manager}
     */
    #manager;

    /**
     * 
     * @param {string} cssosztaly 
     * @param {Manager} manager 
     * 
     * A constructorban létrehozzuk a táblázatunk egyes nagyobb részeit, és hozzá appendáljuk a child divjükhöz 
     */
    
    constructor(cssosztaly, manager){
        super(cssosztaly);
        this.#manager = manager;
        const tablazat = this.makingHTMLElement('table', this.div, '');
        const tablazatfej = this.makingHTMLElement('thead', tablazat, '');
        const tablazatfejsor = this.makingHTMLElement('tr', tablazatfej, '');
        const tablazatbody = this.makingHTMLElement('tbody', tablazat, ' ');
    



        this.makingHTMLElement('th', tablazatfejsor, 'Név');
        this.makingHTMLElement('th', tablazatfejsor, 'számjegyek száma');
        this.makingHTMLElement('th', tablazatfejsor, 'század');
        

        //meghívom a manager settingAddCallbackjét, amely a formból a táblázatba való pusholásért felel
        manager.settingAddCallBack((author) => {
            const tr = document.createElement('tr');
            tablazatbody.appendChild(tr);
            const td1 = this.makingHTMLElement('td', tr, author.nev);
            const td2 = this.makingHTMLElement('td', tr, author.szamjegyek_szama);
            const td3 = this.makingHTMLElement('td', tr, author.szazad);
        });
    };

    /**
     * 
     * @param {string} htmlelem 
     * @param {HTMLElement} parent 
     * @param {string} innerHTML 
     * @returns {HTMLElement}
     */
    makingHTMLElement(htmlelem, parent, innerHTML){
        const htmlelement = document.createElement(htmlelem);
        htmlelement.innerHTML = innerHTML;
        parent.appendChild(htmlelement);

        return htmlelement;
    };
};


class FormArea extends Area{

    /**
     * @type {FormField[]}
     */
    #formFieldArray;


    /**
     * @type {FormField[]}
     */
    #formfieldek;
    /**
     * @type {Manager}
     */
    #manager;
    /**
     * 
     * @param {String} cssosztaly 
     * @param {FormField[]} formFieldArray
     * @param {Manager} manager  
     */
    constructor(cssosztaly, formFieldArray, manager){
        super(cssosztaly);//meghívom az ősosztály konstruktorát
        this.#formFieldArray = formFieldArray; //beállítom a privát tulajdonságok értékeit
        this.#formfieldek = [];
        this.#manager = manager;
        
        
        const form = this.makingFormHTMLElement('form', this.div, "");//létrehozom a formot
        for(const formmezo of formFieldArray){//bejárom a megkapott formfieldeket
            const formfield = new FormField(formmezo.id, formmezo.label);//példányosítgatom a formfieldeket
            this.#formfieldek.push(formfield);//eltárolom a formfieldeket egy másik tömbben

            form.appendChild(formfield.AppendingtoDivElement());//appendelem a formfieldeket, a formomhoz
        }

       const submit_gombos =  this.makingFormHTMLElement('button', form, 'Hozzáadás');
       submit_gombos.type = 'submit';//megcsinálom a submit gombját a formnak
       form.addEventListener('submit', (e)=> {//az addeventListenerben a form submit eseményét vizsgálom validálom az értékeket
            e.preventDefault();//megakadályozom hogy lefusson az alapértelmezett működés
            console.log(this.#validateFields());
            if(this.#validateFields() === true){
                const formertekek = this.#getValueObject();
                console.log(formertekek);
                const szerzo1 = new Author(this.#getValueObject().nev, this.#getValueObject().szamjegyek_szama, this.#getValueObject().szazad);
    
                manager.add(szerzo1);
            }
            

            e.target.reset(); //resetelem a formom
       });
    };

    /**
     * 
     * @param {string} htmlelem 
     * @param {HTMLElement} parent 
     * @param {string} innerHTML 
     * @returns {HTMLElement}
     */
    makingFormHTMLElement(htmlelem, parent, innerHTML){
        const htmlelement = document.createElement(htmlelem);
        htmlelement.innerHTML = innerHTML;
        parent.appendChild(htmlelement);

        return htmlelement;
    };

    /**
     * 
     * @returns {FormField}
     */
    #getValueObject(){
        const ertektempobj = {};
        for(const formfield of this.#formfieldek){
            ertektempobj[formfield.id] = formfield.value;
        };

        return ertektempobj;
    };

    /**
     * 
     * @returns {boolean}
     */
    #validateFields(){
        let validating = true;
        for(const formfield of this.#formfieldek){
            formfield.error = '';
            if(formfield.value === ''){
                validating = false;
                formfield.error = 'A mező nem lehet üres!';

            };
        };
        return validating;
    }


};

class FormField{

    /**
     * @type {string}
     */
    #id;

    /**
     * @type {HTMLLabelElement}
     */
    #label;

    /**
     * @type {HTMLInputElement}
     */
    #input;

    /**
     * @type {HTMLSpanElement}
     */
    #error;
    

    get id(){
        return this.#id;
    }
    get label(){
        return this.#label;
    };

    get input(){
        return this.#input;
    };
    get value(){
        return this.#input.value;
    }
    get error(){
        return this.#error;
    };

    set label(label1){
        this.#label = label1;
    };

    set input(input1){
        this.#input = input1;
    };

    set error(error1){
        this.#error.textContent = error1;
    };


    /**
     * 
     * @param {string} labelCont 
     */
    constructor(id,labelCont){
        this.#id = id;


        const label1 = document.createElement('label');
        label1.for = id;
        label1.textContent = labelCont;
        this.#label = label1;

        const input1 = document.createElement('input');
        input1.type = 'text';
        input1.id = id;
        this.#input = input1;

        const error = document.createElement('span');
        error.className = 'error';
        this.#error = error;

    };

    /**
     * A form elemeit, egy divbe kerülnek sortörésekkel együtt, majd, ezeket a diveket a formba appendolom
     * @returns {HTMLDivElement}
     */
    AppendingtoDivElement(){
        const field_div = document.createElement('div');
        const break_1 = document.createElement('br');
        const break_2 = document.createElement('br');
        field_div.className = 'field';
        field_div.appendChild(this.#label);
        field_div.appendChild(break_1);
        field_div.appendChild(this.#input);
        field_div.appendChild(break_2);
        field_div.appendChild(this.#error);

        return field_div;
    }
};