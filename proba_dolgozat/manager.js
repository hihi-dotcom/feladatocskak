/**
 * @param {Author} author
 * @callback AddCallback
 * @returns {void}
 */
class Manager{

    /**
     * @type {Author[]}
     */
    #author_array;

    /**
     * @type {AddCallback}
     */
    #addCallback;

    //a gettere az author arrayünknek
    get author_array(){
        return this.#author_array;
    }

    //a settere az AddCallBakcünknek
    settingAddCallBack(callback){
        this.#addCallback = callback;
    };

    constructor(){//a constructorban alapértelmezett értéket adok az author_arrayemnek
        this.#author_array = [];
    };

    /**
     * 
     * @param {Author} author 
     */
    add(author){//deklarálom az add függvényt
        this.#author_array.push(author);//pusholom a bemeneti paramétert az author_arraybe
        this.#addCallback(author);//meghívom az addCallbacket a bemeneti paraméterrel
    };

    
    generateToExport(){
        const exporttomb = [];//deklarálok egy tömböt, amelynek először üres értéket adok
        for(const author of this.#author_array){//bejárom egy for of ciklussal az author_arrayünket
            const author_line = `${author.nev}; ${author.szamjegyek_szama}; ${author.szazad};`;//minden egyes iteráció alkalmával létrehozom ezt a stringet, melybe az aktuális ciklusváltozó tulajdonságai kerülnek, egy stringen belül

            exporttomb.push(author_line);//Az előbb elkészített sor pusholom a függvény elején létrehozott tömbbe
        };
        return exporttomb.join('\n');//majd visszatérek a tömbömmel, melyet szeparálok egy sortöréssel is

      
    }

};