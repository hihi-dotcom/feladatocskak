class Algorithm extends Area{

    /**
     * @type {Manager}
     */
    #manager;

    /**
     * 
     * @param {string} cssClass 
     * @param {Manager} manager 
     */
    constructor(cssClass, manager){
        super(cssClass);
        this.#manager = manager;
        console.log(manager);
        const form = document.createElement('form');
        const input = document.createElement("input");
        input.type = 'text';
        this.div.appendChild(form);
        form.appendChild(input);
        
        const optionvalues = [
            {
                value: 'üres',
                text: 'Üres',
            },
            {
                value: 'nev',
                text: 'Név',
            },
            {
                value: 'szamjegyek_szama',
                text: 'Számjegyek száma',
            },
            {
                value: 'szazad',
                text: 'Század',
            },
        ]
        const select = document.createElement('select');
        form.appendChild(select);
        for(const option of optionvalues){
            this.makingOptions(option.value, option.text, select);
        };

        const algoritmus_gomb = document.createElement('button');
        algoritmus_gomb.innerHTML = "Szűrés";
        form.appendChild(algoritmus_gomb);

        form.addEventListener('submit', (e) =>{
            e.preventDefault();
            const input_value = input.value;
            console.log(this.#manager);
            if(select.value === 'nev'){
                
                this.#manager.filterBy((result) => {

                    console.log(result.nev);
                    console.log(input_value)
                    return result.nev.includes(input_value);
                })
            }
            else if(select.value === 'szamjegyek_szama'){
                this.#manager.filterBy((result) => {
                    return result.szamjegyek_szama.includes(input_value);
                })
            }
            else if(select.value === 'szazad'){
                this.#manager.filterBy((result) => {
                    return result.szazad.includes(input_value);
                });
            };

            if(select.value === "" && input_value === ""){
                this.#manager.renderDefault();
            };

            e.target.reset();
        });
    };


    /**
     * 
     * @param {string} optionvalue 
     * @param {string} optionText 
     * @param {HTMLSelectElement} parent 
     * @returns 
     */
    makingOptions(optionvalue, optionText, parent){
        const option = document.createElement('option');
        option.value = optionvalue;
        option.textContent = optionText;
        parent.appendChild(option);
        

        return option;
    };

    /*
    filter(callback_bemen_param){
       for(let i = 0; i < this.#manager.author_array.length; i++){
            if()
       }
    };
    */

}