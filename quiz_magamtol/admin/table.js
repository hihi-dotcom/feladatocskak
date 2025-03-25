class Table{

    /**
     * @type {Manager}
     */
    #manager;
    constructor(manager){
        this.#manager = manager;
      
        const tabletest = this.makingHTMLElement('tbody', this.renderingTablewithHeader(), '');

    
        this.#manager.settingAddCallback((question) => {
            const tbodyelements = [
                {innerHTML: question.questionText},
                {innerHTML: question.answers[0]},
                {innerHTML: question.answers[1]},
                {innerHTML: question.answers[2]},
                {innerHTML: question.answers[3]},
                {innerHTML: question.rightAnswer}
            ];
            const tr = document.createElement('tr');
            tabletest.appendChild(tr);


            for(const tbodytart of tbodyelements){
                this.makingHTMLElement('td', tr, tbodytart.innerHTML);
            }
            /*
            this.makingHTMLElement("td", tr, question.questionText);
            this.makingHTMLElement("td", tr, question.answers[0]);
            this.makingHTMLElement("td", tr, question.answers[1]);
            this.makingHTMLElement("td", tr, question.answers[2]);
            this.makingHTMLElement("td", tr, question.answers[3]);

            this.makingHTMLElement("td", tr, question.rightAnswer);
            */
        });
        
    };


    renderingTablewithHeader(){
        const tableHeadContent = [
            {
             htmlElem: 'th',
             
             innerHTML: 'Kérdés',   
             },

            {
                htmlElem: 'th',
                
                innerHTML: 'valasz1',  
            },

            {
                htmlElem: 'th',
                
                innerHTML: 'valasz2',  
            },

            {
                htmlElem: 'th',
                
                innerHTML: 'valasz3',  
            },

            {
                htmlElem: 'th',
                
                innerHTML: 'valasz4',  
            },

            {
                htmlElem: 'th',
                
                innerHTML: 'helyes valasz',  
            },

        ];
        const table = this.makingHTMLElement('table', document.body, '');
        const tableHead = this.makingHTMLElement('thead', table, '');
        const headtr = document.createElement('tr');
        for(const thelem of tableHeadContent){

            this.makingHTMLElement(thelem.htmlElem, headtr, thelem.innerHTML); 
        };
        tableHead.appendChild(headtr);

        return table;
    };

    /**
     * 
     * @param {string} htmlelem 
     * @param {HTMLElement} parent 
     * @param {string} innerHTML 
     * @returns {HTMLElement}
     */
    makingHTMLElement(htmlelem, parent, innerHTML){
        const element = document.createElement(htmlelem);
        parent.appendChild(element);
        element.innerHTML = innerHTML;

        return element;
    }
};