const array = [
    {
      "question": "Ki írta az 'Egri csillagok' című regényt?",
      "answers": ["Móricz Zsigmond", "Jókai Mór", "Gárdonyi Géza", "Arany János"],
      "rightAnswer": "Gárdonyi Géza"
    },
    {
      "question": "Melyik művet írta Madách Imre?",
      "answers": ["A kőszívű ember fiai", "Az ember tragédiája", "Toldi", "Bánk bán"],
      "rightAnswer": "Az ember tragédiája"
    },
    {
      "question": "Ki a 'Toldi' trilógia szerzője?",
      "answers": ["Petőfi Sándor", "Arany János", "Babits Mihály", "Vörösmarty Mihály"],
      "rightAnswer": "Arany János"
    },
    {
      "question": "Melyik költő írta a 'Himnusz'-t?",
      "answers": ["Kölcsey Ferenc", "Vörösmarty Mihály", "József Attila", "Ady Endre"],
      "rightAnswer": "Kölcsey Ferenc"
    },
    {
      "question": "'A Pál utcai fiúk' című regényben ki vezette a vörösingeseket?",
      "answers": ["Nemecsek Ernő", "Áts Feri", "Boka János", "Geréb Dezső"],
      "rightAnswer": "Áts Feri"
    },
    {
      "question": "'A kőszívű ember fiai' szerzője?",
      "answers": ["Jókai Mór", "Mikszáth Kálmán", "Gárdonyi Géza", "Kosztolányi Dezső"],
      "rightAnswer": "Jókai Mór"
    },
    {
      "question": "'Szeptember végén' című verset ki írta?",
      "answers": ["Ady Endre", "Petőfi Sándor", "Radnóti Miklós", "Babits Mihály"],
      "rightAnswer": "Petőfi Sándor"
    },
    {
      "question": "'A walesi bárdok' című ballada szerzője?",
      "answers": ["Arany János", "Kölcsey Ferenc", "Vörösmarty Mihály", "József Attila"],
      "rightAnswer": "Arany János"
    },
    {
      "question": "'Nyugat' című folyóirat első nemzedékének tagja volt:",
      "answers": ["Ady Endre", "Pilinszky János", "Kosztolányi Dezső", "Radnóti Miklós"],
      "rightAnswer": "Ady Endre"
    },
    {
      "question": "'Szózat' című költeményt ki írta?",
      "answers": ["Vörösmarty Mihály", "Kölcsey Ferenc", "Arany János", "József Attila"],
      "rightAnswer": "Vörösmarty Mihály"
    }
];

const tomb = [];

for(const question of array){
    const kerdes = new Question(question.question, question.answers, question.rightAnswer);

    tomb.push(kerdes);
};
console.log(tomb);
const manager = new Manager(tomb);

const area_question = new QuestionArea('question', manager);
const area_answers = new AnswersArea('answer-area', manager);

manager.start();

const fajlos_input = document.createElement('input');
fajlos_input.type = 'file';

fajlos_input.addEventListener('change', (e) => {
  const faljunk = e.target.files[0];

  const fajlreader = new FileReader();

  fajlreader.onload = () => {
    const fajl = fajlreader.result;

    const fajlunk_sorai = fajl.split('\n');

    for(const fajlsor of fajlunk_sorai){
      const sor = fajlsor.trim();
      const sor_elem = sor.split(';');
    }
  }
});