class Author{
    /**
     * @type {string}
     */
    #nev;

    /**
     * @type {string}
     */
    #szamjegyek_szama;

    /**
     * @type {string}
     */
    #szazad;

    get nev(){
        return this.#nev;
    };

    get szamjegyek_szama(){
        return this.#szamjegyek_szama;
    }

    get szazad(){
        return this.#szazad;
    };
    constructor(nev, szamjegyek_szama, szazad){
        this.#nev = nev;
        this.#szamjegyek_szama = szamjegyek_szama;
        this.#szazad = szazad;
    };
};