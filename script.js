// Biblioteca e códigos de terceiro
const formatador = (data) => {
    return {
      dia: {
        numerico: dayjs(data).format('DD'),
        semana: {
          curto: dayjs(data).format('ddd'),
          longo: dayjs(data).format('dddd'),
        },

      },
      mes: dayjs(data).format('MMMM'),
      hora: dayjs(data).format('HH:mm'),
    };
  };
  
  // Objeto
  const atividade = {
    nome: 'Almoço',
    data: new Date('2024-07-08 12:00'),
    finalizada: false,
  };
  
  // Criação de um vetor
  let atividades = [
    atividade,
    {
      nome: 'Academia em grupo',
      data: new Date('2024-07-09 14:00'),
      finalizada: false,
    },
    {
      nome: 'Gamming Session',
      data: new Date('2024-07-09 17:00'),
      finalizada: true,
    },
  ];
  
  // Função para criar um item de atividade
  const criarItemDeAtividade = function (atividade) {
    let input = `
    <input 
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox" 
    `
  
    if (atividade.finalizada) {
      input += 'checked ';
    }
  
    input += '>';
  
    const formatado = formatador(atividade.data);
  
    return `
      <div>
        ${input}
        <span>${atividade.nome}</span>
        <time>
          ${formatado.dia.semana.longo}, 
          dia ${formatado.dia.numerico}
          de ${formatado.mes}
          às ${formatado.hora}h
        </time>
      </div>
    `;
  };
  
  // Função para atualizar a lista de atividades
  const atualizarListaDeAtividade = function () {
    const section = document.querySelector('section');
    section.innerHTML = ''
  
    // Verifica se a lista está vazia
    if (atividades.length === 0) {
      section.innerHTML = '<p>Nenhuma atividade cadastrada!</p>';
      return; // Encerra a função
    }
  
    for (let atividade of atividades) {
      section.innerHTML += criarItemDeAtividade(atividade);
    }
  };
  
  atualizarListaDeAtividade();
  
  const salvarAtividade = (event)=> {
    event.preventDefault();
    const dadosDoFormulario = new FormData(event.target);

    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
      nome,
      data,
      finalizada: false
    };

    const atividadeExiste = atividades.find ((atividade) => {
      return atividade.data === novaAtividade.data
    });

    if(atividadeExiste) {
     return alert('Dia/hora não Disponivel')
    };

    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividade();
  };
    
  // Função para criar a seleção de dias
  const criarDiasSelecao = function () {
    const dias = [
      '2024-07-08',
      '2024-07-09',
      '2024-07-10',
      '2024-07-11',
      '2024-07-12',
    ];
  
    let diasSelecao = '';
  
    for (let dia of dias) {
      const formatado = formatador(dia);
      const diaFormatado = `
        ${formatado.dia.numerico} de
        ${formatado.mes}
      `;
      diasSelecao += `
        <option value="${dia}">${diaFormatado}</option>
      `;
    }
  
    document.querySelector('select[name="dia"]').innerHTML = diasSelecao;
  };
  
  criarDiasSelecao();

 // Função para criar a seleção de horas
const criarHorasSelecao = function () {
    let horasDisponiveis = '';
  
    for (let i = 6; i <= 23; i++) { 

      const hora = String(i).padStart(2, '0')
      horasDisponiveis += `
        <option value="${hora}:00">${hora}:00</option>
      `;
      horasDisponiveis += `
        <option value="${hora}:30">${hora}:30</option>
      `;
    }
  
    document.querySelector('select[name="hora"]')
    .innerHTML = horasDisponiveis;
  };
  
  criarHorasSelecao();

  const concluirAtividade =(event) => {
    const input = event.target
    const dataDesteinput = input.value

    const atividade =atividades.find((atividade) =>{
      return atividade.data == dataDesteinput
    })

    if (!atividade){
      return
    }

    atividade.finalizada = !atividade.finalizada
    
  }
  
  