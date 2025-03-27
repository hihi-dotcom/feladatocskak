class Algorithm extends Area{
    #manager;


    constructor(cssClass, manager){
        super(cssClass);
        this.#manager = manager;
        const input = document.createElement("input");
        input.type = 'text';
        this.div.appendChild(input);
        const input_value = input.value;
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
        this.div.appendChild(select);
        for(const option of optionvalues){
            this.makingOptions(option.value, option.text, select);
        };

        const algoritmus_gomb = document.createElement('button');
        algoritmus_gomb.innerHTML = "Szűrés";

    };

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