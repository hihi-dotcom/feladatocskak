const age = '17';

if(age === 17) console.log('You just became 17! (strict)');

if(age == 17) console.log('You just became 17! (loose)');

/**
 * a === operátor(szigorú equality operator) egy boolean értéket ad vissza
 * akkor lesz true, ha a az operátor két végén lévő érték pontosan megegyezik, típuskonverzió nélkül
 * 
 * a == operátor(laza equality operator) is egy boolean értéket ad vissza
 * akkor lesz megint true, ha az operátor két oldalán lévő érték egyenlő(akár típuskonverzióval is)
 */

const favourite = Number(prompt("What is your favourite number?"));

console.log(favourite);

if(favourite === 23){//('23' == 23)azért adja vissza a coolt, mert a laza egyenlőség operátor miatt típuskonverzió is történik és true lesz a vizsgálat értéke(ha === operátort használok is működni kell, mivel a promptot becsomagoltam a Number konstruktorába
    console.log('Cool');
}
else if(favourite === 7){
    console.log('Seven, thats my number');
}
else{
    console.log('Number is not 23 or 7');//hamis dolog 
};

if(favourite !== 23){//egyenlőség mellett van a különböző operátor is, amikből ugyanúgy van szigoró és laza 
    console.log('Not 23');
}