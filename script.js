class Usuario {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
}

const perguntas = [
  {
    id: 1,
    texto: 'Gosto de trabalhar com equipamentos e ferramentas.',
    perfil: 'R',
  },
  {
    id: 2,
    texto: 'Prefiro atividades práticas do que atividades teóricas.',
    perfil: 'R',
  },
  {
    id: 3,
    texto: 'Sinto satisfação em consertar objetos ou sistemas.',
    perfil: 'R',
  },
  {
    id: 4,
    texto: 'Gosto de entender como o ambiente físico funciona.',
    perfil: 'R',
  },
  { id: 5, texto: 'Prefiro resultados concretos e visíveis.', perfil: 'R' },
  { id: 6, texto: 'Gosto de resolver problemas complexos.', perfil: 'I' },
  {
    id: 7,
    texto: 'Tenho curiosidade sobre como sistemas funcionam internamente.',
    perfil: 'I',
  },
  { id: 8, texto: 'Gosto de pesquisar antes de tomar decisões.', perfil: 'I' },
  { id: 9, texto: 'Prefiro atividades que precisam de análise.', perfil: 'I' },
  { id: 10, texto: 'Gosto de aprender assuntos técnicos.', perfil: 'I' },
  {
    id: 11,
    texto: 'Gosto de expressar ideias de forma criativa. ',
    perfil: 'A',
  },
  { id: 12, texto: 'Tenho interesse por design e estética.', perfil: 'A' },
  { id: 13, texto: 'Prefiro ambientes flexíveis e inovadores', perfil: 'A' },
  { id: 14, texto: 'Gosto de criar soluções originais.', perfil: 'A' },
  {
    id: 15,
    texto: 'Valorizo liberdade para experimentar novas ideias.',
    perfil: 'A',
  },
  { id: 16, texto: 'Gosto de auxiliar pessoas.', perfil: 'S' },
  { id: 17, texto: 'Tenho facilidade para explicar assuntos.', perfil: 'S' },
  {
    id: 18,
    texto: 'Prefiro atividades que envolvam interação humana.',
    perfil: 'S',
  },
  { id: 19, texto: 'Gosto de ensinar algo ao próximo.', perfil: 'S' },
  { id: 20, texto: 'Gosto de trabalhar em equipe.', perfil: 'S' },
  { id: 21, texto: 'Gosto de liderar equipes.', perfil: 'E' },
  { id: 22, texto: 'Prefiro tomar decisões.', perfil: 'E' },
  { id: 23, texto: 'Gosto de influenciar pessoas.', perfil: 'E' },
  { id: 24, texto: 'Tenho interesse em negócios.', perfil: 'E' },
  { id: 25, texto: 'Gosto de assumir grandes responsabilidades.', perfil: 'E' },
  { id: 26, texto: 'Gosto de organização e planejamento.', perfil: 'C' },
  {
    id: 27,
    texto: 'Prefiro atividades com procedimentos definidos.',
    perfil: 'C',
  },
  { id: 28, texto: 'Tenho atenção aos detalhes de organização.', perfil: 'C' },
  { id: 29, texto: 'Gosto de seguir processos estruturados.', perfil: 'C' },
  { id: 30, texto: 'Valorizo precisão e controle.', perfil: 'C' },
];

const areasTI = {
  R: {
    nome: 'Infraestrutura, Redes e Cloud',
    descricao: 'Você gosta de atividades práticas e técnicas.',
  },

  I: {
    nome: 'Desenvolvimento, IA e Segurança:',
    descricao: 'Você possui um perfil analítico e investigativo.',
  },

  A: {
    nome: 'UX/UI e Design Digital',
    descricao: 'Você demonstra ter um perfil criativo e inovador.',
  },

  S: {
    nome: 'Suporte e Relacionamento',
    descricao:
      'Você é alguém colaborativo e que gostar de ajudar as outras pessoas.',
  },

  E: {
    nome: 'Gestão de Projetos e Empreendedorismo',
    descricao: 'Você possui um perfil de liderança.',
  },

  C: {
    nome: 'Banco de Dados',
    descricao: 'Você valoriza a organização.',
  },
};

const riasec = {
  R: 0,
  I: 0,
  A: 0,
  S: 0,
  E: 0,
  C: 0,
};

const opcoes = [
  { value: 1, texto: 'Não me identifico' },
  { value: 2, texto: 'Me identifico pouco' },
  { value: 3, texto: 'Me identifico moderadamente' },
  { value: 4, texto: 'Me identifico bastante' },
  { value: 5, texto: 'Me identifico totalmente' },
];

// FUNÇÃO PARAR CALCULAR OS PONTOS DE CADA PERFIL RIASEC
function calcularPontos() {
  ((riasec.R = 0),
    (riasec.I = 0),
    (riasec.A = 0),
    (riasec.S = 0),
    (riasec.E = 0),
    (riasec.C = 0));

  perguntas.forEach((pergunta, indice) => {
    const resposta = respostas[indice];

    if (resposta !== null) {
      riasec[pergunta.perfil] += resposta;
    }
  });

  console.log(riasec);

  return riasec;
}

// FUNÇÃO QUE RETORNA OS 2 PERFIS PREDOMINANTES
function obterPerfis() {
  const resultado = calcularPontos();

  const ordem = Object.entries(resultado).sort((a, b) => b[1] - a[1])

  return [ordem[0][0], ordem[1][0]];
}

// FUNÇÃO PARA VERIFICAR SE O USUÁRIO MARCOU 'Não me identifico' EM TODAS AS PERGUNTAS
function verificaRespostas1(){
  return respostas.every(resposta => resposta === 1);
}

// FUNÇÃO PARA VERIFICAR SE AS RESPOSTAS ESTÃO MUITO PRÓXIMAS
function verificaRespostasParecidas() {
  const resultado = calcularPontos();

  const valores = Object.values(resultado);

  const maior = Math.max(...valores);
  const menor = Math.min(...valores);

  return (maior - menor) <= 3;
}

// FUNÇÃO PARA MOSTRAR O RESULTADO
function exibirResultado() {

  if(verificaRespostas1()) {
    document.getElementById('resultado').innerHTML = `
      <p>Parece que você não se identificou com as atividades que apresentamos.
      <br>Talvez você ainda esteja aprendendo do que gosta.
      <br>Esperamos você aqui em um futuro próximo!</p>`;

    mostrarTela(telaResultado);
    return;
  }

  if(verificaRespostasParecidas()) {
    document.getElementById('resultado').innerHTML = `
    <p>Suas respostas foram bem equilibradas e você obteve um resultado bem aproximado entre as opções disponíveis.<br>Isso mostra que você tem interesses variados dentro da área da tecnologia.</p>`;

    mostrarTela(telaResultado);
    return;
  }

  const perfis = obterPerfis();

  const resultado = document.getElementById('resultado');

  resultado.innerHTML = '';

  perfis.forEach(perfil => {
    resultado.innerHTML += `
      <div class='area-card'>
        <h3>${areasTI[perfil].nome}</h3>
        <p>${areasTI[perfil].descricao}</p>
        <br>
      </div>`;
  });

  mostrarTela(telaResultado);
}

let indiceAtual = 0;
let respostas = new Array(perguntas.length).fill(null);

const telaInicial = document.getElementById('tela-inicial');
const telaPerguntas = document.getElementById('tela-perguntas');
const telaResultado = document.getElementById('tela-resultado');
const botaoComecar = document.getElementById('botao-comecar');
const botaoProximo = document.getElementById('botao-proximo');
const botaoAnterior = document.getElementById('botao-anterior');
const botaoRefazer = document.getElementById('botao-refazer');
const numeroPergunta = document.getElementById('numero-pergunta');
const totalPerguntas = document.getElementById('total-perguntas');
const textoPergunta = document.getElementById('texto-pergunta');
const opcoesContainer = document.getElementById('opcoes-container');
const avisoSelecao = document.getElementById('aviso-selecao');
const formulario = document.getElementById('form-envio');

function mostrarTela(tela) {
  [telaInicial, telaPerguntas, telaResultado].forEach((t) =>
    t.classList.remove('ativa'),
  );
  tela.classList.add('ativa');
}

function renderizarPergunta() {
  numeroPergunta.textContent = 'Pergunta ' + (indiceAtual + 1);
  totalPerguntas.textContent = 'de ' + perguntas.length;
  textoPergunta.textContent = perguntas[indiceAtual].texto;
  opcoesContainer.innerHTML = '';
  avisoSelecao.classList.remove('visivel');

  opcoes.forEach(function (opcao) {
    const label = document.createElement('label');
    label.classList.add('opcao-label');
    if (respostas[indiceAtual] === opcao.value)
      label.classList.add('selecionada');

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'resposta';
    radio.value = opcao.value;
    radio.checked = respostas[indiceAtual] === opcao.value;
    radio.addEventListener('change', () => selecionarOpcao(opcao.value));

    const span = document.createElement('span');
    span.textContent = opcao.texto;

    label.appendChild(radio);
    label.appendChild(span);
    opcoesContainer.appendChild(label);
  });

  botaoAnterior.disabled = indiceAtual === 0;
  botaoProximo.textContent =
    indiceAtual === perguntas.length - 1 ? 'Ver Resultado' : 'Próxima';
}

function selecionarOpcao(valor) {
  respostas[indiceAtual] = valor;
  opcoesContainer
    .querySelectorAll('.opcao-label')
    .forEach((l) => l.classList.remove('selecionada'));
  opcoesContainer
    .querySelector("input[value='" + valor + "']")
    .parentElement.classList.add('selecionada');
  avisoSelecao.classList.remove('visivel');
}

function avancarPergunta() {
  if (respostas[indiceAtual] === null) {
    avisoSelecao.classList.add('visivel');
    return;
  }
  if (indiceAtual === perguntas.length - 1) {
    exibirResultado();
  } else {
    indiceAtual++;
    renderizarPergunta();
  }
}

function voltarPergunta() {
  if (indiceAtual > 0) {
    indiceAtual--;
    renderizarPergunta();
  }
}

function iniciarTeste() {
  indiceAtual = 0;
  respostas = new Array(perguntas.length).fill(null);
  renderizarPergunta();
  mostrarTela(telaPerguntas);
}

function reiniciarTeste() {
  indiceAtual = 0;
  respostas = new Array(perguntas.length).fill(null);
  mostrarTela(telaInicial);
}

/*
formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome-usuario').value;
  const email = document.getElementById('email-usuario').value;
})

function validarEmail(email){
    const emailPadrao = /^[\w.-]+@[\w.-]+\.\w+$/;
    return emailPadrao.test(email)
*/

botaoComecar.addEventListener('click', iniciarTeste);
botaoProximo.addEventListener('click', avancarPergunta);
botaoAnterior.addEventListener('click', voltarPergunta);
botaoRefazer.addEventListener('click', reiniciarTeste);
