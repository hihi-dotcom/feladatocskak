const formFields = [
    { id: 'questionText', label: 'Kerdes' },
    { id: 'answer1', label: 'valasz1' },
    { id: 'answer2', label: 'valasz2' },
    { id: 'answer3', label: 'valasz3' },
    { id: 'answer4', label: 'valasz4' },
    { id: 'rightAnswer', label: 'helyes valasz' },
];





const menedzser = new Manager();

const formmezoController = new FormController(menedzser, formFields);

const tabla = new Table(menedzser);

const submit_button = document.createElement('button');
 submit_button.textContent = 'letöltés';

 document.body.appendChild(submit_button);

 submit_button.addEventListener('click', (e) => {
    const hiperhivatkozas = document.createElement('a');

    const stringletolteni = menedzser.generateExportString();

    const blob = new Blob([stringletolteni]);

    hiperhivatkozas.href = URL.createObjectURL(blob);

    hiperhivatkozas.download = 'newdata.csv';

    hiperhivatkozas.click();
    URL.revokeObjectURL(hiperhivatkozas.href);
 });