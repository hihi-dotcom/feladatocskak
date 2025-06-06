/**
 * @callback AddCallback
 * @param {Author} author
 * @returns {void}
 * 
 * @callback RenderCallback
 * @param {Author} author
 * @returns {boolean}
 * 
 * @Rend
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

    /**
     * @type {RenderCallback}
     */
    #renderCallback;

    //a gettere az author arrayünknek
    get author_array(){
        return this.#author_array;
    }

    //a settere az AddCallBackünknek
    settingAddCallBack(callback){
        this.#addCallback = callback;
    };

    settingRenderCallback(callback){
        this.#renderCallback = callback;
    }

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

    /**
     * 
     * @returns {string[]}
     */
    generateToExport(){

        const exporttomb = ['Név: ; Számjegyek száma: ; Század: '];//deklarálok egy tömböt, amelynek először üres értéket adok
        
        for(const author of this.#author_array){//bejárom egy for of ciklussal az author_arrayünket
            const author_line = `${author.nev}; ${author.szamjegyek_szama}; ${author.szazad};`;//minden egyes iteráció alkalmával létrehozom ezt a stringet, melybe az aktuális ciklusváltozó tulajdonságai kerülnek, egy stringen belül

            exporttomb.push(author_line);//Az előbb elkészített sor pusholom a függvény elején létrehozott tömbbe
        };
        return exporttomb.join('\n');//majd visszatérek a tömbömmel, melyet szeparálok egy sortöréssel is
 
    };

    filterBy(callback_bemenetiparam){
        const result = [];
        for(let i = 0; i < this.#author_array.length; i++){
            if(callback_bemenetiparam(this.#author_array[i])){
                result.push(this.#author_array[i]);
            };
        };

        this.#renderCallback(result);
    };


    renderDefault(){
        this.#renderCallback(this.#author_array);
    }
};