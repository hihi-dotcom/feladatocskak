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

    //a név gettere
    get nev(){
        return this.#nev;
    };

    //a szamjegyek_szama priv. tulajdonságnak a gettere
    get szamjegyek_szama(){
        return this.#szamjegyek_szama;
    }

    //a szazad priv. tulajdonságnak a gettere
    get szazad(){
        return this.#szazad;
    };

    /**
     * 
     * @param {string} nev 
     * @param {string} szamjegyek_szama 
     * @param {string} szazad 
     */
    constructor(nev, szamjegyek_szama, szazad){

        //Beállítom a priv. tulajdonságok értékeit
        this.#nev = nev;
        this.#szamjegyek_szama = szamjegyek_szama;
        this.#szazad = szazad;
    };
};