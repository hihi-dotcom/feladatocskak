class Table{

    /**
     * @type {Manager}
     */
    #manager;
    constructor(manager){
        this.#manager = manager;
        this.renderingTablewithHeader();
        this.#manager.settingAddCallback((question) => {
            const tr = document.createElement('tr');
            this.renderingTablewithHeader().tableBody.appendChild(tr);

        })
        
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

        const tabeBodyContent = [
            {
             htmlElem: 'td',
             
             innerHTML: '',   
             },

            {
                htmlElem: 'td',
                
                innerHTML: '',  
            },

            {
                htmlElem: 'td',
                
                innerHTML: '',  
            },

            {
                htmlElem: 'td',
                
                innerHTML: '',  
            },

            {
                htmlElem: 'td',
                
                innerHTML: '',  
            },

            {
                htmlElem: 'td',
                
                innerHTML: '',
            },

        ];

        const table = this.makingHTMLElement('table', document.body, '');

        const tableHead = this.makingHTMLElement('thead', table, '');

        const tableBody = this.makingHTMLElement('tbody', table, '');
        const headtr = document.createElement('tr');
        
        for(const thelem of tableHeadContent){

            this.makingHTMLElement(thelem.htmlElem, headtr, thelem.innerHTML); 
        };
        tableHead.appendChild(headtr);
        for(const tbdyelem of tabeBodyContent){
            const sor = this.makingHTMLElement('tr', tableBody, '');

            this.makingHTMLElement(tbdyelem.htmlElem, sor, tbdyelem.innerHTML);
            this.makingHTMLElement(tbdyelem.htmlElem, sor, tbdyelem.innerHTML);
            this.makingHTMLElement(tbdyelem.htmlElem, sor, tbdyelem.innerHTML);
            this.makingHTMLElement(tbdyelem.htmlElem, sor, tbdyelem.innerHTML);
            this.makingHTMLElement(tbdyelem.htmlElem, sor, tbdyelem.innerHTML);
            this.makingHTMLElement(tbdyelem.htmlElem, sor, tbdyelem.innerHTML);
        }
        





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