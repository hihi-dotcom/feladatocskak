//Öt darab hamis érték van a JS-ben:

/**
 * a 0, '', undefined, null, NaN, (false)
 * 
 * Ezek az értékek falseok lesznek, amikor booleanné  konvertáljuk őket, nem falseok, csak azzá konvertáljuk őket
 */

console.log(Boolean(0));
console.log(Boolean(undefined));//falsy
console.log(Boolean('adam'));//minden string, ami nem üres truthy érték
console.log(Boolean({})); //Az üres tömb is truthy value
console.log(Boolean(''));//falsy

//A falsy és truthy értékek vizsgálata mindig implicit, amit a JS a háttérben csinál

const money = 0;//falsy érték(false lesz az értéke booleanként), ezért else fut le(Ha bármi más számot írunk oda, akkor az if ág fut le nem az else ág, mert true lesz az érték booleanként)

if(money){//bármit rakunk ide, a JS azt booleanná alakítja és ez az if ág,akkor fut le, ha az if visszatérése true
    console.log('Van pénzem');
}
else{
    console.log('Munkát kellene találnod');//ezt kapjuk vissza a consoleon
};

let height = 20;//mivel jelen állapotban a height undefined(falsy érték), a lentebbi elágazás else ága fog lefutni(ha adok értéket a heightnak(ami nem 0), truthy value lesz belőle és az if fog lefutni és nem az else)

if(height){
    console.log('Height is defined');
}
else{
    console.log('Height is not defined');
}