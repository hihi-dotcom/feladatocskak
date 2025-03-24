




const manager = new Manager();

const area_question = new QuestionArea('question', manager);
const area_answers = new AnswersArea('answer-area', manager);



const fajlos_input = document.createElement('input');
document.body.appendChild(fajlos_input);
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

      const kerdes = {
          kerdesszovege: sor_elem[0],
          valasz1: sor_elem[1],
          valasz2: sor_elem[2],
          valasz3: sor_elem[3],
          valasz4: sor_elem[4],
          valasz5: sor_elem[5],
      };
      const valaszok = [kerdes.valasz1, kerdes.valasz2, kerdes.valasz3, kerdes.valasz4];
      const question = new Question(kerdes.kerdesszovege, valaszok, kerdes.valasz5);
      manager.add(question);  
    };

    manager.start();
    
  };
});