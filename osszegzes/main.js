class Data_to_Table{


    ossz_array;

    /**
     * 
     * @param {Array} tomb_param
     * 
     * @type {koltes[]}  
     */
    constructor(tomb_param){
        this.ossz_array = tomb_param;

        const tablazat = document.createElement(`table`);
        document.body.appendChild(tablazat);

        const tablazat_fej = document.createElement(`thead`);
        tablazat.appendChild(tablazat_fej);

        const tablazat_test = document.createElement(`tbody`);
        tablazat.appendChild(tablazat_test);
        const tablazat_fejsor = document.createElement(`tr`);
        tablazat_fej.appendChild(tablazat_fejsor);

        const tabl_fej_cell1 = document.createElement(`th`);
        tabl_fej_cell1.textContent = `Megnevezés`;
        tablazat_fejsor.appendChild(tabl_fej_cell1);


        const tabl_fej_cell2 = document.createElement(`th`);
        tabl_fej_cell2.textContent = `Hely`;
        tablazat_fejsor.appendChild(tabl_fej_cell2);


        const tabl_fej_cell4 = document.createElement(`th`);
        tabl_fej_cell4.textContent = `Hónap`;
        tablazat_fejsor.appendChild(tabl_fej_cell4);

        const tabl_fej_cell3 = document.createElement(`th`);
        tabl_fej_cell3.textContent = `Összeg`;
        tablazat_fejsor.appendChild(tabl_fej_cell3);

        for(const kolt_props of tomb_param){
            const sor = document.createElement(`tr`);
            tablazat_test.appendChild(sor);

            const elsocella = document.createElement(`td`);
            elsocella.innerHTML = kolt_props.megnevezes;
            sor.appendChild(elsocella);

            const masodikcella = document.createElement(`td`);
            masodikcella.innerHTML = kolt_props.hely;
            sor.appendChild(masodikcella);

            const harmadikcella = document.createElement(`td`);
            harmadikcella.innerHTML = kolt_props.honap;
            sor.appendChild(harmadikcella);

            const negyedikcella = document.createElement(`td`);
            negyedikcella.innerHTML = kolt_props.osszeg;
            sor.appendChild(negyedikcella);
            this.osszeg_eldontes(kolt_props, negyedikcella);
            
        };
        const divosszeg = document.createElement(`div`);
        document.body.appendChild(divosszeg);
        divosszeg.innerHTML = `A bevételeink és kiadásaink összesen vesszővel elválasztva: ${this.osszeg(tomb_param)}`;
        
    };

    /**
     * 
     * @param {Array} tomb_param1 
     * @returns {Array}
     */
   osszeg(tomb_param1){
        let pozitiv_osszegzo = 0;
        let negativ_osszegzo = 0;
       
        for(let i = 0; i < tomb_param1.length; i++){
            if(tomb_param1[i].osszeg > 0){
                pozitiv_osszegzo += Number(tomb_param1[i].osszeg);
            }
            else if(tomb_param1[i].osszeg < 0){
                negativ_osszegzo += Number(tomb_param1[i].osszeg);
            }
        }
        return [pozitiv_szamlalo, negativ_szamlalo];
    };
    /**
     * 
     * @param {HTMLTableCellElement} htmlelem 
     *  
     */
    osszeg_eldontes(koltes, htmlelem){
        if(koltes.osszeg < 0){
        htmlelem.classList.add(`red`);
        }
        else{
            htmlelem.classList.add(`green`);
        };
    };

};


const fajl_input = document.createElement('input');//Létrehoztam egy HTML inputot
document.body.appendChild(fajl_input);//ezt az inputot hozzáfűztem, a HTML fájlomhoz
fajl_input.type = 'file';//beállítottam az inputom típusát

fajl_input.addEventListener(`change`, (e) => {//deklaráltam egy eseménykezelőt, az input change eventjére
    const sajat_fajlunk = e.target.files[0];//elrakom egy változóban, az event target propertyt, amivel az inputra utalunk, és az eventarget files tömb propertyjének első elemét is meghívjuk, mivel ugye az inputunk fájl típusú, ezért van files propertyje, ami a betöltött fájlainkat tartalmazza, és azok közül elkérjük az elsőt.
    const be_fileolvas_oszt = new FileReader();//példányosítjuk a beépített FileReader interfacet
    
    be_fileolvas_oszt.readAsText(sajat_fajlunk);//meghívtuk a FileReader interface readAsText beépített metódusát, a saját fájlunkkal
       /**
         * @type {koltes[]}
         */
       const koltesek_tombje = [];//létrehoztam egy tömböt, amibe majd az egyes elemeket fogom rakni, típusa:koltes
    be_fileolvas_oszt.onload = (e) => {//a FileReader példányunkra meghívtam az onload propertyjét, ami egy evenlistener tulajdonképpen a load esemenyre
        const file_tart = be_fileolvas_oszt.result;//eltároltam a FileReader példányunk result propertyjét, amely már a textként beolvasott fájlunkat takarja
        const splitted_lines = file_tart.split('\n');//eltároltam egy változóban, a beolvasott tartalom soronkénti feldarabolását

 
        for(const line of splitted_lines){//egy for of ciklussal bejárom ezeket a sorokat
            const splitted_properties = line.split(';');//ezeket a sorokat tovább tördelem ; alapján, és eltárolom egy változóba

            const koltes = {//létrehozom a koltes nevű objektumot
                megnevezes: splitted_properties[0],//a koltes nevű objektum megnevezes tulajdonságának megadom a ;-ként eltördelt elemek első elemét
                hely: splitted_properties[1],//a koltes nevű objektum hely tulajdonságának megadom a ;-ként eltördelt elemek második elemét
                honap: splitted_properties[2],//a koltes nevű objektum honap tulajdonságának megadom a ;-ként eltördelt elemek harmadik elemét
                osszeg: splitted_properties[3]//a koltes nevű objektum osszeg tulajdonságának megadom a ;-ként eltördelt elemek negyedik elemét
            };
            koltesek_tombje.push(koltes);//majd a koltes nevű objektumot pusholom a korábban létrehozott koltesek_tombjebe
        };
        const adatatablaba = new Data_to_Table(koltesek_tombje);//majd példányosítom a Data_to_Table osztályunkat, amely egy tömb paramétert vár, és ennek pedig megadom, a koltesek_tombjet.

        
         
    };
});









