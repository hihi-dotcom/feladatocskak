class FormController{

    /**
     * @type {Manager}
     */
    #manager;

    /**
     * @type {FormField[]}
     */
    #formFieldArray;

    /**
     * 
     * @param {Manager} manager 
     * @param {{id:string, label:string}[]} formfieldConf 
     */
    constructor(manager, formfieldConf){
        this.#manager = manager;
        this.#formFieldArray = [];

        const form = document.createElement('form');
        document.body.appendChild(form);
        for(const formfield of formfieldConf){
            const formmezo = new FormField(formfield.id, formfield.label);

            this.#formFieldArray.push(formmezo);

            form.appendChild(formmezo.getDivElement());
        };

        const submitgombos = document.createElement('button');
        submitgombos.textContent = 'Hozzáadás';

        form.appendChild(submitgombos);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if(this.#validateFields() === true){
                this.#getValueObject();
                const question1 = new Question(this.#getValueObject().questionText, [
                    this.#getValueObject().answer1,
                    this.#getValueObject().answer2,
                    this.#getValueObject().answer3,
                    this.#getValueObject().answer4,
                ], this.#getValueObject().rightAnswer);
    
                manager.add(question1);
            };
            
            e.target.reset();
        })};
    /**
     * @returns {boolean}
     */
    #validateFields(){

        let validate = true;
        
        for(const formmezo of this.#formFieldArray){
            formmezo.error = '';
            
            if(formmezo.value === ""){
                validate = false;
                formmezo.error = "A mező kitöltése kötelező!";
            }
        };
        return validate;
    };

    /**
     * 
     * @returns {{questionText:string, answer1:string, answer2:string, answer3:string, answer4:string, rightAnswer: string}}
     */
    #getValueObject(){
        const ertekObject = {};
        for(const formfield of this.#formFieldArray){
            ertekObject[formfield.id] = formfield.value;
        };
        return ertekObject;
    }

};

class FormField{

    /**
     * @type {string}
     */
    #id;

    /**
     * @type {HTMLInputElement}
    */
    #inputElement;

    /**
     * @type {HTMLLabelElement}
     */
    #labelElement;

    /**
     * @type {HTMLSpanElement}
     */
    #errorField;

    get id(){
        return this.#id;
    };
    get value(){
        return this.#inputElement.value;
    };

    set error(bemeneti_par){
        this.#errorField.textContent = bemeneti_par;
    }

    /**
     * 
     * @param {string} id 
     * @param {string} labelContent 
     */
    constructor(id, labelContent){
        this.#id = id;

        const label = document.createElement('label');

        label.for = id;
        label.textContent = labelContent;

        this.#labelElement = label;

        const input = document.createElement('input');

        input.id = id;
        this.#inputElement = input;

        const span = document.createElement('span');

        span.className = 'error';
        this.#errorField = span;
    };

    /**
     * 
     * @returns {HTMLDivElement}
     */
    getDivElement(){
        const div_elem = document.createElement('div');
        const break1 = document.createElement('br');
        const break2 = document.createElement('br');
        div_elem.className = 'field';
        div_elem.appendChild(this.#labelElement);
        div_elem.appendChild(break1);
        div_elem.appendChild(this.#inputElement);
        div_elem.appendChild(break2);
        div_elem.appendChild(this.#errorField);

        return div_elem;
    };
};