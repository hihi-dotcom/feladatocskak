/**
 * @param {Author} author
 * @callback AddCallback
 * @returns {void}
 */
class Manager{

    #author;
    #author_array;
    #addCallback;

    settingAddCallBack(callback){
        this.#addCallback = callback;
    };
    constructor(author){
        this.#author = author;
        this.#author_array = [];
    };

    add(author){
        this.#author_array.push(author);
        this.#addCallback(author);
    };

    generateToExport(){
        const exporttomb = [];
        for(const author of this.#author_array){
            const author_line = `${author.nev}; ${author.szamjegyek_szama}; ${author.szazad};`;

            exporttomb.push(author_line);
        };
        return exporttomb.join('\n');

      
    }

};