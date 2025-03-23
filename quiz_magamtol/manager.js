/**
 * 
 * @param {string} questionText
 * @callback NextQuestionCallback
 * @returns {void}
 * 
 * 
 * @param {string[]} answers
 * @callback NextAnswersCallback
 * @returns {void}
 * 
 * @param {string} result
 * @callback FinishCallback
 * @returns {void}
 * 
 */
class Manager{
    
    /**
     * @type {Question[]}
     */
    #array;

    /**
     * @type {number}
     */
    #currentQuestionNumber;


    /**
     * @type {NextAnswersCallback}
     */
    #nextAnswersCallback;

    /**
     * @type {NextQuestionCallback}
     */
    #nextQuestionCallback;

    /**
     * @type {FinishCallback}
     */
    #finishCallback;

    /**
     * @type {Object}
     */
    #selectedAnswer;

    /**
     * 
     * @param {Question[]} bemeneti_array 
     */
    constructor(bemeneti_array = []){
        this.#array = bemeneti_array;
        this.#currentQuestionNumber = 0;
        this.#selectedAnswer = {};
    };

    settingNextQuestionCallback(callback1){
        this.#nextQuestionCallback = callback1;
    };

    settingNextAnswersCallback(callback2){
        this.#nextAnswersCallback = callback2;
    };

    settingFinishCallback(callback3){
        this.#finishCallback = callback3;
    };

    /**
     * 
     * @param {string} answer
     * @returns {void}
     *  
     */
    nextQuestion(answer){
        this.#selectedAnswer[this.#currentQuestionNumber] = answer;

        this.#currentQuestionNumber++;

        if(this.#currentQuestionNumber < this.#array.length){
            this.#nextQuestionCallback(this.#array[this.#currentQuestionNumber].questionText);

            this.#nextAnswersCallback(this.#array[this.#currentQuestionNumber].answers);
        }
        else{
            let counter = 0;

            for(let i = 0; i < this.#array.length; i++){
                if(this.#selectedAnswer[i] === this.#array[i].rightAnswer){
                    counter++;
                }
              
            };

            this.#finishCallback(`A tesztnek vége lett a helyes válaszok: ${this.#array.length} / ${counter}.`);


        };
    };

    start(){
        this.#nextQuestionCallback(this.#array[0].questionText);
        this.#nextAnswersCallback(this.#array[0].answers);
    };

    /**
     * 
     * @param {Question} question 
     *@returns {void} 
     *
     */
    add(question){
        this.#array.push(question);
    }

};