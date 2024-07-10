// objeto 

const atividade = {
    nome:  'Almoço',
    data: new Date('2024-07-08 12:00'),
    finalizada:false
}

//criação de um vetor 
const atividades = [
    atividade ,
    
    {
        nome: 'Academia em grupo',
        data: new Date('2024-07-09 14:00'),
        finalizada: false
    },
    {
        nome: 'Gamming Session ',
        data: new Date('2024-07-09 17:00'),
        finalizada: true
    },
]


const criarItemDeAtividade = function (atividade) {

    let input = ' <input type="checkbox" '

    if(atividade.finalizada){
        input = input + 'checked '
    }

    input = input + '>'

    return `
    <div>
            ${input}
            <span>${atividade.nome}</span>
            <time>${atividade.data}</time>
        </div>
    
    
    `
}


const section = document.querySelector('section')

 for (let atividade of atividades ){
    section.innerHTML += criarItemDeAtividade(atividade)
 }
