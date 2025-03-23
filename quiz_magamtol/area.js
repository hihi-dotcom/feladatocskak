//Létrehoztam az Area osztályt
class Area{

    /**
     * @type {HTMLDivElement}
     */
    #div;

    /**
     * @type {Manager}
     */
    #manager;

    //csináltam egy gettert a privát div tulajdonságnak
    get div(){
        return this.#div;
    };

    //csináltam egy gettert a privát manager tulajdonságnak
    get manager(){
        return this.#manager;
    };

    /**
     * 
     * @param {string} cssOsztaly 
     * @param {Manager} manager1 
     */
    constructor(cssOsztaly, manager1){

        this.#manager = manager1;
        const kontener = this.#getContainerClassElements();

        const div_1 = document.createElement('div');
        div_1.className = cssOsztaly;
        this.#div = div_1;
        kontener.appendChild(this.#div);

        manager1.settingFinishCallback((eredmeny_string) => {
            kontener.innerHTML = " ";
            const divelement = document.createElement('div');

            divelement.innerHTML = eredmeny_string;

            kontener.appendChild(divelement);
        });
    };


    #getContainerClassElements(){
        let container = document.querySelector('.container');

        if(container === null){
            container = document.createElement('div');
            container.className = 'container';
            document.body.appendChild(container);
        };

        return container;
    };
};


class AnswersArea extends Area{

    /**
     * 
     * @param {string} answerscssOsztaly 
     * @param {Manager} manager2
     */
    constructor(answerscssOsztaly, manager2){
        super(answerscssOsztaly, manager2);

        manager2.settingNextAnswersCallback((bemen_param) => {
            this.div.innerHTML = "";

            for(const valasz of bemen_param){
                const valasz_div = document.createElement('div');
                valasz_div.className = 'item';
                valasz_div.innerHTML = valasz;

                this.div.appendChild(valasz_div);

                valasz_div.addEventListener('click', (e) => {
                    manager2.nextQuestion(bemen_param);
                });
            }
        });

    };

};

class QuestionArea extends Area{

    /**
     * 
     * @param {string} questioncssOsztaly
     * @param {Manager} manager3
     */
    constructor(questioncssOsztaly, manager3){
        super(questioncssOsztaly, manager3);
        manager3.settingNextQuestionCallback((kerdes_szovege) => {
            this.div.innerHTML = "";
            const kerdeses_div = document.createElement('div');
            kerdeses_div.innerHTML = kerdes_szovege;
            this.div.appendChild(kerdeses_div);
        });
    };
};