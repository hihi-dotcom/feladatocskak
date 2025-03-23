class Question{

    /**
     * @type {string}
     */
    #questionText;

    /**
     * @type {string[]}
     */
    #answers;

    /**
     * @type {string}
     */
    #rightAnswer;


    get questionText(){
        return this.#questionText;
    };

    get answers(){
        return this.#answers;
    };

    get rightAnswer(){
        return this.#rightAnswer;
    };

    constructor(questionSzoveg, valaszok, helyesValasz){
        this.#questionText = questionSzoveg;
        this.#answers = valaszok;
        this.#rightAnswer = helyesValasz;
    }
}